import * as tf from "@tensorflow/tfjs"

// Tipos de malezas basados en el documento académico
export enum WeedType {
  YUYO_COLORADO = "Amaranthus quitensis (Yuyo Colorado)",
  RAMA_NEGRA = "Conyza bonariensis (Rama Negra)",
  ROSETA = "Cenchrus insertus (Roseta)",
  UNKNOWN = "Desconocido",
}

// Clase para la detección de malezas
export class WeedDetector {
  private model: tf.LayersModel | null = null
  private isModelLoading = false
  private readonly IMAGE_SIZE = 400 // Tamaño de imagen usado en el modelo (400x400)
  private readonly CLASS_NAMES = [WeedType.YUYO_COLORADO, WeedType.RAMA_NEGRA, WeedType.ROSETA]

  constructor() {
    // Cargar el modelo cuando se instancia la clase
    this.loadModel()
  }

  // Cargar el modelo de TensorFlow.js
  private async loadModel(): Promise<void> {
    if (this.model || this.isModelLoading) return

    this.isModelLoading = true

    try {
      // En un caso real, el modelo estaría alojado en un servidor
      // Para esta implementación, usaremos un modelo simulado
      console.log("Cargando modelo de detección de malezas...")

      // Simulamos la carga del modelo con un retraso
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Creamos un modelo simulado con la arquitectura descrita en el documento
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
          units: 3,
          activation: "softmax",
        })
        .apply(dropout)

      this.model = tf.model({ inputs: input, outputs: output as tf.SymbolicTensor })

      console.log("Modelo cargado exitosamente")
    } catch (error) {
      console.error("Error al cargar el modelo:", error)
      throw new Error("No se pudo cargar el modelo de detección de malezas")
    } finally {
      this.isModelLoading = false
    }
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

  // Detectar malezas en una imagen
  public async detectWeed(image: ImageData | HTMLImageElement): Promise<{
    weedType: WeedType
    confidence: number
    allPredictions: { type: WeedType; confidence: number }[]
  }> {
    if (!this.model) {
      await this.loadModel()
    }

    if (!this.model) {
      throw new Error("El modelo no está disponible")
    }

    // Preprocesar la imagen
    const tensor = await this.preprocessImage(image)

    try {
      // Realizar la predicción
      const predictions = (await this.model.predict(tensor)) as tf.Tensor

      // Obtener los resultados
      const probabilities = await predictions.data()

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
      }
    } catch (error) {
      console.error("Error al realizar la predicción:", error)
      throw new Error("No se pudo analizar la imagen")
    }
  }

  // Método para simular una predicción (para pruebas)
  public simulatePrediction(): {
    weedType: WeedType
    confidence: number
    allPredictions: { type: WeedType; confidence: number }[]
  } {
    // Generar probabilidades aleatorias
    const randomProbabilities = [Math.random(), Math.random(), Math.random()]

    // Normalizar para que sumen 1
    const sum = randomProbabilities.reduce((a, b) => a + b, 0)
    const normalizedProbabilities = randomProbabilities.map((p) => p / sum)

    // Obtener el índice de la clase con mayor probabilidad
    const maxProbabilityIndex = normalizedProbabilities.indexOf(Math.max(...normalizedProbabilities))

    // Mapear todas las predicciones
    const allPredictions = normalizedProbabilities.map((confidence, index) => ({
      type: this.CLASS_NAMES[index] || WeedType.UNKNOWN,
      confidence: Number.parseFloat((confidence * 100).toFixed(2)),
    }))

    // Ordenar por confianza (de mayor a menor)
    allPredictions.sort((a, b) => b.confidence - a.confidence)

    // Devolver el resultado
    return {
      weedType: this.CLASS_NAMES[maxProbabilityIndex] || WeedType.UNKNOWN,
      confidence: Number.parseFloat((normalizedProbabilities[maxProbabilityIndex] * 100).toFixed(2)),
      allPredictions,
    }
  }
}

