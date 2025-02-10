"use client"

import { Button } from "@/components/ui/button"
import { Leaf, Menu, X } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useState, useEffect } from "react"

export function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close menu when resizing to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-50">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-emerald-400" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
            AgriSense
          </span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/features" className="hover:text-emerald-400 transition-colors">
            Features
          </Link>
          <Link href="/about" className="hover:text-emerald-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors">
            Contact
          </Link>
        </nav>
        <Button
          variant="outline"
          className="md:hidden border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 bottom-0 w-64 bg-gray-900 p-6 transition-transform duration-300 ease-in-out transform ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <nav className="flex flex-col space-y-4 mt-8">
          <Link
              href="/features"
              className="text-lg hover:text-emerald-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
            </Link>
            <Link
              href="/features"
              className="text-lg hover:text-emerald-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/about"
              className="text-lg hover:text-emerald-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-lg hover:text-emerald-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

      <main>{children}</main>
      <footer className="py-8 mt-20 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 AgriSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

