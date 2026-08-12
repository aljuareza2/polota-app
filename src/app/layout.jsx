import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata = {
  title: 'Polota.ar - Fútbol, Apuestas & IA',
  description: 'El Promiedos 2.0 con IA predictiva, comparador de cuotas y valor esperado (+EV).',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-bg-dark text-text-main`}>
        {children}
      </body>
    </html>
  )
}
