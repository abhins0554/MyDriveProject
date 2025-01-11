import { FileList } from "@/components/file-list"
import { SearchForm } from "@/components/search-form"

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <SearchForm />
      <FileList />
    </div>
  )
}

