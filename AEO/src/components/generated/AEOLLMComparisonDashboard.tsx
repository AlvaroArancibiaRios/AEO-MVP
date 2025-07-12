"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AEOLLMComparisonGrid from './AEOLLMComparisonGrid';
import { ArrowLeft, Download, Filter, SortAsc, SortDesc, TrendingUp, TrendingDown, BarChart3, Activity, Target, Award, Zap, Eye, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
interface QueryData {
  brand: string;
  query: string;
  website: string;
}
interface LLMModel {
  id: string;
  name: string;
  mentions: number;
  accuracy: number;
  responseTime: number;
  ranking: number;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  color: string;
  lastUpdated: string;
  totalQueries: number;
  successRate: number;
  avgPosition: number;
}
interface AEOLLMComparisonDashboardProps {
  queryData: QueryData;
  onBack: () => void;
}
const AEOLLMComparisonDashboard: React.FC<AEOLLMComparisonDashboardProps> = ({
  queryData,
  onBack
}) => {
  const [sortBy, setSortBy] = useState<'mentions' | 'accuracy' | 'ranking' | 'responseTime'>('mentions');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterBy, setFilterBy] = useState<'all' | 'top' | 'trending'>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Mock comprehensive LLM data
  const llmModels: LLMModel[] = [{
    id: 'chatgpt',
    name: 'ChatGPT',
    mentions: 15,
    accuracy: 94.2,
    responseTime: 1.2,
    ranking: 1,
    trend: 'up',
    trendPercentage: 12.5,
    color: '#10b981',
    lastUpdated: '2024-01-15T10:30:00Z',
    totalQueries: 1250,
    successRate: 96.8,
    avgPosition: 1.3
  }, {
    id: 'perplexity',
    name: 'Perplexity',
    mentions: 12,
    accuracy: 91.8,
    responseTime: 0.9,
    ranking: 2,
    trend: 'up',
    trendPercentage: 8.3,
    color: '#3b82f6',
    lastUpdated: '2024-01-15T10:25:00Z',
    totalQueries: 980,
    successRate: 94.2,
    avgPosition: 1.8
  }, {
    id: 'claude',
    name: 'Claude',
    mentions: 8,
    accuracy: 89.5,
    responseTime: 1.5,
    ranking: 3,
    trend: 'stable',
    trendPercentage: 0.2,
    color: '#8b5cf6',
    lastUpdated: '2024-01-15T10:20:00Z',
    totalQueries: 750,
    successRate: 92.1,
    avgPosition: 2.4
  }, {
    id: 'gemini',
    name: 'Gemini',
    mentions: 7,
    accuracy: 87.3,
    responseTime: 1.1,
    ranking: 4,
    trend: 'down',
    trendPercentage: -5.2,
    color: '#f59e0b',
    lastUpdated: '2024-01-15T10:15:00Z',
    totalQueries: 680,
    successRate: 89.7,
    avgPosition: 2.9
  }, {
    id: 'deepspeak',
    name: 'DeepSpeak',
    mentions: 5,
    accuracy: 84.1,
    responseTime: 2.1,
    ranking: 5,
    trend: 'down',
    trendPercentage: -8.7,
    color: '#ef4444',
    lastUpdated: '2024-01-15T10:10:00Z',
    totalQueries: 420,
    successRate: 86.3,
    avgPosition: 3.7
  }];

  // Historical trend data
  const trendData = [{
    date: '2024-01-01',
    ChatGPT: 12,
    Perplexity: 10,
    Claude: 9,
    Gemini: 8,
    DeepSpeak: 6
  }, {
    date: '2024-01-05',
    ChatGPT: 13,
    Perplexity: 11,
    Claude: 8,
    Gemini: 9,
    DeepSpeak: 5
  }, {
    date: '2024-01-10',
    ChatGPT: 14,
    Perplexity: 12,
    Claude: 8,
    Gemini: 7,
    DeepSpeak: 5
  }, {
    date: '2024-01-15',
    ChatGPT: 15,
    Perplexity: 12,
    Claude: 8,
    Gemini: 7,
    DeepSpeak: 5
  }] as any[];

  // Radar chart data for model comparison
  const radarData = [{
    metric: 'Accuracy',
    ChatGPT: 94,
    Perplexity: 92,
    Claude: 90,
    Gemini: 87,
    DeepSpeak: 84
  }, {
    metric: 'Speed',
    ChatGPT: 85,
    Perplexity: 95,
    Claude: 75,
    Gemini: 90,
    DeepSpeak: 60
  }, {
    metric: 'Mentions',
    ChatGPT: 100,
    Perplexity: 80,
    Claude: 53,
    Gemini: 47,
    DeepSpeak: 33
  }, {
    metric: 'Success Rate',
    ChatGPT: 97,
    Perplexity: 94,
    Claude: 92,
    Gemini: 90,
    DeepSpeak: 86
  }, {
    metric: 'Consistency',
    ChatGPT: 92,
    Perplexity: 88,
    Claude: 85,
    Gemini: 82,
    DeepSpeak: 78
  }] as any[];
  const sortedModels = useMemo(() => {
    let filtered = [...llmModels];
    if (filterBy === 'top') {
      filtered = filtered.filter(model => model.ranking <= 3);
    } else if (filterBy === 'trending') {
      filtered = filtered.filter(model => model.trend === 'up');
    }
    return filtered.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [llmModels, sortBy, sortOrder, filterBy]);
  const handleExport = () => {
    const data = {
      query: queryData,
      models: llmModels,
      exportDate: new Date().toISOString(),
      timeRange: selectedTimeRange
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `llm-comparison-${queryData.brand}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const CustomTooltip = ({
    active,
    payload,
    label
  }: {
    active?: boolean;
    payload?: Array<{
      color: string;
      dataKey: string;
      value: number;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl p-4 shadow-xl">
          <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
          {payload.map((entry, index) => <p key={index} className="text-sm flex items-center gap-2" style={{
          color: entry.color
        }}>
              <div className="w-3 h-3 rounded-full" style={{
            backgroundColor: entry.color
          }} />
              {entry.dataKey}: <span className="font-bold">{entry.value}</span>
            </p>)}
        </div>;
    }
    return null;
  };
  return <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-card/50 to-card border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted/80 rounded-xl transition-all duration-200 border border-border/50">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Volver</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Comparación Detallada de LLMs</h1>
              <p className="text-muted-foreground">
                Análisis profundo para "{queryData.query}" - {queryData.brand}
                {queryData.website && <span className="ml-2">({queryData.website})</span>}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <select value={selectedTimeRange} onChange={e => setSelectedTimeRange(e.target.value as '7d' | '30d' | '90d')} className="px-4 py-2 bg-muted/50 border border-border/50 rounded-xl text-sm font-medium">
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="90d">Últimos 90 días</option>
            </select>
            
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 font-medium">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced LLM Comparison Grid */}
      <AEOLLMComparisonGrid
        llmResults={llmModels.map(model => ({
          name: model.name,
          mentions: model.mentions,
          accuracy: model.accuracy,
          relevance: model.relevance || 85,
          sentiment: (model.sentiment || 'positive') as 'positive' | 'neutral' | 'negative',
          position: model.ranking,
          context_quality: model.contextQuality || 'Excelente contexto con información detallada',
          citation_frequency: model.citationFreq || 80,
          trending: model.trend,
          color: model.color,
          icon: model.icon
        }))}
        onSelectLLM={(llm) => console.log('Selected LLM:', llm)}
        selectedLLM={null}
      />

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Total de Modelos</h3>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">{llmModels.length}</p>
          <p className="text-xs text-muted-foreground">Analizados</p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Precisión Promedio</h3>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            {(llmModels.reduce((acc, model) => acc + model.accuracy, 0) / llmModels.length).toFixed(1)}%
          </p>
          <p className="text-xs text-muted-foreground">Across all models</p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Tiempo Respuesta Promedio</h3>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            {(llmModels.reduce((acc, model) => acc + model.responseTime, 0) / llmModels.length).toFixed(1)}s
          </p>
          <p className="text-xs text-muted-foreground">Average response time</p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Modelos en Tendencia</h3>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">
            {llmModels.filter(model => model.trend === 'up').length}
          </p>
          <p className="text-xs text-muted-foreground">Improving performance</p>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select value={filterBy} onChange={e => setFilterBy(e.target.value as 'all' | 'top' | 'trending')} className="px-3 py-2 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium">
            <option value="all">Todos los modelos</option>
            <option value="top">Top 3 modelos</option>
            <option value="trending">En tendencia</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">Ordenar por:</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as 'mentions' | 'accuracy' | 'ranking' | 'responseTime')} className="px-3 py-2 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium">
            <option value="mentions">Menciones</option>
            <option value="accuracy">Precisión</option>
            <option value="ranking">Ranking</option>
            <option value="responseTime">Tiempo de Respuesta</option>
          </select>
          
          <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="p-2 bg-muted/50 hover:bg-muted/80 rounded-lg transition-colors border border-border/50">
            {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Model Comparison Table */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5
    }} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-border/50">
          <h3 className="text-xl font-semibold text-foreground">Comparación Detallada de Modelos</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Métricas completas de rendimiento para cada modelo LLM
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Modelo</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Menciones</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Precisión</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Tiempo Resp.</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Ranking</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Tendencia</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Tasa Éxito</th>
                <th className="text-left p-4 text-sm font-semibold text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedModels.map((model, index) => <motion.tr key={model.id} initial={{
              opacity: 0,
              x: -20
            }} animate={{
              opacity: 1,
              x: 0
            }} transition={{
              delay: 0.1 * index
            }} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full shadow-sm" style={{
                    backgroundColor: model.color
                  }} />
                      <div>
                        <p className="font-semibold text-foreground">{model.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {model.totalQueries.toLocaleString()} consultas totales
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-lg font-bold text-foreground">{model.mentions}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{model.accuracy}%</span>
                      <div className="w-16 h-2 bg-muted/50 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-300" style={{
                      width: `${model.accuracy}%`
                    }} />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-foreground font-medium">{model.responseTime}s</span>
                  </td>
                  <td className="p-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{model.ranking}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {model.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : model.trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-500" /> : <div className="w-4 h-4 bg-gray-400 rounded-full" />}
                      <span className={`text-sm font-semibold ${model.trend === 'up' ? 'text-emerald-500' : model.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {model.trendPercentage > 0 ? '+' : ''}{model.trendPercentage}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-foreground font-medium">{model.successRate}%</span>
                  </td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </motion.tr>)}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Trend Chart */}
        <motion.div initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.6
      }} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Tendencias de Menciones
            </h3>
            <p className="text-sm text-muted-foreground">
              Evolución temporal de menciones por modelo
            </p>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={value => new Date(value).toLocaleDateString('es-ES', {
                month: 'short',
                day: 'numeric'
              })} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                {llmModels.map(model => <Line key={model.id} type="monotone" dataKey={model.name} stroke={model.color} strokeWidth={3} dot={{
                fill: model.color,
                strokeWidth: 2,
                r: 4
              }} activeDot={{
                r: 6,
                stroke: model.color,
                strokeWidth: 2
              }} />)}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.7
      }} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Análisis Multidimensional
            </h3>
            <p className="text-sm text-muted-foreground">
              Comparación de métricas clave por modelo
            </p>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" tick={{
                fill: 'hsl(var(--muted-foreground))',
                fontSize: 12
              }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{
                fill: 'hsl(var(--muted-foreground))',
                fontSize: 10
              }} />
                <Radar name="ChatGPT" dataKey="ChatGPT" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="Perplexity" dataKey="Perplexity" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                <Radar name="Claude" dataKey="Claude" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Model Performance Cards */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.8
    }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {llmModels.slice(0, 3).map((model, index) => <div key={model.id} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full shadow-sm" style={{
              backgroundColor: model.color
            }} />
                <h4 className="text-lg font-semibold text-foreground">{model.name}</h4>
              </div>
              <div className="flex items-center gap-1">
                {model.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-500" /> : model.trend === 'down' ? <TrendingDown className="w-4 h-4 text-red-500" /> : <div className="w-4 h-4 bg-gray-400 rounded-full" />}
                <span className={`text-sm font-semibold ${model.trend === 'up' ? 'text-emerald-500' : model.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {model.trendPercentage > 0 ? '+' : ''}{model.trendPercentage}%
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Menciones</span>
                <span className="text-lg font-bold text-foreground">{model.mentions}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Precisión</span>
                <span className="text-sm font-semibold text-foreground">{model.accuracy}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tiempo Respuesta</span>
                <span className="text-sm font-semibold text-foreground">{model.responseTime}s</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Posición Promedio</span>
                <span className="text-sm font-semibold text-foreground">{model.avgPosition}</span>
              </div>

              <div className="pt-2 border-t border-border/50">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Última actualización</span>
                  <span>{new Date(model.lastUpdated).toLocaleString('es-ES')}</span>
                </div>
              </div>
            </div>
          </div>)}
      </motion.div>

      {/* Insights and Recommendations */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.9
    }} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Insights y Recomendaciones
          </h3>
          <p className="text-muted-foreground">
            Análisis automatizado basado en los datos de rendimiento
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <Award className="w-5 h-5 text-emerald-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Mejor Rendimiento</h4>
                <p className="text-sm text-muted-foreground">
                  ChatGPT lidera con {llmModels[0].mentions} menciones y {llmModels[0].accuracy}% de precisión.
                  Su tendencia ascendente del +{llmModels[0].trendPercentage}% indica un crecimiento sostenido.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
              <Zap className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Velocidad Óptima</h4>
                <p className="text-sm text-muted-foreground">
                  Perplexity destaca con el menor tiempo de respuesta ({llmModels[1].responseTime}s),
                  ideal para aplicaciones que requieren respuestas rápidas.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <TrendingUp className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Oportunidad de Mejora</h4>
                <p className="text-sm text-muted-foreground">
                  Gemini y DeepSpeak muestran tendencias descendentes. 
                  Considera optimizar el contenido para estos modelos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
              <Target className="w-5 h-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Estrategia Recomendada</h4>
                <p className="text-sm text-muted-foreground">
                  Enfócate en optimizar para ChatGPT y Perplexity, que representan el 57% 
                  del total de menciones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>;
};
export default AEOLLMComparisonDashboard;