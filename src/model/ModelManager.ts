import { Model } from "./data/Model";
import { Notice, parseYaml, TFolder } from "obsidian";
import * as fs from "fs";
import * as path from "path";
import NovelPlugin from "src/main";

export class ModelReader {
  private model: Model;
  private plugin: NovelPlugin;

  constructor(plugin: NovelPlugin) {
    this.plugin = plugin;

    // Charger le modèle
    this.loadModel();
  }

  /**
   * Charge un modèle à partir d'un fichier YAML.
   * @throws Une erreur si le fichier est invalide ou si le contenu est mal formé.
   */
  async loadModel() {
    try {
      const modelFilePath = this.getModelTemplateFilePath()
      if (!fs.existsSync(modelFilePath)) {
        throw new Error("Erreur : le fichier du modèle '" + modelFilePath + "' n'existe pas.");
      }

      // Lire le contenu du fichier de manière synchrone
      const fileContent = fs.readFileSync(modelFilePath, 'utf-8');
      const parsedData = parseYaml(fileContent);

      if (!parsedData || !parsedData.model || !Array.isArray(parsedData.model)) {
        throw new Error("Le contenu du fichier YAML est invalide ou incomplet.");
      }

      this.model = Model.fromYaml(parsedData);
    } catch (error) {
      throw new Error(`Erreur lors du chargement du modèle : ${error.message}`);
    }
  }

  getModel(): Model {
    return this.model;
  }

  getModelTemplateFilePath(): string {
    return path.join(this.plugin.getDir(), "resources", "templates", "novel-model.yml");
  }


  getUnknownImagePath(): string {
    return path.join(this.plugin.getDir(), "resources", "images", "unknown.png");
  }

  getModelPathFromNodelDir(folder: TFolder): string | null {
    // Base path du vault
    const vaultBasePath = (this.plugin.app.vault.adapter as any).getBasePath();

    // Fonction pour trouver model.yml en remontant l'arborescence
    function findModelFile(currentFolder: TFolder): string | null {
      const modelFilePath = path.join(vaultBasePath, currentFolder.path, "model.yml");

      console.log("modelFilePath=" + modelFilePath)

      if (fs.existsSync(modelFilePath)) {
        return modelFilePath;
      }

      // Remonter à l'élément parent s'il existe
      const parentFolder = currentFolder.parent;
      if (parentFolder && parentFolder instanceof TFolder) {
        return findModelFile(parentFolder);
      }

      return null; // Aucun modèle trouvé
    }

    // Cas du dossier racine "/"
    if (folder.path === "/") {
      return null;
    }
    return findModelFile(folder);
  }

  isConceptFolder(folder: TFolder): boolean {
    // Vérifier si le dossier est un concept défini dans le modèle
    const conceptName = folder.name; // Nom du dossier actuel
    return this.getModel().concepts.some((concept) => concept.label === conceptName);
  }
}
