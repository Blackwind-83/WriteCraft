import { TFile } from "obsidian";
import NovelPlugin from "src/main";
import { FilePropertyManager } from "../../property/FilePropertyManager";
import { Utils } from "src/Utils";
import { HtmlGenerator } from "./HtmlGenerator";
import { FormItem } from "../parser/WriteCraftItem";

export class TextAreaHtmlGenerator extends HtmlGenerator {
    constructor(plugin: NovelPlugin, file: TFile, formItem: FormItem) {
        super(plugin, file, formItem);
    }

    async generateForm(): Promise<string> {
        const id = this.formItem.id;
        const label = this.formItem.properties["label"];
        const placeholder = this.formItem.properties["placeholder"];
        const rows = this.formItem.properties["rows"];
    
        const content = `
            <div class="form-group form-input textarea">
                <label for="${id}">${label} :</label>
                <textarea name="${id}" id="${id}" rows="${rows}" placeholder="${placeholder}"></textarea>
            </div>
        `;
        console.log('Generated textArea HTML:', content);
        return content;
    }

    async generateCard(): Promise<string> {
        const id = this.formItem.id;
        const label = this.formItem.properties["label"];
        let content = "";
    
        // Lire la valeur stockée dans le fichier
        const value = (await FilePropertyManager.readProperty(this.file, id)) as string;
        if (value) {
            const formattedValue = value.replace(/\n/g, "<br>");
        
            // Générer le HTML de la carte
            content = `
                <p><strong>${label} :</strong></p>
                <p>${formattedValue}</p>
            `;
        }
        
        console.log('Generated textArea card HTML:', content);
        return content;
    }
    

    async initializeSelf(blocHtml: HTMLElement) {
        console.log("initializeSelf texarea : " + this.formItem.id)
        const field = blocHtml.querySelector(`#${this.formItem.id}`) as HTMLTextAreaElement;

        // Initialize the field on the page loading
        const text = (await FilePropertyManager.readProperty(this.file, field.id) || "") as string;
        field.value = text;
    
        // Add a listener to update the property when the field is modified
        Utils.addDebouncedEventListener(field, "input", async () => {
            await FilePropertyManager.updateProperty(this.file, field.id, field.value);
        });
    }
}
