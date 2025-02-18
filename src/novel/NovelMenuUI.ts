import { Notice } from "obsidian";
import { ModelReader } from "../model/ModelManager";
import { NewNovelPrompt } from "./NewNovelPrompt";
import NovelPlugin from "src/main";
import * as fs from "fs";
import * as path from "path";

export class NovelMenuUI {
  private plugin: NovelPlugin;
  private modelReader: ModelReader;

  constructor(plugin: NovelPlugin) {
    this.plugin = plugin;
    this.modelReader = new ModelReader(this.plugin);
    this.modelReader.loadModel();
  }

  load() {
    const ribbonIconEl = this.plugin.addRibbonIcon(
      "book",
      "Novel Plugin",
      async () => {
        new Notice("Welcome to the Novel Plugin!");

        try {
          // Afficher le modal pour que l'utilisateur entre le nom du roman
          const novelName = await this.showNovelNamePrompt();

          console.log("Chosen novel name : " + novelName );

          if (novelName) {
            console.log(`Nom du roman: ${novelName}`);

            // Créer l'arborescence pour ce roman
            await this.createBaseStructure();
            await this.createModelStructure(novelName);
          } else {
            new Notice("Nom du roman non spécifié.");
          }

        } catch (error) {
          console.error("Error loading the model:", error);
          new Notice(`Error loading model: ${error.message || error}`);
        }
      }
    );

    ribbonIconEl.addClass("novel-plugin-ribbon-icon");
  }

  unload() {
    const ribbonIconEl = document.querySelector(".novel-plugin-ribbon-icon");
    ribbonIconEl?.remove();
  }

  // Fonction pour afficher le modal de saisie du nom du roman
  private showNovelNamePrompt(): Promise<string | null> {
    return new Promise((resolve) => {
      const modal = new NewNovelPrompt(this.plugin.app, resolve);
      modal.open();
    });
  }

  public async createBaseStructure() {
    const modelPath = this.modelReader.getModel().label; // Création du répertoire principal du modèle

    // Créer le répertoire du modèle
    await this.createDirectoryIfNotExist(modelPath);

    await this.createDirectoryIfNotExist(modelPath + "_Images");

    // Copie du modele
    const sourceModelPath = this.modelReader.getModelTemplateFilePath();
    const destinationModelPath = this.getModelFilePath(modelPath);
    if (!fs.existsSync(destinationModelPath)) {
      console.log("Source Path:", sourceModelPath);
      console.log("Destination Path:", destinationModelPath);
      
      fs.copyFile(sourceModelPath, destinationModelPath, (err) => {
        if (err) {
          console.error("Error copying file:", err);
        } else {
          console.log("File copied successfully to:", destinationModelPath);
        }
      });
    }
  }

  // Créer l'arborescence pour le modèle et les concepts
  public async createModelStructure(novelName: string) {
    try {
      const novelDir = path.join(this.modelReader.getModel().label, novelName);
      const imagesDir = path.join(novelDir, "_Images");

      // Créer le répertoire du roman
      await this.createDirectoryIfNotExist(novelDir);

      // Créer un répertoire pour chaque concept du modèle
      for (const concept of this.modelReader.getModel().concepts) {
        const conceptPath = path.join(novelDir, concept.label);
        await this.createDirectoryIfNotExist(conceptPath);
      }

      // Créer le répertoire images
      await this.createDirectoryIfNotExist(imagesDir);

      // Copie de l'image unknown
      const sourceImagePath = this.modelReader.getUnknownImagePath();
      const destinationimagePath = this.getUnknownImagePath(novelDir);
      if (!fs.existsSync(destinationimagePath)) {
        console.log("Source Path:", sourceImagePath);
        console.log("Destination Path:", destinationimagePath);
        
        fs.copyFile(sourceImagePath, destinationimagePath, (err) => {
          if (err) {
            console.error("Error copying file:", err);
          } else {
            console.log("File copied successfully to:", destinationimagePath);
          }
        });
      }

      new Notice(`La structure du roman "${novelDir}" a été créée avec succès !`);
    } catch (error) {
      console.error("Erreur lors de la création de la structure du modèle:", error);
      new Notice(`Erreur lors de la création de la structure du modèle: ${error.message}`);
    }
  }

  // Vérifie si un répertoire existe, et le crée si nécessaire
  private async createDirectoryIfNotExist(dirPath: string) {
      console.log(`folder creation: ${dirPath} ` + this.plugin.app.vault.getAbstractFileByPath(dirPath));
      if (!this.plugin.app.vault.getAbstractFileByPath(dirPath)) {
        await this.plugin.app.vault.createFolder(dirPath);
        
      }
      console.log(`Created folder: ${dirPath}`);
  }

  private getModelFilePath(modelPath: string) : string {
    const vaultBasePath = (this.plugin.app.vault.adapter as any).getBasePath();
    const modelDir = `${vaultBasePath}/${modelPath}`;
    return `${modelDir}/model.yml`;
  }

  private getUnknownImagePath(novelDir: string) : string {
    const vaultBasePath = (this.plugin.app.vault.adapter as any).getBasePath();
    const modelDir = `${vaultBasePath}/${novelDir}`;
    return `${modelDir}/_Images/unknown.png`;
  }
}
