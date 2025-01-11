"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/hooks/use-translation"

export function SearchForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { t } = useTranslation()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const searchQuery = formData.get("search") as string
    const currentPath = searchParams.get("path") || "/"
    router.push(`/dashboard?path=${currentPath}&q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        name="search"
        placeholder={t("search.placeholder")}
        className="pl-8"
      />
    </form>
  )
}

