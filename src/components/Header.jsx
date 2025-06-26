import { BarChart3, TrendingUp, Calendar, Activity, ChevronRight } from 'lucide-react'

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.06] to-transparent"></div>
      
      <div className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex sm:items-center justify-between sm:flex-row flex-col gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/30 float">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Revenue Dashboard
                <span className="hidden sm:inline-block bg-blue-500/30 text-blue-100 text-xs px-2 py-1 rounded-md ml-3 align-middle">
                  2025
                </span>
              </h1>
              <p className="text-blue-100 mt-1.5 flex items-center text-sm">
                <Activity className="h-3.5 w-3.5 mr-1.5 text-blue-200" />
                <span>Real-time product revenue analytics</span>
                <ChevronRight className="h-3.5 w-3.5 mx-1 text-blue-300/50" />
                <span className="text-blue-200 font-medium">Dashboard</span>
              </p>
            </div>
          </div>
          
          <div className="glass-effect px-4 py-2.5 rounded-xl text-white shadow-lg flex items-center space-x-4 border-t border-white/20">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-blue-200 mr-2" />
              <span className="text-sm font-medium">Analytics</span>
            </div>
            
            <div className="h-6 w-px bg-blue-200/30"></div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-blue-200 mr-2" />
              <span className="text-sm font-medium">2022-2025</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
    </header>
  )
}

export default Header 