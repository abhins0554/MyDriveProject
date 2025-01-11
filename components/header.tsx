"use client"

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useTranslation } from "@/hooks/use-translation"
import { UserNav } from "@/components/user-nav"

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex-1 flex items-center gap-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("search.placeholder")}
            className="w-full max-w-md"
          />
        </div>
        <UserNav />
      </div>
    </header>
  )
}

