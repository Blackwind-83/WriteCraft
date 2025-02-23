import { Menu, Notice, TFolder } from "obsidian";
import { ModelLoader } from "../../../model/ModelLoader";
import { NewNovelPrompt } from "../NewNovelPrompt";
import NovelPlugin from "src/main";
import * as path from "path";

export class ModelGenerator {
  private plugin: NovelPlugin;
  private modelLoader: ModelLoader;

  constructor(plugin: NovelPlugin) {
    this.plugin = plugin;
    this.modelLoader = new ModelLoader(this.plugin);
  }

  initialize() {
    this.plugin.registerEvent(
      this.plugin.app.workspace.on("file-menu", (menu, file) => {
        if (file instanceof TFolder) {
          this.addContextMenu(menu, file);
        }
      })
    );
  }

  private async addContextMenu(menu: Menu, folder: TFolder) {
    // Charger le modèle
    this.modelLoader.loadModel(folder);

    // Ajouter le menu si c'est un dossier de type concept
    if (this.modelLoader.getModel() && this.modelLoader.isModelFolder(folder)) {
      menu.addItem((item) => {
        item
          .setTitle("New " + this.modelLoader.getModel().label)
          .setIcon("file-plus")
          .onClick(() => this.createModel(folder));
      });
    }
  }

  // Fonction pour afficher le modal de saisie du nom du roman
  private showNovelNamePrompt(): Promise<string | null> {
    return new Promise((resolve) => {
      const modal = new NewNovelPrompt(this.plugin.app, resolve);
      modal.open();
    });
  }

  // Créer l'arborescence pour le modèle et les concepts
  public async createModel(modelContainFolder: TFolder) {
    // Afficher le modal pour que l'utilisateur entre le nom du roman
    const novelName = await this.showNovelNamePrompt()

    if (novelName) {
      console.log(`Nom du roman: ${novelName}`);

        // Créer le répertoire du roman
        const novelDir = path.join(modelContainFolder.name, novelName);
        await this.createDirectoryIfNotExist(novelDir);

        // Créer un répertoire pour chaque concept du modèle
        for (const concept of this.modelLoader.getModel().concepts) {
          const conceptPath = path.join(novelDir, concept.dirName);
          await this.createDirectoryIfNotExist(conceptPath);
        }

        // Créer le répertoire images
        const imagesDir = path.join(novelDir, "_Images");
        await this.createDirectoryIfNotExist(imagesDir);

        new Notice(`La structure du roman "${novelDir}" a été créée avec succès !`);
      
    } else {
      new Notice("Nom du roman non spécifié.");
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
}
