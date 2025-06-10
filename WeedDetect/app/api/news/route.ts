import { type NextRequest, NextResponse } from "next/server"

const NEWS_API_KEY = "7332571319ed438289ad6d78ad57c9a4"
const NEWS_API_BASE_URL = "https://newsapi.org/v2"

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get("q") || "weeds agriculture"
        const pageSize = searchParams.get("pageSize") || "20"
        const page = searchParams.get("page") || "1"
        const category = searchParams.get("category") || "all"

        // Definir consultas específicas por categoría
        const categoryQueries = {
            guides: "weed identification guide agriculture farming",
            techniques: "weed control techniques farming herbicide",
            research: "agricultural research weeds study",
            sustainability: "sustainable agriculture weed management organic",
            all: "weeds agriculture farming crop",
        }

        const searchQuery = category !== "all" ? categoryQueries[category as keyof typeof categoryQueries] : query

        // Construir URL de la API
        const apiUrl = new URL(`${NEWS_API_BASE_URL}/everything`)
        apiUrl.searchParams.set("q", searchQuery)
        apiUrl.searchParams.set("apiKey", NEWS_API_KEY)
        apiUrl.searchParams.set("pageSize", pageSize)
        apiUrl.searchParams.set("page", page)
        apiUrl.searchParams.set("language", "en")
        apiUrl.searchParams.set("sortBy", "publishedAt")
        apiUrl.searchParams.set(
            "domains",
            "sciencedaily.com,phys.org,reuters.com,apnews.com,bbc.com,cnn.com,theguardian.com,nature.com",
        )

        console.log("Fetching from News API:", apiUrl.toString())

        const response = await fetch(apiUrl.toString(), {
            headers: {
                "User-Agent": "WeedDetect/1.0",
            },
        })

        if (!response.ok) {
            console.error(`News API error: ${response.status} ${response.statusText}`)
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Filtrar y procesar artículos
        const filteredArticles =
            data.articles
                ?.filter(
                    (article: any) =>
                        article.title &&
                        article.description &&
                        // Eliminar la restricción de urlToImage para permitir más artículos
                        !article.title.toLowerCase().includes("[removed]") &&
                        !article.description.toLowerCase().includes("[removed]"),
                )
                ?.map((article: any, index: number) => ({
                    ...article,
                    id: article.url || `news-${index}`, // Usar URL como ID único o generar uno si no hay URL
                    // Usar siempre placeholder para las imágenes
                    urlToImage: article.urlToImage || `/placeholder.svg?height=200&width=300&text=Artículo+${index}`,
                    // Convertir URLs externas a URLs internas para evitar problemas de navegación
                    url: `/articles/article/${index + 1}`,
                })) || []

        return NextResponse.json({
            status: "ok",
            totalResults: filteredArticles.length,
            articles: filteredArticles,
        })
    } catch (error) {
        console.error("Error in news API route:", error)

        // Retornar datos de fallback en caso de error
        return NextResponse.json(getFallbackArticles())
    }
}

