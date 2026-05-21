'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Reverance Worship Team</h1>
          <p className="text-xl mb-8">Comprehensive platform for choir management</p>
          
          <div className="space-x-4">
            <Link href="/login">
              <button className="bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-900">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}