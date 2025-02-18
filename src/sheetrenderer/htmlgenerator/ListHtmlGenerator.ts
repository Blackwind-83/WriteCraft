import { TFile } from "obsidian";
import NovelPlugin from "src/main";
import { FilePropertyManager } from "../../property/FilePropertyManager";
import { Utils } from "src/Utils";
import { HtmlGenerator } from "./HtmlGenerator";
import { FormItem } from "../parser/WriteCraftItem";

export class ListHtmlGenerator extends HtmlGenerator {
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
        <div class="form-group form-input list" id="${id}" data-field="true">
            <label for="children-list">${label} : <label id="${id}-sum"/></label>
            <button id="${id}-addbtn" class="btn-list">➕</button></label>
            <input type="hidden" id="${id}-placeholder" value="${placeholder}">
            <input type="hidden" id="${id}-datalist" value="${datalist}">
            <input type="hidden" id="${id}-link" value="${link}">
            <ul id="${id}-list" class="grid-container">
            </ul>
        </div>
        `;
        console.log('Generated list HTML:', content);
        return content;
    }
    async generateCard(): Promise<string> {
        const id = this.formItem.id;
        const label = this.formItem.properties["label"];
        const link = this.formItem.properties["link"] === "true"; // Vérifie si les éléments sont des liens
        let content ="";
    
        // Récupérer les éléments de la liste
        const eltList = await FilePropertyManager.readProperty(this.file, id) as string[];
    
        if (eltList) {
            // Formater les éléments en fonction du type (texte simple ou lien)
            const formattedList = eltList.map((item) => {
                if (link) {
                    const cleanItem = item.replace("[[", "").replace("]]", "");
                    return `<a class="internal-link" href="${cleanItem}">${cleanItem}</a>`;
                }
                return item;
            }).join(", ");
        
            // Construire le HTML de la carte
            content = `
                <p><strong>${label} :</strong> ${formattedList || "Non défini"}</p>
            `;
        }
        
        console.log('Generated card HTML:', content);
        return content;
    }
    
    

    async initializeSelf(blocHtml: HTMLElement) {
        console.log("initializeSelf list : " + this.formItem.id)
        const field = blocHtml.querySelector(`#${this.formItem.id}`) as HTMLDivElement;
        
        const eltList = (await FilePropertyManager.readProperty(this.file, field.id) || []) as string[];

        // Initialize the field on the page loading
        eltList.forEach((elt: string) => {
            this.createElement(field, this.file);
        });
        this.setEltList(field, eltList);
        this.updateSumElt(field);
    
        // Add a listener to add a new element when the add button is clicked
        const addBtn = field.querySelector(`#${field.id}-addbtn`) as HTMLButtonElement;
        if (addBtn) {
            Utils.addDebouncedEventListener(addBtn, "click", async () => {
                this.createElement(field, this.file);
            });
        }
    }

    private updateSumElt(field: HTMLDivElement) {
        const sumElt = field.querySelector(`#${field.id}-sum`);
        if (sumElt) {
            const eltList = this.getEltList(field);
            sumElt.innerHTML = eltList.length.toString();
        }
    }

    private createElement(field: HTMLDivElement, file: TFile) {
        const list = field.querySelector(`#${field.id}-list`);
        const elt = document.createElement(`${field.id}-elt`);
        const placeholderField =  field.querySelector(`#${field.id}-placeholder`);
        const datalistField =  field.querySelector(`#${field.id}-datalist`);
        const linkField =  field.querySelector(`#${field.id}-link`);
        if (list && elt && list instanceof HTMLUListElement && placeholderField && datalistField && linkField) {
            elt.classList.add("child-entry");
            const placeholder = placeholderField.getAttribute("value");
            const datalist = datalistField.getAttribute("value");
            const link = linkField.getAttribute("value");
            elt.innerHTML = `
                <input type="text" id="${field.id}-field" class="children-field" placeholder="${placeholder}" list="${datalist}" data-link="${link}">
                <button id="${field.id}-elt-rmbtn" class="btn-list">❌</button>
            `;
        
            // element delete button
            const deleteBtn = elt.querySelector(`#${field.id}-elt-rmbtn`);
            if (deleteBtn) {
                deleteBtn.addEventListener("click", () => {
                    elt.remove()
                    this.updateProperty(file, field);
                    this.updateSumElt(field);
                });   
            }
            list.appendChild(elt);
        
            // element field
            const eltField = elt.querySelector(`#${field.id}-field`);
            if (eltField && eltField instanceof HTMLInputElement) {
                eltField.addEventListener("input", async () => {
                    console.log("Input value:", eltField.value);
                    this.updateProperty(file, field);
                    this.updateSumElt(field);
                });   
            }
            list.appendChild(elt);
        }
    }

    private async updateProperty(file: TFile, field: HTMLDivElement) {
        const listElt = this.getEltList(field);
        await FilePropertyManager.updateProperty(file, field.id, listElt);
    }

    private getEltList(field: HTMLDivElement): string[] {
        const eltFields = field.querySelectorAll("input:not([type='hidden'])");
        const children: string[] = [];
        eltFields.forEach((elt) => {
            if (elt instanceof HTMLInputElement) {
                let value = elt.value;
                const isLink = elt.dataset.link === "true";
                if (value) {
                    if (isLink) {
                        value = "[[" + value + "]]";
                    }
                    children.push(value);
                }
            }
        });
        return children;
    }

    private setEltList(field: HTMLDivElement, list: string[]) {
        const eltFields = field.querySelectorAll("input:not([type='hidden'])");
        eltFields.forEach((elt, index) => {
            if (elt instanceof HTMLInputElement) {
                elt.value = list[index].toString().replace("[[", "").replace("]]", "");
            }
        });
    }
}
