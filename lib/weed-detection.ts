import * as tf from "@tensorflow/tfjs"
// Tipos de malezas ampliados con especies latinas
export enum WeedType {
  YUYO_COLORADO = "Amaranthus quitensis (Yuyo Colorado)",
  RAMA_NEGRA = "Conyza bonariensis (Rama Negra)",
  ROSETA = "Cenchrus insertus (Roseta)",
  CARDO = "Cirsium vulgare (Cardo)",
  ORTIGA = "Urtica dioica (Ortiga)",
  DIENTE_LEON = "Taraxacum officinale (Diente de León)",
  PASTO_GUINEA = "Megathyrsus maximus (Pasto Guinea)",
  TREBOL_BLANCO = "Trifolium repens (Trébol Blanco)",
  UNKNOWN = "Desconocido",
}

// Interfaz para las regiones detectadas
export interface DetectedRegion {
  x: number
  y: number
  width: number
  height: number
  confidence: number
}

// Clase para la detección de malezas
export class WeedDetector {
  private model: tf.LayersModel | null = null
  private regionModel: tf.LayersModel | null = null
  private isModelLoading = false
  private readonly IMAGE_SIZE = 400 // Tamaño de imagen usado en el modelo (400x400)
  private readonly CLASS_NAMES = [
    WeedType.YUYO_COLORADO,
    WeedType.RAMA_NEGRA,
    WeedType.ROSETA,
    WeedType.CARDO,
    WeedType.ORTIGA,
    WeedType.DIENTE_LEON,
    WeedType.PASTO_GUINEA,
    WeedType.TREBOL_BLANCO,
  ]

  constructor() {
    // Cargar los modelos cuando se instancia la clase
    this.loadModels()
  }

  // Cargar los modelos de TensorFlow.js
  private async loadModels(): Promise<void> {
    if ((this.model && this.regionModel) || this.isModelLoading) return

    this.isModelLoading = true

    try {
      console.log("Cargando modelos de detección de malezas...")

      // Cargar modelo de clasificación
      await this.loadClassificationModel()

      // Cargar modelo de detección de regiones
      await this.loadRegionDetectionModel()

      console.log("Modelos cargados exitosamente")
    } catch (error) {
      console.error("Error al cargar los modelos:", error)
      throw new Error("No se pudieron cargar los modelos de detección de malezas")
    } finally {
      this.isModelLoading = false
    }
  }

  // Cargar el modelo de clasificación
  private async loadClassificationModel(): Promise<void> {

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const input = tf.input({ shape: [this.IMAGE_SIZE, this.IMAGE_SIZE, 3] })

    // Primera capa convolucional (2 capas de 16 filtros)
    const conv1 = tf.layers
      .conv2d({
        filters: 16,
        kernelSize: 3,
        activation: "relu",
        padding: "valid",
      })
      .apply(input)

    const conv2 = tf.layers
      .conv2d({
        filters: 16,
        kernelSize: 3,
        activation: "relu",
        padding: "valid",
      })
      .apply(conv1)

    const pool1 = tf.layers.maxPooling2d({ poolSize: 2 }).apply(conv2)

    // Segunda capa convolucional (2 capas de 32 filtros)
    const conv3 = tf.layers
      .conv2d({
        filters: 32,
        kernelSize: 3,
        activation: "relu",
        padding: "valid",
      })
      .apply(pool1)

    const conv4 = tf.layers
      .conv2d({
        filters: 32,
        kernelSize: 3,
        activation: "relu",
        padding: "valid",
      })
      .apply(conv3)

    const pool2 = tf.layers.maxPooling2d({ poolSize: 2 }).apply(conv4)

    // Tercera capa convolucional (2 capas de 64 filtros)
    const conv5 = tf.layers
      .conv2d({
        filters: 64,
        kernelSize: 3,
        activation: "relu",
        padding: "valid",
      })
      .apply(pool2)

    const conv6 = tf.layers
      .conv2d({
        filters: 64,
        kernelSize: 3,
        activation: "relu",
        padding: "valid",
      })
      .apply(conv5)

    const pool3 = tf.layers.maxPooling2d({ poolSize: 2 }).apply(conv6)

    // Aplanar y capas densas
    const flatten = tf.layers.flatten().apply(pool3)

    const dense1 = tf.layers
      .dense({
        units: 128,
        activation: "relu",
      })
      .apply(flatten)

    const dropout = tf.layers.dropout({ rate: 0.3 }).apply(dense1)

    const output = tf.layers
      .dense({
        units: this.CLASS_NAMES.length,
        activation: "softmax",
      })
      .apply(dropout)

    this.model = tf.model({ inputs: input, outputs: output as tf.SymbolicTensor })
  }

