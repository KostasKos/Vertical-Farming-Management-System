import { BarChart3, Cloud, Zap, Leaf, Sun, Droplet } from "lucide-react"
import Image from "next/image"

export default function Features() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
        Our Features
      </h1>
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <Image
            src="/feats.png"
            alt="Vertical Farming Technology"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl"
          />
        </div>
        <div className="space-y-6">
          <FeatureCard
            icon={<BarChart3 className="h-8 w-8 text-emerald-400" />}
            title="Real-time Monitoring"
            description="Track your crops' growth and health with advanced sensors and analytics. Get instant alerts and insights to optimize your farming operations."
          />
          <FeatureCard
            icon={<Cloud className="h-8 w-8 text-emerald-400" />}
            title="Cloud-based Management"
            description="Access your farm data and controls from anywhere, at any time. Our secure cloud platform ensures your data is always available and protected."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-emerald-400" />}
            title="Energy Optimization"
            description="Reduce costs with smart energy management and resource allocation. Our AI-driven system adjusts lighting and climate control for maximum efficiency."
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <FeatureCard
            icon={<Leaf className="h-8 w-8 text-emerald-400" />}
            title="Crop Health Analysis"
            description="Detect and prevent diseases early with our advanced image recognition technology. Ensure optimal plant health throughout the growth cycle."
          />
          <FeatureCard
            icon={<Sun className="h-8 w-8 text-emerald-400" />}
            title="Smart Lighting Control"
            description="Optimize plant growth with intelligent LED lighting systems. Adjust spectrum and intensity based on crop needs and growth stages."
          />
          <FeatureCard
            icon={<Droplet className="h-8 w-8 text-emerald-400" />}
            title="Precision Irrigation"
            description="Conserve water and nutrients with our precision irrigation system. Deliver the right amount of water and nutrients to each plant at the right time."
          />
        </div>
        <div className="order-1 md:order-2">
          <Image
            src="/feats1.jpg"
            alt="Smart Farming Solutions"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-emerald-400">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  )
}

