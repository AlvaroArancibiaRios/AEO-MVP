"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, RotateCcw, TrendingUp, Award, Target, Zap, Activity, BarChart3 } from 'lucide-react';
import AEOBarChart from './AEOBarChart';
import AEORecommendationsList from './AEORecommendationsList';
interface QueryData {
  brand: string;
  query: string;
  website: string;
}
interface AEODashboardResultsProps {
  queryData: QueryData;
  onNewSearch: () => void;
}
const AEODashboardResults: React.FC<AEODashboardResultsProps> = ({
  queryData,
  onNewSearch
}) => {
  // Mock data for demonstration
  const summaryData = {
    totalMentions: 47,
    avgMentions: 9.4,
    bestModel: 'ChatGPT',
    geminiScore: 8.7
  };
  const chartData = [{
    name: 'ChatGPT',
    mentions: 15,
    color: '#10b981'
  }, {
    name: 'Perplexity',
    mentions: 12,
    color: '#3b82f6'
  }, {
    name: 'Claude',
    mentions: 8,
    color: '#8b5cf6'
  }, {
    name: 'Gemini',
    mentions: 7,
    color: '#f59e0b'
  }, {
    name: 'DeepSpeak',
    mentions: 5,
    color: '#ef4444'
  }] as any[];
  const queryResults = [{
    llm: 'ChatGPT',
    position: 1,
    mentions: 15,
    accuracy: 94.2
  }, {
    llm: 'Perplexity',
    position: 2,
    mentions: 12,
    accuracy: 91.8
  }, {
    llm: 'Claude',
    position: 3,
    mentions: 8,
    accuracy: 89.5
  }, {
    llm: 'Gemini',
    position: 4,
    mentions: 7,
    accuracy: 87.3
  }, {
    llm: 'DeepSpeak',
    position: 5,
    mentions: 5,
    accuracy: 84.1
  }] as any[];
  return <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-card/50 to-card border border-border/50 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
              <span className="text-sm font-medium text-muted-foreground">
                Analizando: <span className="text-foreground font-semibold">{queryData.brand}</span>
                {queryData.website && <span className="text-muted-foreground ml-2">({queryData.website})</span>}
              </span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-muted/50 rounded-xl border border-border/50">
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-foreground truncate max-w-xs lg:max-w-md">
                {queryData.query}
              </span>
            </div>
          </div>
          
          <button onClick={onNewSearch} className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 font-medium">
            <RotateCcw className="w-4 h-4" />
            <span>Nueva búsqueda</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Menciones Totales</h3>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">{summaryData.totalMentions}</p>
          <p className="text-xs text-muted-foreground">Across all models</p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }} className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-emerald-500" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Mención Promedio</h3>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">{summaryData.avgMentions}</p>
          <p className="text-xs text-muted-foreground">Per model</p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3
      }} className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Mejor Modelo</h3>
          </div>
          <p className="text-xl font-bold text-foreground mb-1">{summaryData.bestModel}</p>
          <p className="text-xs text-muted-foreground">Top performer</p>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4
      }} className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-500" />
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">Puntuación AEO</h3>
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">{summaryData.geminiScore}/10</p>
          <p className="text-xs text-muted-foreground">Overall score</p>
        </motion.div>
      </div>

      {/* Chart Section */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5
    }} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Menciones de Marca por LLM
          </h3>
          <p className="text-muted-foreground">
            Distribución de menciones de <span className="font-semibold text-foreground">{queryData.brand}</span> en diferentes modelos de IA
          </p>
        </div>
        <AEOBarChart data={chartData} />
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recommendations */}
        <motion.div initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.6
      }}>
          <AEORecommendationsList />
        </motion.div>

        {/* Query Results */}
        <motion.div initial={{
        opacity: 0,
        x: 20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.7
      }} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Ranking de Modelos
            </h3>
            <p className="text-muted-foreground">
              Rendimiento detallado por modelo LLM
            </p>
          </div>
          
          <div className="space-y-4">
            {queryResults.map((result, index) => <motion.div key={result.llm} initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.8 + index * 0.1
          }} className="flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 rounded-xl border border-border/50 transition-all duration-200 group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-sm font-bold text-primary">#{result.position}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{result.llm}</h4>
                    <p className="text-sm text-muted-foreground">
                      {result.accuracy}% precisión
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <span className="text-lg font-bold text-foreground">{result.mentions}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">menciones</p>
                </div>
              </motion.div>)}
          </div>
        </motion.div>
      </div>

      {/* Status Bar */}
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.9
    }} className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 text-emerald-600">
          <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
          <span className="font-semibold">Análisis Completado</span>
          <span className="text-muted-foreground">
            - Última consulta: "{queryData.query}" para {queryData.brand}
          </span>
        </div>
      </motion.div>
    </div>;
};
export default AEODashboardResults;