  // Cargar el modelo de detección de regiones
  private async loadRegionDetectionModel(): Promise<void> {
    // Simulamos la carga del modelo con un retraso
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Creamos un modelo simulado para detección de regiones
    const input = tf.input({ shape: [this.IMAGE_SIZE, this.IMAGE_SIZE, 3] })

    // Arquitectura similar a una red U-Net simplificada para segmentación
    const conv1 = tf.layers
      .conv2d({
        filters: 32,
        kernelSize: 3,
        activation: "relu",
        padding: "same",
      })
      .apply(input)

    const pool1 = tf.layers.maxPooling2d({ poolSize: 2 }).apply(conv1)

    const conv2 = tf.layers
      .conv2d({
        filters: 64,
        kernelSize: 3,
        activation: "relu",
        padding: "same",
      })
      .apply(pool1)

    const pool2 = tf.layers.maxPooling2d({ poolSize: 2 }).apply(conv2)

    const conv3 = tf.layers
      .conv2d({
        filters: 128,
        kernelSize: 3,
        activation: "relu",
        padding: "same",
      })
      .apply(pool2)

    // Capas de detección de regiones
    const regionOutput = tf.layers
      .conv2d({
        filters: 5, // x, y, width, height, confidence
        kernelSize: 1,
        activation: "sigmoid",
        padding: "same",
      })
      .apply(conv3)

    this.regionModel = tf.model({ inputs: input, outputs: regionOutput as tf.SymbolicTensor })
  }

  // Preprocesar la imagen para el modelo
  private async preprocessImage(imageData: ImageData | HTMLImageElement): Promise<tf.Tensor> {
    return tf.tidy(() => {
      let tensor

      // Convertir la imagen a un tensor
      if (imageData instanceof ImageData) {
        tensor = tf.browser.fromPixels(imageData)
      } else {
        tensor = tf.browser.fromPixels(imageData)
      }

      // Redimensionar a 400x400 (tamaño esperado por el modelo)
      const resized = tf.image.resizeBilinear(tensor, [this.IMAGE_SIZE, this.IMAGE_SIZE])

      // Normalizar valores de 0-255 a 0-1
      const normalized = resized.div(tf.scalar(255))

      // Expandir dimensiones para que coincida con la entrada del modelo [batch, height, width, channels]
      return normalized.expandDims(0)
    })
  }

  // Detectar regiones de malezas en la imagen
  private async detectRegions(tensor: tf.Tensor): Promise<DetectedRegion[]> {
    if (!this.regionModel) {
      await this.loadModels()
    }

    if (!this.regionModel) {
      throw new Error("El modelo de detección de regiones no está disponible")
    }

    try {
      // Realizar la predicción
      const predictions = (await this.regionModel.predict(tensor)) as tf.Tensor

      // Obtener los resultados
      const regionsData = await predictions.data()

      // Liberar memoria
      predictions.dispose()

      // Procesar los datos para obtener las regiones
      const regions: DetectedRegion[] = []

      // Simular la detección de 2-4 regiones
      const numRegions = Math.floor(Math.random() * 3) + 2

      for (let i = 0; i < numRegions; i++) {
        regions.push({
          x: Math.random() * 0.7 + 0.1, // Valores entre 0.1 y 0.8
          y: Math.random() * 0.7 + 0.1, // Valores entre 0.1 y 0.8
          width: Math.random() * 0.3 + 0.1, // Valores entre 0.1 y 0.4
          height: Math.random() * 0.3 + 0.1, // Valores entre 0.1 y 0.4
          confidence: Math.random() * 0.3 + 0.7, // Valores entre 0.7 y 1.0
        })
      }

      return regions
    } catch (error) {
      console.error("Error al detectar regiones:", error)
      return []
    }
  }

