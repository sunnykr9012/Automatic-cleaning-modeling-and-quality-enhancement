import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileUpload } from './components/FileUpload';
import { DataPreview } from './components/DataPreview';
import { QualityMetrics } from './components/QualityMetrics';
import { DataSection } from './components/DataSection';
import { DataRow, TransformedData } from './types/data';
import { cleanData, inferDataTypes, calculateDataQuality } from './utils/dataTransformation';
import { parseFile } from './utils/fileParser';
import { Database, Sparkles, LineChart, CheckCircle2, BarChart3 } from 'lucide-react';

function App() {
  const [transformedData, setTransformedData] = useState<TransformedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      setError(null);
      const data = await parseFile(file);
      
      if (data.length === 0) {
        throw new Error('The file contains no data');
      }

      const cleaned = cleanData(data);
      const schema = inferDataTypes(cleaned);
      const quality = calculateDataQuality(cleaned);

      setTransformedData({
        originalData: data,
        cleanedData: cleaned,
        quality,
        schema,
      });
    } catch (err) {
      setError((err as Error).message);
      setTransformedData(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-gradient">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Database className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Data Transformation Suite
          </h1>
          <p className="text-xl text-gray-600">
            Upload your data for automatic cleaning, modeling, and quality enhancement
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          <FileUpload onFileUpload={handleFileUpload} />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          {transformedData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <QualityMetrics {...transformedData.quality} />
              
              <DataSection
                title="Data Cleaning"
                description="Automatically cleaned and standardized data"
                data={transformedData.cleanedData}
                icon={<Sparkles className="w-8 h-8" />}
                gradient="bg-gradient-to-br from-emerald-50 to-emerald-100"
              >
                <div className="grid gap-8">
                  <DataPreview
                    data={transformedData.originalData}
                    title="Original Data"
                  />
                  <DataPreview
                    data={transformedData.cleanedData}
                    title="Cleaned Data"
                  />
                </div>
              </DataSection>

              <DataSection
                title="Data Modeling"
                description="Inferred data types and schema"
                data={transformedData.schema}
                icon={<LineChart className="w-8 h-8" />}
                gradient="bg-gradient-to-br from-blue-50 to-blue-100"
              >
                <div className="bg-white rounded-xl p-6">
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                    {JSON.stringify(transformedData.schema, null, 2)}
                  </pre>
                </div>
              </DataSection>

              <DataSection
                title="Data Quality"
                description="Quality metrics and validation results"
                data={transformedData.quality}
                icon={<CheckCircle2 className="w-8 h-8" />}
                gradient="bg-gradient-to-br from-violet-50 to-violet-100"
              >
                <div className="bg-white rounded-xl p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {Object.entries(transformedData.quality).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <h4 className="text-lg font-medium capitalize">{key}</h4>
                        <p className="text-3xl font-bold text-indigo-600">
                          {(value * 100).toFixed(1)}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </DataSection>

              <DataSection
                title="Data Transformation"
                description="Transformed and enhanced data structure"
                data={transformedData.cleanedData}
                icon={<BarChart3 className="w-8 h-8" />}
                gradient="bg-gradient-to-br from-orange-50 to-orange-100"
              >
                <div className="bg-white rounded-xl p-6">
                  <DataPreview
                    data={transformedData.cleanedData}
                    title="Transformed Data"
                  />
                </div>
              </DataSection>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;