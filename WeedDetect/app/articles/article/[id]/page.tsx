"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Bookmark, BookmarkCheck, Share2, Printer, Download } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { saveFavoriteToFirebase, removeFavoriteFromFirebase, getFavoritesFromFirebase } from "@/lib/weed-detection"

// Datos simulados de artículos
const articles = [
  {
    id: 1,
    title: "Las 10 Malezas Más Comunes en Cultivos",
    category: "Guía",
    date: "15 Mar 2023",
    readTime: "5 min",
    image: "/placeholder.svg?height=400&width=800",
    content: `
      <h2>Introducción a las malezas más comunes</h2>
      <p>Las malezas representan uno de los mayores desafíos para los agricultores en todo el mundo. Compiten con los cultivos por nutrientes, agua y luz solar, reduciendo significativamente el rendimiento y la calidad de las cosechas.</p>
      
      <p>En este artículo, exploraremos las 10 malezas más comunes que afectan a los cultivos en la región pampeana argentina y cómo identificarlas y controlarlas de manera efectiva.</p>
      
      <h3>1. Amaranthus quitensis (Yuyo Colorado)</h3>
      <p>El Yuyo Colorado es una de las malezas más problemáticas en cultivos de verano. Esta especie posee atributos biológicos que la convierten en una maleza agresiva y muy difícil de manejar eficazmente.</p>
      <p>Características principales:</p>
      <ul>
        <li>Planta anual de crecimiento rápido</li>
        <li>Hojas ovales con bordes lisos</li>
        <li>Tallos robustos de color rojizo</li>
        <li>Alta producción de semillas (más de 100,000 por planta)</li>
      </ul>
      
      <h3>2. Conyza bonariensis (Rama Negra)</h3>
      <p>La Rama Negra es una especie que se encuentra en Bolivia, Brasil, Paraguay, Uruguay, Chile y Argentina. Ha desarrollado resistencia a varios herbicidas, lo que complica su control.</p>
      <p>Características principales:</p>
      <ul>
        <li>Planta anual o bianual</li>
        <li>Hojas alternas, lanceoladas y pubescentes</li>
        <li>Inflorescencias en forma de panículas</li>
        <li>Alta capacidad de dispersión por viento</li>
      </ul>
      
      <h3>3. Cenchrus insertus (Roseta)</h3>
      <p>La Roseta es una especie autóctona del norte y centro de Argentina. Es una maleza importante en cultivos de verano en sitios secos y arenosos.</p>
      <p>Características principales:</p>
      <ul>
        <li>Planta anual con crecimiento rastrero</li>
        <li>Flores con pequeñas espinas</li>
        <li>Semillas con capacidad de adherencia</li>
        <li>Adaptada a suelos arenosos</li>
      </ul>
      
      <h2>Métodos de control integrado</h2>
      <p>El manejo integrado de malezas combina diferentes estrategias para lograr un control efectivo y sostenible:</p>
      <ol>
        <li><strong>Control cultural:</strong> Rotación de cultivos, fechas de siembra adecuadas, densidad óptima de siembra.</li>
        <li><strong>Control mecánico:</strong> Labranza, desmalezado manual, corte.</li>
        <li><strong>Control químico:</strong> Uso racional de herbicidas, considerando el momento de aplicación y las dosis adecuadas.</li>
        <li><strong>Control biológico:</strong> Uso de organismos naturales que controlan las malezas.</li>
      </ol>
      
      <p>La combinación de estos métodos permite un manejo más efectivo y reduce la probabilidad de desarrollo de resistencia a herbicidas.</p>
      
      <h2>Conclusión</h2>
      <p>Conocer las malezas más comunes en nuestros cultivos es el primer paso para implementar estrategias de control efectivas. La identificación temprana y el manejo integrado son fundamentales para minimizar su impacto en la producción agrícola.</p>
    `,
  },
  {
    id: 2,
    title: "Control Biológico de Malezas",
    category: "Técnicas",
    date: "2 Abr 2023",
    readTime: "8 min",
    image: "/placeholder.svg?height=400&width=800",
    content: `
      <h2>El control biológico como alternativa sostenible</h2>
      <p>El control biológico de malezas representa una alternativa sostenible y respetuosa con el medio ambiente frente a los métodos químicos tradicionales. Esta técnica utiliza organismos vivos para reducir la población de malezas a niveles económicamente aceptables.</p>
      
      <p>En este artículo, exploraremos los diferentes métodos de control biológico y su aplicación en la agricultura moderna.</p>
      
      <h3>Tipos de agentes de control biológico</h3>
      <ol>
        <li><strong>Insectos fitófagos:</strong> Se alimentan de partes específicas de las malezas, debilitándolas o matándolas.</li>
        <li><strong>Patógenos:</strong> Hongos, bacterias y virus que causan enfermedades en las malezas.</li>
        <li><strong>Competidores:</strong> Plantas que compiten eficazmente con las malezas por recursos.</li>
      </ol>
      
      <h3>Casos de éxito en Argentina</h3>
      <p>En Argentina, se han implementado varios programas exitosos de control biológico de malezas:</p>
      <ul>
        <li>Control del cardo mediante el escarabajo Rhinocyllus conicus</li>
        <li>Manejo de la maleza acuática Salvinia molesta con el gorgojo Cyrtobagous salviniae</li>
        <li>Uso de hongos patógenos para el control de Amaranthus quitensis</li>
      </ul>
      
      <h3>Ventajas del control biológico</h3>
      <ul>
        <li>Sostenibilidad ambiental</li>
        <li>Especificidad (afecta solo a la especie objetivo)</li>
        <li>Efecto a largo plazo</li>
        <li>Reducción en el uso de herbicidas químicos</li>
        <li>Menor riesgo de desarrollo de resistencia</li>
      </ul>
      
      <h3>Limitaciones y desafíos</h3>
      <p>A pesar de sus ventajas, el control biológico presenta algunos desafíos:</p>
      <ul>
        <li>Tiempo de establecimiento más largo que los métodos químicos</li>
        <li>Eficacia variable según condiciones ambientales</li>
        <li>Posibles efectos no deseados en el ecosistema</li>
        <li>Inversión inicial en investigación y desarrollo</li>
      </ul>
      
      <h2>Implementación en sistemas agrícolas</h2>
      <p>Para implementar con éxito el control biológico de malezas, se recomienda:</p>
      <ol>
        <li>Identificar correctamente la maleza objetivo</li>
        <li>Seleccionar el agente de control biológico adecuado</li>
        <li>Establecer un programa de monitoreo</li>
        <li>Integrar con otras prácticas de manejo</li>
        <li>Evaluar periódicamente la eficacia del programa</li>
      </ol>
      
      <h2>Conclusión</h2>
      <p>El control biológico de malezas ofrece una alternativa prometedora para la agricultura sostenible. Aunque no reemplaza completamente a otros métodos, su integración en programas de manejo puede reducir significativamente la dependencia de herbicidas químicos y contribuir a sistemas agrícolas más resilientes y respetuosos con el medio ambiente.</p>
    `,
  },
  {
    id: 3,
    title: "Impacto de las Malezas en la Agricultura",
    category: "Investigación",
    date: "10 May 2023",
    readTime: "12 min",
    image: "/placeholder.svg?height=400&width=800",
    content: `
      <h2>El impacto económico y ambiental de las malezas</h2>
      <p>Las malezas representan uno de los factores más limitantes en la producción agrícola mundial. Su presencia no solo reduce el rendimiento de los cultivos, sino que también afecta la calidad de los productos, aumenta los costos de producción y puede tener impactos ambientales significativos.</p>
      
      <p>Este artículo analiza en profundidad el impacto económico y ambiental de las malezas en diferentes sistemas agrícolas.</p>
      
      <h3>Impacto económico</h3>
      <p>Las pérdidas económicas causadas por las malezas son sustanciales:</p>
      <ul>
        <li><strong>Reducción del rendimiento:</strong> Las malezas compiten con los cultivos por agua, nutrientes y luz solar, reduciendo el rendimiento entre un 10% y un 50% según el cultivo y la intensidad de la infestación.</li>
        <li><strong>Costos de control:</strong> Los agricultores invierten significativamente en herbicidas, maquinaria y mano de obra para el control de malezas.</li>
        <li><strong>Calidad del producto:</strong> La presencia de semillas o partes de malezas puede reducir la calidad y el valor de mercado de los productos agrícolas.</li>
        <li><strong>Eficiencia operativa:</strong> Las malezas pueden interferir con las operaciones de cosecha, aumentando el tiempo y los costos.</li>
      </ul>
      
      <p>Según estudios recientes, en Argentina, las pérdidas económicas debido a las malezas en cultivos de soja pueden superar los 200 dólares por hectárea en casos de alta infestación.</p>
      
      <h3>Impacto ambiental</h3>
      <p>El manejo de malezas también tiene implicaciones ambientales importantes:</p>
      <ul>
        <li><strong>Uso de herbicidas:</strong> El uso intensivo de herbicidas puede contaminar suelos y aguas, afectando la biodiversidad.</li>
        <li><strong>Resistencia a herbicidas:</strong> El uso repetido de los mismos principios activos ha llevado al desarrollo de malezas resistentes, lo que complica aún más su manejo.</li>
        <li><strong>Erosión del suelo:</strong> Algunas prácticas de control mecánico pueden aumentar la erosión del suelo.</li>
        <li><strong>Biodiversidad:</strong> La eliminación indiscriminada de malezas puede reducir la biodiversidad en los agroecosistemas.</li>
      </ul>
      
      <h3>Malezas problemáticas en la región pampeana</h3>
      <p>En la región pampeana argentina, varias especies de malezas han desarrollado resistencia a herbicidas, complicando su manejo:</p>
      <ul>
        <li>Amaranthus quitensis (Yuyo Colorado)</li>
        <li>Conyza bonariensis (Rama Negra)</li>
        <li>Sorghum halepense (Sorgo de Alepo)</li>
        <li>Lolium multiflorum (Raigrás anual)</li>
        <li>Avena fatua (Avena negra)</li>
      </ul>
      
      <h2>Estrategias de manejo sostenible</h2>
      <p>Para minimizar el impacto económico y ambiental de las malezas, se recomiendan las siguientes estrategias:</p>
      <ol>
        <li><strong>Manejo integrado:</strong> Combinación de métodos culturales, mecánicos, químicos y biológicos.</li>
        <li><strong>Rotación de cultivos:</strong> Interrumpe el ciclo de vida de las malezas y reduce la presión de selección.</li>
        <li><strong>Rotación de herbicidas:</strong> Uso de diferentes principios activos para prevenir la resistencia.</li>
        <li><strong>Monitoreo y detección temprana:</strong> Identificación y control de malezas antes de que se establezcan.</li>
        <li><strong>Agricultura de precisión:</strong> Aplicación localizada de herbicidas solo donde se necesitan.</li>
      </ol>
      
      <h2>Conclusión</h2>
      <p>El impacto de las malezas en la agricultura es significativo tanto desde el punto de vista económico como ambiental. Un enfoque integrado y sostenible para el manejo de malezas es esencial para minimizar estos impactos y garantizar la productividad agrícola a largo plazo.</p>
      
      <p>La investigación continua, la transferencia de conocimientos y la adopción de prácticas innovadoras serán clave para enfrentar los desafíos que presentan las malezas en los sistemas agrícolas modernos.</p>
    `,
  },
]

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()
  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [userFavorites, setUserFavorites] = useState<any[]>([])

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true)
      try {
        // En un caso real, esto sería una llamada a una API
        const id = Number(params.id)
        const foundArticle = articles.find((a) => a.id === id)

        if (foundArticle) {
          setArticle(foundArticle)

          // Cargar favoritos del usuario
          if (user) {
            const favs = await getFavoritesFromFirebase(user.uid)
            setUserFavorites(favs)
            setIsFavorite(favs.some((f) => f.id === id))
          }
        } else {
          toast({
            title: "Artículo no encontrado",
            description: "El artículo que buscas no existe",
            variant: "destructive",
          })
          router.push("/articles")
        }
      } catch (error) {
        console.error("Error al cargar el artículo:", error)
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [params.id, router, user, toast])

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para guardar favoritos",
        variant: "destructive",
      })
      return
    }

    if (!article) return

    if (isFavorite) {
      // Encontrar el docId para eliminar
      const favToRemove = userFavorites.find((f) => f.id === article.id)
      if (favToRemove && favToRemove.docId) {
        const success = await removeFavoriteFromFirebase(user.uid, favToRemove.docId)
        if (success) {
          setIsFavorite(false)
          toast({
            title: "Eliminado de favoritos",
            description: "El artículo ha sido eliminado de tus favoritos",
          })
        }
      }
    } else {
      const articleData = {
        id: article.id,
        title: article.title,
        category: article.category,
        date: article.date,
      }

      const success = await saveFavoriteToFirebase(user.uid, articleData)
      if (success) {
        setIsFavorite(true)
        toast({
          title: "Guardado en favoritos",
          description: "El artículo ha sido guardado en tus favoritos",
        })
      }
    }
  }

  const shareArticle = async () => {
    if (!article) return

    const url = window.location.href
    const text = `Mira este artículo sobre ${article.title} en WeedDetect`

    try {
      if (navigator.share) {
        await navigator.share({
          title: `WeedDetect - ${article.title}`,
          text,
          url,
        })
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`)
        toast({
          title: "Enlace copiado",
          description: "El enlace ha sido copiado al portapapeles",
        })
      }
    } catch (error) {
      console.error("Error al compartir:", error)
    }
  }

  const printArticle = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-green-950">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Cargando artículo...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-green-950">
        <div className="text-center">
          <p className="text-white">Artículo no encontrado</p>
          <Button className="mt-4" onClick={() => router.push("/articles")}>
            Volver a artículos
          </Button>
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
          <Link href="/articles" className="inline-flex items-center text-green-500 hover:text-green-400 group">
            <motion.div whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:text-green-400" />
            </motion.div>
            <span>Volver a artículos</span>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 items-center">
              <span className="inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-500">
                {article.category}
              </span>
              <div className="flex items-center text-xs text-gray-400">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                <span>{article.readTime} de lectura</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              {article.title}
            </h1>

            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`border-green-500 ${isFavorite ? "text-green-500 bg-green-500/10" : "text-gray-400"} hover:text-green-500 hover:bg-green-500/10`}
                  onClick={toggleFavorite}
                >
                  {isFavorite ? <BookmarkCheck className="h-4 w-4 mr-1" /> : <Bookmark className="h-4 w-4 mr-1" />}
                  {isFavorite ? "Guardado" : "Guardar"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500 text-gray-400 hover:text-green-500 hover:bg-green-500/10"
                  onClick={shareArticle}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Compartir
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500 text-gray-400 hover:text-green-500 hover:bg-green-500/10"
                  onClick={printArticle}
                >
                  <Printer className="h-4 w-4 mr-1" />
                  Imprimir
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500 text-gray-400 hover:text-green-500 hover:bg-green-500/10"
                  onClick={() => {
                    const blob = new Blob([article.content], { type: "text/html" })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement("a")
                    a.href = url
                    a.download = `${article.title.replace(/\s+/g, "-").toLowerCase()}.html`
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                  }}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Descargar
                </Button>
              </div>
            </div>

            <div
              className="prose prose-invert prose-green max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-green-800/30 bg-black py-8 relative z-10">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} WeedDetect. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

