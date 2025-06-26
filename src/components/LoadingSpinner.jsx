import { BarChart3 } from 'lucide-react'

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-80 py-10">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-l-indigo-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <BarChart3 className="h-6 w-6 text-blue-500 animate-pulse" />
        </div>
      </div>
      <p className="mt-8 text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold">Loading data...</p>
      <p className="mt-2 text-sm text-slate-500">Please wait while we fetch the latest revenue data</p>
      
      <div className="mt-6 w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 rounded-full shimmer" style={{width: '70%'}}></div>
      </div>
    </div>
  )
}

export default LoadingSpinner 