"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Sparkles, Settings, Bell, User, Search, Eye, FileText, BarChart3, Users, Bot, X, ChevronRight } from 'lucide-react';
import AEOBrandQueryForm from './AEOBrandQueryForm';
import AEODashboardResults from './AEODashboardResults';
import AEOLLMComparisonDashboard from './AEOLLMComparisonDashboard';
interface QueryData {
  brand: string;
  query: string;
  website: string;
}
type ViewType = 'search' | 'results' | 'comparison' | 'ocr' | 'seo' | 'competitors' | 'documents';
const AEOTrackerApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('search');
  const [queryData, setQueryData] = useState<QueryData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const menuItems = [{
    id: 'search',
    title: 'Consulta LLM',
    description: 'Análisis de marca en múltiples modelos de IA',
    icon: Search,
    isNew: false
  }, {
    id: 'comparison',
    title: 'Análisis Detallado',
    description: 'Comparación profunda entre LLMs',
    icon: Eye,
    isNew: false
  }, {
    id: 'ocr',
    title: 'OCR Análisis',
    description: 'Extrae y optimiza texto de imágenes',
    icon: FileText,
    isNew: true
  }, {
    id: 'seo',
    title: 'SEO Análisis',
    description: 'Optimización para motores de búsqueda',
    icon: BarChart3,
    isNew: false
  }, {
    id: 'competitors',
    title: 'Competidores',
    description: 'Análisis comparativo de la competencia',
    icon: Users,
    isNew: false
  }, {
    id: 'documents',
    title: 'Documentos IA',
    description: 'Genera robots.txt y llm.txt automáticamente',
    icon: Bot,
    isNew: false
  }] as any[];
  const handleSearch = (brand: string, query: string, website: string) => {
    setQueryData({
      brand,
      query,
      website
    });
    setCurrentView('results');
  };
  const handleNewSearch = () => {
    setCurrentView('search');
    setQueryData(null);
  };
  const handleViewComparison = () => {
    setCurrentView('comparison');
  };
  const handleBackFromComparison = () => {
    setCurrentView('results');
  };
  const handleMenuItemClick = (itemId: string) => {
    setCurrentView(itemId as ViewType);
    setIsSidebarOpen(false);
  };
  const getCurrentMenuItem = () => {
    return menuItems.find(item => item.id === currentView);
  };
  const renderPlaceholderView = (title: string, description: string, icon: React.ElementType) => {
    const Icon = icon;
    return <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">{title}</h2>
          <p className="text-muted-foreground mb-8">{description}</p>
          <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
            <p className="text-sm text-muted-foreground">
              Esta funcionalidad estará disponible próximamente. 
              Estamos trabajando para ofrecerte la mejor experiencia.
            </p>
          </div>
        </div>
      </div>;
  };
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && <>
            {/* Backdrop */}
            <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} exit={{
          opacity: 0
        }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" />
            
            {/* Sidebar */}
            <motion.div initial={{
          x: -320
        }} animate={{
          x: 0
        }} exit={{
          x: -320
        }} transition={{
          type: "spring",
          damping: 25,
          stiffness: 200
        }} className="fixed left-0 top-0 h-full w-80 bg-card/95 backdrop-blur-xl border-r border-border/50 z-50 overflow-y-auto">
              {/* Sidebar Header */}
              <div className="p-6 border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">Menú Principal</h2>
                      <p className="text-xs text-muted-foreground">LLM AEO</p>
                    </div>
                  </div>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-4 space-y-2">
                {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return <button key={item.id} onClick={() => handleMenuItemClick(item.id)} className={`w-full p-4 rounded-xl text-left transition-all duration-200 group relative ${isActive ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50 border border-transparent'}`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-primary/20' : 'bg-muted/30 group-hover:bg-muted/50'}`}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`font-medium text-sm ${isActive ? 'text-primary' : 'text-foreground'}`}>
                              {item.title}
                            </h3>
                            {item.isNew && <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                                Nuevo
                              </span>}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-primary rotate-90' : 'text-muted-foreground/50 group-hover:translate-x-0.5'}`} />
                      </div>
                    </button>;
            })}
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 mt-auto border-t border-border/50">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Versión Avanzada</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Optimización AEO con IA
                  </p>
                  <button className="w-full bg-primary/20 hover:bg-primary/30 text-primary text-xs font-medium py-2 px-3 rounded-lg transition-colors">
                    Pro
                  </button>
                </div>
              </div>
            </motion.div>
          </>}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-muted/50 rounded-xl transition-colors lg:hidden">
                <Menu className="w-5 h-5 text-muted-foreground" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">LLM AEO</h1>
                  <p className="text-sm text-muted-foreground">Optimización de Motores de Respuestas de IA</p>
                </div>
              </div>
            </div>
            
            {/* Current View Indicator & Actions */}
            <div className="flex items-center gap-4">
              {/* Current View */}
              {getCurrentMenuItem() && <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-lg">
                  {React.createElement(getCurrentMenuItem()!.icon, {
                className: "w-4 h-4 text-primary"
              })}
                  <span className="text-sm font-medium text-foreground">
                    {getCurrentMenuItem()!.title}
                  </span>
                  {getCurrentMenuItem()!.isNew && <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full">
                      Nuevo
                    </span>}
                </div>}

              {/* View-specific actions */}
              <AnimatePresence mode="wait">
                {currentView === 'results' && <motion.button initial={{
                opacity: 0,
                scale: 0.9
              }} animate={{
                opacity: 1,
                scale: 1
              }} exit={{
                opacity: 0,
                scale: 0.9
              }} onClick={handleViewComparison} className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all duration-200 font-medium">
                    <Eye className="w-4 h-4" />
                    <span>Análisis Detallado</span>
                  </motion.button>}
              </AnimatePresence>

              {/* User Actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-muted/50 rounded-xl transition-colors">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted/50 rounded-xl transition-colors">
                  <Settings className="w-5 h-5 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted/50 rounded-xl transition-colors">
                  <User className="w-5 h-5 text-muted-foreground" />
                </button>
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-muted/50 rounded-xl transition-colors hidden lg:block">
                  <Menu className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative">
        <AnimatePresence mode="wait">
          {currentView === 'search' ? <motion.div key="search" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}>
              <AEOBrandQueryForm onSearch={handleSearch} />
            </motion.div> : currentView === 'results' ? <motion.div key="results" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}>
              <AEODashboardResults queryData={queryData!} onNewSearch={handleNewSearch} />
            </motion.div> : currentView === 'comparison' ? <motion.div key="comparison" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}>
              <AEOLLMComparisonDashboard queryData={queryData!} onBack={handleBackFromComparison} />
            </motion.div> : currentView === 'ocr' ? <motion.div key="ocr" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}>
              {renderPlaceholderView('OCR Análisis', 'Extrae y optimiza texto de imágenes usando tecnología de reconocimiento óptico de caracteres avanzada.', FileText)}
            </motion.div> : currentView === 'seo' ? <motion.div key="seo" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}>
              {renderPlaceholderView('SEO Análisis', 'Optimiza tu contenido para motores de búsqueda con análisis detallado y recomendaciones personalizadas.', BarChart3)}
            </motion.div> : currentView === 'competitors' ? <motion.div key="competitors" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}>
              {renderPlaceholderView('Análisis de Competidores', 'Compara tu marca con la competencia y descubre oportunidades de mejora en el mercado.', Users)}
            </motion.div> : currentView === 'documents' ? <motion.div key="documents" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -20
        }} transition={{
          duration: 0.4,
          ease: "easeInOut"
        }}>
              {renderPlaceholderView('Documentos IA', 'Genera automáticamente robots.txt y llm.txt optimizados para mejorar la indexación de tu sitio.', Bot)}
            </motion.div> : null}
        </AnimatePresence>
      </main>

      {/* Footer */}
      {currentView === 'search' && <footer className="mt-16 py-8 border-t border-border/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Powered by advanced AI analysis</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <button className="hover:text-foreground transition-colors">Documentación</button>
                <button className="hover:text-foreground transition-colors">API</button>
                <button className="hover:text-foreground transition-colors">Soporte</button>
                <button className="hover:text-foreground transition-colors">Privacidad</button>
              </div>
            </div>
          </div>
        </footer>}
    </div>;
};
export default AEOTrackerApp;