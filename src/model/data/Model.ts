import { Concept } from "./Concept";

export class Model {
  id: string;
  label: string;
  concepts: Concept[];

  constructor(id: string, label: string, concepts: Concept[]) {
    this.id = id;
    this.label = label;
    this.concepts = concepts;
  }

  static fromYaml(data: any): Model {
    const id = data.model[0].id;
    const label = data.model[0].label;
    const concepts = data.model[0].concepts.map((concept: any) =>
      Concept.fromYaml(concept)
    );
    return new Model(id, label, concepts);
  }
}