// Datos de fallback mejorados
function getFallbackArticles() {
    return {
        status: "ok",
        totalResults: 12,
        articles: [
            {
                id: "fallback-1",
                title: "AI-Powered Weed Detection Revolutionizes Modern Agriculture",
                description:
                    "New artificial intelligence systems are helping farmers identify and control weeds with unprecedented accuracy, reducing herbicide use by up to 90%.",
                content: "Modern agriculture is embracing AI-powered solutions for weed detection...",
                url: "https://example.com/ai-weed-detection",
                urlToImage: "/images/weed-article-1.jpg",
                publishedAt: new Date().toISOString(),
                source: { id: "agricultural-tech", name: "Agricultural Technology Today" },
                author: "Dr. Maria Rodriguez",
            },
            {
                id: "fallback-2",
                title: "Sustainable Weed Management: The Future of Organic Farming",
                description:
                    "Researchers develop innovative biological control methods that eliminate the need for chemical herbicides in organic farming systems.",
                content: "Organic farming requires innovative approaches to weed management...",
                url: "https://example.com/sustainable-weed-management",
                urlToImage: "/images/weed-article-2.jpg",
                publishedAt: new Date(Date.now() - 86400000).toISOString(),
                source: { id: "organic-farming", name: "Organic Farming Journal" },
                author: "James Thompson",
            },
            {
                id: "fallback-3",
                title: "Climate Change Accelerates Invasive Weed Spread Across Farmlands",
                description:
                    "New study reveals how rising temperatures and changing precipitation patterns are helping invasive weeds colonize new agricultural regions.",
                content: "Climate change is significantly impacting weed distribution...",
                url: "https://example.com/climate-change-weeds",
                urlToImage: "/images/weed-article-3.jpg",
                publishedAt: new Date(Date.now() - 172800000).toISOString(),
                source: { id: "climate-research", name: "Climate Research Institute" },
                author: "Dr. Sarah Chen",
            },
            {
                id: "fallback-4",
                title: "Precision Agriculture: GPS-Guided Weed Control Systems",
                description:
                    "Advanced GPS and sensor technology enable farmers to target weeds with millimeter precision, dramatically reducing herbicide waste.",
                content: "Precision agriculture is transforming weed control strategies...",
                url: "https://example.com/precision-weed-control",
                urlToImage: "/images/weed-article-4.jpg",
                publishedAt: new Date(Date.now() - 259200000).toISOString(),
                source: { id: "precision-ag", name: "Precision Agriculture Weekly" },
                author: "Michael Johnson",
            },
            {
                id: "fallback-5",
                title: "Breakthrough: Genetically Modified Crops Resist All Known Weeds",
                description:
                    "Scientists engineer crop varieties with natural weed-suppressing compounds, potentially eliminating the need for herbicides.",
                content: "Genetic engineering offers new solutions for weed management...",
                url: "https://example.com/gmo-weed-resistance",
                urlToImage: "/images/weed-article-5.jpg",
                publishedAt: new Date(Date.now() - 345600000).toISOString(),
                source: { id: "biotech-news", name: "Biotechnology News" },
                author: "Dr. Lisa Park",
            },
            {
                id: "fallback-6",
                title: "Economic Impact: Herbicide-Resistant Weeds Cost Farmers Billions",
                description:
                    "Comprehensive analysis shows that resistant weed species are causing unprecedented economic losses in global agriculture.",
                content: "Herbicide resistance is creating significant economic challenges...",
                url: "https://example.com/economic-impact-weeds",
                urlToImage: "/images/weed-article-6.jpg",
                publishedAt: new Date(Date.now() - 432000000).toISOString(),
                source: { id: "agri-economics", name: "Agricultural Economics Review" },
                author: "Robert Davis",
            },
            {
                id: "fallback-7",
                title: "Robotic Weed Killers: The Future of Automated Farming",
                description:
                    "Autonomous robots equipped with AI vision systems can identify and eliminate weeds without human intervention.",
                content: "Robotics is revolutionizing agricultural weed control...",
                url: "https://example.com/robotic-weed-killers",
                urlToImage: "/images/weed-article-1.jpg",
                publishedAt: new Date(Date.now() - 518400000).toISOString(),
                source: { id: "robotics-today", name: "Robotics Today" },
                author: "Dr. Alex Kim",
            },
            {
                id: "fallback-8",
                title: "Cover Crops: Nature's Solution to Weed Suppression",
                description:
                    "Farmers discover that strategic cover crop planting can naturally suppress weeds while improving soil health.",
                content: "Cover crops provide natural weed suppression benefits...",
                url: "https://example.com/cover-crops-weeds",
                urlToImage: "/images/weed-article-2.jpg",
                publishedAt: new Date(Date.now() - 604800000).toISOString(),
                source: { id: "sustainable-ag", name: "Sustainable Agriculture Magazine" },
                author: "Jennifer Martinez",
            },
            {
                id: "fallback-9",
                title: "Drone Technology Maps Weed Infestations from Above",
                description:
                    "High-resolution drone imaging helps farmers identify weed hotspots and plan targeted treatment strategies.",
                content: "Drone technology is enhancing weed detection capabilities...",
                url: "https://example.com/drone-weed-mapping",
                urlToImage: "/images/weed-article-3.jpg",
                publishedAt: new Date(Date.now() - 691200000).toISOString(),
                source: { id: "drone-tech", name: "Drone Technology Review" },
                author: "Captain Steve Wilson",
            },
            {
                id: "fallback-10",
                title: "Biological Warfare: Beneficial Insects Combat Agricultural Weeds",
                description:
                    "Scientists release specially selected insects that target invasive weeds while leaving crops unharmed.",
                content: "Biological control agents offer sustainable weed management...",
                url: "https://example.com/biological-weed-control",
                urlToImage: "/images/weed-article-4.jpg",
                publishedAt: new Date(Date.now() - 777600000).toISOString(),
                source: { id: "biocontrol", name: "Biological Control Research" },
                author: "Dr. Emma Thompson",
            },
            {
                id: "fallback-11",
                title: "Smart Sensors Detect Weeds Before They Emerge",
                description:
                    "Underground sensor networks can predict weed emergence patterns, allowing for preemptive treatment strategies.",
                content: "Smart sensor technology enables predictive weed management...",
                url: "https://example.com/smart-weed-sensors",
                urlToImage: "/images/weed-article-5.jpg",
                publishedAt: new Date(Date.now() - 864000000).toISOString(),
                source: { id: "sensor-tech", name: "Sensor Technology Journal" },
                author: "Dr. David Chang",
            },
            {
                id: "fallback-12",
                title: "Laser Technology Zaps Weeds Without Chemicals",
                description:
                    "Innovative laser systems can selectively destroy weeds using precise energy beams, eliminating the need for herbicides.",
                content: "Laser technology offers chemical-free weed elimination...",
                url: "https://example.com/laser-weed-control",
                urlToImage: "/images/weed-article-6.jpg",
                publishedAt: new Date(Date.now() - 950400000).toISOString(),
                source: { id: "laser-tech", name: "Laser Technology Today" },
                author: "Dr. Rachel Green",
            },
        ],
    }
}
