import { TFile, Notice } from "obsidian";
import NovelPlugin from "src/main";
import { ImagePickerModal } from "../component/ImagePickerModal";
import { FilePropertyManager } from "../../property/FilePropertyManager";
import { Utils } from "src/Utils";
import { HtmlGenerator, HtmlMode } from "./HtmlGenerator";
import { FormItem } from "../parser/WriteCraftItem";

export class ImageHtmlGenerator extends HtmlGenerator {
    private static readonly CLASS_CONTAINER_IMG = "image-container-image";
    private static readonly CLASS_DELETE_BUTTON = "delete-sheet-image";

    constructor(plugin: NovelPlugin, file: TFile, formItem: FormItem) {
        super(plugin, file, formItem);
    }

    async generateForm(): Promise<string> {
        const id = this.formItem.id;
        const source = this.formItem.properties["source"];
        const default_img = this.formItem.properties["default"];
        const content = `
            <div class="image-container">
                <div class="${ImageHtmlGenerator.CLASS_CONTAINER_IMG}">
                    <button class="${ImageHtmlGenerator.CLASS_DELETE_BUTTON}" id="${id}-deletebtn">❌</button>
                    <img id="${id}" data-source="${source}" data-default="${default_img}">
                </div>
            </div>
        `;
        console.log('Generated category HTML:', content);
        return content;
    }

    async generateCard(): Promise<string> {
        const id = this.formItem.id;
        const defaultImg = this.formItem.properties["default"];
        let content = "";

        // Lire la valeur stockée dans le fichier
        const imagePath = await FilePropertyManager.readProperty(this.file, id) || defaultImg;
        if (imagePath) {
            const fileImg = this.plugin.app.vault.getAbstractFileByPath(imagePath.toString()) as TFile;
            if (fileImg instanceof TFile) {
                const url = await this.plugin.convertImagePathToUrl(fileImg);

                // Générer le HTML de l'image
                content = `
                <div class="image-container">
                    <img id="${id}" src="${url}" alt="Image">
                </div>
            `;
            }
        }

        console.log('Generated image card HTML:', content);
        return content;
    }    

    async initializeSelf(blocHtml: HTMLElement) {
        console.log("initializeSelf image : " + this.formItem.id)
        const fieldImg = blocHtml.querySelector(`#${this.formItem.id}`) as HTMLImageElement;
        
        // Initialize the field on the page loading
        await this.displayImage(fieldImg);

        // Image listener
        Utils.addDebouncedEventListener(fieldImg, "click", async () => {
            console.log("Ouverture du sélecteur d'image...");
            const source = fieldImg.dataset.source as string;
            const images = await this.getImageList(source);
            if (images.length === 0) {
                new Notice("Aucune image trouvée dans `"+ source + "`.");
                return;
            }

            const modal = new ImagePickerModal(this.plugin, images, async (selectedImage) => {
                console.log("Image sélectionnée :", selectedImage.path);
                await FilePropertyManager.updateProperty(this.file, fieldImg.id, selectedImage.path);
                await this.displayImage(fieldImg);
            });

            modal.open();
        });

        // Delete button listener
        const deleteBtn = blocHtml.querySelector(`#${this.formItem.id}-deletebtn`) as HTMLImageElement;
        if (deleteBtn && deleteBtn instanceof HTMLButtonElement) {
            Utils.addDebouncedEventListener(deleteBtn, "click", async () => {
                console.log("Suppression de l'image");
                await FilePropertyManager.updateProperty(this.file, fieldImg.id, "");
                await this.displayImage(fieldImg);
            });
        }
    }

    private async getImageList(source: string): Promise<TFile[]> {
        return this.plugin.app.vault.getFiles()
            .filter(file =>
                file.path.includes(source) && /\.(png|jpg|jpeg|gif)$/i.test(file.name)
            )
            .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
    }    

    private async displayImage(fieldImg: HTMLImageElement) {
        let imagePath = await FilePropertyManager.readProperty(this.file, fieldImg.id) || fieldImg.dataset.default;
        try {
            if (imagePath) {
                const fileImg = this.plugin.app.vault.getAbstractFileByPath(imagePath.toString());
                if (fileImg instanceof TFile) {
                    const url = await this.plugin.convertImagePathToUrl(fileImg);
                    fieldImg.src = url;
                }
            }
        } catch (err) {
            Notice.apply(`Erreur lors de la lecture de l'image : ${err}. No '${fieldImg.dataset.default}' found.`);
        }
    }
}
