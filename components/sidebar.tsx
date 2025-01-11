"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cloud, FileUp, FolderOpen, Settings, PieChart } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useTranslation } from "@/hooks/use-translation"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useBucketStorage } from "@/hooks/use-bucket-storage"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()
  const { usedSpace, totalSpace, percentage } = useBucketStorage()

  const routes = [
    {
      href: "/dashboard",
      icon: FolderOpen,
      label: t("nav.files")
    },
    {
      href: "/dashboard/upload",
      icon: FileUp,
      label: t("nav.upload")
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      label: t("nav.settings")
    }
  ]

  return (
    <div className="flex flex-col w-64 border-r bg-card">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Cloud className="h-6 w-6" />
          <span className="font-semibold">MyLocalDrive</span>
        </div>
        <nav className="space-y-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                pathname === route.href && "bg-secondary"
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              {t("storage.title")}
            </div>
            <span>{percentage}%</span>
          </div>
          <Progress value={percentage} />
          <p className="text-xs text-muted-foreground">
            {usedSpace} / {totalSpace} {t("storage.used")}
          </p>
        </div>
      </div>
    </div>
  )
}

