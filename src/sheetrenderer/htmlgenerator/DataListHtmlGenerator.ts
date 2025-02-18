import NovelPlugin from "src/main";
import { TFile } from "obsidian";
import { FormItem } from "../parser/WriteCraftItem";
import { HtmlGenerator } from "./HtmlGenerator";
import { WritecraftMode, WritecraftState } from "src/WritecraftState";

export class DataListHtmlGenerator extends HtmlGenerator {
    constructor(plugin: NovelPlugin, file: TFile, formItem: FormItem) {
        super(plugin, file, formItem);
    }

    async generateForm(): Promise<string> {
        const id = this.formItem.id;
        const tag = this.formItem.properties["tag"];
        const values = this.formItem.properties["values"];
    
        let content = `<datalist id="${id}">\n`;
    
        if (values && Array.isArray(values)) {
            values.forEach(value => {
                content += `    <option value="${value}"></option>\n`;
            });
        }
    
        if (tag && typeof tag === 'string') {
            const pagesWithTag = this.getTaggedItems(tag);
            pagesWithTag.forEach(page => {
                content += `    <option value="${page}"></option>\n`;
            });
        }
    
        content += `</datalist>\n`;
    
        console.log('Generated datalist:', content);
        return content;
    }

    async generateCard(): Promise<string> {
        return "";
    }
    
    async initializeSelf(blocHtml: HTMLElement) {
        console.log("initializeSelf datalist : " + this.formItem.id)
        // Nothing to do
    }

    getTaggedItems(tag: string): string[] {
        const items: string[] = [];
        const files = this.plugin.app.vault.getFiles();

        for (const file of files) {
            const cache = this.plugin.app.metadataCache.getFileCache(file);
            if (cache?.frontmatter?.tags?.includes(tag)) {
                items.push(file.basename);
            }
        }
        return items;
    }
}
