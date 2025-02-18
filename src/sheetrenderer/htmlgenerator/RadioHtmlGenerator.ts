import { TFile } from "obsidian";
import NovelPlugin from "src/main";
import { FilePropertyManager } from "../../property/FilePropertyManager";
import { Utils } from "src/Utils";
import { HtmlGenerator } from "./HtmlGenerator";
import { FormItem } from "../parser/WriteCraftItem";

export class RadioHtmlGenerator extends HtmlGenerator {
    constructor(plugin: NovelPlugin, file: TFile, formItem: FormItem) {
        super(plugin, file, formItem);
    }

    async generateForm(): Promise<string> {
        const id = this.formItem.id;
        const label = this.formItem.properties["label"];
        const options = this.formItem.properties["options"];
    
        const content = `
            <div class="form-group form-input radio">
                <label>${label} :</label>
                <div class="radio-group">
                    ${options?.map((option: string) => `
                        <div class="radio-option" id="${id}-${option}">
                            <input class="radio-btn" type="radio" id="${id}-${option}-btn" name="${id}" value="${option}"/>
                            <label for="${id}-${option}" tabindex="0">${option}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        console.log('Generated radio HTML:', content);
        return content;
    }

    async generateCard(): Promise<string> {
        const id = this.formItem.id;
        const label = this.formItem.properties["label"];
        const options = this.formItem.properties["options"] as string[];
        let content = "";
    
        // Récupérer la valeur sélectionnée depuis le fichier
        const selectedValue = await FilePropertyManager.readProperty(this.file, id);
    
        if (selectedValue) {
            // Trouver le label correspondant à la valeur sélectionnée
            const selectedLabel = options?.find(option => option === selectedValue);
        
            // Afficher la valeur sélectionnée ou "Non défini" si aucune sélection
            content = `
                <p><strong>${label} :</strong> ${selectedLabel || "Non défini"}</p>
            `;
        }
    
        console.log('Generated card HTML:', content);
        return content;
    }

    async initializeSelf(blocHtml: HTMLElement) {
        console.log("initializeSelf radio : " + this.formItem.id)
        const options = this.formItem.properties["options"];
        if (options && options != undefined) {
            options?.map(async (option: string) => {
                const field = blocHtml.querySelector(`#${this.formItem.id}-${option}-btn`) as HTMLInputElement;

                // Initialize the field on the page loading
                field.checked = (await FilePropertyManager.readProperty(this.file, this.formItem.id)) === field.value;

                // Add a listener to update the property when the field is modified
                Utils.addDebouncedEventListener(field, "change", async () => {
                    if (field.checked) {
                        await FilePropertyManager.updateProperty(this.file, this.formItem.id, field.value);
                    }
                });
            });
        }
    }
}
