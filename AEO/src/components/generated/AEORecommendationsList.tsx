"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Globe, TrendingUp, ExternalLink, Lightbulb, Target, Zap } from 'lucide-react';
interface Recommendation {
  id: string;
  title: string;
  description: string;
  percentage: number;
  isPositive: boolean;
  icon: React.ReactNode;
  priority: 'high' | 'medium' | 'low';
}
const AEORecommendationsList: React.FC = () => {
  const recommendations: Recommendation[] = [{
    id: '1',
    title: 'Mayor Autoridad del Contenido',
    description: 'Crear contenido más autoritativo y detallado sobre tu marca para mejorar las menciones en LLMs.',
    percentage: 23,
    isPositive: true,
    priority: 'high',
    icon: <FileText className="w-5 h-5" />
  }, {
    id: '2',
    title: 'Optimizar Descripciones de Marca',
    description: 'Mejorar las descripciones de marca en sitios web y plataformas digitales para mayor visibilidad.',
    percentage: -12,
    isPositive: false,
    priority: 'medium',
    icon: <Globe className="w-5 h-5" />
  }, {
    id: '3',
    title: 'Aumentar Presencia Digital',
    description: 'Incrementar la presencia en medios digitales y plataformas de noticias relevantes.',
    percentage: 18,
    isPositive: true,
    priority: 'high',
    icon: <TrendingUp className="w-5 h-5" />
  }, {
    id: '4',
    title: 'Estrategia de Palabras Clave',
    description: 'Implementar una estrategia de palabras clave específica para modelos de IA.',
    percentage: 15,
    isPositive: true,
    priority: 'medium',
    icon: <Target className="w-5 h-5" />
  }];
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500/20 bg-red-500/5';
      case 'medium':
        return 'border-amber-500/20 bg-amber-500/5';
      case 'low':
        return 'border-blue-500/20 bg-blue-500/5';
      default:
        return 'border-border/50 bg-muted/20';
    }
  };
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'medium':
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'low':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default:
        return 'bg-muted/50 text-muted-foreground border-border/50';
    }
  };
  return <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground">
            Recomendaciones AEO
          </h3>
        </div>
        <p className="text-muted-foreground">
          Estrategias personalizadas para mejorar tu presencia en modelos de IA
        </p>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec, index) => <motion.div key={rec.id} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: index * 0.1
      }} className={`border rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${getPriorityColor(rec.priority)}`}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="text-primary">
                  {rec.icon}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-foreground">
                        {rec.title}
                      </h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg border ${getPriorityBadge(rec.priority)}`}>
                        {rec.priority === 'high' ? 'Alta' : rec.priority === 'medium' ? 'Media' : 'Baja'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {rec.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-lg ${rec.isPositive ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-red-500/10 text-red-600 border border-red-500/20'}`}>
                      {rec.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                      <span className="text-sm font-bold">
                        {rec.isPositive ? '+' : ''}{rec.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                    <span>Implementar Estrategia</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Impacto estimado en 30 días
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>)}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Target className="w-4 h-4" />
            <span>4 recomendaciones activas</span>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium text-sm">
            Ver Todas las Estrategias
          </button>
        </div>
      </div>
    </div>;
};
export default AEORecommendationsList;