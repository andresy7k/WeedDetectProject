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

export async function getWeedArticles(query = "agriculture farming", pageSize = 20, page = 1): Promise<NewsResponse> {
    try {
        // Use multiple queries for more varied results
        const queries = [
            "agriculture farming",
            "crop management",
            "agricultural technology",
            "sustainable farming",
            "plant science",
        ]

        // Select a query based on the page to get different results
        const selectedQuery = queries[Math.min(page - 1, queries.length - 1)] || query

        const url = `/api/news?q=${encodeURIComponent(selectedQuery)}&pageSize=${pageSize}&page=${page}&category=all`

        console.log("Fetching articles from:", url)

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // Add timeout for client-side requests
            signal: AbortSignal.timeout(15000), // 15 second timeout
        })

        if (!response.ok) {
            console.error(`API error: ${response.status} ${response.statusText}`)
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: NewsResponse = await response.json()

        // Validate the response
        if (!data || !data.articles || !Array.isArray(data.articles)) {
            console.warn("Invalid response format, using fallback data")
            return getFallbackArticles()
        }

        return data
    } catch (error) {
        console.error("Error fetching news articles:", error)
        // Always return fallback data on error
        return getFallbackArticles()
    }
}

// Function to get articles by category
export async function getArticlesByCategory(category: string): Promise<NewsResponse> {
    try {
        const url = `/api/news?category=${category}&pageSize=20&page=1`

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            signal: AbortSignal.timeout(15000),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: NewsResponse = await response.json()

        if (!data || !data.articles || !Array.isArray(data.articles)) {
            return getFallbackArticles()
        }

        return data
    } catch (error) {
        console.error("Error fetching articles by category:", error)
        return getFallbackArticles()
    }
}

// Function to search articles
export async function searchArticles(searchQuery: string): Promise<NewsResponse> {
    try {
        const enhancedQuery = `${searchQuery} agriculture farming`
        const url = `/api/news?q=${encodeURIComponent(enhancedQuery)}&pageSize=20&page=1`

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            signal: AbortSignal.timeout(15000),
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: NewsResponse = await response.json()

        if (!data || !data.articles || !Array.isArray(data.articles)) {
            return getFallbackArticles()
        }

        return data
    } catch (error) {
        console.error("Error searching articles:", error)
        return getFallbackArticles()
    }
}

