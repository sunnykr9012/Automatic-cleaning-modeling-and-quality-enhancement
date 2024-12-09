import React from 'react';
import { motion } from 'framer-motion';
import { DataRow } from '../types/data';

interface DataPreviewProps {
  data: DataRow[];
  title: string;
}

export const DataPreview: React.FC<DataPreviewProps> = ({ data, title }) => {
  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full overflow-x-auto"
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.slice(0, 5).map((row, idx) => (
            <tr key={idx}>
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {String(row[header])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};