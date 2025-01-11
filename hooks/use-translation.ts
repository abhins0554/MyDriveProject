"use client"

import { useLanguage } from "@/components/providers/language-provider"

export function useTranslation() {
  return useLanguage()
}

