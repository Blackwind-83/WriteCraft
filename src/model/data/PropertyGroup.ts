import { Property } from "./Property";

export class PropertyGroup {
  id: string;
  label: string;
  properties: Property[];

  constructor(id: string, label: string, properties: Property[]) {
    this.id = id;
    this.label = label;
    this.properties = properties;
  }

  static fromYaml(data: any): PropertyGroup {
    const id = data.id;
    const label = data.label;
    const properties = data.properties.map((property: any) =>
      Property.fromYaml(property)
    );
    return new PropertyGroup(id, label, properties);
  }
}
