import { MarkdownPostProcessorContext, MarkdownView, Modal, Notice, Plugin, setIcon, TFile } from "obsidian";
import { NovelMenuUI } from "./novel/NovelMenuUI";
import { ContextMenuUI } from "./sheetgenerator/ContextMenuUI"

import * as path from "path";
import { SheetRenderer } from "./sheetrenderer/SheetRenderer";
import { Logger } from "./logger/Logger";
import { WritecraftState } from "./WritecraftState";

export default class NovelPlugin extends Plugin {
    private novelMenuUI: NovelMenuUI | null = null;
    private contextMenuUI: ContextMenuUI | null = null;
    private conceptEditProcessor: SheetRenderer | null = null;

    async onload() {

        Logger.setLevel(Logger.levels.DEBUG); // Set the desired log level
        Logger.info("Loading WriteCraft Plugin...");

        WritecraftState.getInstance().initialize(this);

        // Initialize UI components
        this.novelMenuUI = new NovelMenuUI(this);
        this.novelMenuUI.load();
        this.contextMenuUI = new ContextMenuUI(this);
        this.contextMenuUI.load();
        this.conceptEditProcessor = new SheetRenderer(this);
        this.conceptEditProcessor.initialize();
    }

    onunload() {
        Logger.info("Unloading Novel Plugin...");
        this.novelMenuUI?.unload();
    }

    getDir(): string {
        const basePath = (this.app.vault.adapter as any).getBasePath(); // Utiliser getBasePath()
        if (this.manifest.dir) {
            return path.join(basePath, this.manifest.dir);
        } else {
            throw new Error("Le path du répertoire d'installation du plugin est introuvable.");
        }
    }
    /** Register a markdown post processor with the given priority. */
    public registerPriorityMarkdownPostProcessor(
        priority: number,
        processor: (el: HTMLElement, ctx: MarkdownPostProcessorContext) => Promise<void>
    ) {
        let registered = this.registerMarkdownPostProcessor(processor);
        registered.sortOrder = priority;
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

