"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Search, Zap, Target, BarChart3 } from 'lucide-react';
interface AEOBrandQueryFormProps {
  onSearch: (brand: string, query: string) => void;
}
const AEOBrandQueryForm: React.FC<AEOBrandQueryFormProps> = ({
  onSearch
}) => {
  const [brand, setBrand] = useState('');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (brand.trim() && query.trim()) {
      setIsLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        onSearch(brand.trim(), query.trim());
        setIsLoading(false);
      }, 1000);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };
  const exampleQueries = ["¿Cuáles son las mejores empresas de autos eléctricos?", "¿Qué marcas de tecnología son más innovadoras?", "¿Cuáles son las mejores opciones de streaming?", "¿Qué empresas lideran en inteligencia artificial?"];
  const features = [{
    icon: <Search className="w-5 h-5" />,
    title: "Análisis Profundo",
    description: "Rastrea menciones en 5+ modelos de IA"
  }, {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Métricas Detalladas",
    description: "Precisión, velocidad y tendencias"
  }, {
    icon: <Target className="w-5 h-5" />,
    title: "Recomendaciones",
    description: "Estrategias personalizadas AEO"
  }] as any[];
  return <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/25">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">LLM AEO</h1>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Descubre cómo tu marca aparece en los principales modelos de IA y optimiza tu presencia digital
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2 + index * 0.1
          }} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>)}
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.4,
        duration: 0.6
      }} className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Brand Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Nombre de la Marca
              </label>
              <input type="text" value={brand} onChange={e => setBrand(e.target.value)} placeholder="Ej. Tesla, Apple, OpenAI..." className="w-full px-6 py-4 bg-muted/50 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" onKeyDown={handleKeyDown} disabled={isLoading} />
            </div>

            {/* Query Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Consulta de Búsqueda
              </label>
              <div className="relative">
                <textarea value={query} onChange={e => setQuery(e.target.value)} placeholder="Escribe tu consulta aquí..." rows={4} className="w-full px-6 py-4 bg-muted/50 border-2 border-primary/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none" onKeyDown={handleKeyDown} disabled={isLoading} />
                
                {/* Submit Button */}
                <button type="submit" disabled={!brand.trim() || !query.trim() || isLoading} className="absolute bottom-4 right-4 w-12 h-12 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all group shadow-lg hover:shadow-primary/25">
                  {isLoading ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <ArrowRight className="w-5 h-5 text-primary-foreground group-hover:translate-x-0.5 transition-transform" />}
                </button>
              </div>
            </div>

            {/* Example Queries */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Ejemplos de consultas:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {exampleQueries.map((example, index) => <button key={index} type="button" onClick={() => setQuery(example)} className="text-left p-3 bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-all" disabled={isLoading}>
                    "{example}"
                  </button>)}
              </div>
            </div>

            {/* Instructions */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border/50">
              <span>Presiona</span>
              <kbd className="px-2 py-1 bg-muted/50 rounded text-xs font-mono border border-border/50">⌘</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-muted/50 rounded text-xs font-mono border border-border/50">Enter</kbd>
              <span>para enviar</span>
            </div>
          </form>
        </motion.div>

        {/* Stats Footer */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.8
      }} className="mt-8 text-center">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>5+ Modelos de IA</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span>Análisis en Tiempo Real</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span>Métricas Detalladas</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>;
};
export default AEOBrandQueryForm;