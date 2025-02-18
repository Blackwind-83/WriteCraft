import * as yaml from 'js-yaml';
import * as fs from 'fs';

interface Property {
    id: string;
    label: string;
    type: string;
    source?: string;
    values?: string[];
}

interface Category {
    id: string;
    label: string;
    properties: Property[];
}

interface Concept {
    id: string;
    label: string;
    categories: Category[];
}

interface DataList {
    id: string;
    values: string[];
}

interface YAMLData {
    concept: Concept[];
    ddatalist: DataList[];
}

class ModelParser {
    private concepts: Concept[] = [];
    private datalists: Map<string, DataList> = new Map();

    constructor(yamlPath: string) {
        this.parseYAML(yamlPath);
    }

    private parseYAML(yamlPath: string): void {
        const fileContents = fs.readFileSync(yamlPath, 'utf8');
        const data = yaml.load(fileContents) as YAMLData;

        this.concepts = data.concept || [];
        this.datalists = new Map(data.ddatalist.map(dl => [dl.id, dl]));
    }

    public getConcept(conceptId: string): Concept | undefined {
        return this.concepts.find(c => c.id === conceptId);
    }

    public getDataList(listId: string): DataList | undefined {
        return this.datalists.get(listId);
    }
}

// Exemple d'utilisation
const parser = new ModelParser('potion_data.yaml');
console.log(parser.getConcept('potion'));
console.log(parser.getDataList('potion_types_list'));
