import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface QualityMetricsProps {
  completeness: number;
  accuracy: number;
  consistency: number;
}

export const QualityMetrics: React.FC<QualityMetricsProps> = ({
  completeness,
  accuracy,
  consistency,
}) => {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <MetricCard
        icon={<CheckCircle className="w-6 h-6" />}
        title="Completeness"
        value={formatPercentage(completeness)}
        color="emerald"
      />
      <MetricCard
        icon={<AlertTriangle className="w-6 h-6" />}
        title="Accuracy"
        value={formatPercentage(accuracy)}
        color="blue"
      />
      <MetricCard
        icon={<RefreshCw className="w-6 h-6" />}
        title="Consistency"
        value={formatPercentage(consistency)}
        color="violet"
      />
    </motion.div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-6 rounded-xl bg-gradient-to-br from-${color}-50 to-${color}-100
      border border-${color}-200 shadow-sm`}
  >
    <div className={`text-${color}-500 mb-2`}>{icon}</div>
    <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    <p className={`text-3xl font-bold text-${color}-600 mt-2`}>{value}</p>
  </motion.div>
);