'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/login')
      return
    }
    
    setUser(JSON.parse(userData))
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (!user) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-900">Reverance Portal</h1>
          <div className="flex items-center gap-4">
            <span>Welcome, {user.name}</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">{user.role}</span>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded">
              Logout
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-gray-600">Role</p>
              <p className="text-2xl font-bold">{user.role}</p>
            </div>
            <div className="bg-green-50 p-4 rounded">
              <p className="text-gray-600">Email</p>
              <p className="text-2xl font-bold">{user.email}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded">
              <p className="text-gray-600">Status</p>
              <p className="text-2xl font-bold">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}