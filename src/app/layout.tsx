import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Arimo } from "next/font/google"

export const metadata = {
  title: 'furnace',
  description: 'The forum for all your hot takes',
}

const arimo = Arimo({subsets: ['latin']})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={cn(
        'bg-white text-slate-900 antialiased light',
        arimo.className
      )}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>{children}</body>
    </html>
  )
}