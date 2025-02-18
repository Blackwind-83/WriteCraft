import { __awaiter } from "tslib";
import { Notice, TFolder } from "obsidian";
import { ModelReader } from "../model/ModelReader";
import { NewSheetPrompt } from "./NewSheetPrompt";
export class ContextMenuUI {
    constructor(plugin) {
        this.plugin = plugin;
        this.templateLoader = new ModelReader(this.plugin);
    }
    load() {
        this.plugin.registerEvent(this.plugin.app.workspace.on("file-menu", (menu, file) => {
            if (file instanceof TFolder) {
                this.addContextMenu(menu, file);
            }
        }));
    }
    unload() {
        // Pas besoin d'une logique spécifique ici : les événements enregistrés avec `registerEvent` seront automatiquement nettoyés à l'unload du plugin.
    }
    addContextMenu(menu, folder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérifier si un modèle existe 
                var modelPath = this.templateLoader.getModelPathFromNodelDir(folder);
                if (!modelPath) {
                    return false;
                }
                // Charger le modèle
                this.templateLoader.loadModel();
                // Ajouter le menu si c'est un dossier de type concept
                if (this.templateLoader.isConceptFolder(folder)) {
                    menu.addItem((item) => {
                        item.setTitle("Ajouter fiche")
                            .setIcon("file-plus")
                            .onClick(() => this.addSheet(folder));
                    });
                }
            }
            catch (error) {
                console.error("Erreur dans le menu contextuel :", error);
            }
        });
    }
    addSheet(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const model = this.templateLoader.getModel(); // Récupère le modèle
                const conceptId = folder.name; // Utilise le nom du dossier pour identifier le concept
                const concept = model.concepts.find((c) => c.label === conceptId);
                if (!concept) {
                    new Notice("Aucun concept correspondant trouvé pour ce dossier !");
                    return;
                }
                const sheetName = yield this.showPrompt();
                // Construit le contenu du fichier à partir du modèle
                const fileContent = this.generateFileContent(concept, sheetName);
                const newFilePath = `${folder.path}/${sheetName}.md`;
                if (!this.plugin.app.vault.getAbstractFileByPath(newFilePath)) {
                    yield this.plugin.app.vault.create(newFilePath, fileContent);
                    new Notice("Nouvelle fiche ajoutée !");
                }
                else {
                    new Notice("Une fiche existe déjà ici !");
                }
            }
            catch (error) {
                console.error("Erreur lors de l'ajout de la fiche :", error);
                new Notice("Impossible d'ajouter la fiche.");
            }
        });
    }
    /**
     * Génère le contenu d'une fiche à partir d'un concept.
     * @param concept Le concept à utiliser pour générer la fiche.
     * @returns Le contenu formaté de la fiche.
     */
    generateFileContent(concept, name) {
        let content = `---\n`;
        // Ajoute les groupes et propriétés du concept
        content += `tag: ${concept.id}\n`;
        for (const group of concept.groups) {
            for (const property of group.properties) {
                content += `${property.id}:\n`;
            }
        }
        content += `---\n`;
        // Ajoute les groupes et propriétés du concept
        for (const group of concept.groups) {
            //content += `> [!info] 📜 **${group.label}**\n`;
            content += `| ${group.label} |  |\n`;
            content += `| ------ | ------ |\n`;
            for (const property of group.properties) {
                //content += `> - **${property.label}** : \n`;
                content += `| ${property.label} |  |\n`;
            }
            content += `\n`; // Séparateur entre groupes
        }
        return content;
    }
    // Fonction pour afficher le modal de saisie du nom du roman
    showPrompt() {
        return new Promise((resolve) => {
            const modal = new NewSheetPrompt(this.plugin.app, resolve);
            modal.open();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dE1lbnVVSS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jaGVldGdlbmVyYXRvci9Db250ZXh0TWVudVVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQVEsTUFBTSxFQUFVLE9BQU8sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWxELE1BQU0sT0FBTyxhQUFhO0lBSXRCLFlBQVksTUFBbUI7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELElBQUk7UUFDQSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUU7WUFDckQsSUFBSSxJQUFJLFlBQVksT0FBTyxFQUFFLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVELE1BQU07UUFDRixrSkFBa0o7SUFDdEosQ0FBQztJQUdhLGNBQWMsQ0FBQyxJQUFVLEVBQUUsTUFBZTs7WUFDcEQsSUFBSSxDQUFDO2dCQUVELGdDQUFnQztnQkFDaEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNiLE9BQU8sS0FB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SSxPQUFPLENBQUM7UUFFbkIsOENBQThDO1FBQzlDLEtBQUssTUFBTSxLQUFLLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pDLGlEQUFpRDtZQUVqRCxPQUFPLElBQUksS0FBSyxLQUFLLENBQUMsS0FBSyxTQUFTLENBQUE7WUFDcEMsT0FBTyxJQUFJLHVCQUF1QixDQUFBO1lBQ2xDLEtBQUssTUFBTSxRQUFRLElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUN0Qyw4Q0FBOEM7Z0JBQzlDLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxLQUFLLFNBQVMsQ0FBQTtZQUMzQyxDQUFDO1lBQ0QsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLDJCQUEyQjtRQUNoRCxDQUFDO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELDREQUE0RDtJQUNwRCxVQUFVO1FBQ2QsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzNCLE1BQU0sS0FBSyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzNELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lbnUsIE5vdGljZSwgUGx1Z2luLCBURm9sZGVyIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCB7IE1vZGVsUmVhZGVyIH0gZnJvbSBcIi4uL21vZGVsL01vZGVsUmVhZGVyXCI7XHJcbmltcG9ydCBOb3ZlbFBsdWdpbiBmcm9tIFwic3JjL21haW5cIjtcclxuaW1wb3J0IHsgTmV3U2hlZXRQcm9tcHQgfSBmcm9tIFwiLi9OZXdTaGVldFByb21wdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51VUkge1xyXG4gICAgcHJpdmF0ZSBwbHVnaW46IE5vdmVsUGx1Z2luO1xyXG4gICAgcHJpdmF0ZSB0ZW1wbGF0ZUxvYWRlcjogTW9kZWxSZWFkZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocGx1Z2luOiBOb3ZlbFBsdWdpbikge1xyXG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xyXG4gICAgICAgIHRoaXMudGVtcGxhdGVMb2FkZXIgPSBuZXcgTW9kZWxSZWFkZXIodGhpcy5wbHVnaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5wbHVnaW4ucmVnaXN0ZXJFdmVudChcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uYXBwLndvcmtzcGFjZS5vbihcImZpbGUtbWVudVwiLCAobWVudSwgZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpbGUgaW5zdGFuY2VvZiBURm9sZGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDb250ZXh0TWVudShtZW51LCBmaWxlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHVubG9hZCgpIHtcclxuICAgICAgICAvLyBQYXMgYmVzb2luIGQndW5lIGxvZ2lxdWUgc3DDqWNpZmlxdWUgaWNpIDogbGVzIMOpdsOpbmVtZW50cyBlbnJlZ2lzdHLDqXMgYXZlYyBgcmVnaXN0ZXJFdmVudGAgc2Vyb250IGF1dG9tYXRpcXVlbWVudCBuZXR0b3nDqXMgw6AgbCd1bmxvYWQgZHUgcGx1Z2luLlxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGFkZENvbnRleHRNZW51KG1lbnU6IE1lbnUsIGZvbGRlcjogVEZvbGRlcikge1xyXG4gICAgICAgIHRyeSB7XHJcblxyXG4gICAgICAgICAgICAvLyBWw6lyaWZpZXIgc2kgdW4gbW9kw6hsZSBleGlzdGUgXHJcbiAgICAgICAgICAgIHZhciBtb2RlbFBhdGggPSB0aGlzLnRlbXBsYXRlTG9hZGVyLmdldE1vZGVsUGF0aEZyb21Ob2RlbERpcihmb2xkZXIpO1xyXG4gICAgICAgICAgICBpZiAoIW1vZGVsUGF0aCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFyZ2VyIGxlIG1vZMOobGVcclxuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZUxvYWRlci5sb2FkTW9kZWwoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFqb3V0ZXIgbGUgbWVudSBzaSBjJ2VzdCB1biBkb3NzaWVyIGRlIHR5cGUgY29uY2VwdFxyXG4gICAgICAgICAgICBpZiAodGhpcy50ZW1wbGF0ZUxvYWRlci5pc0NvbmNlcHRGb2xkZXIoZm9sZGVyKSkge1xyXG4gICAgICAgICAgICAgICAgbWVudS5hZGRJdGVtKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zZXRUaXRsZShcIkFqb3V0ZXIgZmljaGVcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldEljb24oXCJmaWxlLXBsdXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uQ2xpY2soKCkgPT4gdGhpcy5hZGRTaGVldChmb2xkZXIpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycmV1ciBkYW5zIGxlIG1lbnUgY29udGV4dHVlbCA6XCIsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyBhZGRTaGVldChmb2xkZXI6IFRGb2xkZXIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBtb2RlbCA9IHRoaXMudGVtcGxhdGVMb2FkZXIuZ2V0TW9kZWwoKTsgLy8gUsOpY3Vww6hyZSBsZSBtb2TDqGxlXHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmNlcHRJZCA9IGZvbGRlci5uYW1lOyAvLyBVdGlsaXNlIGxlIG5vbSBkdSBkb3NzaWVyIHBvdXIgaWRlbnRpZmllciBsZSBjb25jZXB0XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbmNlcHQgPSBtb2RlbC5jb25jZXB0cy5maW5kKChjKSA9PiBjLmxhYmVsID09PSBjb25jZXB0SWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb25jZXB0KSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgTm90aWNlKFwiQXVjdW4gY29uY2VwdCBjb3JyZXNwb25kYW50IHRyb3V2w6kgcG91ciBjZSBkb3NzaWVyICFcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNoZWV0TmFtZSA9IGF3YWl0IHRoaXMuc2hvd1Byb21wdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ29uc3RydWl0IGxlIGNvbnRlbnUgZHUgZmljaGllciDDoCBwYXJ0aXIgZHUgbW9kw6hsZVxyXG4gICAgICAgICAgICBjb25zdCBmaWxlQ29udGVudCA9IHRoaXMuZ2VuZXJhdGVGaWxlQ29udGVudChjb25jZXB0LCBzaGVldE5hbWUpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgbmV3RmlsZVBhdGggPSBgJHtmb2xkZXIucGF0aH0vJHtzaGVldE5hbWV9Lm1kYDtcclxuXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wbHVnaW4uYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChuZXdGaWxlUGF0aCkpIHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLmFwcC52YXVsdC5jcmVhdGUobmV3RmlsZVBhdGgsIGZpbGVDb250ZW50KTtcclxuICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJOb3V2ZWxsZSBmaWNoZSBham91dMOpZSAhXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3IE5vdGljZShcIlVuZSBmaWNoZSBleGlzdGUgZMOpasOgIGljaSAhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycmV1ciBsb3JzIGRlIGwnYWpvdXQgZGUgbGEgZmljaGUgOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJJbXBvc3NpYmxlIGQnYWpvdXRlciBsYSBmaWNoZS5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR8OpbsOocmUgbGUgY29udGVudSBkJ3VuZSBmaWNoZSDDoCBwYXJ0aXIgZCd1biBjb25jZXB0LlxyXG4gICAgICogQHBhcmFtIGNvbmNlcHQgTGUgY29uY2VwdCDDoCB1dGlsaXNlciBwb3VyIGfDqW7DqXJlciBsYSBmaWNoZS5cclxuICAgICAqIEByZXR1cm5zIExlIGNvbnRlbnUgZm9ybWF0w6kgZGUgbGEgZmljaGUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2VuZXJhdGVGaWxlQ29udGVudChjb25jZXB0OiBhbnksIG5hbWU6IHN0cmluZyB8IG51bGwpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBjb250ZW50ID0gYC0tLVxcbmA7XHJcbiAgICAgICAgLy8gQWpvdXRlIGxlcyBncm91cGVzIGV0IHByb3ByacOpdMOpcyBkdSBjb25jZXB0XHJcbiAgICAgICAgY29udGVudCArPSBgdGFnOiAke2NvbmNlcHQuaWR9XFxuYDtcclxuICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIGNvbmNlcHQuZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcGVydHkgb2YgZ3JvdXAucHJvcGVydGllcykge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgJHtwcm9wZXJ0eS5pZH06XFxuYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZW50ICs9IGAtLS1cXG5gO1xyXG5cclxuICAgICAgICAvLyBBam91dGUgbGVzIGdyb3VwZXMgZXQgcHJvcHJpw6l0w6lzIGR1IGNvbmNlcHRcclxuICAgICAgICBmb3IgKGNvbnN0IGdyb3VwIG9mIGNvbmNlcHQuZ3JvdXBzKSB7XHJcbiAgICAgICAgICAgIC8vY29udGVudCArPSBgPiBbIWluZm9dIPCfk5wgKioke2dyb3VwLmxhYmVsfSoqXFxuYDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnRlbnQgKz0gYHwgJHtncm91cC5sYWJlbH0gfCAgfFxcbmBcclxuICAgICAgICAgICAgY29udGVudCArPSBgfCAtLS0tLS0gfCAtLS0tLS0gfFxcbmBcclxuICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBncm91cC5wcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnRlbnQgKz0gYD4gLSAqKiR7cHJvcGVydHkubGFiZWx9KiogOiBcXG5gO1xyXG4gICAgICAgICAgICAgICAgY29udGVudCArPSBgfCAke3Byb3BlcnR5LmxhYmVsfSB8ICB8XFxuYFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRlbnQgKz0gYFxcbmA7IC8vIFPDqXBhcmF0ZXVyIGVudHJlIGdyb3VwZXNcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBjb250ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZvbmN0aW9uIHBvdXIgYWZmaWNoZXIgbGUgbW9kYWwgZGUgc2Fpc2llIGR1IG5vbSBkdSByb21hblxyXG4gICAgcHJpdmF0ZSBzaG93UHJvbXB0KCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtb2RhbCA9IG5ldyBOZXdTaGVldFByb21wdCh0aGlzLnBsdWdpbi5hcHAsIHJlc29sdmUpO1xyXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==