"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft,
  Bot,
  FileText,
  Download,
  Copy,
  Check,
  Code,
  Globe,
  Shield,
  Zap,
  Settings,
  AlertCircle,
  Info,
  Sparkles,
  Terminal,
  Server,
  Database,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  ExternalLink,
  Wrench,
  CheckCircle,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface QueryData {
  brand: string;
  query: string;
  website: string;
  screenshot?: string;
}

interface AEODocumentsAIProps {
  queryData: QueryData;
  onBack: () => void;
}

interface GeneratedDocuments {
  robots_txt: {
    content: string;
    optimizations: string[];
    warnings: string[];
    aeo_specific: string[];
  };
  llm_txt: {
    content: string;
    features: string[];
    ai_directives: string[];
    brand_context: string[];
  };
  sitemap_optimization: {
    suggestions: string[];
    priority_pages: string[];
    llm_friendly_structure: string[];
  };
  schema_markup: {
    organization_schema: string;
    website_schema: string;
    brand_schema: string;
    benefits: string[];
  };
}

const AEODocumentsAI: React.FC<AEODocumentsAIProps> = ({ queryData, onBack }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDocuments | null>(null);
  const [activeTab, setActiveTab] = useState<'robots' | 'llm' | 'sitemap' | 'schema'>('robots');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    generateDocuments();
  }, [queryData]);

  const generateDocuments = async () => {
    setIsGenerating(true);
    
    // Simulate AI-powered document generation
    setTimeout(() => {
      const domain = queryData.website.replace(/^https?:\/\//, '').replace(/^www\./, '');
      const brandName = queryData.brand;
      
      const mockDocs: GeneratedDocuments = {
        robots_txt: {
          content: `# Robots.txt optimizado para Answer Engines por AEO-MVP
# Sitio: ${queryData.website}
# Marca: ${brandName}
# Generado: ${new Date().toISOString().split('T')[0]}

User-agent: *
Allow: /

# Optimizaciones AEO específicas
User-agent: GPTBot
Allow: /
Crawl-delay: 1

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /
Crawl-delay: 1

User-agent: GoogleBot
Allow: /

User-agent: BingBot
Allow: /

# Permitir acceso a recursos críticos para LLMs
Allow: /api/
Allow: /.well-known/
Allow: /sitemap*.xml
Allow: /schema/
Allow: /structured-data/

# Bloquear contenido irrelevante para IA
Disallow: /admin/
Disallow: /login/
Disallow: /cart/
Disallow: /checkout/
Disallow: /temp/
Disallow: /*.pdf$
Disallow: /private/

# Sitemap optimizado para Answer Engines
Sitemap: https://${domain}/sitemap.xml
Sitemap: https://${domain}/sitemap-news.xml
Sitemap: https://${domain}/sitemap-products.xml

# Archivo LLM.txt para directivas específicas de IA
# Consultar: https://${domain}/llm.txt`,
          optimizations: [
            'Directivas específicas para bots de LLMs principales',
            'Crawl-delay optimizado para evitar rate limiting',
            'Acceso permitido a APIs y structured data',
            'Bloqueo de contenido irrelevante para IA',
            'Referencias cruzadas con llm.txt'
          ],
          warnings: [
            'Verificar que /api/ existe y es accesible',
            'Confirmar que sitemaps están actualizados',
            'Revisar que structured data está implementado'
          ],
          aeo_specific: [
            'GPTBot y ChatGPT-User explícitamente permitidos',
            'ClaudeBot con crawl-delay para mejor rendimiento',
            'Acceso prioritario a recursos de datos estructurados',
            'Bloqueo de URLs que no aportan valor a LLMs'
          ]
        },
        llm_txt: {
          content: `# LLM.txt - Directivas para Large Language Models
# ${brandName} - ${queryData.website}
# Protocolo AEO-MVP v1.0

# INFORMACIÓN DE LA MARCA
Brand: ${brandName}
Domain: ${domain}
Industry: ${queryData.query.includes('auto') ? 'Automotive' : 'Technology'}
Primary-Language: es
Secondary-Languages: en

# DIRECTIVAS DE CONTENIDO
Content-Priority: high
Factual-Accuracy: critical
Update-Frequency: daily
Citation-Preference: with-attribution

# CONTEXTO DE MARCA
Brand-Description: ${brandName} es líder en ${queryData.query.includes('auto') ? 'innovación automotriz' : 'soluciones tecnológicas'}, reconocida por su excelencia y compromiso con la calidad.

Key-Topics:
- ${brandName} productos y servicios
- Innovación y tecnología
- Sostenibilidad y responsabilidad
- Experiencia del cliente
- Liderazgo en la industria

# DIRECTIVAS DE RESPUESTA
Answer-Style: informative, balanced, factual
Tone: professional, approachable
Bias-Avoidance: neutral-presentation
Competitor-Mentions: fair-comparison-allowed

# DATOS ESTRUCTURADOS
API-Endpoint: https://${domain}/api/v1/llm-data
Schema-Location: https://${domain}/schema/
Knowledge-Base: https://${domain}/kb/
FAQ-Endpoint: https://${domain}/api/faq

# CONTACTO Y VERIFICACIÓN
Verification-Contact: ai-team@${domain}
Last-Updated: ${new Date().toISOString().split('T')[0]}
Version: 1.0

# PERMISOS ESPECIALES
Real-Time-Data: allowed
Product-Info: always-current
Press-Releases: priority-indexing
Technical-Specs: detailed-allowed

# RESTRICCIONES
Internal-Docs: prohibited
Confidential-Info: blocked
Personal-Data: anonymized-only
Financial-Details: public-only`,
          features: [
            'Protocolo LLM.txt estándar para Answer Engines',
            'Directivas específicas de marca y industria',
            'Control de tono y estilo de respuestas',
            'Referencias a APIs y datos estructurados',
            'Permisos granulares por tipo de contenido'
          ],
          ai_directives: [
            'Prioridad alta para contenido factual',
            'Actualizaciones diarias de información',
            'Citaciones con atribución preferidas',
            'Comparaciones justas con competidores permitidas',
            'Acceso a datos en tiempo real autorizado'
          ],
          brand_context: [
            `${brandName} posicionado como líder de la industria`,
            'Enfoque en innovación y calidad',
            'Tono profesional pero accesible',
            'Información técnica detallada permitida',
            'Datos financieros solo si son públicos'
          ]
        },
        sitemap_optimization: {
          suggestions: [
            'Crear sitemap específico para contenido AEO-relevante',
            'Implementar priority tags basados en valor para LLMs',
            'Agregar lastmod para contenido actualizado frecuentemente',
            'Incluir alternate language tags para contenido multiidioma',
            'Crear sitemaps separados por tipo de contenido (productos, blog, FAQ)'
          ],
          priority_pages: [
            `/${queryData.website.includes('tesla') ? 'vehicles' : 'products'} - Priority: 1.0`,
            '/about - Priority: 0.9',
            '/faq - Priority: 0.9',
            '/technology - Priority: 0.8',
            '/news - Priority: 0.7',
            '/contact - Priority: 0.6'
          ],
          llm_friendly_structure: [
            'URLs descriptivas y semánticamente ricas',
            'Estructura jerárquica clara para navegación AI',
            'Breadcrumbs implementados con structured data',
            'Internal linking strategy optimizada para context',
            'Canonical URLs para evitar contenido duplicado'
          ]
        },
        schema_markup: {
          organization_schema: `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${brandName}",
  "url": "https://${domain}",
  "logo": "https://${domain}/logo.png",
  "description": "${brandName} es líder en ${queryData.query.includes('auto') ? 'innovación automotriz' : 'soluciones tecnológicas'}",
  "founder": {
    "@type": "Person",
    "name": "Founder Name"
  },
  "foundingDate": "2003",
  "numberOfEmployees": "100000+",
  "industry": "${queryData.query.includes('auto') ? 'Automotive' : 'Technology'}",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US",
    "addressLocality": "Austin",
    "addressRegion": "TX"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-512-555-0100",
    "contactType": "Customer Service"
  },
  "sameAs": [
    "https://twitter.com/${brandName.toLowerCase()}",
    "https://linkedin.com/company/${brandName.toLowerCase()}",
    "https://facebook.com/${brandName.toLowerCase()}"
  ]
}`,
          website_schema: `{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "${brandName} Official Website",
  "url": "https://${domain}",
  "description": "Sitio web oficial de ${brandName}",
  "publisher": {
    "@type": "Organization",
    "name": "${brandName}"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://${domain}/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://${domain}#organization"
  }
}`,
          brand_schema: `{
  "@context": "https://schema.org",
  "@type": "Brand",
  "name": "${brandName}",
  "description": "${brandName} - Innovación y excelencia en ${queryData.query.includes('auto') ? 'automoción' : 'tecnología'}",
  "logo": "https://${domain}/brand-logo.png",
  "url": "https://${domain}",
  "manufacturer": {
    "@type": "Organization",
    "name": "${brandName}",
    "@id": "https://${domain}#organization"
  },
  "category": "${queryData.query.includes('auto') ? 'Automotive' : 'Technology'}"
}`,
          benefits: [
            'Mejor reconocimiento de entidad por parte de LLMs',
            'Información estructurada para respuestas precisas',
            'Contexto rico para citaciones y referencias',
            'Mejora en knowledge graph presence',
            'Datos consistentes entre diferentes AI platforms'
          ]
        }
      };
      
      setGeneratedDocs(mockDocs);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = async (content: string, key: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isGenerating) {
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
            Generando Documentos IA
          </h2>
          <p className="text-muted-foreground mb-4">
            Creando robots.txt y llm.txt optimizados para "{queryData.brand}"...
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              <span>Analizando estructura del sitio</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Generando directivas AEO</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Optimizando para Answer Engines</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!generatedDocs) return null;

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
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documentos IA Generados</h1>
            <p className="text-muted-foreground">
              Archivos optimizados para Answer Engines: "{queryData.brand}" • {queryData.website}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-card to-card/50 rounded-2xl p-6 mb-8 border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'robots.txt', icon: Shield, status: 'Optimizado', color: 'text-green-500' },
              { label: 'llm.txt', icon: Bot, status: 'Generado', color: 'text-blue-500' },
              { label: 'Schema Markup', icon: Code, status: 'Estructurado', color: 'text-purple-500' },
              { label: 'Sitemap', icon: Globe, status: 'Sugerencias', color: 'text-yellow-500' }
            ].map((item, index) => (
              <div key={index} className="bg-background/50 rounded-xl p-4 border border-border/50">
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
                <div className={`text-sm font-medium ${item.color}`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'robots', label: 'robots.txt', icon: Shield },
            { id: 'llm', label: 'llm.txt', icon: Bot },
            { id: 'sitemap', label: 'Sitemap', icon: Globe },
            { id: 'schema', label: 'Schema', icon: Code }
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
          {activeTab === 'robots' && (
            <motion.div
              key="robots"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* File Content */}
              <div className="bg-card rounded-xl p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    robots.txt Optimizado
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(generatedDocs.robots_txt.content, 'robots')}
                      className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                    >
                      {copiedStates.robots ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copiedStates.robots ? 'Copiado' : 'Copiar'}
                    </button>
                    <button
                      onClick={() => downloadFile(generatedDocs.robots_txt.content, 'robots.txt')}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </button>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 border font-mono text-sm overflow-x-auto">
                  <pre className="whitespace-pre-wrap text-foreground">{generatedDocs.robots_txt.content}</pre>
                </div>
              </div>

              {/* Optimizations & Warnings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 border">
                  <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-500" />
                    Optimizaciones AEO
                  </h5>
                  <ul className="space-y-2">
                    {generatedDocs.robots_txt.optimizations.map((opt, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    Verificaciones Requeridas
                  </h5>
                  <ul className="space-y-2">
                    {generatedDocs.robots_txt.warnings.map((warning, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'llm' && (
            <motion.div
              key="llm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* File Content */}
              <div className="bg-card rounded-xl p-6 border">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary" />
                    llm.txt - Protocolo AEO
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyToClipboard(generatedDocs.llm_txt.content, 'llm')}
                      className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                    >
                      {copiedStates.llm ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                      {copiedStates.llm ? 'Copiado' : 'Copiar'}
                    </button>
                    <button
                      onClick={() => downloadFile(generatedDocs.llm_txt.content, 'llm.txt')}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Descargar
                    </button>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-4 border font-mono text-sm overflow-x-auto">
                  <pre className="whitespace-pre-wrap text-foreground">{generatedDocs.llm_txt.content}</pre>
                </div>
              </div>

              {/* Features & Directives */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 border">
                  <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    Características LLM.txt
                  </h5>
                  <ul className="space-y-2">
                    {generatedDocs.llm_txt.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-xl p-6 border">
                  <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-500" />
                    Directivas de IA
                  </h5>
                  <ul className="space-y-2">
                    {generatedDocs.llm_txt.ai_directives.map((directive, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        {directive}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'sitemap' && (
            <motion.div
              key="sitemap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Suggestions */}
              <div className="bg-card rounded-xl p-6 border">
                <h4 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Optimización de Sitemap
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-foreground mb-3">Páginas Prioritarias</h5>
                    <ul className="space-y-2">
                      {generatedDocs.sitemap_optimization.priority_pages.map((page, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {page}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium text-foreground mb-3">Sugerencias AEO</h5>
                    <ul className="space-y-2">
                      {generatedDocs.sitemap_optimization.suggestions.slice(0, 5).map((suggestion, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'schema' && (
            <motion.div
              key="schema"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Schema Types */}
              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: 'Organization Schema', content: generatedDocs.schema_markup.organization_schema, key: 'org' },
                  { title: 'Website Schema', content: generatedDocs.schema_markup.website_schema, key: 'website' },
                  { title: 'Brand Schema', content: generatedDocs.schema_markup.brand_schema, key: 'brand' }
                ].map((schema, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border">
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="font-semibold text-foreground flex items-center gap-2">
                        <Code className="w-5 h-5 text-primary" />
                        {schema.title}
                      </h5>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(schema.content, schema.key)}
                          className="flex items-center gap-2 px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm"
                        >
                          {copiedStates[schema.key] ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                          {copiedStates[schema.key] ? 'Copiado' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 rounded-lg p-4 border font-mono text-xs overflow-x-auto">
                      <pre className="whitespace-pre-wrap text-foreground">{schema.content}</pre>
                    </div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="bg-card rounded-xl p-6 border">
                <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-500" />
                  Beneficios del Schema Markup
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {generatedDocs.schema_markup.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={generateDocuments}
            className="flex items-center gap-2 px-6 py-3 border border-border rounded-xl text-foreground hover:bg-muted/50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerar Documentos
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            Descargar Todo como ZIP
          </button>
        </div>

        {/* Implementation Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20"
        >
          <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-500" />
            Guía de Implementación
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">1. Subir Archivos</h5>
              <p className="text-muted-foreground">Coloca robots.txt en la raíz de tu sitio y llm.txt en /llm.txt</p>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">2. Implementar Schema</h5>
              <p className="text-muted-foreground">Agrega el schema markup en el &lt;head&gt; de tu sitio</p>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">3. Actualizar Sitemap</h5>
              <p className="text-muted-foreground">Implementa las sugerencias de prioridad en tu sitemap.xml</p>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">4. Verificar</h5>
              <p className="text-muted-foreground">Usa Google Search Console y herramientas de validación</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AEODocumentsAI;