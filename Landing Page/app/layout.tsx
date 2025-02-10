import "./globals.css"
import { ClientLayout } from "./client-layout"
import type React from "react" // Added import for React

export { metadata } from "./layout-metadata"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

