"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Leaf, Menu, X, ChevronRight, Search, Info } from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [count, setCount] = useState(0)

  // Efecto para el contador de plantas identificadas
  useEffect(() => {
    const interval = setInterval(() => {
      if (count < 10000) {
        setCount((prev) => prev + Math.floor(Math.random() * 10) + 1)
      } else {
        clearInterval(interval)
      }
    }, 20)

    return () => clearInterval(interval)
  }, [count])

  // Seguimiento de la posición del mouse para efectos interactivos
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-green-950 relative overflow-hidden">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-green-500/30"
            initial={{
              x: Math.random() * 100 + "%",
              y: -10,
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: "120vh",
              x: `calc(${Math.random() * 100}% + ${Math.sin(i) * 50}px)`,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Efecto de seguimiento del cursor */}
      <motion.div
        className="hidden md:block fixed w-40 h-40 rounded-full bg-green-500/10 pointer-events-none z-0"
        animate={{
          x: mousePosition.x - 80,
          y: mousePosition.y - 80,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
          mass: 0.5,
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-green-800/30 bg-black/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                <Leaf className="h-6 w-6 text-green-500 transition-transform group-hover:scale-110" />
              </motion.div>
              <span className="text-xl font-bold text-green-500 group-hover:text-green-400 transition-colors">
                WeedDetect
              </span>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            className="block md:hidden text-white"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/detection"
              className="text-sm font-medium text-white hover:text-green-400 transition-colors relative group"
            >
              Detección
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/articles"
              className="text-sm font-medium text-white hover:text-green-400 transition-colors relative group"
            >
              Artículos
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-white hover:text-green-400 transition-colors relative group"
            >
              Nosotros
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-white hover:text-green-400 transition-colors relative group"
            >
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-green-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/login">
              <Button className="ml-4 relative overflow-hidden group">
                <span className="relative z-10 flex items-center">Acceder / Registrarse</span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </Link>
          </nav>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
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
                <div className="pt-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-400 hover:from-green-500 hover:to-green-300">
                      Acceder / Registrarse
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
          <div className="container px-4 md:px-6 text-center relative z-10">
            <motion.div
              className="mx-auto max-w-3xl space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                La plataforma de
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                  identificación de malezas
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                Más de 1,000 agricultores y 200 empresas utilizan WeedDetect para identificar y controlar malezas de
                forma eficiente
              </p>
            </motion.div>

            {/* Visualización interactiva en lugar del input */}
            <motion.div
              className="mt-12 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mx-auto max-w-3xl bg-black/40 backdrop-blur-sm border border-green-800/30 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent"></div>
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-left">
                      <h3 className="text-2xl font-bold text-green-400 mb-2">Inteligencia Artificial Avanzada</h3>
                      <p className="text-gray-300">Nuestra tecnología ha identificado ya</p>
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mt-2">
                        {count.toLocaleString()}+ especies
                      </div>
                      <p className="text-gray-400 mt-2 text-sm">Con una precisión superior al 95%</p>
                    </div>
                    <div className="relative w-40 h-40 md:w-48 md:h-48">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-green-300/20 animate-pulse"></div>
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <div className="w-full h-full rounded-full border-2 border-dashed border-green-500/50"></div>
                      </motion.div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Leaf className="h-16 w-16 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AnimatePresence>
                {!showOptions ? (
                  <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} key="start-button">
                    <Button size="lg" className="relative overflow-hidden group" onClick={() => setShowOptions(true)}>
                      <span className="relative z-10 flex items-center">
                        Comenzar
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                        >
                          <ChevronRight className="h-5 w-5 ml-1" />
                        </motion.div>
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    key="option-buttons"
                  >
                    <Link href="/detection">
                      <Button size="lg" className="relative overflow-hidden group w-full sm:w-auto">
                        <span className="relative z-10 flex items-center">
                          Detectar malezas
                          <Search className="h-4 w-4 ml-2" />
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </Link>
                    <Link href="/articles">
                      <Button
                        size="lg"
                        variant="outline"
                        className="relative overflow-hidden group border-green-500 text-green-500 w-full sm:w-auto"
                      >
                        <span className="relative z-10 flex items-center">
                          Explorar artículos
                          <Info className="h-4 w-4 ml-2" />
                        </span>
                        <span className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 bg-black/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.1),transparent_60%)]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Feature 1 */}
              <motion.div
                className="flex flex-col items-center text-center p-6 space-y-4 bg-black/40 backdrop-blur-sm border border-green-800/30 rounded-lg relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="rounded-full bg-green-500/10 p-3 group-hover:bg-green-500/20 transition-colors duration-300">
                    <Search className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-green-400">Identificación Precisa</h3>
                  <p className="text-gray-300">
                    Nuestra IA identifica más de 200 especies de malezas con una precisión superior al 95%.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="flex flex-col items-center text-center p-6 space-y-4 bg-black/40 backdrop-blur-sm border border-green-800/30 rounded-lg relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="rounded-full bg-green-500/10 p-3 group-hover:bg-green-500/20 transition-colors duration-300">
                    <Leaf className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-green-400">Base de Datos Completa</h3>
                  <p className="text-gray-300">
                    Accede a información detallada sobre cada especie, métodos de control y prevención.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="flex flex-col items-center text-center p-6 space-y-4 bg-black/40 backdrop-blur-sm border border-green-800/30 rounded-lg relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="rounded-full bg-green-500/10 p-3 group-hover:bg-green-500/20 transition-colors duration-300">
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
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.1),transparent_60%)]"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <motion.div
              className="mx-auto max-w-3xl text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                Comienza gratis hoy mismo
              </h2>
              <p className="text-gray-300 md:text-xl">O adquiere WeedDetect para tu empresa</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/login">
                  <Button size="lg" className="relative overflow-hidden group w-full sm:w-auto">
                    <span className="relative z-10">Registrarse gratis</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="relative overflow-hidden group border-green-500 text-green-500 w-full sm:w-auto"
                  >
                    <span className="relative z-10">Planes para empresas</span>
                    <span className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-green-800/30 bg-black py-8 relative z-10">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2 group">
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                  <Leaf className="h-5 w-5 text-green-500 transition-transform group-hover:scale-110" />
                </motion.div>
                <span className="text-lg font-bold text-green-500 group-hover:text-green-400 transition-colors">
                  WeedDetect
                </span>
              </Link>
              <p className="text-sm text-gray-400">Tecnología avanzada para la identificación y control de malezas.</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-400">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/detection" className="text-gray-400 hover:text-green-500 transition-colors">
                    Detección
                  </Link>
                </li>
                <li>
                  <Link href="/articles" className="text-gray-400 hover:text-green-500 transition-colors">
                    Artículos
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-green-500 transition-colors">
                    Precios
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-400">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-green-500 transition-colors">
                    Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-green-500 transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-green-500 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-400">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-green-500 transition-colors">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-green-500 transition-colors">
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

