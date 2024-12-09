import Papa from 'papaparse';
import { DataRow } from '../types/data';

export const parseFile = (file: File): Promise<DataRow[]> => {
  return new Promise((resolve, reject) => {
    if (file.name.toLowerCase().endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => {
          // Clean and normalize header names
          return header.trim().toLowerCase().replace(/\s+/g, '_');
        },
        transform: (value: string) => {
          // Clean and normalize cell values
          return typeof value === 'string' ? value.trim() : value;
        },
        complete: (results) => {
          if (results.errors.length > 0) {
            // Check if it's a delimiter issue
            if (results.errors[0].code === "TooFewFields") {
              // Try parsing with different delimiters
              const delimiters = [',', ';', '\t', '|'];
              let success = false;
              
              for (const delimiter of delimiters) {
                const testParse = Papa.parse(file, {
                  header: true,
                  delimiter,
                  preview: 1,
                  skipEmptyLines: true
                });
                
                if (testParse.errors.length === 0 && testParse.data.length > 0) {
                  // Found the correct delimiter, parse the whole file
                  Papa.parse(file, {
                    header: true,
                    delimiter,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    transformHeader: (header: string) => {
                      return header.trim().toLowerCase().replace(/\s+/g, '_');
                    },
                    transform: (value: string) => {
                      return typeof value === 'string' ? value.trim() : value;
                    },
                    complete: (finalResults) => {
                      if (finalResults.errors.length === 0) {
                        success = true;
                        resolve(finalResults.data as DataRow[]);
                      }
                    }
                  });
                  break;
                }
              }
              
              if (!success) {
                reject(new Error('Could not determine the correct CSV format. Please check if your CSV file is properly formatted.'));
              }
            } else {
              reject(new Error('Error parsing CSV file: ' + results.errors[0].message));
            }
          } else if (results.data.length === 0) {
            reject(new Error('The CSV file appears to be empty'));
          } else {
            resolve(results.data as DataRow[]);
          }
        },
        error: (error) => {
          reject(new Error('Error parsing CSV file: ' + error.message));
        }
      });
    } else if (file.name.toLowerCase().endsWith('.json')) {
      file.text()
        .then(text => {
          try {
            const data = JSON.parse(text);
            if (Array.isArray(data)) {
              resolve(data as DataRow[]);
            } else {
              reject(new Error('JSON file must contain an array of objects'));
            }
          } catch (error) {
            reject(new Error('Error parsing JSON file: ' + (error as Error).message));
          }
        })
        .catch(error => reject(new Error('Error reading file: ' + error.message)));
    } else {
      reject(new Error('Unsupported file format. Please upload a CSV or JSON file.'));
    }
  });
};