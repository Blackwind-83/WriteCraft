import NovelPlugin from "src/main";
import * as path from "path";
import { ResourcesUtil } from "src/utils/ResourcesUtil";

export class ModelContainerGenerator {
  private static readonly RIBBON_CLASS: string = "novel-plugin-ribbon-icon";
  private static readonly DEFAULT_CONTAINER_NAME: string = "Untitled";
  private plugin: NovelPlugin;

  constructor(plugin: NovelPlugin) {
    this.plugin = plugin;
  }

  initialize() {
    const ribbonIconEl = this.plugin.addRibbonIcon(
      "book",
      "Create new model container",
      async () => {
        await this.createModelContainer("novel");
      }
    );

    ribbonIconEl.addClass(ModelContainerGenerator.RIBBON_CLASS);
  }

  unload() {
    const ribbonIconEl = document.querySelector(ModelContainerGenerator.RIBBON_CLASS);
    ribbonIconEl?.remove();
  }

  public async createModelContainer(modelId: string) {
    const modelPath = ModelContainerGenerator.DEFAULT_CONTAINER_NAME;

    // Créer le répertoire global du modèle
    await this.createDirectoryIfNotExist(modelPath);

    // Créer le répertoire writecraft
    const writecraftDir = path.join(modelPath, "_writecraft")
    await this.createDirectoryIfNotExist(writecraftDir);

    // Copier le model
    ResourcesUtil.copyResourcesModel(this.plugin, modelId, writecraftDir);
  }

  private async createDirectoryIfNotExist(dirPath: string) {
    console.log(`folder creation: ${dirPath} ` + this.plugin.app.vault.getAbstractFileByPath(dirPath));
    if (!this.plugin.app.vault.getAbstractFileByPath(dirPath)) {
      await this.plugin.app.vault.createFolder(dirPath);

    }
    console.log(`Created folder: ${dirPath}`);
  }
}
