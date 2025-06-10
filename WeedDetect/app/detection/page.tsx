"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, LinkIcon, ArrowLeft } from "lucide-react"

export default function DetectionPage() {
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
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-green-400 mb-4">
              Sistema de Detección de Malezas
            </h1>
            <p className="text-gray-300 md:text-lg max-w-2xl mx-auto">
              Nuestro sistema de inteligencia artificial puede identificar malezas a partir de imágenes. Sube una foto o
              proporciona una URL para comenzar.
            </p>
          </div>

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
                  <TabsTrigger value="url" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                    URL de Imagen
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="mt-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="flex h-60 w-full items-center justify-center rounded-lg border-2 border-dashed border-green-800 bg-green-900/10 p-4">
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

          <div className="mt-12 text-center">
            <h2 className="text-xl font-bold text-green-400 mb-4">¿Cómo funciona?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <div className="rounded-full bg-green-500/10 p-3 mx-auto w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-green-500 font-bold">1</span>
                </div>
                <h3 className="font-bold text-white mb-2">Sube una imagen</h3>
                <p className="text-gray-300 text-sm">Sube una foto clara de la maleza que quieres identificar</p>
              </div>
              <div className="p-4">
                <div className="rounded-full bg-green-500/10 p-3 mx-auto w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-green-500 font-bold">2</span>
                </div>
                <h3 className="font-bold text-white mb-2">Análisis IA</h3>
                <p className="text-gray-300 text-sm">
                  Nuestro sistema analiza la imagen y la compara con nuestra base de datos
                </p>
              </div>
              <div className="p-4">
                <div className="rounded-full bg-green-500/10 p-3 mx-auto w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-green-500 font-bold">3</span>
                </div>
                <h3 className="font-bold text-white mb-2">Resultados detallados</h3>
                <p className="text-gray-300 text-sm">
                  Recibe información precisa sobre la especie y métodos de control
                </p>
              </div>
            </div>
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

