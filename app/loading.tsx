import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400 mx-auto" />
        <h2 className="mt-4 text-xl font-semibold text-blue-800 dark:text-blue-400">Loading...</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Please wait while we prepare the content</p>
      </div>
    </div>
  )
}
