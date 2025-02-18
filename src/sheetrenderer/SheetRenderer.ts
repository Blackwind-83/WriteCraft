import { TAbstractFile, TFile } from "obsidian";
import NovelPlugin from "src/main";
import { ModelReader } from "src/model/ModelManager";
import { FormParser as WriteCraftCodeParser } from "./parser/WriteCraftSyntaxParser";
import { FilePropertyManager } from "../property/FilePropertyManager";
import { Logger } from "../logger/Logger";
import { HtmlGeneratorFactory as HtmlGeneratorFactory } from "./htmlgenerator/HtmlGeneratorFactory";
import { WritecraftMode, WritecraftState } from "src/WritecraftState";
import { FormItem } from "./parser/WriteCraftItem";

export class SheetRenderer {
    private plugin: NovelPlugin;
    private modelReader: ModelReader;
    private writeCraftCodeParser: WriteCraftCodeParser;
    private formHTML: FormItem | null | undefined;
    private file: TAbstractFile | null;
    private page: HTMLElement;

    constructor(plugin: NovelPlugin) {
        this.plugin = plugin;
        this.modelReader = new ModelReader(this.plugin);
        this.modelReader.loadModel();
        this.writeCraftCodeParser = new WriteCraftCodeParser();
        new FilePropertyManager(this.plugin); // Initialize the static plugin reference
    }

    initialize() {
        // Écouter les changements d'état
        const state = WritecraftState.getInstance();
        state.addEventListener("writecraft-mode-changed", (event: Event) => {
            const mode = (event as CustomEvent<WritecraftMode>).detail;
            console.log("Le mode Writecraft a changé :", mode);
  
            // Ici, tu peux faire ce que tu veux en fonction du mode (ex: changer l'UI)
            this.display();
        });

        this.plugin.registerMarkdownCodeBlockProcessor("writecraft", async (source, el, ctx) => {
            Logger.info("writecraft block detected, source: " + source);

            // Retrieve the current file
            this.file = ctx.sourcePath ? this.plugin.app.vault.getAbstractFileByPath(ctx.sourcePath) : null;

            // Parse the source
            this.formHTML = this.writeCraftCodeParser.parse(source);
            Logger.info("Parsed form item: " + JSON.stringify(this.formHTML));
            
            this.page = el;

            this.display();
        });

    }

    private async display() {
        if (this.formHTML && this.file && this.page && this.file instanceof TFile) {
            const generator = HtmlGeneratorFactory.create(this.plugin, this.file, this.formHTML);
            
            // Vérification du Promise avant de continuer
            const formHTML = await generator.generate();  // Attendre le résultat de la génération

            console.log("Generated HTML:", formHTML);  // Pour vérifier le contenu généré
    
            // On peut maintenant utiliser formHTML sans problème, une fois la Promise résolue
            this.page.innerHTML = formHTML;
    
            Logger.info("Generated HTML: " + formHTML);
    
            // Initialiser les éléments supplémentaires après l'insertion
            await generator.initialize(this.page);  // Attente de l'initialisation si nécessaire
        }
    }
    
}


