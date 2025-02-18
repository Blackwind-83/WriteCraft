import { TFile } from "obsidian";
import NovelPlugin from "src/main";
import { FilePropertyManager } from "../../property/FilePropertyManager";
import { Utils } from "src/Utils";
import { HtmlGenerator } from "./HtmlGenerator";
import { FormItem } from "../parser/WriteCraftItem";
import { WritecraftMode, WritecraftState } from "src/WritecraftState";

export class CheckboxHtmlGenerator extends HtmlGenerator {
    constructor(plugin: NovelPlugin, file: TFile, formItem: FormItem) {
        super(plugin, file, formItem);
    }

    async generateForm(): Promise<string> {
        const id = this.formItem.id;
        const label = this.formItem.properties["label"];
        const options = this.formItem.properties["options"];
        
        const content = `
            <div class="form-group form-input checkbox">
                <label for="${id}">${label} :</label>
                <div class="checkbox-group" id=>
                    ${options?.map((option: string) => `
                        <div class="checkbox-option" id="${id}">
                            <input class="checkbox-btn" type="checkbox" id="${id}-${option}" name="${option}" />
                            <label for="${option}">${option}</label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        console.log('Generated checkbox HTML:', content);
        return content;
    }

    async generateCard(): Promise<string> {
        const id = this.formItem.id;
        const label = this.formItem.properties["label"];
        let content ="";
    
        // Lire la liste des valeurs cochées depuis le fichier
        const selectedValues = (await FilePropertyManager.readProperty(this.file, id)) as string[];
    
        if (selectedValues) {
            // Transformer la liste en chaîne de caractères avec ", " comme séparateur
            const formattedValues = selectedValues.length > 0 ? selectedValues.join(", ") : "Aucune sélection";
        
            // Générer le HTML de la carte
            content = `
                <p><strong>${label} :</strong> ${formattedValues}</p>
            `;
        }
    
        console.log('Generated checkbox card HTML:', content);
        return content;
    }    

    async initializeSelf(blocHtml: HTMLElement) {
        console.log("initializeSelf checkbox : " + this.formItem.id)
        const eltList = (await FilePropertyManager.readProperty(this.file, this.formItem.id) || []) as string[];
        console.log(eltList)

        // For each options
        const options = this.formItem.properties["options"];
        if (options) {
            options?.map(async (option: string) => {
                const field = blocHtml.querySelector(`#${this.formItem.id}-${option}`) as HTMLInputElement;
                field.checked = eltList.includes(field.name);
        
                // Add a listener to update the property when the field is modified
                Utils.addDebouncedEventListener(field, "change", async () => {
                    let eltList = (await FilePropertyManager.readProperty(this.file, this.formItem.id) || []) as string[];
                    const option = field.name;
                    if (field.checked) {
                        eltList.push(option);
                    }
                    else {
                        eltList.remove(option);
                    }
                    await FilePropertyManager.updateProperty(this.file, this.formItem.id, eltList);
                });
            });
        }
    }
}
