import { Model } from "./data/Model";
import { TFolder } from "obsidian";
import * as fs from "fs";
import * as path from "path";
import NovelPlugin from "src/main";
import { ModelParser } from "src/model/ModelParser";
import { Concept } from "./data/Concept";

export class ModelLoader {

  private model: Model;
  private plugin: NovelPlugin;
  private modelParser: ModelParser

  constructor(plugin: NovelPlugin) {
    this.plugin = plugin;
    this.modelParser = new ModelParser(plugin);
  }

  /**
   * Charge un modèle à partir d'un fichier YAML.
   * @throws Une erreur si le fichier est invalide ou si le contenu est mal formé.
   */
  loadModel(folder: TFolder) {
    const modelDir = this.findModelDir(folder);
    if (modelDir) {
      this.model = this.modelParser.parse(modelDir.path);
    }
  }

  getModel(): Model {
    return this.model;
  }

  findModelDir(folder: TFolder) : TFolder | null {
    // Base path du vault
    const vaultBasePath = (this.plugin.app.vault.adapter as any).getBasePath();
    
    function findModelFile(currentFolder: TFolder): TFolder | null {
      const modelFilePath = path.join(vaultBasePath, currentFolder.path, 
        ModelParser.WRITECRAFT_DIR_NAME, ModelParser.MODEL_FILE_NAME);

      if (fs.existsSync(modelFilePath)) {
        return currentFolder;
      }

      // Remonter à l'élément parent s'il existe
      const parentFolder = currentFolder.parent;
      if (parentFolder && parentFolder instanceof TFolder) {
        return findModelFile(parentFolder);
      }

      return null; // Aucun modèle trouvé
    }

    return findModelFile(folder);
  }

  isConceptFolder(folder: TFolder): boolean {
    return this.model.concepts.some((concept) => concept.dirName === folder.name);
  }

  isModelFolder(folder: TFolder): boolean {
    return folder.children.some((child) => child.name === ModelParser.WRITECRAFT_DIR_NAME);
  }

  getConceptFromDir(folder: TFolder): Concept | undefined {
    return this.model.concepts.find((concept) => concept.dirName === folder.name);
  }
}
