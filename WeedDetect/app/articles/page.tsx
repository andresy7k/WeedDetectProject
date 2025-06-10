"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, ArrowRight } from "lucide-react"

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-green-950">
      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-500 hover:text-green-400">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-400 mb-4">
              Artículos y Recursos
            </h1>
            <p className="text-gray-300 md:text-lg max-w-2xl mx-auto">
              Explora nuestra colección de artículos, guías y recursos sobre identificación y control de malezas.
            </p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Article 1 */}
            <motion.div
              className="group relative overflow-hidden rounded-lg border border-green-800 bg-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Article Image"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">Guía</div>
                <h3 className="mt-2 text-lg font-bold text-green-400">Las 10 Malezas Más Comunes en Cultivos</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                  Aprende a identificar las malezas más frecuentes que afectan a los cultivos y cómo controlarlas de
                  manera efectiva.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">5 min de lectura</span>
                  <Link href="#" className="text-sm font-medium text-green-500 hover:underline">
                    Leer más
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Article 2 */}
            <motion.div
              className="group relative overflow-hidden rounded-lg border border-green-800 bg-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Article Image"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                  Técnicas
                </div>
                <h3 className="mt-2 text-lg font-bold text-green-400">Control Biológico de Malezas</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                  Descubre métodos naturales y sostenibles para controlar malezas sin depender de productos químicos.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">8 min de lectura</span>
                  <Link href="#" className="text-sm font-medium text-green-500 hover:underline">
                    Leer más
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Article 3 */}
            <motion.div
              className="group relative overflow-hidden rounded-lg border border-green-800 bg-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Article Image"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                  Investigación
                </div>
                <h3 className="mt-2 text-lg font-bold text-green-400">Impacto de las Malezas en la Agricultura</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                  Análisis del impacto económico y ambiental de las malezas en diferentes sistemas agrícolas.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">12 min de lectura</span>
                  <Link href="#" className="text-sm font-medium text-green-500 hover:underline">
                    Leer más
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Article 4 */}
            <motion.div
              className="group relative overflow-hidden rounded-lg border border-green-800 bg-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Article Image"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                  Guía Práctica
                </div>
                <h3 className="mt-2 text-lg font-bold text-green-400">
                  Identificación de Malezas por Etapas de Crecimiento
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                  Cómo reconocer diferentes especies de malezas en sus distintas etapas de desarrollo.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">10 min de lectura</span>
                  <Link href="#" className="text-sm font-medium text-green-500 hover:underline">
                    Leer más
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Article 5 */}
            <motion.div
              className="group relative overflow-hidden rounded-lg border border-green-800 bg-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Article Image"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                  Tecnología
                </div>
                <h3 className="mt-2 text-lg font-bold text-green-400">Innovaciones en el Control de Malezas</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                  Las últimas tecnologías y métodos para el manejo eficiente de malezas en la agricultura moderna.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">7 min de lectura</span>
                  <Link href="#" className="text-sm font-medium text-green-500 hover:underline">
                    Leer más
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Article 6 */}
            <motion.div
              className="group relative overflow-hidden rounded-lg border border-green-800 bg-black"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="aspect-video w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  width={300}
                  height={200}
                  alt="Article Image"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                  Sostenibilidad
                </div>
                <h3 className="mt-2 text-lg font-bold text-green-400">Manejo Ecológico de Malezas</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-300">
                  Estrategias para controlar malezas respetando el medio ambiente y promoviendo la biodiversidad.
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-400">9 min de lectura</span>
                  <Link href="#" className="text-sm font-medium text-green-500 hover:underline">
                    Leer más
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 flex justify-center">
            <Button
              variant="outline"
              className="gap-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
            >
              Cargar más artículos
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-green-800/30 bg-black py-8">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="WeedDetect Logo" width={24} height={24} />
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

