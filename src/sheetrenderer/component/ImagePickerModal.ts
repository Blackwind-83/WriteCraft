import { App, Modal, TFile } from "obsidian";
import NovelPlugin from "src/main";

export class ImagePickerModal extends Modal {
    private plugin: NovelPlugin;
    private images: TFile[];        // Liste des images
    private filteredImages: TFile[]; // Liste des images filtrées
    private onSelect: (file: TFile) => void;

    constructor(plugin: NovelPlugin, images: TFile[], onSelect: (file: TFile) => void) {
        super(plugin.app);
        this.plugin = plugin;
        this.images = images;
        this.filteredImages = images; // Initialiser avec toutes les images
        this.onSelect = onSelect;
    }

    async onOpen() {
        const { contentEl } = this;
        contentEl.empty();

        // Titre de la fenêtre modale
        contentEl.createEl("h2", { text: "Choisir une image" });

        // Champ de recherche pour filtrer les images par nom
        const searchInput = contentEl.createEl("input", {
            type: "text",
            placeholder: "Filtrer par nom d'image...",
            cls: "image-picker-search"
        });

        // Écouter les changements dans le champ de recherche
        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase();
            this.filteredImages = this.images.filter(imageFile =>
                imageFile.name.toLowerCase().includes(searchTerm)
            );
            this.renderImages(container); // Re-rendre les images filtrées
        });

        // Conteneur stylisé pour les images
        const container = contentEl.createEl("div", { cls: "image-picker-container" });

        this.renderImages(container); // Rendre les images initiales

    }

    onClose() {
        this.contentEl.empty();
    }

    // Fonction pour afficher les images filtrées
    private async renderImages(container: HTMLElement) {
        container.empty(); // Vide le conteneur avant de le remplir avec les images filtrées
        for (const imageFile of this.filteredImages) {
            const imageUrl = await this.plugin.convertImagePathToUrl(imageFile);
            const img = container.createEl("img", {
                attr: {
                    src: imageUrl,
                    title: imageFile.path // Tooltip avec le chemin de l'image
                },
                cls: "image-option",
            });

            // Ajouter un événement pour la sélection de l'image
            img.addEventListener("click", () => {
                this.onSelect(imageFile);
                this.close();
            });
        }
    }
}
