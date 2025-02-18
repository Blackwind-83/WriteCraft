import { PropertyGroup } from "./PropertyGroup";

export class Concept {
  id: string;
  label: string;
  groups: PropertyGroup[];

  constructor(id: string, label: string, groups: PropertyGroup[]) {
    this.id = id;
    this.label = label;
    this.groups = groups;
  }

  static fromYaml(data: any): Concept {
    const id = data.id;
    const label = data.label;
    const groups = data.groups.map((group: any) =>
      PropertyGroup.fromYaml(group)
    );
    return new Concept(id, label, groups);
  }
}