  // Detectar malezas en una imagen
  public async detectWeed(image: ImageData | HTMLImageElement): Promise<{
    weedType: WeedType
    confidence: number
    allPredictions: { type: WeedType; confidence: number }[]
    regions: DetectedRegion[]
  }> {
    if (!this.model || !this.regionModel) {
      await this.loadModels()
    }

    if (!this.model || !this.regionModel) {
      throw new Error("Los modelos no están disponibles")
    }

    // Preprocesar la imagen
    const tensor = await this.preprocessImage(image)

    try {
      // Realizar la predicción de clasificación
      const predictions = (await this.model.predict(tensor)) as tf.Tensor

      // Obtener los resultados
      const probabilities = await predictions.data()

      // Detectar regiones
      const regions = await this.detectRegions(tensor)

      // Liberar memoria
      tensor.dispose()
      predictions.dispose()

      // Obtener el índice de la clase con mayor probabilidad
      const maxProbabilityIndex = probabilities.indexOf(Math.max(...Array.from(probabilities)))

      // Mapear todas las predicciones
      const allPredictions = Array.from(probabilities).map((confidence, index) => ({
        type: this.CLASS_NAMES[index] || WeedType.UNKNOWN,
        confidence: Number.parseFloat((confidence * 100).toFixed(2)),
      }))

      // Ordenar por confianza (de mayor a menor)
      allPredictions.sort((a, b) => b.confidence - a.confidence)

      // Devolver el resultado
      return {
        weedType: this.CLASS_NAMES[maxProbabilityIndex] || WeedType.UNKNOWN,
        confidence: Number.parseFloat((probabilities[maxProbabilityIndex] * 100).toFixed(2)),
        allPredictions,
        regions,
      }
    } catch (error) {
      console.error("Error al realizar la predicción:", error)
      throw new Error("No se pudo analizar la imagen")
    }
  }

  public simulatePrediction(): {
    weedType: WeedType
    confidence: number
    allPredictions: { type: WeedType; confidence: number }[]
    regions: DetectedRegion[]
  } {
    // Generar probabilidades más realistas con una especie dominante
    const randomProbabilities = this.CLASS_NAMES.map((_, index) => {
      if (index === 0) return Math.random() * 0.6 + 0.3 // 30-90% para la primera
      return Math.random() * 0.3 // 0-30% para las demás
    })

    // Normalizar para que sumen 1
    const sum = randomProbabilities.reduce((a, b) => a + b, 0)
    const normalizedProbabilities = randomProbabilities.map((p) => p / sum)

    // Obtener el índice de la clase con mayor probabilidad
    const maxProbabilityIndex = normalizedProbabilities.indexOf(Math.max(...normalizedProbabilities))

    // Asegurar que la confianza mínima sea 40%
    const maxConfidence = Math.max(normalizedProbabilities[maxProbabilityIndex] * 100, 40)

    // Mapear todas las predicciones
    const allPredictions = normalizedProbabilities.map((confidence, index) => ({
      type: this.CLASS_NAMES[index] || WeedType.UNKNOWN,
      confidence: Number.parseFloat((confidence * 100).toFixed(2)),
    }))

    // Ordenar por confianza (de mayor a menor)
    allPredictions.sort((a, b) => b.confidence - a.confidence)

    // Generar regiones más realistas
    const numRegions = Math.floor(Math.random() * 2) + 1 // 1-2 regiones
    const regions: DetectedRegion[] = []

    for (let i = 0; i < numRegions; i++) {
      regions.push({
        x: Math.random() * 0.6 + 0.1, // Valores entre 0.1 y 0.7
        y: Math.random() * 0.6 + 0.1, // Valores entre 0.1 y 0.7
        width: Math.random() * 0.2 + 0.15, // Valores entre 0.15 y 0.35
        height: Math.random() * 0.2 + 0.15, // Valores entre 0.15 y 0.35
        confidence: Math.random() * 0.2 + 0.8, // Valores entre 0.8 y 1.0
      })
    }

    return {
      weedType: this.CLASS_NAMES[maxProbabilityIndex] || WeedType.UNKNOWN,
      confidence: maxConfidence,
      allPredictions,
      regions,
    }
  }

  // Obtener información detallada sobre una maleza
  public getWeedInfo(weedType: WeedType): {
    scientificName: string
    commonName: string
    description: string
    characteristics: string[]
    controlMethods: string[]
    distribution: string
    images: string[]
  } {
    switch (weedType) {
      case WeedType.YUYO_COLORADO:
        return {
          scientificName: "Amaranthus quitensis",
          commonName: "Yuyo Colorado",
          description:
            "Planta anual de crecimiento rápido, muy competitiva y con alta producción de semillas. Es una de las malezas más importantes en cultivos de verano.",
          characteristics: [
            "Planta anual de crecimiento rápido",
            "Hojas ovales con bordes lisos",
            "Tallos robustos de color rojizo",
            "Inflorescencias terminales densas",
            "Alta producción de semillas (más de 100,000 por planta)",
          ],
          controlMethods: [
            "Control mecánico en etapas tempranas",
            "Herbicidas pre-emergentes",
            "Rotación de cultivos",
            "Aplicación de glifosato en dosis adecuadas",
          ],
          distribution: "Originaria de América en zonas cálidas y templadas. Común en la región pampeana argentina.",
          images: ["/yuyo-colorado-1.jpg", "/yuyo-colorado-2.jpg"],
        }
      case WeedType.RAMA_NEGRA:
        return {
          scientificName: "Conyza bonariensis",
          commonName: "Rama Negra",
          description:
            "Especie anual o bianual que se encuentra en Bolivia, Brasil, Paraguay, Uruguay, Chile y Argentina. Ha desarrollado resistencia a varios herbicidas.",
          characteristics: [
            "Planta anual o bianual",
            "Hojas alternas, lanceoladas y pubescentes",
            "Inflorescencias en forma de panículas",
            "Semillas pequeñas con vilano",
            "Alta capacidad de dispersión por viento",
          ],
          controlMethods: [
            "Aplicación de herbicidas en etapas tempranas",
            "Mezclas de principios activos",
            "Control mecánico",
            "Cultivos de cobertura",
          ],
          distribution: "Común en la región pampeana argentina, especialmente en bordes de caminos y cultivos.",
          images: ["/rama-negra-1.jpg", "/rama-negra-2.jpg"],
        }
      case WeedType.ROSETA:
        return {
          scientificName: "Cenchrus insertus",
          commonName: "Roseta o Cardillo chico",
          description:
            "Especie autóctona del norte y centro de Argentina. Es una maleza importante en cultivos de verano en sitios secos y arenosos.",
          characteristics: [
            "Planta anual con crecimiento rastrero",
            "Flores con pequeñas espinas",
            "Semillas con capacidad de adherencia",
            "Adaptada a suelos arenosos",
            "Ciclo estival",
          ],
          controlMethods: [
            "Control mecánico",
            "Herbicidas pre-emergentes",
            "Control antes de la floración",
            "Rotación de cultivos",
          ],
          distribution: "Norte y centro de Argentina, especialmente en suelos arenosos de la región pampeana.",
          images: ["/roseta-1.jpg", "/roseta-2.jpg"],
        }
      case WeedType.CARDO:
        return {
          scientificName: "Cirsium vulgare",
          commonName: "Cardo",
          description:
            "Planta bienal espinosa que puede alcanzar hasta 1,5 metros de altura. Invasora en pastizales y cultivos.",
          characteristics: [
            "Planta bienal espinosa",
            "Hojas con espinas en los márgenes",
            "Flores púrpuras en capítulos",
            "Raíz pivotante profunda",
            "Alta producción de semillas",
          ],
          controlMethods: [
            "Control mecánico",
            "Herbicidas selectivos",
            "Corte antes de la floración",
            "Manejo integrado",
          ],
          distribution: "Ampliamente distribuida en zonas templadas de Argentina y América del Sur.",
          images: ["/cardo-1.jpg", "/cardo-2.jpg"],
        }
      case WeedType.ORTIGA:
        return {
          scientificName: "Urtica dioica",
          commonName: "Ortiga",
          description:
            "Planta perenne conocida por sus pelos urticantes que liberan sustancias irritantes al contacto con la piel.",
          characteristics: [
            "Planta perenne con pelos urticantes",
            "Hojas opuestas, dentadas y lanceoladas",
            "Flores pequeñas y verdosas",
            "Rizomas subterráneos",
            "Prefiere suelos ricos en nitrógeno",
          ],
          controlMethods: [
            "Control mecánico con guantes",
            "Herbicidas sistémicos",
            "Cubrimiento del suelo",
            "Eliminación de rizomas",
          ],
          distribution: "Cosmopolita, común en terrenos baldíos, bordes de caminos y jardines.",
          images: ["/ortiga-1.jpg", "/ortiga-2.jpg"],
        }
      case WeedType.DIENTE_LEON:
        return {
          scientificName: "Taraxacum officinale",
          commonName: "Diente de León",
          description:
            "Planta perenne con hojas en roseta basal y flores amarillas brillantes. Muy común en céspedes y jardines.",
          characteristics: [
            "Planta perenne con roseta basal",
            "Hojas dentadas y lanceoladas",
            "Flores amarillas en capítulos solitarios",
            "Semillas con vilano para dispersión por viento",
            "Raíz pivotante profunda",
          ],
          controlMethods: [
            "Extracción manual",
            "Herbicidas selectivos",
            "Escarificación del suelo",
            "Mantenimiento adecuado del césped",
          ],
          distribution: "Ampliamente distribuida en zonas templadas de todo el mundo.",
          images: ["/diente-leon-1.jpg", "/diente-leon-2.jpg"],
        }
      case WeedType.PASTO_GUINEA:
        return {
          scientificName: "Megathyrsus maximus",
          commonName: "Pasto Guinea",
          description:
            "Pasto perenne de gran tamaño, utilizado como forraje pero puede convertirse en maleza invasora.",
          characteristics: [
            "Pasto perenne de gran tamaño",
            "Tallos erectos y robustos",
            "Hojas largas y anchas",
            "Inflorescencia en panícula abierta",
            "Alta producción de biomasa",
          ],
          controlMethods: [
            "Corte regular",
            "Herbicidas sistémicos",
            "Pastoreo intensivo",
            "Control de bordes y caminos",
          ],
          distribution: "Originario de África, ampliamente cultivado en regiones tropicales y subtropicales.",
          images: ["/pasto-guinea-1.jpg", "/pasto-guinea-2.jpg"],
        }
      case WeedType.TREBOL_BLANCO:
        return {
          scientificName: "Trifolium repens",
          commonName: "Trébol Blanco",
          description:
            "Planta perenne rastrera con hojas trifoliadas y flores blancas o rosadas. Común en céspedes y pastizales.",
          characteristics: [
            "Planta perenne rastrera",
            "Hojas trifoliadas con marcas características",
            "Flores blancas o rosadas en capítulos globosos",
            "Estolones rastreros",
            "Fijadora de nitrógeno",
          ],
          controlMethods: [
            "Herbicidas selectivos",
            "Aumento de la fertilidad del suelo",
            "Siembra de especies competitivas",
            "Control de malezas asociadas",
          ],
          distribution: "Ampliamente distribuida en zonas templadas de todo el mundo.",
          images: ["/trebol-blanco-1.jpg", "/trebol-blanco-2.jpg"],
        }
      // Información para las demás especies...
      default:
        return {
          scientificName: "Desconocido",
          commonName: "Desconocido",
          description: "Información no disponible para esta especie.",
          characteristics: ["Características no disponibles"],
          controlMethods: ["Métodos de control no disponibles"],
          distribution: "Distribución desconocida",
          images: [],
        }
    }
  }
}





