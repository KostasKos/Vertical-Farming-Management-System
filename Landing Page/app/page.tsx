import { Button } from "@/components/ui/button"
import { BarChart3, Cloud, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
            Revolutionize Vertical Farming
          </h1>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl">
            AgriSense provides cutting-edge management systems for efficient and sustainable vertical farming
            operations.
          </p>
          <Link href="/contact">
            <Button className="bg-emerald-400 hover:bg-emerald-500 text-black text-lg px-8 py-3 rounded-full transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/main.png"
            alt="Vertical Farming"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl"
          />
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
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
          <div className="text-center mt-12">
            <Link href="/features">
              <Button className="bg-transparent hover:bg-emerald-400 text-emerald-400 hover:text-black border border-emerald-400 px-8 py-3 rounded-full transition-all duration-300">
                Explore All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg transition-all duration-300 hover:bg-gray-800">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-emerald-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

