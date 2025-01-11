"use client"

import * as React from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

type Language = "en" | "hi"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "login.title": "Welcome Back",
    "login.description": "Sign in with your Google account to continue",
    "login.googleButton": "Continue with Google",
    "nav.files": "My Files",
    "nav.upload": "Upload",
    "nav.settings": "Settings",
    "nav.signOut": "Sign Out",
    "storage.title": "Storage",
    "storage.used": "GB used",
    "search.placeholder": "Search files and folders...",
    "settings.theme": "Theme",
    "settings.language": "Language",
    "file.name": "Name",
    "file.lastModified": "Last Modified",
    "file.size": "Size",
    "file.view": "View",
    "file.download": "Download",
    "file.delete": "Delete",
    "file.deleteConfirmation": "Are you sure you want to delete this file?",
    "loading": "Loading...",
    "upload.title": "Upload File",
    "upload.submit": "Upload",
    "upload.uploading": "Uploading...",
    "settings.title": "Settings",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "settings.system": "System",
    "files.title": "My Files",
    "folder.create": "Create Folder",
    "folder.open": "Open Folder",
    "folder.namePlaceholder": "Enter folder name",
  },
  hi: {
    "login.title": "वापसी पर स्वागत है",
    "login.description": "जारी रखने के लिए अपने Google खाते से साइन इन करें",
    "login.googleButton": "Google के साथ जारी रखें",
    "nav.files": "मेरी फ़ाइलें",
    "nav.upload": "अपलोड",
    "nav.settings": "सेटिंग्स",
    "nav.signOut": "साइन आउट",
    "storage.title": "स्टोरेज",
    "storage.used": "GB उपयोग किया",
    "search.placeholder": "फ़ाइलें और फ़ोल्डर खोजें...",
    "settings.theme": "थीम",
    "settings.language": "भाषा",
    "file.name": "नाम",
    "file.lastModified": "अंतिम संशोधन",
    "file.size": "आकार",
    "file.view": "देखें",
    "file.download": "डाउनलोड करें",
    "file.delete": "हटाएं",
    "file.deleteConfirmation": "क्या आप वाकई इस फ़ाइल को हटाना चाहते हैं?",
    "loading": "लोड हो रहा है...",
    "upload.title": "फ़ाइल अपलोड करें",
    "upload.submit": "अपलोड करें",
    "upload.uploading": "अपलोड हो रहा है...",
    "settings.title": "सेटिंग्स",
    "settings.light": "लाइट",
    "settings.dark": "डार्क",
    "settings.system": "सिस्टम",
    "files.title": "मेरी फ़ाइलें",
    "folder.create": "फ़ोल्डर बनाएं",
    "folder.open": "फ़ोल्डर खोलें",
    "folder.namePlaceholder": "फ़ोल्डर का नाम दर्ज करें",
  },
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useLocalStorage<Language>("language", "en")

  const t = React.useCallback(
    (key: string) => {
      return translations[language][key as keyof typeof translations.en] || key
    },
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

