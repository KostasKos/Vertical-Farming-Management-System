import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
        Contact Us
      </h1>
      <div className="max-w-md mx-auto">
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              className="w-full bg-gray-900 text-white border-gray-700 focus:border-emerald-400 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="w-full bg-gray-900 text-white border-gray-700 focus:border-emerald-400 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Message
            </label>
            <Textarea
              id="message"
              placeholder="Your message here..."
              className="w-full bg-gray-900 text-white border-gray-700 focus:border-emerald-400 rounded-md"
              rows={4}
            />
          </div>
          <Button className="w-full bg-emerald-400 hover:bg-emerald-500 text-black py-3 rounded-full transition-all duration-300">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  )
}

