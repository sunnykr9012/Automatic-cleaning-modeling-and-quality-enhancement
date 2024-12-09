import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { downloadJson, downloadCsv } from '../utils/download';

interface DataSectionProps {
  title: string;
  description: string;
  data: any;
  icon: React.ReactNode;
  gradient: string;
  children: React.ReactNode;
}

export const DataSection: React.FC<DataSectionProps> = ({
  title,
  description,
  data,
  icon,
  gradient,
  children,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-xl ${gradient} shadow-lg mb-8`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="text-indigo-600">
            {icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => downloadJson(data, `${title.toLowerCase()}.json`)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <Download size={16} />
            JSON
          </button>
          <button
            onClick={() => downloadCsv(data, `${title.toLowerCase()}.csv`)}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <Download size={16} />
            CSV
          </button>
        </div>
      </div>
      {children}
    </motion.div>
  );
};