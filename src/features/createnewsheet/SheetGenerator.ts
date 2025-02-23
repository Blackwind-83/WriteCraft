import { Menu, Notice, Plugin, TFolder } from "obsidian";
import { ModelLoader } from "../../model/ModelLoader";
import NovelPlugin from "src/main";
import { NewSheetPrompt } from "./component/NewSheetPrompt";
import { Concept } from "src/model/data/Concept";
import { WritecraftSyntaxGenerator } from "src/writecraftsyntax/WritecraftSyntaxGenerator";
import { Model } from "src/model/data/Model";

export class SheetGenerator {
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

      const concept = this.modelLoader.getConceptFromDir(folder);

      // Ajouter le menu si c'est un dossier de type concept
      if (concept) {
        menu.addItem((item) => {
          item
            .setTitle("New " + concept.label)
            .setIcon("file-plus")
            .onClick(() => this.addSheet(folder, concept));
        });
      }
    }

    private async addSheet(folder: TFolder, concept: Concept) {
        const sheetName = await this.showPrompt();

        // Construit le contenu du fichier à partir du modèle
        const fileContent = this.generateFileContent(this.modelLoader.getModel(), concept, sheetName);

        const newFilePath = `${folder.path}/${sheetName}.md`;

        if (!this.plugin.app.vault.getAbstractFileByPath(newFilePath)) {
            await this.plugin.app.vault.create(newFilePath, fileContent);
            new Notice("Nouvelle fiche ajoutée !");
        } else {
            new Notice("Une fiche existe déjà ici !");
        }
    }

    /**
     * Génère le contenu d'une fiche à partir d'un concept.
     * @param concept Le concept à utiliser pour générer la fiche.
     * @returns Le contenu formaté de la fiche.
     */
    private generateFileContent(model: Model, concept: Concept, name: string | null): string {
        // Ajoute le tag de la fiche
        let content = `---\n`;
        content += `tag: ${concept.id}\n`;
        content += `---\n`;

        content += WritecraftSyntaxGenerator.generate(model, concept);

        return content;
    }

    // Fonction pour afficher le modal de saisie du nom du roman
    private showPrompt(): Promise<string | null> {
        return new Promise((resolve) => {
            const modal = new NewSheetPrompt(this.plugin.app, resolve);
            modal.open();
        });
    }

}
