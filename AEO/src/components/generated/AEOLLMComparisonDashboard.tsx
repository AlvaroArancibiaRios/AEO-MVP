"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AEOLLMComparisonGrid from './AEOLLMComparisonGrid';
import AEOPerformanceAnalysis from './AEOPerformanceAnalysis';
import AEOMentionsDistribution from './AEOMentionsDistribution';
import AEOCompetitorRanking from './AEOCompetitorRanking';
import { ArrowLeft, Download, Filter, SortAsc, SortDesc, TrendingUp, TrendingDown, BarChart3, Activity, Target, Award, Zap, Eye, Calendar, MessageSquare, Brain, Sparkles, Search, Globe } from 'lucide-react';
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
  icon: React.ElementType;
  relevance?: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
  contextQuality?: string;
  citationFreq?: number;
}
interface AEOLLMComparisonDashboardProps {
  queryData: QueryData;
  onBack: () => void;
}
const AEOLLMComparisonDashboard: React.FC<AEOLLMComparisonDashboardProps> = ({
  queryData,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'distribution' | 'competitors'>('overview');
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
    avgPosition: 1.3,
    icon: MessageSquare
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
    avgPosition: 1.8,
    icon: Search
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
    avgPosition: 2.4,
    icon: Brain
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
    avgPosition: 2.9,
    icon: Sparkles
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
    avgPosition: 3.7,
    icon: Globe
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

      {/* Navigation Tabs */}
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Vista General', icon: Eye },
            { id: 'performance', label: 'Performance', icon: Target },
            { id: 'distribution', label: 'Distribución', icon: BarChart3 },
            { id: 'competitors', label: 'Competidores', icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        )}

        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AEOPerformanceAnalysis
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
            />
          </motion.div>
        )}

        {activeTab === 'distribution' && (
          <motion.div
            key="distribution"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AEOMentionsDistribution
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
            />
          </motion.div>
        )}

        {activeTab === 'competitors' && (
          <motion.div
            key="competitors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AEOCompetitorRanking
              currentBrand={queryData.brand}
              currentWebsite={queryData.website}
              query={queryData.query}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>;
};
export default AEOLLMComparisonDashboard;