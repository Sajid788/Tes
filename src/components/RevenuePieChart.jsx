import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

function RevenuePieChart({ data }) {

  let colors = [
    'rgba(59, 130, 246, 0.85)',
    'rgba(16, 185, 129, 0.85)',
    'rgba(168, 85, 247, 0.85)',
    'rgba(14, 165, 233, 0.85)',
    'rgba(236, 72, 153, 0.85)',
    'rgba(34, 197, 94, 0.85)',
    'rgba(249, 115, 22, 0.85)',
    'rgba(139, 92, 246, 0.85)',
    'rgba(20, 184, 166, 0.85)',
    'rgba(244, 63, 94, 0.85)',
    'rgba(234, 179, 8, 0.85)',
    'rgba(8, 145, 178, 0.85)',
    'rgba(217, 70, 239, 0.85)',
  ]

  function getColors(count) {
    if (count <= colors.length) {
      return colors.slice(0, count)
    }

    let extraColors = []
    for (let i = 0; i < count - colors.length; i++) {
      let h = Math.floor(Math.random() * 360)
      let s = Math.floor(Math.random() * 30) + 70
      let l = Math.floor(Math.random() * 20) + 55
      extraColors.push(`hsla(${h}, ${s}%, ${l}%, 0.85)`)
    }

    return [...colors, ...extraColors]
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

  
  const processChartData = (rawData) => {
  
    if (rawData.length <= 10) {
      return rawData;
    }

   
    const sortedData = [...rawData].sort((a, b) => b.amount - a.amount);

  
    const topItems = sortedData.slice(0, 9);

    
    const otherItems = sortedData.slice(9);
    const othersTotal = otherItems.reduce((sum, item) => sum + item.amount, 0);

    if (othersTotal > 0) {
      return [
        ...topItems,
        {
          product: 'Others',
          amount: othersTotal,
          category: 'Multiple',
          description: `Combined ${otherItems.length} smaller items`
        }
      ];
    }

    return topItems;
  };

 
  const processedData = processChartData(data);

  let chartData = {
    labels: processedData.map(item => {
      const name = item.product;
      return window.innerWidth < 768 && name.length > 12 ? name.substring(0, 10) + '...' : name;
    }),
    datasets: [
      {
        data: processedData.map(item => item.amount),
        backgroundColor: getColors(processedData.length),
        borderColor: 'white',
        borderWidth: 3,
        hoverBorderWidth: 4,
        hoverOffset: 15,
        borderRadius: 5,
      },
    ],
  }

  let chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: window.innerWidth < 768 ? 10 : 15,
          font: {
            size: window.innerWidth < 768 ? 11 : 12,
            family: "'Inter', sans-serif",
            weight: '500'
          },
          usePointStyle: true,
          pointStyle: 'circle'
        },
       
        maxHeight: window.innerHeight * 0.15,
        maxWidth: window.innerWidth * 0.9,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1e293b',
        bodyColor: '#475569',
        titleFont: {
          size: window.innerWidth < 768 ? 12 : 14,
          family: "'Poppins', sans-serif",
          weight: '600'
        },
        bodyFont: {
          size: window.innerWidth < 768 ? 11 : 13,
          family: "'Inter', sans-serif"
        },
        padding: window.innerWidth < 768 ? 10 : 14,
        cornerRadius: 10,
        boxPadding: 5,
        borderColor: 'rgba(226, 232, 240, 1)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function (context) {
            let label = context.label || ''
            let value = context.raw || 0
            let total = context.chart.getDatasetMeta(0).total
            let percentage = Math.round((value / total) * 100)

            let formattedValue = formatCurrency(value)

            return `${label}: ${formattedValue} (${percentage}%)`
          },
          labelTextColor: function (context) {
            return context.dataIndex === 0 ? '#047857' : '#dc2626';
          },
          labelPointStyle: function (context) {
            return {
              pointStyle: context.dataIndex === 0 ? 'star' : 'circle',
              rotation: 0
            };
          }
        }
      }
    },
    cutout: '70%',  // Increased cutout for better visibility
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
      easing: 'easeOutQuart'
    },
    elements: {
      arc: {
        borderWidth: 3
      }
    }
  }

  if (data.length === 0) {
    return (
      <div className="h-[250px] sm:h-[300px] md:h-[350px] relative flex items-center justify-center">
        <div className="text-center text-slate-500">
          <div className="text-3xl sm:text-4xl mb-3 opacity-70">📊</div>
          <div className="text-sm sm:text-base">No revenue data available for this period</div>
        </div>
      </div>
    )
  }

 
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);
  const itemCount = data.length;

  return (
    <div className="h-[250px] sm:h-[300px] md:h-[350px] relative">
      <Pie data={chartData} options={chartOptions} />
      <div className="absolute sm:-top-10 -top-[30%] left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none z-10">
        <div className="text-center p-3 ">
          <div className="text-xs text-slate-400 uppercase tracking-wider">Total</div>
          <div className="text-normal sm:text-2xl font-semibold gradient-text">
            ${totalAmount.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {itemCount} products
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenuePieChart