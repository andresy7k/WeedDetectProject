import * as tf from "@tensorflow/tfjs"

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

export interface DetectedRegion {
  x: number
  y: number
  width: number
  height: number
  confidence: number
}

export class WeedDetector {
  private model: tf.LayersModel | null = null
  private regionModel: tf.LayersModel | null = null
  private isModelLoading = false
  public isDemoMode = true
  public modelError: string | null = null

  private readonly IMAGE_SIZE = 224
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
    this.loadModels()
  }

  private async loadModels(): Promise<void> {
    if ((this.model && this.regionModel) || this.isModelLoading) return

    this.isModelLoading = true
    this.modelError = null

    try {
      console.log("Cargando modelos de detección de malezas...")

      try {
        this.model = await tf.loadLayersModel("/models/classification-model.json")
        console.log("Modelo de clasificación cargado")
      } catch {
        this.model = null
      }

      try {
        this.regionModel = await tf.loadLayersModel("/models/region-model.json")
        console.log("Modelo de regiones cargado")
      } catch {
        this.regionModel = null
      }

      if (this.model) {
        this.isDemoMode = false
        console.log("Modelos cargados exitosamente")
      } else {
        this.isDemoMode = true
        this.modelError = "No se encontró un modelo entrenado en /models/. Resultados en modo demostración."
        console.warn(this.modelError)
      }
    } catch (error) {
      this.isDemoMode = true
      this.modelError = "Error al cargar los modelos. Modo demostración activo."
      console.error("Error al cargar los modelos:", error)
    } finally {
      this.isModelLoading = false
    }
  }

  private preprocessImage(image: ImageData | HTMLImageElement): tf.Tensor {
    return tf.tidy(() => {
      const tensor = tf.browser.fromPixels(image)
      const resized = tf.image.resizeBilinear(tensor, [this.IMAGE_SIZE, this.IMAGE_SIZE])
      const normalized = resized.div(tf.scalar(255))
      return normalized.expandDims(0)
    })
  }

  private async detectRegions(tensor: tf.Tensor): Promise<DetectedRegion[]> {
    if (!this.regionModel) return []

    try {
      const predictions = (await this.regionModel.predict(tensor)) as tf.Tensor
      const data = await predictions.data()
      const shape = predictions.shape
      predictions.dispose()

      const gridH = shape[1] || 1
      const gridW = shape[2] || 1
      const channels = shape[3] || 5
      const regions: DetectedRegion[] = []
      const CONF_THRESHOLD = 0.5

      for (let gy = 0; gy < gridH; gy++) {
        for (let gx = 0; gx < gridW; gx++) {
          const base = (gy * gridW + gx) * channels
          const confidence = data[base + 4]
          if (confidence >= CONF_THRESHOLD) {
            const cx = data[base]
            const cy = data[base + 1]
            const w = data[base + 2]
            const h = data[base + 3]
            regions.push({
              x: Math.max(0, Math.min(1, cx - w / 2)),
              y: Math.max(0, Math.min(1, cy - h / 2)),
              width: Math.max(0.05, Math.min(1, w)),
              height: Math.max(0.05, Math.min(1, h)),
              confidence: Math.min(1, confidence),
            })
          }
        }
      }

      return regions.slice(0, 10)
    } catch (error) {
      console.error("Error al detectar regiones:", error)
      return []
    }
  }

  public async detectWeed(image: ImageData | HTMLImageElement): Promise<{
    weedType: WeedType
    confidence: number
    allPredictions: { type: WeedType; confidence: number }[]
    regions: DetectedRegion[]
    isDemo: boolean
  }> {
    if (!this.model && !this.isModelLoading) {
      await this.loadModels()
    }

    if (!this.model) {
      const demo = this.simulatePrediction()
      return { ...demo, isDemo: true }
    }

    const tensor = this.preprocessImage(image)

    try {
      const predictions = (await this.model.predict(tensor)) as tf.Tensor
      const probabilities = await predictions.data()
      const regions = await this.detectRegions(tensor)

      tensor.dispose()
      predictions.dispose()

      const probsArray = Array.from(probabilities)
      const maxIndex = probsArray.indexOf(Math.max(...probsArray))

      const allPredictions = probsArray
        .map((confidence, index) => ({
          type: this.CLASS_NAMES[index] || WeedType.UNKNOWN,
          confidence: Number.parseFloat((confidence * 100).toFixed(2)),
        }))
        .sort((a, b) => b.confidence - a.confidence)

      const topConfidence = probsArray[maxIndex] * 100
      const isUncertain = topConfidence < 50

      return {
        weedType: isUncertain ? WeedType.UNKNOWN : this.CLASS_NAMES[maxIndex] || WeedType.UNKNOWN,
        confidence: Number.parseFloat(topConfidence.toFixed(2)),
        allPredictions,
        regions,
        isDemo: false,
      }
    } catch (error) {
      console.error("Error al realizar la predicción:", error)
      tensor.dispose()
      const demo = this.simulatePrediction()
      return { ...demo, isDemo: true }
    }
  }

  public simulatePrediction(): {
    weedType: WeedType
    confidence: number
    allPredictions: { type: WeedType; confidence: number }[]
    regions: DetectedRegion[]
  } {
    const randomProbabilities = this.CLASS_NAMES.map(() => Math.random())
    const sum = randomProbabilities.reduce((a, b) => a + b, 0)
    const normalized = randomProbabilities.map((p) => p / sum)

    const maxIndex = normalized.indexOf(Math.max(...normalized))
    const maxConfidence = normalized[maxIndex] * 100

    const allPredictions = normalized
      .map((confidence, index) => ({
        type: this.CLASS_NAMES[index] || WeedType.UNKNOWN,
        confidence: Number.parseFloat((confidence * 100).toFixed(2)),
      }))
      .sort((a, b) => b.confidence - a.confidence)

    const numRegions = Math.floor(Math.random() * 2) + 1
    const regions: DetectedRegion[] = []

    for (let i = 0; i < numRegions; i++) {
      regions.push({
        x: Math.random() * 0.6 + 0.1,
        y: Math.random() * 0.6 + 0.1,
        width: Math.random() * 0.2 + 0.15,
        height: Math.random() * 0.2 + 0.15,
        confidence: Math.random() * 0.2 + 0.6,
      })
    }

    return {
      weedType: this.CLASS_NAMES[maxIndex] || WeedType.UNKNOWN,
      confidence: Number.parseFloat(maxConfidence.toFixed(2)),
      allPredictions,
      regions,
    }
  }

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
          images: [],
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
          images: [],
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
          images: [],
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
          images: [],
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
          images: [],
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
          images: [],
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
          images: [],
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
          images: [],
        }
      default:
        return {
          scientificName: "Desconocido",
          commonName: "Desconocido",
          description: "No se pudo identificar la especie con suficiente confianza. Intenta con una imagen más clara donde la planta esté bien iluminada y ocupe gran parte del encuadre.",
          characteristics: ["Identificación no concluyente"],
          controlMethods: ["Reintenta con otra foto para obtener un resultado más preciso"],
          distribution: "",
          images: [],
        }
    }
  }
}
