import { __awaiter } from "tslib";
import { Model } from "./data/Model";
import { parseYaml, TFolder } from "obsidian";
import * as fs from "fs";
import * as path from "path";
export class ModelReader {
    constructor(plugin) {
        this.plugin = plugin;
        // Charger le modèle
        this.loadModel();
    }
    /**
     * Charge un modèle à partir d'un fichier YAML.
     * @throws Une erreur si le fichier est invalide ou si le contenu est mal formé.
     */
    loadModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modelFilePath = this.getModelTemplateFilePath();
                if (!fs.existsSync(modelFilePath)) {
                    throw new Error("Erreur : le fichier du modèle '" + modelFilePath + "' n'existe pas.");
                }
                // Lire le contenu du fichier de manière synchrone
                const fileContent = fs.readFileSync(modelFilePath, 'utf-8');
                const parsedData = parseYaml(fileContent);
                if (!parsedData || !parsedData.model || !Array.isArray(parsedData.model)) {
                    throw new Error("Le contenu du fichier YAML est invalide ou incomplet.");
                }
                this.model = Model.fromYaml(parsedData);
            }
            catch (error) {
                throw new Error(`Erreur lors du chargement du modèle : ${error.message}`);
            }
        });
    }
    getModel() {
        return this.model;
    }
    getModelTemplateFilePath() {
        return path.join(this.plugin.getDir(), "resources", "templates", "novel-model.yml");
    }
    getUnknownImagePath() {
        return path.join(this.plugin.getDir(), "resources", "images", "unknown.png");
    }
    getModelPathFromNodelDir(folder) {
        // Base path du vault
        const vaultBasePath = this.plugin.app.vault.adapter.getBasePath();
        // Fonction pour trouver model.yml en remontant l'arborescence
        function findModelFile(currentFolder) {
            const modelFilePath = path.join(vaultBasePath, currentFolder.path, "model.yml");
            console.log("modelFilePath=" + modelFilePath);
            if (fs.existsSync(modelFilePath)) {
                return modelFilePath;
            }
            // Remonter à l'élément parent s'il existe
            const parentFolder = currentFolder.parent;
            if (parentFolder && parentFolder instanceof TFolder) {
                return findModelFile(parentFolder);
            }
            return null; // Aucun modèle trouvé
        }
        // Cas du dossier racine "/"
        if (folder.path === "/") {
            return null;
        }
        return findModelFile(folder);
    }
    isConceptFolder(folder) {
        // Vérifier si le dossier est un concept défini dans le modèle
        const conceptName = folder.name; // Nom du dossier actuel
        return this.getModel().concepts.some((concept) => concept.label === conceptName);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kZWxSZWFkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWwvTW9kZWxSZWFkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDckMsT0FBTyxFQUFVLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDdEQsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDekIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFHN0IsTUFBTSxPQUFPLFdBQVc7SUFJdEIsWUFBWSxNQUFtQjtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRDs7O09BR0c7SUFDRyxTQUFTOztZQUNiLElBQUksQ0FBQztnQkFDSCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQTtnQkFDckQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztvQkFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRyxhQUFhLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztnQkFDekYsQ0FBQztnQkFFRCxrREFBa0Q7Z0JBQ2xELE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM1RCxNQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBRTFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDekUsTUFBTSxJQUFJLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO2dCQUMzRSxDQUFDO2dCQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztnQkFDZixNQUFNLElBQUksS0FBSyxDQUFDLHlDQUF5QyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUM1RSxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBRUQsd0JBQXdCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBR0QsbUJBQW1CO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELHdCQUF3QixDQUFDLE1BQWU7UUFDdEMscUJBQXFCO1FBQ3JCLE1BQU0sYUFBYSxHQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFlLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFM0UsOERBQThEO1FBQzlELFNBQVMsYUFBYSxDQUFDLGFBQXNCO1lBQzNDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFaEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsQ0FBQTtZQUU3QyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztnQkFDakMsT0FBTyxhQUFhLENBQUM7WUFDdkIsQ0FBQztZQUVELDBDQUEwQztZQUMxQyxNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQzFDLElBQUksWUFBWSxJQUFJLFlBQVksWUFBWSxPQUFPLEVBQUUsQ0FBQztnQkFDcEQsT0FBTyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUVELE9BQU8sSUFBSSxDQUFDLENBQUMsc0JBQXNCO1FBQ3JDLENBQUM7UUFFRCw0QkFBNEI7UUFDNUIsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELE9BQU8sYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxlQUFlLENBQUMsTUFBZTtRQUM3Qiw4REFBOEQ7UUFDOUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLHdCQUF3QjtRQUN6RCxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDO0lBQ25GLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZGVsIH0gZnJvbSBcIi4vZGF0YS9Nb2RlbFwiO1xyXG5pbXBvcnQgeyBOb3RpY2UsIHBhcnNlWWFtbCwgVEZvbGRlciB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgTm92ZWxQbHVnaW4gZnJvbSBcInNyYy9tYWluXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTW9kZWxSZWFkZXIge1xyXG4gIHByaXZhdGUgbW9kZWw6IE1vZGVsO1xyXG4gIHByaXZhdGUgcGx1Z2luOiBOb3ZlbFBsdWdpbjtcclxuXHJcbiAgY29uc3RydWN0b3IocGx1Z2luOiBOb3ZlbFBsdWdpbikge1xyXG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcblxyXG4gICAgLy8gQ2hhcmdlciBsZSBtb2TDqGxlXHJcbiAgICB0aGlzLmxvYWRNb2RlbCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhcmdlIHVuIG1vZMOobGUgw6AgcGFydGlyIGQndW4gZmljaGllciBZQU1MLlxyXG4gICAqIEB0aHJvd3MgVW5lIGVycmV1ciBzaSBsZSBmaWNoaWVyIGVzdCBpbnZhbGlkZSBvdSBzaSBsZSBjb250ZW51IGVzdCBtYWwgZm9ybcOpLlxyXG4gICAqL1xyXG4gIGFzeW5jIGxvYWRNb2RlbCgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG1vZGVsRmlsZVBhdGggPSB0aGlzLmdldE1vZGVsVGVtcGxhdGVGaWxlUGF0aCgpXHJcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyhtb2RlbEZpbGVQYXRoKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkVycmV1ciA6IGxlIGZpY2hpZXIgZHUgbW9kw6hsZSAnXCIgKyBtb2RlbEZpbGVQYXRoICsgXCInIG4nZXhpc3RlIHBhcy5cIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIExpcmUgbGUgY29udGVudSBkdSBmaWNoaWVyIGRlIG1hbmnDqHJlIHN5bmNocm9uZVxyXG4gICAgICBjb25zdCBmaWxlQ29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhtb2RlbEZpbGVQYXRoLCAndXRmLTgnKTtcclxuICAgICAgY29uc3QgcGFyc2VkRGF0YSA9IHBhcnNlWWFtbChmaWxlQ29udGVudCk7XHJcblxyXG4gICAgICBpZiAoIXBhcnNlZERhdGEgfHwgIXBhcnNlZERhdGEubW9kZWwgfHwgIUFycmF5LmlzQXJyYXkocGFyc2VkRGF0YS5tb2RlbCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJMZSBjb250ZW51IGR1IGZpY2hpZXIgWUFNTCBlc3QgaW52YWxpZGUgb3UgaW5jb21wbGV0LlwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5tb2RlbCA9IE1vZGVsLmZyb21ZYW1sKHBhcnNlZERhdGEpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBFcnJldXIgbG9ycyBkdSBjaGFyZ2VtZW50IGR1IG1vZMOobGUgOiAke2Vycm9yLm1lc3NhZ2V9YCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBnZXRNb2RlbCgpOiBNb2RlbCB7XHJcbiAgICByZXR1cm4gdGhpcy5tb2RlbDtcclxuICB9XHJcblxyXG4gIGdldE1vZGVsVGVtcGxhdGVGaWxlUGF0aCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHBhdGguam9pbih0aGlzLnBsdWdpbi5nZXREaXIoKSwgXCJyZXNvdXJjZXNcIiwgXCJ0ZW1wbGF0ZXNcIiwgXCJub3ZlbC1tb2RlbC55bWxcIik7XHJcbiAgfVxyXG5cclxuXHJcbiAgZ2V0VW5rbm93bkltYWdlUGF0aCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHBhdGguam9pbih0aGlzLnBsdWdpbi5nZXREaXIoKSwgXCJyZXNvdXJjZXNcIiwgXCJpbWFnZXNcIiwgXCJ1bmtub3duLnBuZ1wiKTtcclxuICB9XHJcblxyXG4gIGdldE1vZGVsUGF0aEZyb21Ob2RlbERpcihmb2xkZXI6IFRGb2xkZXIpOiBzdHJpbmcgfCBudWxsIHtcclxuICAgIC8vIEJhc2UgcGF0aCBkdSB2YXVsdFxyXG4gICAgY29uc3QgdmF1bHRCYXNlUGF0aCA9ICh0aGlzLnBsdWdpbi5hcHAudmF1bHQuYWRhcHRlciBhcyBhbnkpLmdldEJhc2VQYXRoKCk7XHJcblxyXG4gICAgLy8gRm9uY3Rpb24gcG91ciB0cm91dmVyIG1vZGVsLnltbCBlbiByZW1vbnRhbnQgbCdhcmJvcmVzY2VuY2VcclxuICAgIGZ1bmN0aW9uIGZpbmRNb2RlbEZpbGUoY3VycmVudEZvbGRlcjogVEZvbGRlcik6IHN0cmluZyB8IG51bGwge1xyXG4gICAgICBjb25zdCBtb2RlbEZpbGVQYXRoID0gcGF0aC5qb2luKHZhdWx0QmFzZVBhdGgsIGN1cnJlbnRGb2xkZXIucGF0aCwgXCJtb2RlbC55bWxcIik7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcIm1vZGVsRmlsZVBhdGg9XCIgKyBtb2RlbEZpbGVQYXRoKVxyXG5cclxuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMobW9kZWxGaWxlUGF0aCkpIHtcclxuICAgICAgICByZXR1cm4gbW9kZWxGaWxlUGF0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gUmVtb250ZXIgw6AgbCfDqWzDqW1lbnQgcGFyZW50IHMnaWwgZXhpc3RlXHJcbiAgICAgIGNvbnN0IHBhcmVudEZvbGRlciA9IGN1cnJlbnRGb2xkZXIucGFyZW50O1xyXG4gICAgICBpZiAocGFyZW50Rm9sZGVyICYmIHBhcmVudEZvbGRlciBpbnN0YW5jZW9mIFRGb2xkZXIpIHtcclxuICAgICAgICByZXR1cm4gZmluZE1vZGVsRmlsZShwYXJlbnRGb2xkZXIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbnVsbDsgLy8gQXVjdW4gbW9kw6hsZSB0cm91dsOpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FzIGR1IGRvc3NpZXIgcmFjaW5lIFwiL1wiXHJcbiAgICBpZiAoZm9sZGVyLnBhdGggPT09IFwiL1wiKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZpbmRNb2RlbEZpbGUoZm9sZGVyKTtcclxuICB9XHJcblxyXG4gIGlzQ29uY2VwdEZvbGRlcihmb2xkZXI6IFRGb2xkZXIpOiBib29sZWFuIHtcclxuICAgIC8vIFbDqXJpZmllciBzaSBsZSBkb3NzaWVyIGVzdCB1biBjb25jZXB0IGTDqWZpbmkgZGFucyBsZSBtb2TDqGxlXHJcbiAgICBjb25zdCBjb25jZXB0TmFtZSA9IGZvbGRlci5uYW1lOyAvLyBOb20gZHUgZG9zc2llciBhY3R1ZWxcclxuICAgIHJldHVybiB0aGlzLmdldE1vZGVsKCkuY29uY2VwdHMuc29tZSgoY29uY2VwdCkgPT4gY29uY2VwdC5sYWJlbCA9PT0gY29uY2VwdE5hbWUpO1xyXG4gIH1cclxufVxyXG4iXX0=