export type FileType = {
  name: string
  key: string
  type: "folder" | "image" | "video" | "pdf" | "other"
  size: string
  lastModified: string
}

