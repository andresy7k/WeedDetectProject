"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, ArrowRight, Leaf, Calendar, Clock } from "lucide-react"

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)

  // Categorías de artículos
  const categories = [
    { id: "all", name: "Todos" },
    { id: "guides", name: "Guías" },
    { id: "techniques", name: "Técnicas" },
    { id: "research", name: "Investigación" },
    { id: "sustainability", name: "Sostenibilidad" },
  ]

  // Simulación de carga inicial
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

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

      <main className="flex-1 container px-4 md:px-6 py-12 relative z-10">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-500 hover:text-green-400 group">
            <motion.div whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-green-400" />
            </motion.div>
            <span>Volver al inicio</span>
          </Link>
        </div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.h1
              className="text-3xl font-bold tracking-tighter md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Artículos y Recursos
            </motion.h1>
            <motion.p
              className="text-gray-300 md:text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explora nuestra colección de artículos, guías y recursos sobre identificación y control de malezas.
            </motion.p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar artículos..."
                className="pl-10 bg-black/50 border-green-800/50 text-white placeholder:text-gray-400 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categorías */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-green-500 text-black"
                    : "bg-black/40 border border-green-800/30 text-gray-300 hover:bg-green-900/30"
                }`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {isLoading ? (
            // Esqueleto de carga
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-green-800/30 bg-black/40 overflow-hidden">
                  <div className="aspect-video w-full bg-green-900/20 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 w-24 bg-green-900/40 rounded animate-pulse"></div>
                    <div className="h-6 w-full bg-green-900/30 rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-green-900/20 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-green-900/20 rounded animate-pulse"></div>
                    <div className="flex justify-between pt-2">
                      <div className="h-3 w-16 bg-green-900/20 rounded animate-pulse"></div>
                      <div className="h-3 w-16 bg-green-900/30 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Artículo 1 */}
              <motion.div
                className="group relative overflow-hidden rounded-lg border border-green-800/30 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    width={300}
                    height={200}
                    alt="Article Image"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 relative z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                      Guía
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>15 Mar 2023</span>
                    </div>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-green-400 group-hover:text-green-300 transition-colors">
                    Las 10 Malezas Más Comunes en Cultivos
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                    Aprende a identificar las malezas más frecuentes que afectan a los cultivos y cómo controlarlas de
                    manera efectiva.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>5 min de lectura</span>
                    </div>
                    <Link
                      href="#"
                      className="text-sm font-medium text-green-500 hover:text-green-400 transition-colors group-hover:underline flex items-center"
                    >
                      Leer más
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 0.5 }}
                      >
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Artículo 2 */}
              <motion.div
                className="group relative overflow-hidden rounded-lg border border-green-800/30 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    width={300}
                    height={200}
                    alt="Article Image"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 relative z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                      Técnicas
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>2 Abr 2023</span>
                    </div>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-green-400 group-hover:text-green-300 transition-colors">
                    Control Biológico de Malezas
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                    Descubre métodos naturales y sostenibles para controlar malezas sin depender de productos químicos.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>8 min de lectura</span>
                    </div>
                    <Link
                      href="#"
                      className="text-sm font-medium text-green-500 hover:text-green-400 transition-colors group-hover:underline flex items-center"
                    >
                      Leer más
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 0.5 }}
                      >
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Artículo 3 */}
              <motion.div
                className="group relative overflow-hidden rounded-lg border border-green-800/30 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    width={300}
                    height={200}
                    alt="Article Image"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 relative z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                      Investigación
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>10 May 2023</span>
                    </div>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-green-400 group-hover:text-green-300 transition-colors">
                    Impacto de las Malezas en la Agricultura
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                    Análisis del impacto económico y ambiental de las malezas en diferentes sistemas agrícolas.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>12 min de lectura</span>
                    </div>
                    <Link
                      href="#"
                      className="text-sm font-medium text-green-500 hover:text-green-400 transition-colors group-hover:underline flex items-center"
                    >
                      Leer más
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 0.5 }}
                      >
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Artículo 4 */}
              <motion.div
                className="group relative overflow-hidden rounded-lg border border-green-800/30 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    width={300}
                    height={200}
                    alt="Article Image"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 relative z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                      Guía Práctica
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>22 Jun 2023</span>
                    </div>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-green-400 group-hover:text-green-300 transition-colors">
                    Identificación de Malezas por Etapas de Crecimiento
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                    Cómo reconocer diferentes especies de malezas en sus distintas etapas de desarrollo.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>10 min de lectura</span>
                    </div>
                    <Link
                      href="#"
                      className="text-sm font-medium text-green-500 hover:text-green-400 transition-colors group-hover:underline flex items-center"
                    >
                      Leer más
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 0.5 }}
                      >
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Artículo 5 */}
              <motion.div
                className="group relative overflow-hidden rounded-lg border border-green-800/30 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    width={300}
                    height={200}
                    alt="Article Image"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 relative z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                      Tecnología
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>8 Jul 2023</span>
                    </div>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-green-400 group-hover:text-green-300 transition-colors">
                    Innovaciones en el Control de Malezas
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                    Las últimas tecnologías y métodos para el manejo eficiente de malezas en la agricultura moderna.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>7 min de lectura</span>
                    </div>
                    <Link
                      href="#"
                      className="text-sm font-medium text-green-500 hover:text-green-400 transition-colors group-hover:underline flex items-center"
                    >
                      Leer más
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 0.5 }}
                      >
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Artículo 6 */}
              <motion.div
                className="group relative overflow-hidden rounded-lg border border-green-800/30 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    width={300}
                    height={200}
                    alt="Article Image"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 relative z-10">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                      Sostenibilidad
                    </div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>19 Ago 2023</span>
                    </div>
                  </div>
                  <h3 className="mt-1 text-lg font-bold text-green-400 group-hover:text-green-300 transition-colors">
                    Manejo Ecológico de Malezas
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                    Estrategias para controlar malezas respetando el medio ambiente y promoviendo la biodiversidad.
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>9 min de lectura</span>
                    </div>
                    <Link
                      href="#"
                      className="text-sm font-medium text-green-500 hover:text-green-400 transition-colors group-hover:underline flex items-center"
                    >
                      Leer más
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, repeatDelay: 0.5 }}
                      >
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="outline" className="relative overflow-hidden group border-green-500 text-green-500">
              <span className="relative z-10 flex items-center">
                Cargar más artículos
                <ArrowRight className="h-4 w-4 ml-1" />
              </span>
              <span className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="mt-16 bg-black/40 backdrop-blur-sm border border-green-800/30 rounded-lg p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-green-400 mb-2">Suscríbete a nuestro boletín</h3>
                  <p className="text-gray-300">
                    Recibe los últimos artículos y actualizaciones directamente en tu correo.
                  </p>
                </div>
                <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="bg-black/50 border-green-800/50 text-white placeholder:text-gray-500 focus:border-green-500"
                  />
                  <Button className="relative overflow-hidden group">
                    <span className="relative z-10">Suscribirse</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
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

