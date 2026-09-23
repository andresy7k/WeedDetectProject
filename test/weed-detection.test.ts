import { WeedDetector, WeedType, DetectedRegion } from 'C:/Users/Andress/Desktop/WeedDetect/lib/weed-detection';
import * as tf from '@tensorflow/tfjs';

// Mock TensorFlow.js
jest.mock('@tensorflow/tfjs', () => {
  const actual = jest.requireActual('@tensorflow/tfjs');
  return {
    ...actual,
    browser: {
      fromPixels: jest.fn().mockReturnValue(actual.tensor([[[[0, 0, 0]]]])),
    },
    image: {
      resizeBilinear: jest.fn().mockImplementation(tensor => tensor),
    },
  };
});

// Mock de ImageData
(global as any).ImageData = class {
  data: Uint8ClampedArray;
  width: number;
  height: number;

  constructor(data: Uint8ClampedArray, width: number, height: number) {
    this.data = data;
    this.width = width;
    this.height = height;
  }
} as unknown as typeof ImageData;


// Mock de HTMLImageElement
(global as any).HTMLImageElement = class {
  src = '';
  onload: () => void = () => {};
  constructor() {}
} as unknown as typeof HTMLImageElement;


const mockImage = {
  width: 100,
  height: 100,
} as unknown as HTMLImageElement;

describe('WeedDetector', () => {
  let weedDetector: WeedDetector;

  beforeEach(() => {
    weedDetector = new WeedDetector();
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with null models', () => {
      expect(weedDetector['model']).toBeNull();
      expect(weedDetector['regionModel']).toBeNull();
    });

    it('should have correct class names', () => {
      expect(weedDetector['CLASS_NAMES']).toEqual([
        WeedType.YUYO_COLORADO,
        WeedType.RAMA_NEGRA,
        WeedType.ROSETA,
        WeedType.CARDO,
        WeedType.ORTIGA,
        WeedType.DIENTE_LEON,
        WeedType.PASTO_GUINEA,
        WeedType.TREBOL_BLANCO,
      ]);
    });
  });

    it('should not load models if already loading', async () => {
      weedDetector['isModelLoading'] = true;
      await weedDetector['loadModels']();
    });

  describe('Simulated Prediction', () => {
    it('should return a simulated prediction with realistic values', () => {
      const result = weedDetector.simulatePrediction();
      expect(result).toHaveProperty('weedType');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('allPredictions');
      expect(result).toHaveProperty('regions');
      expect(result.confidence).toBeGreaterThanOrEqual(40);
      expect(result.regions.length).toBeGreaterThanOrEqual(1);
      expect(result.regions.length).toBeLessThanOrEqual(2);
      for (let i = 1; i < result.allPredictions.length; i++) {
        expect(result.allPredictions[i].confidence).toBeLessThanOrEqual(result.allPredictions[i - 1].confidence);
      }
    });
  });

  describe('Weed Information', () => {
    it('should return information for Yuyo Colorado', () => {
      const info = weedDetector.getWeedInfo(WeedType.YUYO_COLORADO);
      expect(info.scientificName).toBe('Amaranthus quitensis');
      expect(info.commonName).toBe('Yuyo Colorado');
      expect(info.description).toContain('Planta anual de crecimiento rápido');
      expect(info.characteristics.length).toBeGreaterThan(0);
      expect(info.controlMethods.length).toBeGreaterThan(0);
      expect(info.distribution).toContain('América');
      expect(info.images.length).toBe(2);
    });

    it('should return information for all weed types', () => {
      Object.values(WeedType).forEach(type => {
        if (type !== WeedType.UNKNOWN) {
          const info = weedDetector.getWeedInfo(type);
          expect(info.scientificName).not.toBe('Desconocido');
          expect(info.commonName).not.toBe('Desconocido');
        }
      });
    });

    it('should return unknown info for unknown weed type', () => {
      const info = weedDetector.getWeedInfo(WeedType.UNKNOWN);
      expect(info.scientificName).toBe('Desconocido');
      expect(info.commonName).toBe('Desconocido');
      expect(info.description).toContain('no disponible');
      expect(info.images.length).toBe(0);
    });
  });

  afterAll(() => {
    tf.disposeVariables();
  });
});
