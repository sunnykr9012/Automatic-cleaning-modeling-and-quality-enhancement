export interface DataRow {
  [key: string]: string | number;
}

export interface TransformedData {
  originalData: DataRow[];
  cleanedData: DataRow[];
  quality: {
    completeness: number;
    accuracy: number;
    consistency: number;
  };
  schema: {
    fields: {
      name: string;
      type: string;
      nullable: boolean;
    }[];
  };
}