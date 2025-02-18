import { Menu, Notice, Plugin, TFolder } from "obsidian";
import { ModelReader } from "../model/ModelManager";
import NovelPlugin from "src/main";
import { NewSheetPrompt } from "./NewSheetPrompt";

export class ContextMenuUI {
    private plugin: NovelPlugin;
    private templateLoader: ModelReader;

    constructor(plugin: NovelPlugin) {
        this.plugin = plugin;
        this.templateLoader = new ModelReader(this.plugin);
    }

    load() {
        this.plugin.registerEvent(
            this.plugin.app.workspace.on("file-menu", (menu, file) => {
                if (file instanceof TFolder) {
                    this.addContextMenu(menu, file);
                }
            })
        );
    }

    unload() {
        // Pas besoin d'une logique spécifique ici : les événements enregistrés avec `registerEvent` seront automatiquement nettoyés à l'unload du plugin.
    }


    private async addContextMenu(menu: Menu, folder: TFolder) {
        try {

            // Vérifier si un modèle existe 
            var modelPath = this.templateLoader.getModelPathFromNodelDir(folder);
            if (!modelPath) {
                return false;
            }

            // Charger le modèle
            this.templateLoader.loadModel();

            // Ajouter le menu si c'est un dossier de type concept
            if (this.templateLoader.isConceptFolder(folder)) {
                menu.addItem((item) => {
                    item.setTitle("Ajouter fiche")
                        .setIcon("file-plus")
                        .onClick(() => this.addSheet(folder));
                });
            }
        } catch (error) {
            console.error("Erreur dans le menu contextuel :", error);
        }
    }

    private async addSheet(folder: TFolder) {
        try {
            const model = this.templateLoader.getModel(); // Récupère le modèle
            const conceptId = folder.name; // Utilise le nom du dossier pour identifier le concept
            const concept = model.concepts.find((c) => c.label === conceptId);

            if (!concept) {
                new Notice("Aucun concept correspondant trouvé pour ce dossier !");
                return;
            }

            const sheetName = await this.showPrompt();

            // Construit le contenu du fichier à partir du modèle
            const fileContent = this.generateFileContent(concept, sheetName);

            const newFilePath = `${folder.path}/${sheetName}.md`;

            if (!this.plugin.app.vault.getAbstractFileByPath(newFilePath)) {
                await this.plugin.app.vault.create(newFilePath, fileContent);
                new Notice("Nouvelle fiche ajoutée !");
            } else {
                new Notice("Une fiche existe déjà ici !");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout de la fiche :", error);
            new Notice("Impossible d'ajouter la fiche.");
        }
    }

    /**
     * Génère le contenu d'une fiche à partir d'un concept.
     * @param concept Le concept à utiliser pour générer la fiche.
     * @returns Le contenu formaté de la fiche.
     */
    private generateFileContent(concept: any, name: string | null): string {
        let content = `---\n`;
        // Ajoute les groupes et propriétés du concept
        content += `tag: ${concept.id}\n`;
        for (const group of concept.groups) {
            for (const property of group.properties) {
                content += `${property.id}:\n`;
            }
        }
        content += `---\n`;

        // Ajoute les groupes et propriétés du concept
        for (const group of concept.groups) {
            //content += `> [!info] 📜 **${group.label}**\n`;
            
            content += `| ${group.label} |  |\n`
            content += `| ------ | ------ |\n`
            for (const property of group.properties) {
                //content += `> - **${property.label}** : \n`;
                content += `| ${property.label} |  |\n`
            }
            content += `\n`; // Séparateur entre groupes
        }

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
