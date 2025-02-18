import { __awaiter } from "tslib";
import { Notice } from "obsidian";
import { getTranslation } from "../i18n/i18n-utils";
import { folders_translations } from "../i18n/folder-translations";
import { menu_translations } from "../i18n/menu-translations";
import { CreateNewEltPrompt } from "./NewSheetPrompt";
import { createElementFile } from "./create-element";
/**
 * Ajout d'une option de menu contextuel générique "New" dans les sous-dossiers d'un roman
 * @param app Instance de l'application Obsidian
 * @param menu Menu contextuel fourni par l'événement
 * @param fileOrFolder Fichier ou dossier sélectionné
 */
export function addContextMenuOption(app, menu, fileOrFolder) {
    const folderPath = fileOrFolder.path;
    const rootFolder = getTranslation(folders_translations, "novels");
    // Récupérer dynamiquement les sous-dossiers traduisibles depuis category_translations
    const subFolders = Object.keys(folders_translations).filter((key) => key !== "novels");
    console.log("Clés des sous-dossiers :", subFolders);
    console.log("Traductions des sous-dossiers :", subFolders.map((sf) => getTranslation(folders_translations, sf)));
    if (folderPath.startsWith(rootFolder) &&
        subFolders.some((sf) => folderPath.includes(getTranslation(folders_translations, sf)))) {
        const newMenuTitle = getTranslation(menu_translations, "new");
        menu.addItem((item) => {
            item.setTitle(newMenuTitle).onClick(() => {
                new CreateNewEltPrompt(app, (name) => __awaiter(this, void 0, void 0, function* () {
                    const newFilePath = `${folderPath}/${name}.md`;
                    if (app.vault.getAbstractFileByPath(newFilePath)) {
                        new Notice(`Le fichier "${name}" existe déjà.`);
                    }
                    else {
                        yield createElementFile(app, folderPath, name); // Appel de la fonction pour créer l'élément
                        //await app.vault.create(newFilePath, `# ${name}\n\n## Description\n[Ajoutez du contenu ici]`);
                        new Notice(`Fichier "${name}" créé avec succès !`);
                    }
                })).open();
            });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LWVsZW1lbnQtbWVudS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGVldGdlbmVyYXRvci9uZXctZWxlbWVudC1tZW51LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQWEsTUFBTSxFQUFpQixNQUFNLFVBQVUsQ0FBQztBQUM1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDbkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFckQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQUMsR0FBUSxFQUFFLElBQVUsRUFBRSxZQUEyQjtJQUNwRixNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO0lBQ3JDLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxvQkFBb0IsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUVsRSxzRkFBc0Y7SUFDdEYsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDO0lBRXZGLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWpILElBQ0UsVUFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFDakMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUN0RixDQUFDO1FBQ0QsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTlELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ3ZDLElBQUksa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQU8sSUFBWSxFQUFFLEVBQUU7b0JBQ2pELE1BQU0sV0FBVyxHQUFHLEdBQUcsVUFBVSxJQUFJLElBQUksS0FBSyxDQUFDO29CQUUvQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQzt3QkFDakQsSUFBSSxNQUFNLENBQUMsZUFBZSxJQUFJLGdCQUFnQixDQUFDLENBQUM7b0JBQ2xELENBQUM7eUJBQU0sQ0FBQzt3QkFDTixNQUFNLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyw0Q0FBNEM7d0JBQzVGLCtGQUErRjt3QkFDL0YsSUFBSSxNQUFNLENBQUMsWUFBWSxJQUFJLHNCQUFzQixDQUFDLENBQUM7b0JBQ3JELENBQUM7Z0JBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcCwgTWVudSwgTm90aWNlLCBUQWJzdHJhY3RGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCB7IGdldFRyYW5zbGF0aW9uIH0gZnJvbSBcIi4uL2kxOG4vaTE4bi11dGlsc1wiO1xyXG5pbXBvcnQgeyBmb2xkZXJzX3RyYW5zbGF0aW9ucyB9IGZyb20gXCIuLi9pMThuL2ZvbGRlci10cmFuc2xhdGlvbnNcIjtcclxuaW1wb3J0IHsgbWVudV90cmFuc2xhdGlvbnMgfSBmcm9tIFwiLi4vaTE4bi9tZW51LXRyYW5zbGF0aW9uc1wiO1xyXG5pbXBvcnQgeyBDcmVhdGVOZXdFbHRQcm9tcHQgfSBmcm9tIFwiLi9OZXdTaGVldFByb21wdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVFbGVtZW50RmlsZSB9IGZyb20gXCIuL2NyZWF0ZS1lbGVtZW50XCI7XHJcblxyXG4vKipcclxuICogQWpvdXQgZCd1bmUgb3B0aW9uIGRlIG1lbnUgY29udGV4dHVlbCBnw6luw6lyaXF1ZSBcIk5ld1wiIGRhbnMgbGVzIHNvdXMtZG9zc2llcnMgZCd1biByb21hblxyXG4gKiBAcGFyYW0gYXBwIEluc3RhbmNlIGRlIGwnYXBwbGljYXRpb24gT2JzaWRpYW5cclxuICogQHBhcmFtIG1lbnUgTWVudSBjb250ZXh0dWVsIGZvdXJuaSBwYXIgbCfDqXbDqW5lbWVudFxyXG4gKiBAcGFyYW0gZmlsZU9yRm9sZGVyIEZpY2hpZXIgb3UgZG9zc2llciBzw6lsZWN0aW9ubsOpXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYWRkQ29udGV4dE1lbnVPcHRpb24oYXBwOiBBcHAsIG1lbnU6IE1lbnUsIGZpbGVPckZvbGRlcjogVEFic3RyYWN0RmlsZSkge1xyXG4gIGNvbnN0IGZvbGRlclBhdGggPSBmaWxlT3JGb2xkZXIucGF0aDtcclxuICBjb25zdCByb290Rm9sZGVyID0gZ2V0VHJhbnNsYXRpb24oZm9sZGVyc190cmFuc2xhdGlvbnMsIFwibm92ZWxzXCIpO1xyXG5cclxuICAvLyBSw6ljdXDDqXJlciBkeW5hbWlxdWVtZW50IGxlcyBzb3VzLWRvc3NpZXJzIHRyYWR1aXNpYmxlcyBkZXB1aXMgY2F0ZWdvcnlfdHJhbnNsYXRpb25zXHJcbiAgY29uc3Qgc3ViRm9sZGVycyA9IE9iamVjdC5rZXlzKGZvbGRlcnNfdHJhbnNsYXRpb25zKS5maWx0ZXIoKGtleSkgPT4ga2V5ICE9PSBcIm5vdmVsc1wiKTtcclxuXHJcbiAgY29uc29sZS5sb2coXCJDbMOpcyBkZXMgc291cy1kb3NzaWVycyA6XCIsIHN1YkZvbGRlcnMpO1xyXG4gIGNvbnNvbGUubG9nKFwiVHJhZHVjdGlvbnMgZGVzIHNvdXMtZG9zc2llcnMgOlwiLCBzdWJGb2xkZXJzLm1hcCgoc2YpID0+IGdldFRyYW5zbGF0aW9uKGZvbGRlcnNfdHJhbnNsYXRpb25zLCBzZikpKTtcclxuXHJcbiAgaWYgKFxyXG4gICAgZm9sZGVyUGF0aC5zdGFydHNXaXRoKHJvb3RGb2xkZXIpICYmXHJcbiAgICBzdWJGb2xkZXJzLnNvbWUoKHNmKSA9PiBmb2xkZXJQYXRoLmluY2x1ZGVzKGdldFRyYW5zbGF0aW9uKGZvbGRlcnNfdHJhbnNsYXRpb25zLCBzZikpKVxyXG4gICkge1xyXG4gICAgY29uc3QgbmV3TWVudVRpdGxlID0gZ2V0VHJhbnNsYXRpb24obWVudV90cmFuc2xhdGlvbnMsIFwibmV3XCIpO1xyXG5cclxuICAgIG1lbnUuYWRkSXRlbSgoaXRlbSkgPT4ge1xyXG4gICAgICBpdGVtLnNldFRpdGxlKG5ld01lbnVUaXRsZSkub25DbGljaygoKSA9PiB7XHJcbiAgICAgICAgbmV3IENyZWF0ZU5ld0VsdFByb21wdChhcHAsIGFzeW5jIChuYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG5ld0ZpbGVQYXRoID0gYCR7Zm9sZGVyUGF0aH0vJHtuYW1lfS5tZGA7XHJcblxyXG4gICAgICAgICAgaWYgKGFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgobmV3RmlsZVBhdGgpKSB7XHJcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoYExlIGZpY2hpZXIgXCIke25hbWV9XCIgZXhpc3RlIGTDqWrDoC5gKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGNyZWF0ZUVsZW1lbnRGaWxlKGFwcCwgZm9sZGVyUGF0aCwgbmFtZSk7IC8vIEFwcGVsIGRlIGxhIGZvbmN0aW9uIHBvdXIgY3LDqWVyIGwnw6lsw6ltZW50XHJcbiAgICAgICAgICAgIC8vYXdhaXQgYXBwLnZhdWx0LmNyZWF0ZShuZXdGaWxlUGF0aCwgYCMgJHtuYW1lfVxcblxcbiMjIERlc2NyaXB0aW9uXFxuW0Fqb3V0ZXogZHUgY29udGVudSBpY2ldYCk7XHJcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoYEZpY2hpZXIgXCIke25hbWV9XCIgY3LDqcOpIGF2ZWMgc3VjY8OocyAhYCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkub3BlbigpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=