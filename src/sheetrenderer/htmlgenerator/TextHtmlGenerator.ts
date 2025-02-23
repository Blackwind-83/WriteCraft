import { TFile } from "obsidian";
import NovelPlugin from "src/main";
import { FilePropertyUtils } from "src/utils/FilePropertyUtils";
import { Utils } from "src/utils/Utils";
import { HtmlGenerator } from "./HtmlGenerator";
import { FormItem } from "../parser/WriteCraftItem";

export class TextHtmlGenerator extends HtmlGenerator {
    constructor(plugin: NovelPlugin, file: TFile, formItem: FormItem) {
        super(plugin, file, formItem);
    }

    async generateForm(): Promise<string> {
        const id = this.formItem.id;
        const label = this.formItem.properties["label"];
        const placeholder = this.formItem.properties["placeholder"];
        const datalist = this.formItem.properties["datalist"];
        const link = this.formItem.properties["link"];
        const content = `
            <div class="form-group form-input text">
                <label for="${id}">${label} :</label>
                <input type="text" name="${id}" id="${id}" placeholder="${placeholder}" list="${datalist}" data-link="${link}">
            </div>
        `;
        console.log('Generated text HTML:', content);
        return content;
    }

    async generateCard(): Promise<string> {
        const id = this.formItem.id;
        const label = this.formItem.properties["label"];
        const link = this.formItem.properties["link"];
        let content = "";

        // Attendre que la valeur soit lue
        let value = await FilePropertyUtils.readProperty(this.file, id);

        if (value) {
            if (link) {
                value = value.toString().replace("[[", "").replace("]]", "");
                value = `<a class="internal-link" href="${value}">${value}</a>`;
            }
            content = `
                <p><strong>${label} :</strong> ${value}</p>
            `;
            
            console.log('Generated category HTML:', content);
        }
        return content;
    }
    

    async initializeSelf(blocHtml: HTMLElement) {
        const field = blocHtml.querySelector(`#${this.formItem.id}`) as HTMLInputElement;

        // Initialize the field on the page loading
        const text = (await FilePropertyUtils.readProperty(this.file, field.id) || "") as string;
        field.value = text.toString().replace("[[", "").replace("]]", "");

        // Add a listener to update the property when the field is modified
        Utils.addDebouncedEventListener(field, "input", async () => {
            let value = field.value;
            const isLink = field.dataset.link === "true";

            if (isLink && value) {
                value = "[[" + value + "]]";
            }
            await FilePropertyUtils.updateProperty(this.file, field.id, value);
        });
    }
}
