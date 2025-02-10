import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Leaf, BarChart3, Cloud, Zap, Menu } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white bg-dot-pattern">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-emerald-400" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
            AgriSense
          </span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="#features" className="hover:text-emerald-400 transition-colors">
            Features
          </Link>
          <Link href="#about" className="hover:text-emerald-400 transition-colors">
            About
          </Link>
          <Link href="#contact" className="hover:text-emerald-400 transition-colors">
            Contact
          </Link>
        </nav>
        <Button
          variant="outline"
          className="md:hidden border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
          Revolutionize Vertical Farming
        </h1>
        <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
          AgriSense provides cutting-edge management systems for efficient and sustainable vertical farming operations.
        </p>
        <Button className="bg-emerald-400 hover:bg-emerald-500 text-black text-lg px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
            Our Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-emerald-400" />}
              title="Real-time Monitoring"
              description="Track your crops' growth and health with advanced sensors and analytics."
            />
            <FeatureCard
              icon={<Cloud className="h-10 w-10 text-emerald-400" />}
              title="Cloud-based Management"
              description="Access your farm data and controls from anywhere, at any time."
            />
            <FeatureCard
              icon={<Zap className="h-10 w-10 text-emerald-400" />}
              title="Energy Optimization"
              description="Reduce costs with smart energy management and resource allocation."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black bg-opacity-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-600">
            About AgriSense
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center leading-relaxed">
            AgriSense is at the forefront of vertical farming technology. Our mission is to empower farmers with
            intelligent systems that maximize yield, minimize resource usage, and promote sustainable agriculture
            practices in urban environments.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-emerald-900 to-green-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Ready to Transform Your Vertical Farm?</h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join the future of agriculture. Contact us today for a personalized demo of our Vertical Farming Management
            System.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="max-w-xs bg-white text-black border-2 border-emerald-400 focus:border-emerald-500 rounded-full"
            />
            <Button className="bg-emerald-400 hover:bg-emerald-500 text-black px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 AgriSense. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-400/20">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-emerald-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

