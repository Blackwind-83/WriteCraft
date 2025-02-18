import { App, Menu, Notice, TAbstractFile } from "obsidian";
import { getTranslation } from "../i18n/i18n-utils";
import { folders_translations } from "../i18n/folder-translations";
import { menu_translations } from "../i18n/menu-translations";
import { NewSheetPrompt } from "./NewSheetPrompt";

/**
 * Ajout d'une option de menu contextuel générique "New" dans les sous-dossiers d'un roman
 * @param app Instance de l'application Obsidian
 * @param menu Menu contextuel fourni par l'événement
 * @param fileOrFolder Fichier ou dossier sélectionné
 */
export function addContextMenuOption(app: App, menu: Menu, fileOrFolder: TAbstractFile) {
  const folderPath = fileOrFolder.path;
  const rootFolder = getTranslation(folders_translations, "novels");

  // Récupérer dynamiquement les sous-dossiers traduisibles depuis category_translations
  const subFolders = Object.keys(folders_translations).filter((key) => key !== "novels");

  console.log("Clés des sous-dossiers :", subFolders);
  console.log("Traductions des sous-dossiers :", subFolders.map((sf) => getTranslation(folders_translations, sf)));

  if (
    folderPath.startsWith(rootFolder) &&
    subFolders.some((sf) => folderPath.includes(getTranslation(folders_translations, sf)))
  ) {
    const newMenuTitle = getTranslation(menu_translations, "new");

    menu.addItem((item) => {
      item.setTitle(newMenuTitle).onClick(() => {
        new NewSheetPrompt(app, async (name: string) => {
          const newFilePath = `${folderPath}/${name}.md`;

          if (app.vault.getAbstractFileByPath(newFilePath)) {
            new Notice(`Le fichier "${name}" existe déjà.`);
          } else {
            await createElementFile(app, folderPath, name); // Appel de la fonction pour créer l'élément
            //await app.vault.create(newFilePath, `# ${name}\n\n## Description\n[Ajoutez du contenu ici]`);
            new Notice(`Fichier "${name}" créé avec succès !`);
          }
        }).open();
      });
    });
  }
}