// Enhanced fallback data
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
                url: "https://www.sciencedaily.com/news/plants_animals/agriculture/",
                urlToImage: "/placeholder.svg?height=200&width=300&text=AI+Weed+Detection",
                publishedAt: new Date().toISOString(),
                source: { id: "sciencedaily", name: "Science Daily" },
                author: "Agricultural Research Team",
            },
            {
                id: "fallback-2",
                title: "Sustainable Weed Management: The Future of Organic Farming",
                description:
                    "Researchers develop innovative biological control methods that eliminate the need for chemical herbicides in organic farming systems.",
                content: "Organic farming requires innovative approaches to weed management...",
                url: "https://www.nature.com/subjects/agricultural-sciences",
                urlToImage: "/placeholder.svg?height=200&width=300&text=Sustainable+Farming",
                publishedAt: new Date(Date.now() - 86400000).toISOString(),
                source: { id: "nature", name: "Nature" },
                author: "Environmental Science Team",
            },
            {
                id: "fallback-3",
                title: "Climate Change Accelerates Invasive Weed Spread Across Farmlands",
                description:
                    "New study reveals how rising temperatures and changing precipitation patterns are helping invasive weeds colonize new agricultural regions.",
                content: "Climate change is significantly impacting weed distribution...",
                url: "https://www.reuters.com/business/environment/",
                urlToImage: "/placeholder.svg?height=200&width=300&text=Climate+Change",
                publishedAt: new Date(Date.now() - 172800000).toISOString(),
                source: { id: "reuters", name: "Reuters" },
                author: "Climate Research Team",
            },
            {
                id: "fallback-4",
                title: "Precision Agriculture: GPS-Guided Weed Control Systems",
                description:
                    "Advanced GPS and sensor technology enable farmers to target weeds with millimeter precision, dramatically reducing herbicide waste.",
                content: "Precision agriculture is transforming weed control strategies...",
                url: "https://www.bbc.com/news/science-environment",
                urlToImage: "/placeholder.svg?height=200&width=300&text=Precision+Agriculture",
                publishedAt: new Date(Date.now() - 259200000).toISOString(),
                source: { id: "bbc", name: "BBC News" },
                author: "Technology Reporter",
            },
            {
                id: "fallback-5",
                title: "Breakthrough: Genetically Modified Crops Resist All Known Weeds",
                description:
                    "Scientists engineer crop varieties with natural weed-suppressing compounds, potentially eliminating the need for herbicides.",
                content: "Genetic engineering offers new solutions for weed management...",
                url: "https://www.cnn.com/specials/world/cnn-climate",
                urlToImage: "/placeholder.svg?height=200&width=300&text=GMO+Crops",
                publishedAt: new Date(Date.now() - 345600000).toISOString(),
                source: { id: "cnn", name: "CNN" },
                author: "Science Correspondent",
            },
            {
                id: "fallback-6",
                title: "Economic Impact: Herbicide-Resistant Weeds Cost Farmers Billions",
                description:
                    "Comprehensive analysis shows that resistant weed species are causing unprecedented economic losses in global agriculture.",
                content: "Herbicide resistance is creating significant economic challenges...",
                url: "https://www.theguardian.com/environment",
                urlToImage: "/placeholder.svg?height=200&width=300&text=Economic+Impact",
                publishedAt: new Date(Date.now() - 432000000).toISOString(),
                source: { id: "guardian", name: "The Guardian" },
                author: "Agricultural Economics Team",
            },
            {
                id: "fallback-7",
                title: "Robotic Weed Killers: The Future of Automated Farming",
                description:
                    "Autonomous robots equipped with AI vision systems can identify and eliminate weeds without human intervention.",
                content: "Robotics is revolutionizing agricultural weed control...",
                url: "https://www.phys.org/news/agriculture/",
                urlToImage: "/placeholder.svg?height=200&width=300&text=Agricultural+Robots",
                publishedAt: new Date(Date.now() - 518400000).toISOString(),
                source: { id: "phys", name: "Phys.org" },
                author: "Robotics Research Team",
            },
            {
                id: "fallback-8",
                title: "Cover Crops: Nature's Solution to Weed Suppression",
                description:
                    "Farmers discover that strategic cover crop planting can naturally suppress weeds while improving soil health.",
                content: "Cover crops provide natural weed suppression benefits...",
                url: "https://www.usda.gov/topics/farming",
                urlToImage: "/placeholder.svg?height=200&width=300&text=Cover+Crops",
                publishedAt: new Date(Date.now() - 604800000).toISOString(),
                source: { id: "usda", name: "USDA" },
                author: "Agricultural Extension Service",
            },
            {
                id: "fallback-9",
                title: "Drone Technology Maps Weed Infestations from Above",
                description:
                    "High-resolution drone imaging helps farmers identify weed hotspots and plan targeted treatment strategies.",
                content: "Drone technology is enhancing weed detection capabilities...",
                url: "https://www.nationalgeographic.com/environment/",
                urlToImage: "/placeholder.svg?height=200&width=300&text=Drone+Technology",
                publishedAt: new Date(Date.now() - 691200000).toISOString(),
                source: { id: "natgeo", name: "National Geographic" },
                author: "Environmental Technology Team",
            },
            {
                id: "fallback-10",
                title: "Biological Warfare: Beneficial Insects Combat Agricultural Weeds",
                description:
                    "Scientists release specially selected insects that target invasive weeds while leaving crops unharmed.",
                content: "Biological control agents offer sustainable weed management...",
                url: "https://www.smithsonianmag.com/science-nature/",
                urlToImage: "/placeholder.svg?height=200&width=300&text=Biological+Control",
                publishedAt: new Date(Date.now() - 777600000).toISOString(),
                source: { id: "smithsonian", name: "Smithsonian Magazine" },
                author: "Entomology Research Team",
            },
            {
                id: "fallback-11",
                title: "Smart Sensors Detect Weeds Before They Emerge",
                description:
                    "Underground sensor networks can predict weed emergence patterns, allowing for preemptive treatment strategies.",
                content: "Smart sensor technology enables predictive weed management...",
                url: "https://www.popsci.com/environment/",
                urlToImage: "/placeholder.svg?height=200&width=300&text=Smart+Sensors",
                publishedAt: new Date(Date.now() - 864000000).toISOString(),
                source: { id: "popsci", name: "Popular Science" },
                author: "Technology Innovation Team",
            },
            {
                id: "fallback-12",
                title: "Laser Technology Zaps Weeds Without Chemicals",
                description:
                    "Innovative laser systems can selectively destroy weeds using precise energy beams, eliminating the need for herbicides.",
                content: "Laser technology offers chemical-free weed elimination...",
                url: "https://www.newscientist.com/subject/environment/",
                urlToImage: "/placeholder.svg?height=200&width=300&text=Laser+Technology",
                publishedAt: new Date(Date.now() - 950400000).toISOString(),
                source: { id: "newscientist", name: "New Scientist" },
                author: "Laser Technology Research Team",
            },
        ],
    }
}

// Function to format date
export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

// Function to calculate estimated reading time
export function calculateReadTime(content: string): string {
    const wordsPerMinute = 200
    const words = content.split(" ").length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min`
}

// Function to get category based on content
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
