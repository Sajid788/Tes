import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import { RevenueProvider } from './context/RevenueContext'


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Dashboard />
        </main>
      </div>
    ),
  }
]);

function App() {
  return (
    <RevenueProvider>
      <RouterProvider router={router} />
    </RevenueProvider>
  )
}

export default App 