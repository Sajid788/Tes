import { ArrowUpRight, ArrowDownRight, Award, Star } from 'lucide-react'

function RevenueBreakdown({ data, totalRevenue }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-slate-500 py-10 sm:py-12">
        <div className="text-3xl sm:text-4xl mb-3 opacity-70">📋</div>
        <div className="text-sm sm:text-base">No revenue data available for this period</div>
      </div>
    )
  }

  function formatCurrency(value) {
    if (value >= 1000000) {
      return '$' + (value / 1000000).toFixed(1) + 'M'
    } else if (value >= 1000) {
      return '$' + (value / 1000).toFixed(1) + 'K'
    } else {
      return '$' + value
    }
  }

  return (
    <div className="overflow-hidden">
      <div className="table-responsive">
        <table className="min-w-full divide-y divide-slate-200">
          <thead>
            <tr>
              <th className="px-3 sm:px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50/70 rounded-tl-lg">
                Product
              </th>
              <th className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50/70">
                Revenue
              </th>
              <th className="px-3 sm:px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider bg-slate-50/70 rounded-tr-lg">
                Share
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-100">
            {data.map((item, index) => {
              let bgColor = index % 2 === 0 ? 'bg-white hover:bg-slate-50/80' : 'bg-slate-50/30 hover:bg-slate-50/60'
              let isTopProduct = index === 0
              
              let arrowIcon, textColor
              if (isTopProduct) {
                arrowIcon = <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-500 mr-1.5" />
                textColor = 'text-emerald-600 font-medium'
              } else {
                arrowIcon = <ArrowDownRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500 mr-1.5" />
                textColor = 'text-red-600'
              }
              
              let percentWidth = (item.amount / data[0].amount) * 100
              
              return (
                <tr key={item._id} className={`${bgColor} transition-colors duration-150`}>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {isTopProduct && (
                        <span className="hidden sm:flex items-center justify-center bg-amber-100 p-1.5 rounded-lg mr-3 shadow-sm">
                          <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-amber-600" />
                        </span>
                      )}
                      <div className="flex-1">
                        <div className="text-xs sm:text-sm font-medium text-slate-800 flex items-center">
                          {isTopProduct && (
                            <span className="sm:hidden flex items-center justify-center bg-amber-100 p-1 rounded-md mr-1.5">
                              <Star className="h-2.5 w-2.5 text-amber-600" />
                            </span>
                          )}
                          <span className={isTopProduct ? 'font-semibold' : ''}>
                            {item.product}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center mt-1">
                          <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${
                            item.category === 'Electronics' ? 'bg-blue-500' :
                            item.category === 'Sports' ? 'bg-emerald-500' :
                            item.category === 'Food' ? 'bg-amber-500' :
                            item.category === 'Clothing' ? 'bg-pink-500' :
                            item.category === 'Books' ? 'bg-sky-500' :
                            'bg-slate-400'
                          }`}></span>
                          <span className="hidden xs:inline">{item.category}</span>
                        </div>
                        
                        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2">
                          <div 
                            className={`h-1.5 rounded-full ${
                              index === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 
                              index === 1 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                              index === 2 ? 'bg-gradient-to-r from-purple-500 to-purple-400' :
                              'bg-gradient-to-r from-slate-400 to-slate-300'
                            }`} 
                            style={{ width: percentWidth + '%' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                    {formatCurrency(item.amount)}
                  </td>
                  <td className="px-3 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end">
                      {arrowIcon}
                      <span className={`text-xs sm:text-sm ${textColor}`}>
                        {item.percentage}%
                      </span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RevenueBreakdown