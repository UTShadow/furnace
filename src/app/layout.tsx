import Navbar from '@/components/Navbar'
import { cn } from '@/lib/utils'
import { Arimo } from 'next/font/google'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/Toaster'
import '@/styles/globals.css'

export const metadata = {
  title: 'Furnace',
  description: 'The forum for all your hot takes',
 
}

const arimo = Arimo({subsets: ['latin']})

export default function RootLayout({
  children,
  authModal,
  
}: {
  children: React.ReactNode
  authModal: React.ReactNode
  
}) {
  return (
    <html
      lang='en'
      className={cn(
        'bg-white text-slate-900 antialiased light no-scrollbar',
        arimo.className
      )}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased '>
          <Providers>
          <Navbar />
          {authModal}
          <div className='container max-w-7xl mx-auto h-full pt-12'>
            {children}
          </div>
          </Providers>
        <Toaster />
      </body>
    </html>
  )
}