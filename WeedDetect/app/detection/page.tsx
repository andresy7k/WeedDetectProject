"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, LinkIcon, ArrowLeft, Leaf, Check, XIcon, Info, AlertTriangle } from "lucide-react"

export default function DetectionPage() {
  const [selectedTab, setSelectedTab] = useState("upload")
  const [dragActive, setDragActive] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [urlInput, setUrlInput] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Seguimiento de la posición del mouse para efectos interactivos
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleUrlSubmit = () => {
    if (urlInput) {
      setImageUrl(urlInput)
    }
  }

  const startAnalysis = () => {
    if (imageUrl) {
      setIsAnalyzing(true)
      // Simulación de análisis
      setTimeout(() => {
        setIsAnalyzing(false)
        setShowResults(true)
      }, 3000)
    }
  }

  const resetDetection = () => {
    setImageUrl("")
    setUrlInput("")
    setShowResults(false)
  }

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
          className="max-w-3xl mx-auto"
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
              Sistema de Detección de Malezas
            </motion.h1>
            <motion.p
              className="text-gray-300 md:text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Nuestro sistema de inteligencia artificial puede identificar malezas a partir de imágenes. Sube una foto o
              proporciona una URL para comenzar.
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="detection-input"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-black/40 backdrop-blur-sm border border-green-800/30 overflow-hidden">
                  <CardContent className="p-6">
                    <Tabs defaultValue="upload" className="w-full" value={selectedTab} onValueChange={setSelectedTab}>
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
                          <div
                            className={`flex h-60 w-full items-center justify-center rounded-lg border-2 border-dashed ${dragActive ? "border-green-500 bg-green-500/10" : "border-green-800 bg-green-900/10"} p-4 transition-colors duration-300 relative overflow-hidden`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                          >
                            {imageUrl ? (
                              <div className="relative w-full h-full">
                                <Image
                                  src={imageUrl || "/placeholder.svg"}
                                  alt="Uploaded Image"
                                  fill
                                  className="object-contain"
                                />
                                <button
                                  className="absolute top-2 right-2 bg-black/70 rounded-full p-1 hover:bg-black transition-colors"
                                  onClick={resetDetection}
                                >
                                  <XIcon className="h-4 w-4 text-white" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center space-y-2 text-center">
                                <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                                  <Upload className="h-8 w-8 text-green-500" />
                                </motion.div>
                                <p className="text-sm text-gray-300">
                                  Arrastra y suelta una imagen aquí, o haz clic para seleccionar
                                </p>
                                <Button
                                  variant="outline"
                                  className="mt-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black relative overflow-hidden group"
                                  onClick={handleButtonClick}
                                >
                                  <span className="relative z-10">Seleccionar Archivo</span>
                                  <span className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                </Button>
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleFileChange}
                                />
                              </div>
                            )}
                          </div>
                          <Button
                            className="w-full relative overflow-hidden group"
                            onClick={startAnalysis}
                            disabled={!imageUrl || isAnalyzing}
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              {isAnalyzing ? (
                                <>
                                  <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Analizando imagen...
                                </>
                              ) : (
                                "Iniciar Detección"
                              )}
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          </Button>
                        </div>
                      </TabsContent>
                      <TabsContent value="url" className="mt-6">
                        <div className="flex flex-col space-y-4">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                              <LinkIcon className="h-5 w-5 text-green-500" />
                              <input
                                type="text"
                                placeholder="Pega la URL de la imagen aquí"
                                className="flex-1 rounded-md border border-green-800 bg-black p-2 text-white placeholder:text-gray-500 focus:border-green-500 focus:outline-none"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                              />
                            </div>

                            {imageUrl && selectedTab === "url" && (
                              <div className="relative w-full h-40 mt-4">
                                <Image
                                  src={imageUrl || "/placeholder.svg"}
                                  alt="URL Image"
                                  fill
                                  className="object-contain rounded-lg"
                                />
                                <button
                                  className="absolute top-2 right-2 bg-black/70 rounded-full p-1 hover:bg-black transition-colors"
                                  onClick={resetDetection}
                                >
                                  <XIcon className="h-4 w-4 text-white" />
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              className="flex-1 relative overflow-hidden group"
                              onClick={handleUrlSubmit}
                              disabled={!urlInput || isAnalyzing}
                            >
                              <span className="relative z-10">Cargar URL</span>
                              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </Button>
                            <Button
                              className="flex-1 relative overflow-hidden group"
                              onClick={startAnalysis}
                              disabled={!imageUrl || isAnalyzing}
                            >
                              <span className="relative z-10 flex items-center justify-center">
                                {isAnalyzing ? (
                                  <>
                                    <svg
                                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Analizando...
                                  </>
                                ) : (
                                  "Detectar"
                                )}
                              </span>
                              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="detection-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-black/40 backdrop-blur-sm border border-green-800/30 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-green-400">Resultados del Análisis</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                          onClick={resetDetection}
                        >
                          Nueva Detección
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative">
                          <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-green-800">
                            <Image
                              src={imageUrl || "/placeholder.svg"}
                              alt="Analyzed Image"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 border-4 border-green-500/50 rounded-lg"></div>
                            <div className="absolute top-2 right-2 bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                              Analizada
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 bg-green-900/20 rounded-lg border border-green-800/50">
                            <div className="flex items-start space-x-3">
                              <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                                <Check className="h-4 w-4 text-green-500" />
                              </div>
                              <div>
                                <h4 className="font-bold text-green-400">Especie Detectada:</h4>
                                <p className="text-white text-lg font-semibold">Amaranthus retroflexus</p>
                                <p className="text-gray-400 text-sm">Nombre común: Bledo</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h4 className="font-bold text-green-400">Confianza:</h4>
                              <span className="text-white font-bold">87%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-green-900/20 overflow-hidden">
                              <motion.div
                                className="h-2 rounded-full bg-gradient-to-r from-green-600 to-green-400"
                                initial={{ width: 0 }}
                                animate={{ width: "87%" }}
                                transition={{ duration: 1, delay: 0.2 }}
                              ></motion.div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-bold text-green-400">Características:</h4>
                            <ul className="space-y-1 text-sm text-gray-300">
                              <li className="flex items-start space-x-2">
                                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Planta anual de crecimiento rápido</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Hojas ovales con bordes lisos</span>
                              </li>
                              <li className="flex items-start space-x-2">
                                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Tallos robustos de color rojizo</span>
                              </li>
                            </ul>
                          </div>

                          <div className="flex space-x-2">
                            <Button className="flex-1 relative overflow-hidden group">
                              <span className="relative z-10 flex items-center">
                                <Info className="h-4 w-4 mr-1" />
                                Ver Información Detallada
                              </span>
                              <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-yellow-900/20 rounded-lg border border-yellow-800/50">
                        <div className="flex items-start space-x-3">
                          <div className="rounded-full bg-yellow-500/20 p-1 mt-0.5">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div>
                            <h4 className="font-bold text-yellow-400">Recomendaciones de Control:</h4>
                            <p className="text-gray-300 text-sm mt-1">
                              Esta especie es resistente a varios herbicidas. Se recomienda control mecánico en etapas
                              tempranas o el uso de herbicidas específicos como glifosato en aplicaciones dirigidas.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 text-center">
            <motion.h2
              className="text-xl font-bold text-green-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              ¿Cómo funciona?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="p-4 bg-black/40 backdrop-blur-sm border border-green-800/30 rounded-lg relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="rounded-full bg-green-500/10 p-3 mx-auto w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors duration-300">
                    <span className="text-green-500 font-bold">1</span>
                  </div>
                  <h3 className="font-bold text-white mb-2 text-center">Sube una imagen</h3>
                  <p className="text-gray-300 text-sm text-center">
                    Sube una foto clara de la maleza que quieres identificar
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="p-4 bg-black/40 backdrop-blur-sm border border-green-800/30 rounded-lg relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="rounded-full bg-green-500/10 p-3 mx-auto w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors duration-300">
                    <span className="text-green-500 font-bold">2</span>
                  </div>
                  <h3 className="font-bold text-white mb-2 text-center">Análisis IA</h3>
                  <p className="text-gray-300 text-sm text-center">
                    Nuestro sistema analiza la imagen y la compara con nuestra base de datos
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="p-4 bg-black/40 backdrop-blur-sm border border-green-800/30 rounded-lg relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="rounded-full bg-green-500/10 p-3 mx-auto w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors duration-300">
                    <span className="text-green-500 font-bold">3</span>
                  </div>
                  <h3 className="font-bold text-white mb-2 text-center">Resultados detallados</h3>
                  <p className="text-gray-300 text-sm text-center">
                    Recibe información precisa sobre la especie y métodos de control
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
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

