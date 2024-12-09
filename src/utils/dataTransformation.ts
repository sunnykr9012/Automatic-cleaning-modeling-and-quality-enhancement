import { DataRow, TransformedData } from '../types/data';

export const cleanData = (data: DataRow[]): DataRow[] => {
  return data.map(row => {
    const cleanedRow: DataRow = {};
    Object.entries(row).forEach(([key, value]) => {
      // Remove special characters from strings
      if (typeof value === 'string') {
        cleanedRow[key] = value.trim().replace(/[^\w\s-]/g, '');
      } else {
        cleanedRow[key] = value;
      }
    });
    return cleanedRow;
  });
};

export const inferDataTypes = (data: DataRow[]) => {
  const schema = {
    fields: Object.keys(data[0]).map(key => {
      const values = data.map(row => row[key]);
      const isNullable = values.some(v => v === null || v === undefined || v === '');
      const type = values.every(v => !isNaN(Number(v))) ? 'number' : 'string';
      
      return {
        name: key,
        type,
        nullable: isNullable
      };
    })
  };
  return schema;
};

export const calculateDataQuality = (data: DataRow[]) => {
  const totalFields = Object.keys(data[0]).length * data.length;
  let emptyFields = 0;
  let inconsistentTypes = 0;

  data.forEach(row => {
    Object.values(row).forEach(value => {
      if (value === null || value === undefined || value === '') {
        emptyFields++;
      }
    });
  });

  const completeness = 1 - (emptyFields / totalFields);
  const accuracy = 0.95; // Placeholder - would need more complex logic
  const consistency = 1 - (inconsistentTypes / totalFields);

  return {
    completeness,
    accuracy,
    consistency
  };
};