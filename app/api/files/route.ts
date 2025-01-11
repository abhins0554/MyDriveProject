import { NextRequest, NextResponse } from "next/server"
import { S3Client, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path") || "/"
  const searchQuery = searchParams.get("q") || ""

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Prefix: path.startsWith("/") ? path.slice(1) : path,
      Delimiter: "/",
    })

    const response = await s3Client.send(command)

    let files = [
      ...(response.CommonPrefixes || []).map((prefix) => ({
        name: prefix.Prefix!.split("/").slice(-2)[0],
        key: prefix.Prefix!,
        type: "folder",
        size: "-",
        lastModified: "-",
      })),
      ...(response.Contents || []).map((content) => ({
        name: content.Key!.split("/").pop()!,
        key: content.Key!,
        type: getFileType(content.Key!),
        size: formatFileSize(content.Size!),
        lastModified: content.LastModified!.toISOString(),
      })),
    ]

    if (searchQuery) {
      files = files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return NextResponse.json(files)
  } catch (error) {
    console.error("Error listing files:", error)
    return NextResponse.json({ error: "Failed to list files" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const key = searchParams.get("key")

  if (!key) {
    return NextResponse.json({ error: "Missing file key" }, { status: 400 })
  }

  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
    })

    await s3Client.send(command)

    return NextResponse.json({ message: "File deleted successfully" })
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 })
  }
}

function getFileType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase()
  if (["jpg", "jpeg", "png", "gif"].includes(ext!)) return "image"
  if (["mp4", "webm", "ogg"].includes(ext!)) return "video"
  if (ext === "pdf") return "pdf"
  return "other"
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

