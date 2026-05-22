'use client'
import Link from 'next/link'
import { Music, Users, BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">REVERENCE</h1>
          <p className="text-xl md:text-2xl mb-6">WORSHIP TEAM</p>
          <p className="text-lg mb-8">Hebrews 12:28</p>
          <div className="space-x-4">
            <Link href="/login">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                Join Us
              </button>
            </Link>
            <Link href="/about">
              <button className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur z-50 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">REVERENCE</h2>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">About Us</a>
            <a href="#" className="hover:text-gray-300">Music</a>
            <a href="#" className="hover:text-gray-300">Pictures</a>
            <a href="#" className="hover:text-gray-300">Events</a>
            <Link href="/login" className="hover:text-gray-300">Join Us</Link>
          </div>
          <button className="md:hidden">☰</button>
        </div>
      </nav>

      {/* The Vision Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">THE VISION</h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-300">
            To create a community of worshippers who glorify God through excellence in music, 
            authentic relationships, and transformative worship experiences.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">THE EXPERIENCE</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/5 rounded-lg">
              <Music className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-2">Music Ministry</h3>
              <p className="text-gray-400">Led by the Spirit, driven by excellence</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-lg">
              <Users className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-400">Growing together in faith and fellowship</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-lg">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-xl font-bold mb-2">Discipleship</h3>
              <p className="text-gray-400">Rooted in the Word, walking in purpose</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500">
        <p>© 2025 Reverance Worship Team. All rights reserved.</p>
      </footer>
    </div>
  )
}