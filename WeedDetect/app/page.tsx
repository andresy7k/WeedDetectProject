"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Leaf, Upload, LinkIcon, Search, Info, ArrowRight, Menu, X } from "lucide-react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-green-800 bg-black/90 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-500" />
            <span className="text-xl font-bold text-green-500">WeedDetect</span>
          </div>

          {/* Mobile menu button */}
          <button className="block md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-white hover:text-green-400 transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-sm font-medium text-white hover:text-green-400 transition-colors">
              About
            </Link>
            <Link href="#detection" className="text-sm font-medium text-white hover:text-green-400 transition-colors">
              Detection
            </Link>
            <Link href="#articles" className="text-sm font-medium text-white hover:text-green-400 transition-colors">
              Articles
            </Link>
            <Link href="#contact" className="text-sm font-medium text-white hover:text-green-400 transition-colors">
              Contact
            </Link>
            <Button
              variant="outline"
              className="ml-4 border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
            >
              Log in
            </Button>
            <Button className="bg-green-500 text-black hover:bg-green-600">Sign up</Button>
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
            <div className="flex flex-col space-y-3 p-4 bg-black border-b border-green-800">
              <Link
                href="#"
                className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#detection"
                className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Detection
              </Link>
              <Link
                href="#articles"
                className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium text-white hover:text-green-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                >
                  Log in
                </Button>
                <Button className="bg-green-500 text-black hover:bg-green-600">Sign up</Button>
              </div>
            </div>
          </motion.div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Background"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black"></div>
          </div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-green-500">
                    Identificación Inteligente de Malezas
                  </h1>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Nuestra tecnología de vanguardia utiliza inteligencia artificial para identificar y clasificar
                    malezas, ayudando a agricultores y jardineros a mantener sus cultivos saludables de manera
                    sostenible.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {!showOptions ? (
                    <Button
                      size="lg"
                      className="gap-1 bg-green-500 text-black hover:bg-green-600 group"
                      onClick={() => setShowOptions(true)}
                    >
                      Comenzar
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  ) : (
                    <motion.div
                      className="flex flex-col sm:flex-row gap-4"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button
                        size="lg"
                        className="gap-1 bg-green-500 text-black hover:bg-green-600"
                        onClick={() => (window.location.href = "#detection")}
                      >
                        Detectar Malezas
                        <Search className="h-4 w-4 ml-1" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="gap-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                        onClick={() => (window.location.href = "#articles")}
                      >
                        Información sobre Malezas
                        <Info className="h-4 w-4 ml-1" />
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Weed Detection"
                  className="rounded-lg object-cover border-2 border-green-500"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-green-900/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-lg bg-green-500 px-3 py-1 text-sm text-black">
                  Sobre el Proyecto
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-400">
                  Tecnología al Servicio de la Agricultura
                </h2>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  WeedDetect es una plataforma innovadora que combina visión por computadora e inteligencia artificial
                  para identificar y clasificar malezas con alta precisión, ayudando a reducir el uso de herbicidas y
                  promoviendo prácticas agrícolas más sostenibles.
                </p>
              </motion.div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {/* Feature 1 */}
              <motion.div
                className="flex flex-col items-center space-y-4 rounded-lg border border-green-800 bg-black/50 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="rounded-full bg-green-500/10 p-3">
                  <Search className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-400">Detección Precisa</h3>
                <p className="text-center text-gray-300">
                  Identifica más de 200 especies de malezas comunes con una precisión superior al 95%.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="flex flex-col items-center space-y-4 rounded-lg border border-green-800 bg-black/50 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="rounded-full bg-green-500/10 p-3">
                  <Info className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-400">Información Detallada</h3>
                <p className="text-center text-gray-300">
                  Accede a información completa sobre cada especie, incluyendo métodos de control y prevención.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="flex flex-col items-center space-y-4 rounded-lg border border-green-800 bg-black/50 p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="rounded-full bg-green-500/10 p-3">
                  <Upload className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-green-400">Fácil de Usar</h3>
                <p className="text-center text-gray-300">
                  Simplemente sube una imagen o proporciona una URL para obtener resultados instantáneos.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detection Section */}
        <section id="detection" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-lg bg-green-500 px-3 py-1 text-sm text-black">
                  Sistema de Detección
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-400">
                  Identifica Malezas al Instante
                </h2>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Nuestro sistema de inteligencia artificial puede identificar malezas a partir de imágenes. Sube una
                  foto o proporciona una URL para comenzar.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="mx-auto max-w-3xl mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-black border-green-800">
                <CardContent className="p-6">
                  <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-green-900/20">
                      <TabsTrigger
                        value="upload"
                        className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
                      >
                        Subir Imagen
                      </TabsTrigger>
                      <TabsTrigger
                        value="url"
                        className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
                      >
                        URL de Imagen
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="upload" className="mt-6">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed border-green-800 bg-green-900/10 p-4">
                          <div className="flex flex-col items-center space-y-2 text-center">
                            <Upload className="h-8 w-8 text-green-500" />
                            <p className="text-sm text-gray-300">
                              Arrastra y suelta una imagen aquí, o haz clic para seleccionar
                            </p>
                            <Button
                              variant="outline"
                              className="mt-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                            >
                              Seleccionar Archivo
                            </Button>
                          </div>
                        </div>
                        <Button className="w-full bg-green-500 text-black hover:bg-green-600">Iniciar Detección</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="url" className="mt-6">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                          <LinkIcon className="h-5 w-5 text-green-500" />
                          <input
                            type="text"
                            placeholder="Pega la URL de la imagen aquí"
                            className="flex-1 rounded-md border border-green-800 bg-black p-2 text-white placeholder:text-gray-500 focus:border-green-500 focus:outline-none"
                          />
                        </div>
                        <Button className="w-full bg-green-500 text-black hover:bg-green-600">Iniciar Detección</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Results Preview (Hidden by default) */}
              <div className="mt-8 hidden">
                <Card className="bg-black border-green-800">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <h3 className="text-xl font-bold text-green-400">Resultados</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Image
                            src="/placeholder.svg?height=300&width=300"
                            width={300}
                            height={300}
                            alt="Uploaded Image"
                            className="rounded-lg border border-green-800"
                          />
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h4 className="font-bold text-green-400">Especie Detectada:</h4>
                            <p className="text-white">Amaranthus retroflexus (Bledo)</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold text-green-400">Confianza:</h4>
                            <div className="h-2 w-full rounded-full bg-green-900/20">
                              <div className="h-2 rounded-full bg-green-500" style={{ width: "87%" }}></div>
                            </div>
                            <p className="text-right text-sm text-gray-300">87%</p>
                          </div>
                          <Button className="w-full bg-green-500 text-black hover:bg-green-600">
                            Ver Información Detallada
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Articles Section */}
        <section id="articles" className="w-full py-12 md:py-24 lg:py-32 bg-green-900/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block rounded-lg bg-green-500 px-3 py-1 text-sm text-black">
                  Artículos y Recursos
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-400">
                  Aprende sobre Malezas
                </h2>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Explora nuestra colección de artículos, guías y recursos sobre identificación y control de malezas.
                </p>
              </motion.div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
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
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                className="gap-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
              >
                Ver Todos los Artículos
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-400">
                  ¿Listo para Revolucionar tu Manejo de Malezas?
                </h2>
                <p className="max-w-[700px] text-gray-300 md:text-xl">
                  Únete a miles de agricultores y profesionales que ya están utilizando WeedDetect para identificar y
                  controlar malezas de manera más eficiente y sostenible.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-500 text-black hover:bg-green-600">
                  Registrarse Gratis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                >
                  Solicitar Demostración
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-green-800 bg-black py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf className="h-6 w-6 text-green-500" />
                <span className="text-xl font-bold text-green-500">WeedDetect</span>
              </div>
              <p className="text-sm text-gray-300">
                Tecnología avanzada para la identificación y control de malezas en la agricultura moderna.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-300 hover:text-green-500">
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
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-300 hover:text-green-500">
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
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-300 hover:text-green-500">
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
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-400">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    Integraciones
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-400">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    Documentación
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    Guías
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-green-400">Contacto</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    Soporte
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    Ventas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    Prensa
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-green-500">
                    Carreras
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-green-800 pt-8 text-center text-sm text-gray-300">
            <p>© {new Date().getFullYear()} WeedDetect. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

