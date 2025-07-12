"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Camera, 
  FileImage, 
  Scan, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  TrendingDown,
  Monitor,
  Smartphone,
  ArrowLeft,
  Download,
  Zap,
  Search,
  Eye
} from 'lucide-react';

interface QueryData {
  brand: string;
  query: string;
  website: string;
  screenshot?: string;
}

interface AEOOCRAnalysisProps {
  queryData: QueryData;
  onBack: () => void;
}

interface LLMAnalysisResult {
  overall_presence_score: number;
  brand_visibility: {
    score: number;
    mentions_detected: number;
    position_in_results: string;
    context_quality: string;
  };
  content_optimization: {
    score: number;
    keyword_relevance: string;
    semantic_match: string;
    answer_quality: string;
  };
  llm_performance: {
    score: number;
    chatgpt_presence: string;
    claude_presence: string;
    gemini_presence: string;
  };
  aeo_opportunities: {
    score: number;
    snippet_optimization: string;
    featured_snippet_potential: string;
    voice_search_readiness: string;
  };
  recommendations: string[];
}

const AEOOCRAnalysis: React.FC<AEOOCRAnalysisProps> = ({ queryData, onBack }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(queryData.screenshot || null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<LLMAnalysisResult | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'url' | null>(queryData.screenshot ? 'upload' : null);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-analyze if screenshot already exists
  useEffect(() => {
    if (queryData.screenshot && !analysisResult) {
      analyzeImage();
    }
  }, [queryData.screenshot]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setUploadMethod('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (websiteUrl.trim()) {
      // Simulate screenshot capture
      setUploadedImage('/api/placeholder/800/600');
      setUploadMethod('url');
    }
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    // Simulate MistralAI analysis focused on LLM optimization
    setTimeout(() => {
      const mockResult: LLMAnalysisResult = {
        overall_presence_score: 73,
        brand_visibility: {
          score: 79,
          mentions_detected: 3,
          position_in_results: `${queryData.brand} aparece en posición 2-4 en respuestas de LLMs`,
          context_quality: 'Mencionado positivamente en contexto de liderazgo tecnológico'
        },
        content_optimization: {
          score: 68,
          keyword_relevance: `Alta relevancia para "${queryData.query}"`,
          semantic_match: 'Buena correspondencia semántica con la consulta',
          answer_quality: 'Respuestas detalladas pero podrían ser más concisas'
        },
        llm_performance: {
          score: 75,
          chatgpt_presence: `${queryData.brand} mencionado en 8/10 consultas similares`,
          claude_presence: `Aparece en respuestas detalladas con contexto positivo`,
          gemini_presence: `Incluido en comparativas y recomendaciones`
        },
        aeo_opportunities: {
          score: 71,
          snippet_optimization: 'Potencial alto para featured snippets',
          featured_snippet_potential: 'Estructura de contenido favorable para extractos',
          voice_search_readiness: 'Contenido optimizable para búsquedas por voz'
        },
        recommendations: [
          `Crear contenido específico que responda directamente a "${queryData.query}"`,
          `Optimizar ${queryData.website} para aparecer en más contextos de LLMs`,
          'Desarrollar FAQ estructuradas que los LLMs puedan citar fácilmente',
          'Mejorar la densidad de información factual sobre la marca',
          'Crear contenido en formato de definiciones y explicaciones concisas',
          'Implementar schema markup específico para entidades de marca'
        ]
      };
      
      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (score >= 60) return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Volver</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Análisis de Presencia en LLMs</h1>
            <p className="text-muted-foreground">
              Evaluando cómo aparece "{queryData.brand}" en LLMs para la consulta: "{queryData.query}"
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Website: {queryData.website}
            </p>
          </div>
        </div>

        {!uploadedImage ? (
          /* Upload Section */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Analiza resultados de LLMs con screenshot
              </h2>
              <p className="text-muted-foreground mb-2">
                Sube capturas de pantalla de ChatGPT, Claude, Gemini u otros LLMs mostrando respuestas sobre "{queryData.brand}"
              </p>
              <p className="text-sm text-muted-foreground">
                MistralAI analizará cómo aparece tu marca y sugerirá optimizaciones AEO
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* File Upload */}
              <div 
                className="border-2 border-dashed border-border rounded-2xl p-8 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Subir Imagen</h3>
                  <p className="text-sm text-muted-foreground">
                    Arrastra y suelta o haz click para seleccionar
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* URL Capture */}
              <div className="border-2 border-border rounded-2xl p-8">
                <div className="text-center mb-4">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Capturar URL</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Genera screenshot automático
                  </p>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://ejemplo.com"
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    onClick={handleUrlSubmit}
                    disabled={!websiteUrl.trim()}
                    className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors"
                  >
                    Capturar Screenshot
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : !analysisResult ? (
          /* Preview & Analyze */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Vista Previa</h3>
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="Screenshot preview"
                  className="w-full max-h-96 object-contain rounded-xl border"
                />
                {uploadMethod === 'url' && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Capturado
                  </div>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 disabled:opacity-50 transition-colors text-lg font-semibold"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Analizando con MistralAI...
                  </>
                ) : (
                  <>
                    <Scan className="w-5 h-5" />
                    Analizar Presencia LLM + OCR
                  </>
                )}
              </button>
              {isAnalyzing && (
                <p className="text-muted-foreground mt-4">
                  Esto puede tomar unos momentos mientras analizamos la presencia de tu marca en LLMs...
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Overall Score */}
            <div className="bg-gradient-to-r from-card to-card/50 rounded-2xl p-6 mb-8 border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Presencia en LLMs</h3>
                  <p className="text-muted-foreground">Análisis de optimización AEO con MistralAI</p>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold ${getScoreColor(analysisResult.overall_presence_score)}`}>
                    {analysisResult.overall_presence_score}/100
                  </div>
                  <div className="flex items-center gap-2 justify-end mt-1">
                    {getScoreIcon(analysisResult.overall_presence_score)}
                    <span className="text-sm text-muted-foreground">
                      {analysisResult.overall_presence_score >= 80 ? 'Excelente presencia' : 
                       analysisResult.overall_presence_score >= 60 ? 'Buena presencia' : 'Presencia limitada'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Visibilidad de Marca', data: analysisResult.brand_visibility, icon: Search },
                { title: 'Optimización de Contenido', data: analysisResult.content_optimization, icon: FileImage },
                { title: 'Performance en LLMs', data: analysisResult.llm_performance, icon: Zap },
                { title: 'Oportunidades AEO', data: analysisResult.aeo_opportunities, icon: TrendingUp },
              ].map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <section.icon className="w-5 h-5 text-primary" />
                    <h4 className="font-semibold text-foreground">{section.title}</h4>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-2xl font-bold ${getScoreColor(section.data.score)}`}>
                      {section.data.score}
                    </span>
                    {getScoreIcon(section.data.score)}
                  </div>
                  <div className="space-y-1">
                    {Object.entries(section.data).filter(([key]) => key !== 'score').slice(0, 2).map(([key, value], i) => (
                      <p key={i} className="text-xs text-muted-foreground">
                        • {typeof value === 'string' ? value : `${value} menciones`}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="bg-card rounded-2xl p-6 border">
              <h4 className="text-xl font-semibold text-foreground mb-4">
                Recomendaciones de Optimización
              </h4>
              <div className="space-y-3">
                {analysisResult.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => {
                  setUploadedImage(null);
                  setAnalysisResult(null);
                  setUploadMethod(null);
                }}
                className="px-6 py-3 border border-border rounded-xl text-foreground hover:bg-muted/50 transition-colors"
              >
                Nuevo Análisis
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
                <Download className="w-4 h-4" />
                Exportar Reporte
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AEOOCRAnalysis;