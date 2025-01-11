"use client"

import { useState } from "react"
import { FileType } from "@/types/file"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function FileViewer({ file, onClose }: { file: FileType; onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  const renderFileContent = () => {
    const fileUrl = `/api/files/view?key=${encodeURIComponent(file.key)}`

    switch (file.type) {
      case "image":
        return <img src={fileUrl} alt={file.name} className="max-h-[80vh] max-w-full" />
      case "video":
        return <video src={fileUrl} controls className="max-h-[80vh] max-w-full" />
      case "pdf":
        return (
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`}
            className="h-[80vh] w-full"
          />
        )
      default:
        return <div>Unsupported file type</div>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{file.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">{renderFileContent()}</div>
      </DialogContent>
    </Dialog>
  )
}

