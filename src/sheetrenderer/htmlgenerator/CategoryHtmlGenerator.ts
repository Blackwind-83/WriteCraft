import { TFile } from "obsidian";
import NovelPlugin from "src/main";
import { FormItem } from "../parser/WriteCraftItem";
import { HtmlGenerator } from "./HtmlGenerator";
import { WritecraftMode, WritecraftState } from "src/WritecraftState";

export class CategoryHtmlGenerator extends HtmlGenerator {
    constructor(plugin: NovelPlugin, file: TFile, formItem: FormItem) {
        super(plugin, file, formItem);
    }

    async generateForm(): Promise<string> {
        const id = this.formItem.id;
        const label = this.formItem.properties["label"];
        
        const content = `
            <details class="accordion" id=${id}>
                <summary>${label}</summary>
                <fieldset>
                    ${await this.generateChildren()}
                </fieldset>
            </details>
        `;
        console.log('Generated category HTML:', content);
        return content;
    }

    async generateCard(): Promise<string> {
        const id = this.formItem.id;
        const label = this.formItem.properties["label"];
        const contentChildren = await this.generateChildren();
        let content = "";

        if (contentChildren) {
            content = `
                <div class="category-legend">${label}</div>
                <fieldset id="${id}" class="category-fieldset">
                    ${contentChildren}
                </fieldset>
            `;
        }
    
        console.log('Generated category HTML:', content);
        return content;
    }
    

    async initializeSelf(blocHtml: HTMLElement) {
        console.log("initializeSelf category : " + this.formItem.id)
        const field = blocHtml.querySelector(`#${this.formItem.id}`) as HTMLDetailsElement;
        field.addEventListener("toggle", () => {
            if (field.open) {
                document.querySelectorAll("details.accordion").forEach((other) => {
                    if (other !== field) {
                        (other as HTMLDetailsElement).open = false;
                    }
                });
            }
        });
    }
}
