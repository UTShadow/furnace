import '@/styles/globals.css'

export const metadata = {
  title: 'furnace',
  description: 'The forum for all your hot takes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}