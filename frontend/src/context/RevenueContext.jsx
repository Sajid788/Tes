import { createContext, useContext, useReducer, useEffect } from 'react'
import apiClient from '../config/axiosConfig'

const RevenueContext = createContext()

const initialState = {
  revenueData: [],
  totalRevenue: 0,
  selectedMonth: 6,
  selectedYear: 2025,
  loading: false,
  error: null,
  availablePeriods: []
}

function revenueReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_REVENUE_DATA':
      return { 
        ...state, 
        revenueData: action.payload.revenue,
        totalRevenue: action.payload.totalRevenue,
        loading: false,
        error: null
      }
    case 'SET_SELECTED_PERIOD':
      return { 
        ...state, 
        selectedMonth: action.payload.month,
        selectedYear: action.payload.year
      }
    case 'SET_AVAILABLE_PERIODS':
      return { ...state, availablePeriods: action.payload }
    default:
      return state
  }
}

export function RevenueProvider({ children }) {
  const [state, dispatch] = useReducer(revenueReducer, initialState)

  async function fetchRevenueData(month, year) {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      
      const response = await apiClient.get(`/api/revenue/monthly/${month}/${year}`)
      
      dispatch({ 
        type: 'SET_REVENUE_DATA', 
        payload: response.data.data 
      })
    } catch (error) {
      console.log('Error fetching revenue data:', error)
      
      let errorMessage = 'Failed to fetch revenue data'
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error
      }
      
      dispatch({ 
        type: 'SET_ERROR', 
        payload: errorMessage
      })
    }
  }

  async function fetchAvailablePeriods() {
    try {
      const response = await apiClient.get('/api/revenue/available-periods')
      
      dispatch({ 
        type: 'SET_AVAILABLE_PERIODS', 
        payload: response.data.data 
      })
    } catch (error) {
      console.log('Failed to fetch available periods:', error)
    }
  }

  function setSelectedPeriod(month, year) {
    dispatch({ 
      type: 'SET_SELECTED_PERIOD', 
      payload: { month, year } 
    })
  }

  useEffect(() => {
    fetchAvailablePeriods()
  }, [])

  useEffect(() => {
    fetchRevenueData(state.selectedMonth, state.selectedYear)
  }, [state.selectedMonth, state.selectedYear])

  return (
    <RevenueContext.Provider value={{
      revenueData: state.revenueData,
      totalRevenue: state.totalRevenue,
      selectedMonth: state.selectedMonth,
      selectedYear: state.selectedYear,
      loading: state.loading,
      error: state.error,
      availablePeriods: state.availablePeriods,
      fetchRevenueData,
      setSelectedPeriod,
      fetchAvailablePeriods
    }}>
      {children}
    </RevenueContext.Provider>
  )
}

export function useRevenue() {
  const context = useContext(RevenueContext)
  if (!context) {
    throw new Error('useRevenue must be used within a RevenueProvider')
  }
  return context
} 