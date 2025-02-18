import { MarkdownView, setIcon } from "obsidian";
import { Logger } from "./logger/Logger";
import NovelPlugin from "./main";


export enum WritecraftMode {
    FORM = "FORM",
    CARD = "CARD",
}

export class WritecraftState extends EventTarget {
    private static instance: WritecraftState = new WritecraftState(); // Singleton
    private mode: WritecraftMode = WritecraftMode.FORM;
    private plugin: NovelPlugin;
  
    private constructor() {
      super();
    }
  
    // Récupérer l'instance unique de WritecraftState
    public static getInstance(): WritecraftState {
      return this.instance;
    }
  
    // Getter pour récupérer l'état actuel
    public getMode(): WritecraftMode {
      return this.mode;
    }
  
    // Setter pour changer l'état et déclencher un événement
    public setMode(newMode: WritecraftMode): void {
      if (this.mode !== newMode) {
        this.mode = newMode;
        this.dispatchEvent(new CustomEvent("writecraft-mode-changed", { detail: this.mode }));
        console.log("Mode changé :", this.mode);
      }
    }
  
    // Toggle entre FORM et CARD
    public toggleMode(): void {
      this.setMode(this.mode === WritecraftMode.FORM ? WritecraftMode.CARD : WritecraftMode.FORM);
    }
  

    initialize(plugin: NovelPlugin) {
        this.plugin = plugin;
        this.plugin.app.workspace.on('active-leaf-change', (leaf) => {
            this.manageButton()
        });
        this.plugin.app.workspace.on("quick-preview", (editor) => {
            this.manageButton()
        });
    }

    private manageButton() {
        // Récupérer la feuille active
        const leaf = this.plugin.app.workspace.activeLeaf;

        // Vérifier si la feuille active a une vue Markdown
        if (leaf && leaf.view instanceof MarkdownView) {
            // Récupérer le fichier associé à la vue
            const file = leaf.view.file;

            if (file) {
                this.plugin.app.vault.read(file).then((content) => {
                    console.log("Content (raw text):", content); // Affichage du contenu brut du fichier

                    // Vérifier si le contenu contient un bloc 'writecraft'
                    const writecraftRegex = /``` writecraft/;
                    const hasWritecraftBlock = content.match(writecraftRegex);

                    console.log(hasWritecraftBlock);

                    // Ajouter ou retirer le bouton en fonction de la présence du bloc 'writecraft'
                    if (hasWritecraftBlock) {
                        this.addModeButton(); // Ajouter le bouton si le bloc 'writecraft' est trouvé
                    } else {
                        this.removeModeButton(); // Retirer le bouton si le bloc 'writecraft' n'est pas trouvé
                    }
                }).catch((error) => {
                    console.error("Error reading file:", error);
                });
            }
        }
    }

    private addModeButton() {
        console.log(">>>> addButton");

        // Vérifier si le bouton existe déjà pour éviter qu'il soit ajouté deux fois
        const existingButton = document.querySelector('.my-custom-button');
        if (!existingButton) {

            const icon1 = "hammer"
            const icon2 = "eye"

            // Créer le bouton
            const button = document.createElement('button');
            button.classList.add('clickable-icon'); // Classe pour ressembler aux autres boutons
            button.classList.add('my-custom-button');  // Ajouter une classe unique
            button.setAttribute('aria-label', 'Mon bouton Lucide');
            setIcon(button, icon1);  // Ajouter l'icône Lucide


            // Ajouter l'événement de clic pour basculer l'icône
            button.addEventListener('click', () => {
                // Vérifier l'icône actuelle et la changer
                const svg = button.querySelector('svg');
                if (this.mode == WritecraftMode.CARD) {
                    this.setMode(WritecraftMode.FORM);
                    setIcon(button, icon2);  // Changer en "file-spreadsheet"
                } else {
                    this.setMode(WritecraftMode.CARD);
                    setIcon(button, icon1);  // Revenir à "file-sliders"
                }
            });


            // Ajouter le bouton au conteneur
            const barre = document.querySelector('.view-actions'); // Trouver la barre des actions de la vue
            if (barre) {
                barre.insertBefore(button, barre.firstChild); // Placer le bouton avant les autres éléments
            }
        } else {
            console.log("Le bouton existe déjà !");
        }
    }


    private removeModeButton() {
        console.log(">>>> removeModeButton");

        // Vérifier si le bouton existe déjà pour éviter qu'il soit ajouté deux fois
        const existingButton = document.querySelector('.my-custom-button');
        if (existingButton) {
            // Ajouter le bouton au conteneur
            const barre = document.querySelector('.view-actions'); // Trouver la barre des actions de la vue
            if (barre && existingButton) {
                barre.removeChild(existingButton); // Placer le bouton avant les autres éléments
            }
        } else {
            console.log("Le bouton existe déjà !");
        }
    }
}


