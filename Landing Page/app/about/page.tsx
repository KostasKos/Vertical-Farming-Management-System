import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
        About AgriSense
      </h1>
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <Image
            src="/about.png"
            alt="AgriSense Team"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl"
          />
        </div>
        <div className="space-y-6 text-gray-300">
          <p>
            AgriSense is at the forefront of vertical farming technology. Founded in 2024, our mission is to empower
            farmers with intelligent systems that maximize yield, minimize resource usage, and promote sustainable
            agriculture practices in urban environments.
          </p>
          <p>
            Our team of agricultural experts, data scientists, and software engineers work together to create
            cutting-edge solutions for the challenges faced by modern vertical farms. We believe that by combining
            advanced technology with traditional farming knowledge, we can revolutionize food production and contribute
            to a more sustainable future.
          </p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto space-y-6 text-gray-300">
        <p>At AgriSense, we're committed to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Developing innovative, user-friendly farming management systems</li>
          <li>Reducing the environmental impact of agriculture</li>
          <li>Improving food security in urban areas</li>
          <li>Supporting farmers in their transition to vertical farming</li>
        </ul>
        <p>
          Join us in our mission to transform agriculture and create a greener, more efficient future for food
          production.
        </p>
        <div className="text-center mt-12">
          <Link href="/contact">
            <Button className="bg-emerald-400 hover:bg-emerald-500 text-black px-8 py-3 rounded-full transition-all duration-300">
              Get in Touch
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

