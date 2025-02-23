import * as yaml from 'js-yaml';
import { Model } from './data/Model';
import * as path from 'path';
import * as fs from "fs";
import { Concept } from './data/Concept';
import { DataList } from './data/Datalist';
import NovelPlugin from 'src/main';

export class ModelParser {
    static readonly WRITECRAFT_DIR_NAME = "_writecraft";
    static readonly MODEL_FILE_NAME = "model.md";
    static readonly CONCEPTS_DIR_NAME = "concepts";
    static readonly DATALISTS_DIR_NAME = "datalists";

    private plugin: NovelPlugin;

    constructor(plugin: NovelPlugin) {
        this.plugin = plugin;
    }

    parse(modelDir: string): Model {
        const vaultBasePath = (this.plugin.app.vault.adapter as any).getBasePath();
        modelDir = path.join(vaultBasePath, modelDir);

        // template directory
        if (!fs.existsSync(modelDir)) {
            throw new Error("Erreur : le répertoire du modèle '" + modelDir + "' n'existe pas.");
        }

        // Model file
        const modelFile = path.join(modelDir, ModelParser.WRITECRAFT_DIR_NAME, ModelParser.MODEL_FILE_NAME);
        if (!fs.existsSync(modelFile)) {
            throw new Error("Erreur : le fichier du modèle '" + modelFile + "' n'existe pas.");
        }
        let modelFileContent = fs.readFileSync(modelFile, 'utf-8');
        modelFileContent = this.removeHeaderFooter(modelFileContent);
        const model = this.parseModelTemplate(modelFileContent);
        model.concepts = [];
        

        // concept files
        const conceptsDir = path.join(modelDir, ModelParser.WRITECRAFT_DIR_NAME, ModelParser.CONCEPTS_DIR_NAME);
        if (!fs.existsSync(conceptsDir)) {
            throw new Error("Erreur : no concepts directory in concepts directory.");
        }
        const conceptFiles = fs.readdirSync(conceptsDir, { withFileTypes: true });
        for (const conceptFileName of conceptFiles) {
            if (conceptFileName.isFile()){
                const conceptFile = path.join(conceptsDir, conceptFileName.name);
                let conceptFileContent = fs.readFileSync(conceptFile, 'utf-8');
                conceptFileContent = this.removeHeaderFooter(conceptFileContent);
                const concept = this.parseConceptTemplate(conceptFileContent);
                concept.datalists = [];
                model.concepts.push(concept);

                // datalist files
                const datalistsDir = path.join(modelDir, ModelParser.WRITECRAFT_DIR_NAME, ModelParser.DATALISTS_DIR_NAME);
                if (!fs.existsSync(datalistsDir)) {
                    throw new Error("Erreur : no concepts directory in datalist directory.");
                }
                const datalistsFile = path.join(datalistsDir, concept.id + "-datalist.md");

                if (fs.existsSync(datalistsFile)) {
                    let datalistsFileContent = fs.readFileSync(datalistsFile, 'utf-8');
                    datalistsFileContent = this.removeHeaderFooter(datalistsFileContent);
                    const datalists = this.parseDatalistsTemplate(datalistsFileContent);
                    for (const datalist of datalists) {
                        if (!concept.datalists.contains(datalist)) {
                            concept.datalists.push(datalist);
                        }
                    }
                }
            }
        }
        
        
        return model;
    }

    parseModelTemplate(fileContent : string): Model {
        
        let model: Model;

        const parsedData: any = yaml.load(fileContent);
        if (!parsedData) {
            throw new Error('Le fichier YAML ne contient pas de modèle valide.');
        }
        model = parsedData.model;
        if (!model) {
            throw new Error(`Aucun concept trouvé dans le fichier '${fileContent}'.`);
        }

        return model;
    }

    parseConceptTemplate(fileContent : string): Concept {
        let concept: Concept;
        const parsedData: any = yaml.load(fileContent);
        
        if (!parsedData) {
            throw new Error('Le fichier YAML ne contient pas de concept valide.');
        }
        concept = parsedData.concept;
        if (!concept) {
            throw new Error(`Aucun concept trouvé dans le fichier '${fileContent}'.`);
        }

        return concept;
    }

    parseDatalistsTemplate(fileContent : string): DataList[] {
        let datalists: DataList[];
        const parsedData: any = yaml.load(fileContent);
        
        if (!parsedData) {
            throw new Error('Le fichier YAML ne contient pas de datalist valide.');
        }
        datalists = parsedData.datalists;
        if (!datalists) {
            throw new Error(`Aucun concept trouvé dans le fichier '${fileContent}'.`);
        }

        return datalists;
    }

    removeHeaderFooter(contentFile: string) : string {
        return contentFile
            .split('\n')
            .filter(line => !line.includes('---'))
            .join('\n'); 
    }
}
