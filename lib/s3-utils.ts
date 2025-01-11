import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function getBucketSize(): Promise<number> {
  let totalSize = 0
  let continuationToken: string | undefined

  do {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      ContinuationToken: continuationToken,
    })

    const response = await s3Client.send(command)
    
    if (response.Contents) {
      totalSize += response.Contents.reduce((acc, obj) => acc + (obj.Size || 0), 0)
    }

    continuationToken = response.NextContinuationToken
  } while (continuationToken)

  return totalSize
}

