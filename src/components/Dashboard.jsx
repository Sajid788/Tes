import { useRevenue } from '../context/RevenueContext'
import { useMemo } from 'react'
import RevenuePieChart from './RevenuePieChart'
import RevenueBreakdown from './RevenueBreakdown'
import PeriodFilter from './PeriodFilter'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import { TrendingUp, DollarSign, Package, BarChart2, Award, ChevronUp, ChevronDown, Zap, LineChart } from 'lucide-react'


function StatCard({ icon, title, value, borderColor, valueGradient }) {
  return (
    <div className={`stat-card border-${borderColor} card-hover`}>
      <div className="flex items-center">
        <div className={`stat-icon bg-${borderColor}-100/80 backdrop-blur-sm`}>
          {icon}
        </div>
        <div className="ml-3 sm:ml-4">
          <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
          <p className="stat-value" style={valueGradient ? {backgroundImage: valueGradient} : {}}>
            {value}
          </p>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${borderColor}-500/30 to-${borderColor}-500/10`}></div>
    </div>
  );
}


function ChartCard({ title, icon, iconColor, children }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-4 sm:p-6 border border-slate-100 card-hover fade-in card-shadow">
      <div className="flex items-center mb-5">
        <div className={`bg-${iconColor}-100/80 p-2.5 rounded-lg shadow-sm backdrop-blur-sm`}>
          {icon}
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-slate-800 ml-3">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function Dashboard() {
  const { 
    revenueData, 
    totalRevenue, 
    selectedMonth, 
    selectedYear, 
    loading, 
    error,
    availablePeriods 
  } = useRevenue();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  
  const getMonthName = (month) => months[month - 1];
  
  // Calculate average revenue 
  let avgRevenue = 0;
  if (revenueData.length > 0) {
    avgRevenue = Math.round(totalRevenue / revenueData.length);
  }
  
  // Calculate performer info 
  let isTopPerformer = true;
  let performerCardClass = "bg-gradient-to-r from-blue-600 to-indigo-700";
  let performerIcon = <ChevronUp className="h-5 w-5 text-white" />;
  let performerTitle = "Top Performing Product";
  let performerBadgeClass = "bg-white/20";
  let performerProduct = revenueData.length > 0 ? revenueData[0] : null;
  
  
  const topPerformerMonths = [3, 5, 6, 12];
  const showTopPerformer = topPerformerMonths.includes(selectedMonth);
  
  
  //  lowest performer has less than 10% share
  if (!showTopPerformer && revenueData.length > 1 && revenueData[revenueData.length - 1].percentage < 10) {
    isTopPerformer = false;
    performerCardClass = "bg-gradient-to-r from-red-500 to-rose-600";
    performerIcon = <ChevronDown className="h-5 w-5 text-white" />;
    performerTitle = "Lowest Performing Product";
    performerProduct = revenueData[revenueData.length - 1];
  }

 
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="dashboard-container space-y-6 px-4 sm:px-6 max-w-[1400px] mx-auto">
 
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-blue-50/50 rounded-full filter blur-3xl -z-10 opacity-50"></div>
      
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md p-4 sm:p-6 border border-slate-100 fade-in card-shadow">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-semibold gradient-text">
              {getMonthName(selectedMonth)} {selectedYear} Revenue
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 flex items-center">
              <LineChart className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
              <span>Product-wise revenue distribution</span>
            </p>
          </div>
          
          <div className="flex justify-end">
            <PeriodFilter 
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              availablePeriods={availablePeriods}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 fade-in delay-100">
        <StatCard 
          icon={<DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />}
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          borderColor="blue"
        />
        
        <StatCard 
          icon={<Package className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />}
          title="Products"
          value={revenueData.length}
          borderColor="emerald"
          valueGradient="linear-gradient(to right, #059669, #10b981)"
        />
        
        <StatCard 
          icon={<BarChart2 className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />}
          title="Avg. Revenue"
          value={`$${avgRevenue.toLocaleString()}`}
          borderColor="purple"
          valueGradient="linear-gradient(to right, #7c3aed, #8b5cf6)"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
        <ChartCard 
          title="Revenue Distribution"
          icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
          iconColor="blue"
        >
          <div className="h-[250px] sm:h-[300px] md:h-[350px]">
            <RevenuePieChart data={revenueData} />
          </div>
        </ChartCard>

        <ChartCard
          title="Product Breakdown"
          icon={<TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />}
          iconColor="emerald"
        >
          <RevenueBreakdown data={revenueData} totalRevenue={totalRevenue} />
        </ChartCard>
      </div>

      {revenueData.length > 0 && performerProduct && (
        <div className={`${performerCardClass} rounded-xl shadow-lg p-5 sm:p-6 text-white fade-in delay-400 relative overflow-hidden`}>
         
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-70"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className="flex items-center">
                <div className="bg-white/20 p-1.5 rounded-lg mr-2">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <h4 className="text-xs sm:text-sm font-medium uppercase tracking-wider">{performerTitle}</h4>
              </div>
              <p className="text-lg sm:text-xl font-semibold mt-2">
                {performerProduct.product}
              </p>
              <div className="flex items-center mt-1.5">
                <Zap className="h-3.5 w-3.5 mr-1.5 text-white/70" />
                <p className="text-xs sm:text-sm text-blue-100">
                  Revenue: ${performerProduct.amount.toLocaleString()} 
                  <span className="ml-1.5 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {performerProduct.percentage}%
                  </span>
                </p>
              </div>
            </div>
            <div className={`${performerBadgeClass} backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-lg`}>
              {performerIcon}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;