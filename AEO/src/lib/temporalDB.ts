// Simple temporal database interface using localStorage for MVP
// En producción, esto se reemplazaría por una base de datos real

export interface PositionRecord {
  id: string;
  timestamp: string;
  date: string;
  brand: string;
  query: string;
  website: string;
  llm: string;
  position: number;
  mentions: number;
  accuracy: number;
  relevance: number;
  context_quality: string;
  citation_frequency: number;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface VariabilityTest {
  id: string;
  timestamp: string;
  brand: string;
  query: string;
  website: string;
  results: {
    llm: string;
    position_1: number;
    position_2: number;
    position_3: number;
    consistency_score: number;
    variation_range: number;
  }[];
  overall_consistency: number;
}

export interface MonitoringSettings {
  brand: string;
  query: string;
  website: string;
  frequency: 'hourly' | 'every_4h' | 'every_12h' | 'daily';
  alert_threshold: number;
  is_active: boolean;
  created_at: string;
  last_run: string | null;
}

class TemporalDB {
  private readonly POSITION_RECORDS_KEY = 'aeo_position_records';
  private readonly VARIABILITY_TESTS_KEY = 'aeo_variability_tests';
  private readonly MONITORING_SETTINGS_KEY = 'aeo_monitoring_settings';

  // Posición Records
  savePositionRecord(record: Omit<PositionRecord, 'id'>): PositionRecord {
    const fullRecord: PositionRecord = {
      ...record,
      id: `pos_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    const existing = this.getPositionRecords();
    existing.push(fullRecord);
    
    // Mantener solo últimos 1000 registros para evitar problemas de storage
    if (existing.length > 1000) {
      existing.splice(0, existing.length - 1000);
    }
    
    localStorage.setItem(this.POSITION_RECORDS_KEY, JSON.stringify(existing));
    return fullRecord;
  }

  getPositionRecords(filters?: {
    brand?: string;
    query?: string;
    llm?: string;
    fromDate?: string;
    toDate?: string;
    limit?: number;
  }): PositionRecord[] {
    const stored = localStorage.getItem(this.POSITION_RECORDS_KEY);
    let records: PositionRecord[] = stored ? JSON.parse(stored) : [];

    // Aplicar filtros
    if (filters) {
      if (filters.brand) {
        records = records.filter(r => r.brand.toLowerCase().includes(filters.brand!.toLowerCase()));
      }
      if (filters.query) {
        records = records.filter(r => r.query.toLowerCase().includes(filters.query!.toLowerCase()));
      }
      if (filters.llm) {
        records = records.filter(r => r.llm === filters.llm);
      }
      if (filters.fromDate) {
        records = records.filter(r => r.timestamp >= filters.fromDate!);
      }
      if (filters.toDate) {
        records = records.filter(r => r.timestamp <= filters.toDate!);
      }
      if (filters.limit) {
        records = records.slice(-filters.limit);
      }
    }

    return records.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  }

  // Variability Tests
  saveVariabilityTest(test: Omit<VariabilityTest, 'id'>): VariabilityTest {
    const fullTest: VariabilityTest = {
      ...test,
      id: `var_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    const existing = this.getVariabilityTests();
    existing.push(fullTest);
    
    // Mantener solo últimos 100 tests
    if (existing.length > 100) {
      existing.splice(0, existing.length - 100);
    }
    
    localStorage.setItem(this.VARIABILITY_TESTS_KEY, JSON.stringify(existing));
    return fullTest;
  }

  getVariabilityTests(filters?: {
    brand?: string;
    query?: string;
    fromDate?: string;
    toDate?: string;
    limit?: number;
  }): VariabilityTest[] {
    const stored = localStorage.getItem(this.VARIABILITY_TESTS_KEY);
    let tests: VariabilityTest[] = stored ? JSON.parse(stored) : [];

    // Aplicar filtros
    if (filters) {
      if (filters.brand) {
        tests = tests.filter(t => t.brand.toLowerCase().includes(filters.brand!.toLowerCase()));
      }
      if (filters.query) {
        tests = tests.filter(t => t.query.toLowerCase().includes(filters.query!.toLowerCase()));
      }
      if (filters.fromDate) {
        tests = tests.filter(t => t.timestamp >= filters.fromDate!);
      }
      if (filters.toDate) {
        tests = tests.filter(t => t.timestamp <= filters.toDate!);
      }
      if (filters.limit) {
        tests = tests.slice(-filters.limit);
      }
    }

    return tests.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }

  // Monitoring Settings
  saveMonitoringSettings(settings: MonitoringSettings): void {
    const existing = this.getMonitoringSettings();
    const index = existing.findIndex(s => 
      s.brand === settings.brand && 
      s.query === settings.query && 
      s.website === settings.website
    );

    if (index >= 0) {
      existing[index] = settings;
    } else {
      existing.push(settings);
    }

    localStorage.setItem(this.MONITORING_SETTINGS_KEY, JSON.stringify(existing));
  }

  getMonitoringSettings(filters?: {
    brand?: string;
    is_active?: boolean;
  }): MonitoringSettings[] {
    const stored = localStorage.getItem(this.MONITORING_SETTINGS_KEY);
    let settings: MonitoringSettings[] = stored ? JSON.parse(stored) : [];

    if (filters) {
      if (filters.brand) {
        settings = settings.filter(s => s.brand.toLowerCase().includes(filters.brand!.toLowerCase()));
      }
      if (filters.is_active !== undefined) {
        settings = settings.filter(s => s.is_active === filters.is_active);
      }
    }

    return settings;
  }

  // Análisis y métricas
  getPositionTrends(brand: string, query: string, timeRangeHours: number = 168): {
    llm: string;
    trend: 'up' | 'down' | 'stable';
    change: number;
    current_position: number;
    average_position: number;
  }[] {
    const fromDate = new Date(Date.now() - timeRangeHours * 60 * 60 * 1000).toISOString();
    const records = this.getPositionRecords({
      brand,
      query,
      fromDate
    });

    const llms = [...new Set(records.map(r => r.llm))];
    
    return llms.map(llm => {
      const llmRecords = records.filter(r => r.llm === llm);
      
      if (llmRecords.length === 0) {
        return {
          llm,
          trend: 'stable' as const,
          change: 0,
          current_position: 0,
          average_position: 0
        };
      }

      const current = llmRecords[llmRecords.length - 1];
      const firstPosition = llmRecords[0].position;
      const currentPosition = current.position;
      const avgPosition = llmRecords.reduce((sum, r) => sum + r.position, 0) / llmRecords.length;

      const change = firstPosition - currentPosition; // Positive means improvement (lower position number)
      let trend: 'up' | 'down' | 'stable';
      
      if (Math.abs(change) < 0.5) {
        trend = 'stable';
      } else if (change > 0) {
        trend = 'up'; // Position improved
      } else {
        trend = 'down'; // Position worsened
      }

      return {
        llm,
        trend,
        change: Math.abs(change),
        current_position: currentPosition,
        average_position: Math.round(avgPosition * 10) / 10
      };
    });
  }

  getConsistencyReport(brand: string, query: string, days: number = 30): {
    llm: string;
    consistency_score: number;
    position_variance: number;
    most_common_position: number;
  }[] {
    const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const tests = this.getVariabilityTests({
      brand,
      query,
      fromDate
    });

    const llms = ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'You.com'];

    return llms.map(llm => {
      const llmResults = tests.flatMap(t => 
        t.results.filter(r => r.llm === llm)
      );

      if (llmResults.length === 0) {
        return {
          llm,
          consistency_score: 0,
          position_variance: 0,
          most_common_position: 0
        };
      }

      const avgConsistency = llmResults.reduce((sum, r) => sum + r.consistency_score, 0) / llmResults.length;
      const avgVariance = llmResults.reduce((sum, r) => sum + r.variation_range, 0) / llmResults.length;
      
      // Calcular posición más común de las pruebas de variabilidad
      const positions = llmResults.flatMap(r => [r.position_1, r.position_2, r.position_3]);
      const positionCounts = positions.reduce((acc, pos) => {
        acc[pos] = (acc[pos] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);
      
      const mostCommonPosition = Object.entries(positionCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || 0;

      return {
        llm,
        consistency_score: Math.round(avgConsistency),
        position_variance: Math.round(avgVariance * 10) / 10,
        most_common_position: parseInt(mostCommonPosition.toString())
      };
    });
  }

  // Limpieza de datos
  clearOldData(daysToKeep: number = 90): void {
    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000).toISOString();
    
    // Limpiar registros de posición antiguos
    const positions = this.getPositionRecords();
    const recentPositions = positions.filter(p => p.timestamp >= cutoffDate);
    localStorage.setItem(this.POSITION_RECORDS_KEY, JSON.stringify(recentPositions));
    
    // Limpiar tests de variabilidad antiguos
    const tests = this.getVariabilityTests();
    const recentTests = tests.filter(t => t.timestamp >= cutoffDate);
    localStorage.setItem(this.VARIABILITY_TESTS_KEY, JSON.stringify(recentTests));
  }

  // Exportar datos
  exportData(): {
    position_records: PositionRecord[];
    variability_tests: VariabilityTest[];
    monitoring_settings: MonitoringSettings[];
    exported_at: string;
  } {
    return {
      position_records: this.getPositionRecords(),
      variability_tests: this.getVariabilityTests(),
      monitoring_settings: this.getMonitoringSettings(),
      exported_at: new Date().toISOString()
    };
  }

  // Importar datos
  importData(data: {
    position_records?: PositionRecord[];
    variability_tests?: VariabilityTest[];
    monitoring_settings?: MonitoringSettings[];
  }): void {
    if (data.position_records) {
      localStorage.setItem(this.POSITION_RECORDS_KEY, JSON.stringify(data.position_records));
    }
    if (data.variability_tests) {
      localStorage.setItem(this.VARIABILITY_TESTS_KEY, JSON.stringify(data.variability_tests));
    }
    if (data.monitoring_settings) {
      localStorage.setItem(this.MONITORING_SETTINGS_KEY, JSON.stringify(data.monitoring_settings));
    }
  }
}

// Singleton instance
export const temporalDB = new TemporalDB();

// Utility functions
export const generateMockHistoricalData = (brand: string, query: string, website: string, days: number = 30): PositionRecord[] => {
  const llms = ['ChatGPT', 'Claude', 'Gemini', 'Perplexity', 'You.com'];
  const records: PositionRecord[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    llms.forEach((llm, index) => {
      // Simular fluctuaciones realistas en posiciones
      const basePosition = index + 1;
      const randomVariation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      const position = Math.max(1, Math.min(5, basePosition + randomVariation));
      
      const record: Omit<PositionRecord, 'id'> = {
        timestamp: date.toISOString(),
        date: date.toLocaleDateString('es-ES'),
        brand,
        query,
        website,
        llm,
        position,
        mentions: Math.floor(Math.random() * 10) + 5 + (5 - position) * 2,
        accuracy: Math.floor(Math.random() * 10) + 85 + (5 - position),
        relevance: Math.floor(Math.random() * 10) + 80 + (5 - position),
        context_quality: position <= 2 ? 'Excelente' : position <= 3 ? 'Buena' : 'Regular',
        citation_frequency: Math.floor(Math.random() * 20) + 60 + (5 - position) * 4,
        sentiment: position <= 2 ? 'positive' : position >= 4 ? 'neutral' : (['positive', 'neutral'] as const)[Math.floor(Math.random() * 2)]
      };
      
      records.push(temporalDB.savePositionRecord(record));
    });
  }

  return records;
};