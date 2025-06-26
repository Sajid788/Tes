import { AlertCircle, XCircle, RefreshCw } from 'lucide-react'

function ErrorMessage({ message }) {
  let errorText = message || 'An unexpected error occurred. Please try again later.'
  
  return (
    <div className="bg-gradient-to-r from-red-50 to-red-50/50 backdrop-blur-sm border-l-4 border-red-500 rounded-xl shadow-lg p-6 my-6 fade-in">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <div className="bg-red-100 p-2.5 rounded-lg shadow-sm">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
        </div>
        <div className="ml-5">
          <h3 className="text-lg font-medium text-red-800">
            Error Loading Data
          </h3>
          <div className="mt-2.5 text-sm text-red-700">
            <p className="mb-3">{errorText}</p>
            <div className="mt-5 flex items-center text-sm bg-white/70 backdrop-blur-sm px-4 py-2.5 rounded-lg shadow-sm inline-block border border-red-100">
              <RefreshCw className="h-4 w-4 mr-2.5 text-red-500" />
              <span className="font-medium">Please refresh the page or try again later</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-red-100 rounded-full p-2 shadow-md hidden sm:block">
        <AlertCircle className="h-5 w-5 text-red-500" />
      </div>
    </div>
  )
}

export default ErrorMessage 