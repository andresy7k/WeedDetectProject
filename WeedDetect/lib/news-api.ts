// Servicio para manejar las llamadas a nuestra API interna
export interface NewsArticle {
    id: string
    title: string
    description: string
    content: string
    url: string
    urlToImage: string
    publishedAt: string
    source: {
        id: string
        name: string
    }
    author: string
}

export interface NewsResponse {
    status: string
    totalResults: number
    articles: NewsArticle[]
}

// Modificar la función getWeedArticles para usar múltiples consultas y combinar resultados

// Reemplazar la función getWeedArticles con esta versión mejorada:
export async function getWeedArticles(query = "weeds agriculture", pageSize = 20, page = 1): Promise<NewsResponse> {
    try {
        // Usar múltiples consultas para obtener más resultados variados
        const queries = [
            "weeds agriculture",
            "farming crops",
            "agricultural technology",
            "plant science",
            "crop management",
        ]

        // Seleccionar una consulta basada en la página para obtener resultados diferentes
        const selectedQuery = queries[Math.min(page - 1, queries.length - 1)] || query

        const url = `/api/news?q=${encodeURIComponent(selectedQuery)}&pageSize=${pageSize}&page=${page}&category=all`

        const response = await fetch(url)

        if (!response.ok) {
            console.error(`API error: ${response.status} ${response.statusText}`)
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: NewsResponse = await response.json()

        // Si hay muy pocos artículos, complementar con datos de fallback
        if (data.articles.length < 5) {
            const fallbackData = getFallbackArticles()
            return {
                ...data,
                articles: [...data.articles, ...fallbackData.articles.slice(0, 10)],
                totalResults: data.articles.length + 10,
            }
        }

        return data
    } catch (error) {
        console.error("Error fetching news articles:", error)
        // Retornar datos de fallback en caso de error
        return getFallbackArticles()
    }
}

// Función para obtener artículos por categoría
export async function getArticlesByCategory(category: string): Promise<NewsResponse> {
    try {
        const url = `/api/news?category=${category}&pageSize=20&page=1`

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: NewsResponse = await response.json()
        return data
    } catch (error) {
        console.error("Error fetching articles by category:", error)
        return getFallbackArticles()
    }
}

// Función para buscar artículos
export async function searchArticles(searchQuery: string): Promise<NewsResponse> {
    try {
        const enhancedQuery = `${searchQuery} agriculture weeds farming`
        const url = `/api/news?q=${encodeURIComponent(enhancedQuery)}&pageSize=20&page=1`

        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: NewsResponse = await response.json()
        return data
    } catch (error) {
        console.error("Error searching articles:", error)
        return getFallbackArticles()
    }
}

// Modificar la función getFallbackArticles para usar placeholders

// Reemplazar la función getFallbackArticles con esta versión actualizada:
function getFallbackArticles(): NewsResponse {
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
                url: "/articles/article/1", // URL interna en lugar de example.com
                urlToImage: "/placeholder.svg?height=200&width=300&text=Weed+Detection",
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
                url: "/articles/article/2", // URL interna en lugar de example.com
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
                url: "/articles/article/3", // URL interna en lugar de example.com
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
                url: "/articles/article/4", // URL interna en lugar de example.com
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
                url: "/articles/article/5", // URL interna en lugar de example.com
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
                url: "/articles/article/6", // URL interna en lugar de example.com
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
                url: "/articles/article/7", // URL interna en lugar de example.com
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
                url: "/articles/article/8", // URL interna en lugar de example.com
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
                url: "/articles/article/9", // URL interna en lugar de example.com
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
                url: "/articles/article/10", // URL interna en lugar de example.com
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
                url: "/articles/article/11", // URL interna en lugar de example.com
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
                url: "/articles/article/12", // URL interna en lugar de example.com
                urlToImage: "/images/weed-article-6.jpg",
                publishedAt: new Date(Date.now() - 950400000).toISOString(),
                source: { id: "laser-tech", name: "Laser Technology Today" },
                author: "Dr. Rachel Green",
            },
        ],
    }
}

// Función para formatear la fecha
export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

// Función para calcular tiempo de lectura estimado
export function calculateReadTime(content: string): string {
    const wordsPerMinute = 200
    const words = content.split(" ").length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min`
}

// Función para obtener categoría basada en el contenido
export function getCategoryFromContent(title: string, description: string): string {
    const content = (title + " " + description).toLowerCase()

    if (content.includes("guide") || content.includes("how to") || content.includes("step")) {
        return "Guía"
    } else if (content.includes("technique") || content.includes("method") || content.includes("control")) {
        return "Técnicas"
    } else if (content.includes("research") || content.includes("study") || content.includes("analysis")) {
        return "Investigación"
    } else if (content.includes("sustainable") || content.includes("organic") || content.includes("eco")) {
        return "Sostenibilidad"
    } else if (content.includes("technology") || content.includes("innovation") || content.includes("ai")) {
        return "Tecnología"
    } else {
        return "General"
    }
}

