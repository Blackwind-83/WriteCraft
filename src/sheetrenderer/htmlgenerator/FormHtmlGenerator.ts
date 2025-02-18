import { TFile } from "obsidian";
import NovelPlugin from "src/main";
import { FormItem } from "../parser/WriteCraftItem";
import { HtmlGenerator } from "./HtmlGenerator";
import { Logger } from "src/logger/Logger";
import { WritecraftMode, WritecraftState } from "src/WritecraftState";

export class FormHtmlGenerator extends HtmlGenerator {
    constructor(plugin: NovelPlugin, file: TFile, formItem: FormItem) {
        super(plugin, file, formItem);
    }

    async generateForm(): Promise<string> {
        console.log("🎨 Génération du HTML en mode lecture...");

        const content = `
            <div id="writecraft-block">
                <div class="form-container">
                    <div class="name-container">
                        ${this.file.basename}
                    </div>
                    ${await this.generateChildren()}
                </div>
            </div>
        `;
        Logger.info('Generated form HTML:' + content);
        return content;
    }

    async generateCard(): Promise<string> {
        const content = `
            <div id="writecraft-block">
                <div class="form-container">
                    <div class="name-container">
                        ${this.file.basename}
                    </div>
                    ${await this.generateChildren()}
                </div>
            </div>
        `;
        Logger.info('Generated form HTML:' + content);
        return content;
    }

    async initializeSelf(blocHtml: HTMLElement) {
        console.log("initializeSelf form : " + this.formItem.id)
        // Nothing to do
    }
}
