import { Plugin, TFile } from "obsidian";
import { ModelGenerator } from "./features/createnewmodel/component/ModelGenerator";
import { SheetRenderer } from "./sheetrenderer/SheetRenderer";
import { Logger } from "./logger/Logger";
import { WritecraftState } from "./sheetrenderer/WritecraftState";
import { SheetGenerator } from "./features/createnewsheet/SheetGenerator";
import { ModelContainerGenerator } from "./features/createnewmodelcontainer/ModelContainerGenerator";

export default class NovelPlugin extends Plugin {
    private modelContainerGenerator: ModelContainerGenerator | null = null;
    private modelGenerator: ModelGenerator | null = null;
    private sheetGenerator: SheetGenerator | null = null;
    private sheetRenderer: SheetRenderer | null = null;

    async onload() {

        Logger.setLevel(Logger.levels.DEBUG);
        Logger.info("Loading WriteCraft Plugin...");

        WritecraftState.getInstance().initialize(this);

        // Initialize components
        this.modelContainerGenerator = new ModelContainerGenerator(this);
        this.modelContainerGenerator.initialize();
        this.modelGenerator = new ModelGenerator(this);
        this.modelGenerator.initialize();
        this.sheetGenerator = new SheetGenerator(this);
        this.sheetGenerator.initialize();
        this.sheetRenderer = new SheetRenderer(this);
        this.sheetRenderer.initialize();
    }

    onunload() {
        Logger.info("Unloading Novel Plugin...");
        this.modelGenerator?.unload();
    }

    async convertImagePathToUrl(imageFile: TFile): Promise<string> {
        console.log(`Conversion du chemin en URL pour : ${imageFile.path}`);

        try {
            const data = await this.app.vault.readBinary(imageFile);
            const blob = new Blob([data]);
            const url = URL.createObjectURL(blob);

            console.log(`URL créée : ${url}`);
            return url;
        } catch (err) {
            console.error(`Erreur lors de la lecture du fichier ${imageFile.path} :`, err);
            return ""; // Pas d'image par défaut ici, la gestion se fait ailleurs
        }
    }

}

