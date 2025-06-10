"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Leaf, User, Upload, Trash2, LogOut, History, BookmarkCheck } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ProfilePage() {
  const { user, loading, signOut, updateUserProfile, uploadProfileImage, deleteAccount } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [displayName, setDisplayName] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock data for analyses and favorites
  const [analyses, setAnalyses] = useState([
    { id: 1, date: "2023-10-15", species: "Amaranthus retroflexus (Yuyo Colorado)", confidence: 87 },
    { id: 2, date: "2023-09-22", species: "Conyza bonariensis (Rama Negra)", confidence: 92 },
    { id: 3, date: "2023-08-05", species: "Cenchrus insertus (Roseta)", confidence: 79 },
  ])

  const [favorites, setFavorites] = useState([
    { id: 1, title: "Control Biológico de Malezas", category: "Técnicas", date: "2 Abr 2023" },
    { id: 3, title: "Impacto de las Malezas en la Agricultura", category: "Investigación", date: "10 May 2023" },
  ])

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      setDisplayName(user.displayName || "")
    }
  }, [user, loading, router])

  const handleUpdateProfile = async () => {
    if (!user) return

    setIsUpdating(true)
    try {
      await updateUserProfile(displayName)
      toast({
        title: "Perfil actualizado",
        description: "Tu información ha sido actualizada correctamente",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar tu perfil",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return

    const file = e.target.files[0]
    setIsUploading(true)

    try {
      await uploadProfileImage(file)
      toast({
        title: "Imagen actualizada",
        description: "Tu foto de perfil ha sido actualizada correctamente",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "No se pudo subir la imagen",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        title: "Error",
        description: "No se pudo cerrar sesión",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount()
      toast({
        title: "Cuenta eliminada",
        description: "Tu cuenta ha sido eliminada correctamente",
      })
      router.push("/")
    } catch (error) {
      console.error("Error deleting account:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar tu cuenta",
        variant: "destructive",
      })
    }
  }

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((fav) => fav.id !== id))
    toast({
      title: "Artículo eliminado",
      description: "El artículo ha sido eliminado de tus favoritos",
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-green-950">
        <div className="text-center">
          <Leaf className="h-10 w-10 text-green-500 animate-spin mx-auto mb-4" />
          <p className="text-white">Cargando...</p>
        </div>
      </div>
    )
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

      <main className="flex-1 container px-4 md:px-6 py-12 relative z-10">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-500 hover:text-green-400 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Leaf className="h-8 w-8 text-green-500" />
              </motion.div>
              <span className="text-2xl font-bold text-green-500">WeedDetect</span>
            </Link>
          </motion.div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                Mi Perfil
              </TabsTrigger>
              <TabsTrigger value="analyses" className="data-[state=active]:bg-green-500 data-[state=active]:text-black">
                Mis Análisis
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
              >
                Mis Favoritos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-black/40 backdrop-blur-sm border border-green-800/30">
                <CardHeader>
                  <CardTitle className="text-green-400">Información de Perfil</CardTitle>
                  <CardDescription className="text-gray-400">
                    Actualiza tu información personal y gestiona tu cuenta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-green-900/30 border-2 border-green-500/50 flex items-center justify-center">
                        {user?.photoURL ? (
                          <Image
                            src={user.photoURL || "/placeholder.svg"}
                            alt={user.displayName || "Usuario"}
                            width={128}
                            height={128}
                            className="object-cover"
                          />
                        ) : (
                          <User className="h-16 w-16 text-green-500/70" />
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full p-2 h-auto"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="flex-1 space-y-4 w-full">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          value={user?.email || ""}
                          disabled
                          className="bg-black/50 border-green-800/50 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          id="name"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="bg-black/50 border-green-800/50 text-white focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
                  <div className="flex gap-3">
                    <Button
                      onClick={handleUpdateProfile}
                      disabled={isUpdating}
                      className="relative overflow-hidden group"
                    >
                      <span className="relative z-10">{isUpdating ? "Actualizando..." : "Guardar Cambios"}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleSignOut}
                      className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar Cuenta
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-black border-red-800">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500">¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-300">
                          Esta acción no se puede deshacer. Esto eliminará permanentemente tu cuenta y todos tus datos.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-900">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="analyses">
              <Card className="bg-black/40 backdrop-blur-sm border border-green-800/30">
                <CardHeader>
                  <CardTitle className="text-green-400">Historial de Análisis</CardTitle>
                  <CardDescription className="text-gray-400">
                    Revisa tus análisis anteriores de detección de malezas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {analyses.length > 0 ? (
                    <div className="space-y-4">
                      {analyses.map((analysis) => (
                        <div
                          key={analysis.id}
                          className="p-4 bg-black/60 border border-green-800/30 rounded-lg hover:border-green-500/50 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h3 className="font-medium text-green-400">{analysis.species}</h3>
                              <p className="text-sm text-gray-400">Fecha: {analysis.date}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-sm text-gray-300">
                                Confianza: <span className="text-green-500">{analysis.confidence}%</span>
                              </div>
                              <Button size="sm" variant="outline" className="h-8 border-green-500 text-green-500">
                                <History className="h-3.5 w-3.5 mr-1" />
                                Ver Detalles
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <History className="h-12 w-12 text-green-500/50 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-300">No hay análisis recientes</h3>
                      <p className="text-gray-400 mt-1">Comienza a detectar malezas para ver tu historial aquí</p>
                      <Button className="mt-4 relative overflow-hidden group">
                        <span className="relative z-10">Ir a Detección</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card className="bg-black/40 backdrop-blur-sm border border-green-800/30">
                <CardHeader>
                  <CardTitle className="text-green-400">Artículos Favoritos</CardTitle>
                  <CardDescription className="text-gray-400">
                    Accede rápidamente a los artículos que has guardado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favorites.length > 0 ? (
                    <div className="space-y-4">
                      {favorites.map((favorite) => (
                        <div
                          key={favorite.id}
                          className="p-4 bg-black/60 border border-green-800/30 rounded-lg hover:border-green-500/50 transition-colors"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <h3 className="font-medium text-green-400">{favorite.title}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">
                                  {favorite.category}
                                </span>
                                <span className="text-xs text-gray-400">{favorite.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 md:mt-0">
                              <Button size="sm" variant="outline" className="h-8 border-green-500 text-green-500">
                                <BookmarkCheck className="h-3.5 w-3.5 mr-1" />
                                Leer
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 border-red-500 text-red-500 hover:bg-red-500/10"
                                onClick={() => removeFavorite(favorite.id)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookmarkCheck className="h-12 w-12 text-green-500/50 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-300">No tienes artículos guardados</h3>
                      <p className="text-gray-400 mt-1">Guarda artículos para acceder a ellos rápidamente</p>
                      <Link href="/articles">
                        <Button className="mt-4 relative overflow-hidden group">
                          <span className="relative z-10">Explorar Artículos</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-green-800/30 bg-black py-4 relative z-10">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} WeedDetect. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

