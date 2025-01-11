"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { FileIcon, FolderIcon, MoreVertical, Plus } from 'lucide-react'
import { formatDistanceToNow } from "date-fns"
import { FileType } from "@/types/file"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslation } from "@/hooks/use-translation"
import { FileViewer } from "@/components/file-viewer"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export function FileList() {
  const [files, setFiles] = useState<FileType[]>([])
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingFolder, setIsCreatingFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  const searchQuery = searchParams.get("q") || ""
  const currentPath = searchParams.get("path") || "/"

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/files?path=${currentPath}&q=${searchQuery}`)
        if (!response.ok) throw new Error("Failed to fetch files")
        const data = await response.json()
        setFiles(data)
      } catch (error) {
        console.error("Error fetching files:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFiles()
  }, [currentPath, searchQuery])

  const handleFileAction = async (file: FileType, action: string) => {
    switch (action) {
      case "open":
        if (file.type === "folder") {
          router.push(`/dashboard?path=${file.key}`)
        } else {
          setSelectedFile(file)
        }
        break
      case "download":
        window.open(`/api/files/download?key=${file.key}`, "_blank")
        break
      case "delete":
        if (window.confirm(t("file.deleteConfirmation"))) {
          try {
            const response = await fetch(`/api/files?key=${file.key}`, {
              method: "DELETE",
            })
            if (!response.ok) throw new Error("Failed to delete file")
            setFiles(files.filter((f) => f.key !== file.key))
          } catch (error) {
            console.error("Error deleting file:", error)
          }
        }
        break
    }
  }

  const handleCreateFolder = async () => {
    if (!newFolderName) return

    try {
      const response = await fetch("/api/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: currentPath, name: newFolderName }),
      })

      if (!response.ok) throw new Error("Failed to create folder")

      const newFolder = await response.json()
      setFiles([...files, newFolder])
      setIsCreatingFolder(false)
      setNewFolderName("")
    } catch (error) {
      console.error("Error creating folder:", error)
    }
  }

  if (isLoading) {
    return <div>{t("loading")}</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{t("files.title")}</h2>
        <Button onClick={() => setIsCreatingFolder(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t("folder.create")}
        </Button>
      </div>
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 p-4 font-medium">
          <div className="col-span-6">{t("file.name")}</div>
          <div className="col-span-3">{t("file.lastModified")}</div>
          <div className="col-span-2">{t("file.size")}</div>
          <div className="col-span-1"></div>
        </div>
        {files.map((file) => (
          <div key={file.key} className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50">
            <div className="col-span-6 flex items-center">
              {file.type === "folder" ? (
                <FolderIcon className="mr-2 h-4 w-4" />
              ) : (
                <FileIcon className="mr-2 h-4 w-4" />
              )}
              <button onClick={() => handleFileAction(file, "open")} className="hover:underline">
                {file.name}
              </button>
            </div>
            <div className="col-span-3">
              {file.lastModified}
              {/* {formatDistanceToNow(new Date(file.lastModified), { addSuffix: true })} */}
            </div>
            <div className="col-span-2">{file.size}</div>
            <div className="col-span-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleFileAction(file, "open")}>
                    {file.type === "folder" ? t("folder.open") : t("file.view")}
                  </DropdownMenuItem>
                  {file.type !== "folder" && (
                    <DropdownMenuItem onClick={() => handleFileAction(file, "download")}>
                      {t("file.download")}
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleFileAction(file, "delete")}>
                    {t("file.delete")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
      {selectedFile && (
        <FileViewer
          file={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
      <Dialog open={isCreatingFolder} onOpenChange={setIsCreatingFolder}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("folder.create")}</DialogTitle>
          </DialogHeader>
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder={t("folder.namePlaceholder")}
          />
          <DialogFooter>
            <Button onClick={handleCreateFolder}>{t("folder.create")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

