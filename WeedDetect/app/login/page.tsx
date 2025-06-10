"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Leaf, Github, AlertCircle } from "lucide-react"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Reemplazar la sección de configuración de Firebase con la proporcionada por el usuario
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPj6i_vZSMqeBAyXDgeYRcZKw0W5vvIio",
  authDomain: "etsafe.firebaseapp.com",
  projectId: "etsafe",
  storageBucket: "etsafe.firebasestorage.app",
  messagingSenderId: "63661921427",
  appId: "1:63661921427:web:08465738fcf0618f62a966",
  measurementId: "G-3QNVTC45GH",
}

// Modificar la inicialización de Firebase para incluir Analytics
// Initialize Firebase
const app = initializeApp(firebaseConfig)
let analytics
// Solo inicializar analytics en el cliente, no en el servidor
if (typeof window !== "undefined") {
  // Importación dinámica para evitar errores en SSR
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app)
  })
}
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState("login")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { toast } = useToast()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setSuccess("Inicio de sesión exitoso")
      toast({
        title: "Inicio de sesión exitoso",
        description: "Redirigiendo al panel principal...",
        variant: "default",
      })
      // Redirigir al usuario después de un inicio de sesión exitoso
      setTimeout(() => {
        window.location.href = "/"
      }, 1500)
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error)
      let errorMessage = "Error al iniciar sesión. Inténtalo de nuevo."

      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        errorMessage = "Email o contraseña incorrectos."
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Demasiados intentos fallidos. Inténtalo más tarde."
      }

      setError(errorMessage)
      toast({
        title: "Error de autenticación",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      setIsLoading(false)
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setSuccess("Registro exitoso")
      toast({
        title: "Cuenta creada exitosamente",
        description: "Ya puedes iniciar sesión con tus credenciales",
        variant: "default",
      })
      // Cambiar a la pestaña de inicio de sesión después del registro
      setActiveTab("login")
    } catch (error: any) {
      console.error("Error al registrarse:", error)
      let errorMessage = "Error al crear la cuenta. Inténtalo de nuevo."

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este email ya está registrado."
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Email inválido."
      }

      setError(errorMessage)
      toast({
        title: "Error de registro",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      await signInWithPopup(auth, googleProvider)
      setSuccess("Inicio de sesión con Google exitoso")
      toast({
        title: "Inicio de sesión exitoso",
        description: "Redirigiendo al panel principal...",
        variant: "default",
      })
      // Redirigir al usuario después de un inicio de sesión exitoso
      setTimeout(() => {
        window.location.href = "/"
      }, 1500)
    } catch (error: any) {
      console.error("Error al iniciar sesión con Google:", error)
      setError("Error al iniciar sesión con Google. Inténtalo de nuevo.")
      toast({
        title: "Error de autenticación",
        description: "No se pudo iniciar sesión con Google",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      await signInWithPopup(auth, githubProvider)
      setSuccess("Inicio de sesión con GitHub exitoso")
      toast({
        title: "Inicio de sesión exitoso",
        description: "Redirigiendo al panel principal...",
        variant: "default",
      })
      // Redirigir al usuario después de un inicio de sesión exitoso
      setTimeout(() => {
        window.location.href = "/"
      }, 1500)
    } catch (error: any) {
      console.error("Error al iniciar sesión con GitHub:", error)
      setError("Error al iniciar sesión con GitHub. Inténtalo de nuevo.")
      toast({
        title: "Error de autenticación",
        description: "No se pudo iniciar sesión con GitHub",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Ingresa tu email para restablecer la contraseña")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess("Se ha enviado un correo para restablecer tu contraseña")
      toast({
        title: "Correo enviado",
        description: "Revisa tu bandeja de entrada para restablecer tu contraseña",
        variant: "default",
      })
    } catch (error: any) {
      console.error("Error al enviar correo de restablecimiento:", error)
      setError("No se pudo enviar el correo de restablecimiento. Verifica tu email.")
      toast({
        title: "Error",
        description: "No se pudo enviar el correo de restablecimiento",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
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

      {/* Círculos decorativos */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <main className="flex-1 container px-4 md:px-6 py-12 relative z-10">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-green-500 hover:text-green-400 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        <div className="max-w-md mx-auto">
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

          <motion.div
            className="bg-black/40 backdrop-blur-sm border border-green-800/30 rounded-lg p-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 to-transparent"></div>

            <div className="relative z-10">
              {error && (
                <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800 text-white">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 bg-green-900/20 border-green-800 text-white">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Éxito</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Tabs defaultValue="login" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
                  >
                    Iniciar Sesión
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-green-500 data-[state=active]:text-black"
                  >
                    Registrarse
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-green-400">Bienvenido de nuevo</h1>
                    <p className="text-gray-400 text-sm mt-1">Inicia sesión para continuar</p>
                  </div>

                  <form onSubmit={handleEmailLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        required
                        className="bg-black/50 border-green-800/50 text-white placeholder:text-gray-500 focus:border-green-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Contraseña</Label>
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-xs text-green-500 hover:text-green-400 transition-colors"
                        >
                          ¿Olvidaste tu contraseña?
                        </button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        className="bg-black/50 border-green-800/50 text-white focus:border-green-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <Button type="submit" className="w-full relative overflow-hidden group" disabled={isLoading}>
                      <span className="relative z-10">
                        {isLoading ? (
                          <div className="flex items-center justify-center">
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
                            Iniciando sesión...
                          </div>
                        ) : (
                          "Iniciar Sesión"
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </form>

                  <div className="relative flex items-center justify-center mt-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-green-800/30"></div>
                    </div>
                    <div className="relative bg-black px-4 text-sm text-gray-400">O continúa con</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <Button
                      variant="outline"
                      className="w-full border-green-800/50 text-white hover:bg-green-500 hover:text-black transition-colors"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                        ></path>
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-green-800/50 text-white hover:bg-green-500 hover:text-black transition-colors"
                      onClick={handleGithubLogin}
                      disabled={isLoading}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold text-green-400">Crea tu cuenta</h1>
                    <p className="text-gray-400 text-sm mt-1">Regístrate para comenzar</p>
                  </div>

                  <form onSubmit={handleEmailRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Tu nombre"
                        required
                        className="bg-black/50 border-green-800/50 text-white placeholder:text-gray-500 focus:border-green-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email-register">Email</Label>
                      <Input
                        id="email-register"
                        type="email"
                        placeholder="tu@email.com"
                        required
                        className="bg-black/50 border-green-800/50 text-white placeholder:text-gray-500 focus:border-green-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-register">Contraseña</Label>
                      <Input
                        id="password-register"
                        type="password"
                        required
                        className="bg-black/50 border-green-800/50 text-white focus:border-green-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <p className="text-xs text-gray-400">La contraseña debe tener al menos 6 caracteres</p>
                    </div>

                    <Button type="submit" className="w-full relative overflow-hidden group" disabled={isLoading}>
                      <span className="relative z-10">
                        {isLoading ? (
                          <div className="flex items-center justify-center">
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
                            Registrando...
                          </div>
                        ) : (
                          "Registrarse"
                        )}
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Button>
                  </form>

                  <div className="relative flex items-center justify-center mt-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-green-800/30"></div>
                    </div>
                    <div className="relative bg-black px-4 text-sm text-gray-400">O regístrate con</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <Button
                      variant="outline"
                      className="w-full border-green-800/50 text-white hover:bg-green-500 hover:text-black transition-colors"
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                        ></path>
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-green-800/50 text-white hover:bg-green-500 hover:text-black transition-colors"
                      onClick={handleGithubLogin}
                      disabled={isLoading}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-gray-400">
                {activeTab === "login" ? (
                  <p>
                    ¿No tienes una cuenta?{" "}
                    <button
                      className="text-green-500 hover:text-green-400 transition-colors"
                      onClick={() => setActiveTab("register")}
                    >
                      Regístrate
                    </button>
                  </p>
                ) : (
                  <p>
                    ¿Ya tienes una cuenta?{" "}
                    <button
                      className="text-green-500 hover:text-green-400 transition-colors"
                      onClick={() => setActiveTab("login")}
                    >
                      Inicia sesión
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
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

