export class Property {
    id: string;
    label: string;
    type: string;
    options?: string[];
  
    constructor(id: string, label: string, type: string, options?: string[]) {
      this.id = id;
      this.label = label;
      this.type = type;
      this.options = options;
    }
  
    static fromYaml(data: any): Property {
      return new Property(data.id, data.label, data.type, data.options);
    }
  }
  
  