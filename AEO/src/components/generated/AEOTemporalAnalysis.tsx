"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { temporalDB, generateMockHistoricalData, type PositionRecord as DBPositionRecord, type VariabilityTest as DBVariabilityTest } from '../../lib/temporalDB';
import { 
  ArrowLeft,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw,
  Clock,
  BarChart3,
  LineChart,
  AlertTriangle,
  Target,
  Zap,
  Activity,
  Sparkles,
  Download,
  Share,
  Filter,
  Settings,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface QueryData {
  brand: string;
  query: string;
  website: string;
  screenshot?: string;
}

interface AEOTemporalAnalysisProps {
  queryData: QueryData;
  onBack: () => void;
}

// Using imported PositionRecord from temporalDB

interface TrendAnalysis {
  overall_trend: 'up' | 'down' | 'stable';
  biggest_mover: {
    llm: string;
    change: number;
    direction: 'up' | 'down' | 'stable';
  };
  most_stable: string;
  volatility_score: number;
  predictions: {
    llm: string;
    predicted_position: number;
    confidence: number;
  }[];
}

// Using imported VariabilityTest from temporalDB

const AEOTemporalAnalysis: React.FC<AEOTemporalAnalysisProps> = ({ queryData, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'trends' | 'variability' | 'monitoring'>('timeline');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [historicalData, setHistoricalData] = useState<DBPositionRecord[]>([]);
  const [trendAnalysis, setTrendAnalysis] = useState<TrendAnalysis | null>(null);
  const [variabilityData, setVariabilityData] = useState<DBVariabilityTest[]>([]);
  const [expandedLLM, setExpandedLLM] = useState<string | null>(null);

  useEffect(() => {
    loadHistoricalData();
  }, [timeRange]);

  const loadHistoricalData = async () => {
    setIsLoading(true);
    
    // Simular carga de datos históricos
    setTimeout(() => {
      // Verificar si ya hay datos, si no generar datos mock
      let existingData = temporalDB.getPositionRecords({
        brand: queryData.brand,
        query: queryData.query,
        limit: timeRange === '7d' ? 35 : timeRange === '30d' ? 150 : 450 // 5 LLMs * días
      });

      if (existingData.length === 0) {
        // Generar datos mock iniciales
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        existingData = generateMockHistoricalData(queryData.brand, queryData.query, queryData.website, days);
      }

      const mockTrendAnalysis = generateTrendAnalysis(existingData);
      const mockVariabilityData = temporalDB.getVariabilityTests({
        brand: queryData.brand,
        query: queryData.query,
        limit: 5
      });
      
      setHistoricalData(existingData);
      setTrendAnalysis(mockTrendAnalysis);
      setVariabilityData(mockVariabilityData);
      setIsLoading(false);
    }, 1500);
  };

  const generateTrendAnalysis = (data: DBPositionRecord[]): TrendAnalysis => {
    const trends = temporalDB.getPositionTrends(queryData.brand, queryData.query, 
      timeRange === '7d' ? 168 : timeRange === '30d' ? 720 : 2160);
    
    const biggestMover = trends.reduce((prev, current) => 
      current.change > prev.change ? current : prev
    );

    const mostStable = trends.reduce((prev, current) => 
      current.change < prev.change ? current : prev
    );

    // Calcular volatilidad general
    const volatilityScore = trends.reduce((sum, t) => sum + t.change, 0) / trends.length;

    return {
      overall_trend: trends.filter(t => t.trend === 'up').length > trends.filter(t => t.trend === 'down').length ? 'up' : 
                   trends.filter(t => t.trend === 'down').length > trends.filter(t => t.trend === 'up').length ? 'down' : 'stable',
      biggest_mover: {
        llm: biggestMover.llm,
        change: biggestMover.change,
        direction: biggestMover.trend
      },
      most_stable: mostStable.llm,
      volatility_score: Math.round(volatilityScore * 10) / 10,
      predictions: trends.map(t => ({
        llm: t.llm,
        predicted_position: Math.round(t.average_position),
        confidence: Math.max(60, Math.min(95, 95 - Math.floor(t.change * 10)))
      })).sort((a, b) => a.predicted_position - b.predicted_position)
    };
  };

  const runVariabilityTest = async () => {
    setIsLoading(true);
    
    // Simular ejecución de test de variabilidad real
    setTimeout(() => {
      const llms = ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'You.com'];
      
      // Generar resultados simulados para las 3 consultas
      const results = llms.map(llm => {
        const positions = [
          Math.floor(Math.random() * 5) + 1,
          Math.floor(Math.random() * 5) + 1,
          Math.floor(Math.random() * 5) + 1
        ];
        
        const minPos = Math.min(...positions);
        const maxPos = Math.max(...positions);
        const range = maxPos - minPos;
        
        // Calcular consistency score basado en la variación
        const consistencyScore = Math.max(40, 100 - (range * 20));
        
        return {
          llm,
          position_1: positions[0],
          position_2: positions[1],
          position_3: positions[2],
          consistency_score: Math.floor(consistencyScore),
          variation_range: range
        };
      });

      // Calcular consistency general del test
      const overallConsistency = Math.floor(
        results.reduce((sum, r) => sum + r.consistency_score, 0) / results.length
      );

      const newTest = {
        brand: queryData.brand,
        query: queryData.query,
        website: queryData.website,
        timestamp: new Date().toISOString(),
        results,
        overall_consistency: overallConsistency
      };
      
      // Guardar en la base de datos
      const savedTest = temporalDB.saveVariabilityTest(newTest);
      
      setVariabilityData(prev => [savedTest, ...prev]);
      setIsLoading(false);
    }, 3000);
  };

  const toggleMonitoring = () => {
    const newMonitoringState = !isMonitoring;
    setIsMonitoring(newMonitoringState);
    
    // Guardar configuración de monitoreo
    const settings = {
      brand: queryData.brand,
      query: queryData.query,
      website: queryData.website,
      frequency: 'hourly' as const,
      alert_threshold: 1,
      is_active: newMonitoringState,
      created_at: new Date().toISOString(),
      last_run: newMonitoringState ? new Date().toISOString() : null
    };
    
    temporalDB.saveMonitoringSettings(settings);
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return 'text-green-500';
      case 2: return 'text-blue-500';
      case 3: return 'text-yellow-500';
      case 4: return 'text-orange-500';
      default: return 'text-red-500';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getConsistencyColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (isLoading && historicalData.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Cargando Análisis Temporal
          </h2>
          <p className="text-muted-foreground mb-4">
            Analizando datos históricos de posiciones para "{queryData.brand}"...
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Procesando datos temporales</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span>Generando análisis de tendencias</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span>Calculando variabilidad</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Volver</span>
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Análisis Temporal AEO</h1>
            <p className="text-muted-foreground">
              Monitoreo de posiciones temporales: "{queryData.brand}" • {queryData.query}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-sm font-medium text-foreground">
                {isMonitoring ? 'Monitoreando' : 'Pausado'}
              </span>
            </div>
            <button
              onClick={toggleMonitoring}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                isMonitoring 
                  ? 'bg-red-500/10 text-red-600 hover:bg-red-500/20' 
                  : 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
              }`}
            >
              {isMonitoring ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isMonitoring ? 'Pausar' : 'Iniciar'} Monitoreo
            </button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-6">
          {[
            { id: '7d', label: 'Últimos 7 días' },
            { id: '30d', label: 'Últimos 30 días' },
            { id: '90d', label: 'Últimos 90 días' }
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-card/80'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'timeline', label: 'Línea Temporal', icon: LineChart },
            { id: 'trends', label: 'Análisis de Tendencias', icon: TrendingUp },
            { id: 'variability', label: 'Test de Variabilidad', icon: Activity },
            { id: 'monitoring', label: 'Monitoreo Continuo', icon: Clock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-card/80'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Timeline Chart */}
              <div className="bg-card rounded-xl p-6 border">
                <h4 className="text-xl font-semibold text-foreground mb-6">Evolución de Posiciones</h4>
                
                {/* Simple timeline visualization */}
                <div className="space-y-4">
                  {['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'You.com'].map((llm, index) => {
                    const llmData = historicalData.filter(d => d.llm === llm);
                    const latestPosition = llmData[llmData.length - 1]?.position || index + 1;
                    const previousPosition = llmData[llmData.length - 2]?.position || index + 1;
                    const trend = latestPosition < previousPosition ? 'up' : latestPosition > previousPosition ? 'down' : 'stable';
                    
                    return (
                      <div key={llm} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="w-20 font-medium text-foreground">{llm}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted/50 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-gradient-to-r from-primary/50 to-primary"
                                style={{ width: `${(6 - latestPosition) * 20}%` }}
                              />
                            </div>
                            <div className={`text-lg font-bold ${getPositionColor(latestPosition)}`}>
                              #{latestPosition}
                            </div>
                            {getTrendIcon(trend)}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {llmData[llmData.length - 1]?.mentions || 0} menciones
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Daily Changes */}
              <div className="bg-card rounded-xl p-6 border">
                <h5 className="font-semibold text-foreground mb-4">Cambios Recientes</h5>
                <div className="space-y-2">
                  {historicalData.slice(-5).reverse().map((record, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">{record.date}</span>
                        <span className="font-medium text-foreground">{record.llm}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${getPositionColor(record.position)}`}>
                          Posición #{record.position}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {record.mentions} menciones
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'trends' && trendAnalysis && (
            <motion.div
              key="trends"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Trend Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card rounded-xl p-6 border">
                  <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Tendencia General
                  </h5>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(trendAnalysis.overall_trend)}
                    <span className="text-lg font-bold text-foreground">
                      {trendAnalysis.overall_trend === 'up' ? 'Mejorando' : 
                       trendAnalysis.overall_trend === 'down' ? 'Empeorando' : 'Estable'}
                    </span>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h5 className="font-semibold text-foreground mb-3">Mayor Cambio</h5>
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">{trendAnalysis.biggest_mover.llm}</div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(trendAnalysis.biggest_mover.direction)}
                      <span className="text-sm text-muted-foreground">
                        {Math.abs(trendAnalysis.biggest_mover.change)} posiciones
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h5 className="font-semibold text-foreground mb-3">Más Estable</h5>
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">{trendAnalysis.most_stable}</div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-muted-foreground">
                        Volatilidad: {trendAnalysis.volatility_score}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Predictions */}
              <div className="bg-card rounded-xl p-6 border">
                <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Predicciones Próxima Semana
                </h5>
                <div className="space-y-3">
                  {trendAnalysis.predictions.map((pred, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">{pred.llm}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`font-semibold ${getPositionColor(pred.predicted_position)}`}>
                          Posición #{pred.predicted_position}
                        </span>
                        <div className="text-sm text-muted-foreground">
                          {pred.confidence}% confianza
                        </div>
                        <div className="w-16 h-2 bg-muted/50 rounded-full">
                          <div 
                            className="h-2 bg-primary rounded-full"
                            style={{ width: `${pred.confidence}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'variability' && (
            <motion.div
              key="variability"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Run New Test */}
              <div className="bg-card rounded-xl p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-foreground">Test de Variabilidad</h4>
                  <button
                    onClick={runVariabilityTest}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    {isLoading ? 'Ejecutando...' : 'Ejecutar Test'}
                  </button>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  Ejecuta la misma consulta 3 veces consecutivas para medir la consistencia de cada LLM.
                </p>
                
                {isLoading && (
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Ejecutando consulta 1 de 3...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Variability Results */}
              <div className="space-y-4">
                {variabilityData.map((test, testIndex) => (
                  <div key={testIndex} className="bg-card rounded-xl p-6 border">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-semibold text-foreground">
                        Test del {new Date(test.timestamp).toLocaleDateString('es-ES')}
                      </h5>
                      <div className="text-sm text-muted-foreground">
                        {new Date(test.timestamp).toLocaleTimeString('es-ES')}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {test.results.map((result, index) => (
                        <div key={index} className="border border-border/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-medium text-foreground">{result.llm}</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-medium ${getConsistencyColor(result.consistency_score)}`}>
                                {result.consistency_score}% consistencia
                              </span>
                              {result.variation_range <= 1 ? (
                                <Target className="w-4 h-4 text-green-500" />
                              ) : result.variation_range <= 2 ? (
                                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-red-500" />
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <div className="text-muted-foreground">Consulta 1</div>
                              <div className={`font-semibold ${getPositionColor(result.position_1)}`}>
                                #{result.position_1}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-muted-foreground">Consulta 2</div>
                              <div className={`font-semibold ${getPositionColor(result.position_2)}`}>
                                #{result.position_2}
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-muted-foreground">Consulta 3</div>
                              <div className={`font-semibold ${getPositionColor(result.position_3)}`}>
                                #{result.position_3}
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                            Rango de variación: {result.variation_range} posiciones
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'monitoring' && (
            <motion.div
              key="monitoring"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Monitoring Settings */}
              <div className="bg-card rounded-xl p-6 border">
                <h4 className="text-xl font-semibold text-foreground mb-6">Configuración de Monitoreo</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Frecuencia de Consultas
                    </label>
                    <select className="w-full px-4 py-2 bg-muted/50 border border-border/50 rounded-lg text-foreground">
                      <option>Cada hora</option>
                      <option>Cada 4 horas</option>
                      <option>Cada 12 horas</option>
                      <option>Diario</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Alertas por Cambios
                    </label>
                    <select className="w-full px-4 py-2 bg-muted/50 border border-border/50 rounded-lg text-foreground">
                      <option>Cualquier cambio</option>
                      <option>Cambios de 2+ posiciones</option>
                      <option>Solo mejoras</option>
                      <option>Solo empeoramientos</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Estado del Monitoreo</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {isMonitoring 
                      ? 'Monitoreando activamente. Próxima consulta en 47 minutos.'
                      : 'Monitoreo pausado. Haz clic en "Iniciar Monitoreo" para comenzar.'
                    }
                  </div>
                </div>
              </div>

              {/* Recent Monitoring Activity */}
              <div className="bg-card rounded-xl p-6 border">
                <h5 className="font-semibold text-foreground mb-4">Actividad Reciente</h5>
                
                <div className="space-y-3">
                  {[
                    { time: '10:30', action: 'Consulta automática ejecutada', status: 'success' },
                    { time: '09:30', action: 'Detectado cambio en Claude: #3 → #2', status: 'warning' },
                    { time: '08:30', action: 'Consulta automática ejecutada', status: 'success' },
                    { time: '07:30', action: 'Error en consulta a Gemini', status: 'error' },
                    { time: '06:30', action: 'Consulta automática ejecutada', status: 'success' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1">
                        <span className="text-sm text-foreground">{activity.action}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={loadHistoricalData}
            className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl text-foreground hover:bg-muted/50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Actualizar Datos
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors">
            <Download className="w-4 h-4" />
            Exportar Análisis
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
            <Share className="w-4 h-4" />
            Compartir Resultados
          </button>
        </div>
      </div>
    </div>
  );
};

export default AEOTemporalAnalysis;