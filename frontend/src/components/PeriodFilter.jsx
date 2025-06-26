import { useState, useEffect, useRef } from 'react'
import { useRevenue } from '../context/RevenueContext'
import { Calendar, ChevronDown, Check, Clock } from 'lucide-react'
import ReactDOM from 'react-dom'

function PeriodFilter({ selectedMonth, selectedYear, availablePeriods }) {
  const { setSelectedPeriod } = useRevenue()
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)
  const portalRef = useRef(null)

  useEffect(() => {
    if (!document.getElementById('dropdown-portal')) {
      const portalContainer = document.createElement('div')
      portalContainer.id = 'dropdown-portal'
      portalContainer.style.position = 'fixed'
      portalContainer.style.top = '0'
      portalContainer.style.left = '0'
      portalContainer.style.width = '100%'
      portalContainer.style.height = '100%'
      portalContainer.style.pointerEvents = 'none'
      portalContainer.style.zIndex = '999999'
      document.body.appendChild(portalContainer)
    }

    portalRef.current = document.getElementById('dropdown-portal')

    return () => {
      if (!document.querySelector('.period-filter-dropdown')) {
        const portal = document.getElementById('dropdown-portal')
        if (portal) portal.remove()
      }
    }
  }, [])

  const toggleDropdown = () => {
    if (isOpen) {
      setIsAnimating(true)
      setTimeout(() => {
        setIsOpen(false)
        setIsAnimating(false)
      }, 200)
    } else {
      setIsOpen(true)
      setTimeout(updateDropdownPosition, 10)
    }
  }

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const windowWidth = window.innerWidth

      let leftPosition = Math.min(
        rect.right - 240,
        windowWidth - 250
      )

      if (windowWidth < 500) {
        leftPosition = Math.max(10, (windowWidth - 240) / 2)
      }

      setDropdownPosition({
        top: rect.bottom + 5,
        left: Math.max(10, leftPosition),
      })
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        updateDropdownPosition()
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleResize)
    }
  }, [isOpen])

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isOpen &&
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        toggleDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  function handlePeriodChange(month, year) {
    setSelectedPeriod(month, year)
    toggleDropdown()
  }

  function getMonthName(month) {
    let months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return months[month - 1]
  }

  const renderDropdown = () => {
    if (!isOpen || !portalRef.current) return null

    return ReactDOM.createPortal(
      <>
        <div
          className="dropdown-overlay"
          onClick={toggleDropdown}
          style={{ pointerEvents: 'auto' }}
        ></div>
        <div
          ref={dropdownRef}
          className={`fixed w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto border border-slate-200 ${isAnimating ? 'dropdown-fade-out' : 'dropdown-fade-in'}`}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            pointerEvents: 'auto',
            zIndex: 999999,
          }}
        >
          <div className="py-1">
            <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200 rounded-t-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Select Period
                </h3>
                <Clock className="h-3.5 w-3.5 text-blue-500" />
              </div>
            </div>
            {availablePeriods.length > 0 ? (
              <div className="py-1.5">
                {availablePeriods.map((period) => {
                  let isSelected = period.month === selectedMonth && period.year === selectedYear
                  let buttonClass = "block w-full text-left px-4 py-2.5 text-sm transition-colors "
                  buttonClass += isSelected
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-50'

                  return (
                    <button
                      key={period.month + "-" + period.year}
                      onClick={() => handlePeriodChange(period.month, period.year)}
                      className={buttonClass}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-1.5 rounded-md mr-2.5 ${isSelected ? 'bg-blue-100' : 'bg-slate-100'}`}>
                            <Calendar className={`h-3.5 w-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                          </div>
                          <span className={isSelected ? 'font-medium' : ''}>{period.label || `${getMonthName(period.month)} ${period.year}`}</span>
                        </div>
                        {isSelected && (
                          <div className="bg-blue-100 p-1 rounded-full">
                            <Check className="h-3.5 w-3.5 text-blue-600" />
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-slate-500 text-center">No periods available</div>
            )}
          </div>
        </div>
      </>,
      portalRef.current
    )
  }

  return (
    <div className="period-filter-dropdown relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg"
      >
        <div className="bg-white/20 p-1.5 rounded-md">
          <Calendar className="h-3.5 w-3.5 text-blue-100" />
        </div>
        <span className="hidden sm:inline">{getMonthName(selectedMonth)} {selectedYear}</span>
        <span className="sm:hidden">{selectedMonth}/{selectedYear}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-blue-200 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {renderDropdown()}
    </div>
  )
}

export default PeriodFilter 