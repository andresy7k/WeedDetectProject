"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Leaf, Menu, X, ChevronRight } from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-green-950">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-green-800/30 bg-black/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-500" />
              <span className="text-xl font-bold text-green-500">WeedDetect</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="block md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/detection" className="text-sm font-medium text-white hover:text-green-400 transition-colors">
              Detección
            </Link>
            <Link href="/articles" className="text-sm font-medium text-white hover:text-green-400 transition-colors">
              Artículos
            </Link>
            <Link href="/about" className="text-sm font-medium text-white hover:text-green-400 transition-colors">
              Nosotros
            </Link>
            <Link href="/contact" className="text-sm font-medium text-white hover:text-green-400 transition-colors">
              Contacto
            </Link>
            <Button
              variant="outline"
              className="ml-4 border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
            >
              Iniciar sesión
            </Button>
            <Button className="bg-green-500 text-black hover:bg-green-600">Registrarse</Button>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-3 p-4 bg-black border-b border-green-800/30">
              <Link
                href="/detection"
                className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Detección
              </Link>
              <Link
                href="/articles"
                className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Artículos
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                >
                  Iniciar sesión
                </Button>
                <Button className="bg-green-500 text-black hover:bg-green-600">Registrarse</Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6 text-center">
            <motion.div
              className="mx-auto max-w-3xl space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                La plataforma de
                <span className="block text-green-500">identificación de malezas</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Más de 1,000 agricultores y 200 empresas utilizan WeedDetect para identificar y controlar malezas de
                forma eficiente
              </p>
            </motion.div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mx-auto max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="¿Qué maleza quieres identificar?"
                    className="pl-10 bg-black/50 border-green-800/50 text-white placeholder:text-gray-400 focus:border-green-500"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {!showOptions ? (
                <Button
                  size="lg"
                  className="bg-green-500 text-black hover:bg-green-600 group relative overflow-hidden"
                  onClick={() => setShowOptions(true)}
                >
                  <span className="relative z-10 flex items-center">
                    Comenzar
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    >
                      <ChevronRight className="h-5 w-5 ml-1" />
                    </motion.div>
                  </span>
                  <span className="absolute inset-0 bg-green-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Button>
              ) : (
                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href="/detection">
                    <Button size="lg" className="bg-green-500 text-black hover:bg-green-600 w-full sm:w-auto">
                      Detectar malezas
                    </Button>
                  </Link>
                  <Link href="/articles">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black w-full sm:w-auto"
                    >
                      Explorar artículos
                    </Button>
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 bg-black/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Feature 1 */}
              <motion.div
                className="flex flex-col items-center text-center p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="rounded-full bg-green-500/10 p-3">
                  <Search className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-400">Identificación Precisa</h3>
                <p className="text-gray-300">
                  Nuestra IA identifica más de 200 especies de malezas con una precisión superior al 95%.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="flex flex-col items-center text-center p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="rounded-full bg-green-500/10 p-3">
                  <Leaf className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-400">Base de Datos Completa</h3>
                <p className="text-gray-300">
                  Accede a información detallada sobre cada especie, métodos de control y prevención.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="flex flex-col items-center text-center p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="rounded-full bg-green-500/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-green-500"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-400">Control Sostenible</h3>
                <p className="text-gray-300">
                  Recomendaciones personalizadas para el control de malezas respetando el medio ambiente.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              className="mx-auto max-w-3xl text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-400">
                Comienza gratis hoy mismo
              </h2>
              <p className="text-gray-300 md:text-xl">O adquiere WeedDetect para tu empresa</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" className="bg-green-500 text-black hover:bg-green-600 w-full sm:w-auto">
                  Registrarse gratis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black w-full sm:w-auto"
                >
                  Planes para empresas
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-green-800/30 bg-black py-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-500" />
                <span className="text-lg font-bold text-green-500">WeedDetect</span>
              </Link>
              <p className="text-sm text-gray-400">Tecnología avanzada para la identificación y control de malezas.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-400">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/detection" className="text-gray-400 hover:text-green-500">
                    Detección
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="text-gray-400 hover:text-green-500">
                    Artículos
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-green-500">
                    Precios
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-400">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-green-500">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-green-500">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-green-500">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-400">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-green-500">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-green-500">
                    Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-green-800/30 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} WeedDetect. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

