import { __awaiter } from "tslib";
import { Notice } from "obsidian";
import { ModelReader } from "../model/ModelReader";
import { NewNovelPrompt } from "./NewNovelPrompt";
import * as fs from "fs";
import * as path from "path";
export class NovelMenuUI {
    constructor(plugin) {
        this.plugin = plugin;
        this.modelReader = new ModelReader(this.plugin);
        this.modelReader.loadModel();
    }
    load() {
        const ribbonIconEl = this.plugin.addRibbonIcon("book", "Novel Plugin", () => __awaiter(this, void 0, void 0, function* () {
            new Notice("Welcome to the Novel Plugin!");
            try {
                // Afficher le modal pour que l'utilisateur entre le nom du roman
                const novelName = yield this.showNovelNamePrompt();
                console.log("Chosen novel name : " + novelName);
                if (novelName) {
                    console.log(`Nom du roman: ${novelName}`);
                    // Créer l'arborescence pour ce roman
                    yield this.createBaseStructure();
                    yield this.createModelStructure(novelName);
                }
                else {
                    new Notice("Nom du roman non spécifié.");
                }
            }
            catch (error) {
                console.error("Error loading the model:", error);
                new Notice(`Error loading model: ${error.message || error}`);
            }
        }));
        ribbonIconEl.addClass("novel-plugin-ribbon-icon");
    }
    unload() {
        const ribbonIconEl = document.querySelector(".novel-plugin-ribbon-icon");
        ribbonIconEl === null || ribbonIconEl === void 0 ? void 0 : ribbonIconEl.remove();
    }
    // Fonction pour afficher le modal de saisie du nom du roman
    showNovelNamePrompt() {
        return new Promise((resolve) => {
            const modal = new NewNovelPrompt(this.plugin.app, resolve);
            modal.open();
        });
    }
    createBaseStructure() {
        return __awaiter(this, void 0, void 0, function* () {
            const modelPath = this.modelReader.getModel().label; // Création du répertoire principal du modèle
            // Créer le répertoire du modèle
            yield this.createDirectoryIfNotExist(modelPath);
            yield this.createDirectoryIfNotExist(modelPath + "_Images");
            // Copie du modele
            const sourceModelPath = this.modelReader.getModelTemplateFilePath();
            const destinationModelPath = this.getModelFilePath(modelPath);
            if (!fs.existsSync(destinationModelPath)) {
                console.log("Source Path:", sourceModelPath);
                console.log("Destination Path:", destinationModelPath);
                fs.copyFile(sourceModelPath, destinationModelPath, (err) => {
                    if (err) {
                        console.error("Error copying file:", err);
                    }
                    else {
                        console.log("File copied successfully to:", destinationModelPath);
                    }
                });
            }
        });
    }
    // Créer l'arborescence pour le modèle et les concepts
    createModelStructure(novelName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const novelDir = path.join(this.modelReader.getModel().label, novelName);
                const imagesDir = path.join(novelDir, "_Images");
                // Créer le répertoire du roman
                yield this.createDirectoryIfNotExist(novelDir);
                // Créer un répertoire pour chaque concept du modèle
                for (const concept of this.modelReader.getModel().concepts) {
                    const conceptPath = path.join(novelDir, concept.label);
                    yield this.createDirectoryIfNotExist(conceptPath);
                }
                // Créer le répertoire images
                yield this.createDirectoryIfNotExist(imagesDir);
                // Copie de l'image unknown
                const sourceImagePath = this.modelReader.getUnknownImagePath();
                const destinationimagePath = this.getUnknownImagePath(novelDir);
                if (!fs.existsSync(destinationimagePath)) {
                    console.log("Source Path:", sourceImagePath);
                    console.log("Destination Path:", destinationimagePath);
                    fs.copyFile(sourceImagePath, destinationimagePath, (err) => {
                        if (err) {
                            console.error("Error copying file:", err);
                        }
                        else {
                            console.log("File copied successfully to:", destinationimagePath);
                        }
                    });
                }
                new Notice(`La structure du roman "${novelDir}" a été créée avec succès !`);
            }
            catch (error) {
                console.error("Erreur lors de la création de la structure du modèle:", error);
                new Notice(`Erreur lors de la création de la structure du modèle: ${error.message}`);
            }
        });
    }
    // Vérifie si un répertoire existe, et le crée si nécessaire
    createDirectoryIfNotExist(dirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`folder creation: ${dirPath} ` + this.plugin.app.vault.getAbstractFileByPath(dirPath));
            if (!this.plugin.app.vault.getAbstractFileByPath(dirPath)) {
                yield this.plugin.app.vault.createFolder(dirPath);
            }
            console.log(`Created folder: ${dirPath}`);
        });
    }
    getModelFilePath(modelPath) {
        const vaultBasePath = this.plugin.app.vault.adapter.getBasePath();
        const modelDir = `${vaultBasePath}/${modelPath}`;
        return `${modelDir}/model.yml`;
    }
    getUnknownImagePath(novelDir) {
        const vaultBasePath = this.plugin.app.vault.adapter.getBasePath();
        const modelDir = `${vaultBasePath}/${novelDir}`;
        return `${modelDir}/_Images/unknown.png`;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm92ZWxNZW51VUkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm92ZWwvTm92ZWxNZW51VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUVsRCxPQUFPLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQztBQUN6QixPQUFPLEtBQUssSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUU3QixNQUFNLE9BQU8sV0FBVztJQUl0QixZQUFZLE1BQW1CO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUk7UUFDRixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FDNUMsTUFBTSxFQUNOLGNBQWMsRUFDZCxHQUFTLEVBQUU7WUFDVCxJQUFJLE1BQU0sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQztnQkFDSCxpRUFBaUU7Z0JBQ2pFLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBRW5ELE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsU0FBUyxDQUFFLENBQUM7Z0JBRWpELElBQUksU0FBUyxFQUFFLENBQUM7b0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsU0FBUyxFQUFFLENBQUMsQ0FBQztvQkFFMUMscUNBQXFDO29CQUNyQyxNQUFNLElBQUksQ0FBQyxtQkFBbUIs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LE1BQU0sUUFBUSxHQUFHLEdBQUcsYUFBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2hELE9BQU8sR0FBRyxRQUFRLHNCQUFzQixDQUFDO0lBQzNDLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vdGljZSB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgeyBNb2RlbFJlYWRlciB9IGZyb20gXCIuLi9tb2RlbC9Nb2RlbFJlYWRlclwiO1xyXG5pbXBvcnQgeyBOZXdOb3ZlbFByb21wdCB9IGZyb20gXCIuL05ld05vdmVsUHJvbXB0XCI7XHJcbmltcG9ydCBOb3ZlbFBsdWdpbiBmcm9tIFwic3JjL21haW5cIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb3ZlbE1lbnVVSSB7XHJcbiAgcHJpdmF0ZSBwbHVnaW46IE5vdmVsUGx1Z2luO1xyXG4gIHByaXZhdGUgbW9kZWxSZWFkZXI6IE1vZGVsUmVhZGVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihwbHVnaW46IE5vdmVsUGx1Z2luKSB7XHJcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuICAgIHRoaXMubW9kZWxSZWFkZXIgPSBuZXcgTW9kZWxSZWFkZXIodGhpcy5wbHVnaW4pO1xyXG4gICAgdGhpcy5tb2RlbFJlYWRlci5sb2FkTW9kZWwoKTtcclxuICB9XHJcblxyXG4gIGxvYWQoKSB7XHJcbiAgICBjb25zdCByaWJib25JY29uRWwgPSB0aGlzLnBsdWdpbi5hZGRSaWJib25JY29uKFxyXG4gICAgICBcImJvb2tcIixcclxuICAgICAgXCJOb3ZlbCBQbHVnaW5cIixcclxuICAgICAgYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIG5ldyBOb3RpY2UoXCJXZWxjb21lIHRvIHRoZSBOb3ZlbCBQbHVnaW4hXCIpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy8gQWZmaWNoZXIgbGUgbW9kYWwgcG91ciBxdWUgbCd1dGlsaXNhdGV1ciBlbnRyZSBsZSBub20gZHUgcm9tYW5cclxuICAgICAgICAgIGNvbnN0IG5vdmVsTmFtZSA9IGF3YWl0IHRoaXMuc2hvd05vdmVsTmFtZVByb21wdCgpO1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hvc2VuIG5vdmVsIG5hbWUgOiBcIiArIG5vdmVsTmFtZSApO1xyXG5cclxuICAgICAgICAgIGlmIChub3ZlbE5hbWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYE5vbSBkdSByb21hbjogJHtub3ZlbE5hbWV9YCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcsOpZXIgbCdhcmJvcmVzY2VuY2UgcG91ciBjZSByb21hblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZUJhc2VTdHJ1Y3R1cmUoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVNb2RlbFN0cnVjdHVyZShub3ZlbE5hbWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3IE5vdGljZShcIk5vbSBkdSByb21hbiBub24gc3DDqWNpZmnDqS5cIik7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgbG9hZGluZyB0aGUgbW9kZWw6XCIsIGVycm9yKTtcclxuICAgICAgICAgIG5ldyBOb3RpY2UoYEVycm9yIGxvYWRpbmcgbW9kZWw6ICR7ZXJyb3IubWVzc2FnZSB8fCBlcnJvcn1gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgcmliYm9uSWNvbkVsLmFkZENsYXNzKFwibm92ZWwtcGx1Z2luLXJpYmJvbi1pY29uXCIpO1xyXG4gIH1cclxuXHJcbiAgdW5sb2FkKCkge1xyXG4gICAgY29uc3QgcmliYm9uSWNvbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ub3ZlbC1wbHVnaW4tcmliYm9uLWljb25cIik7XHJcbiAgICByaWJib25JY29uRWw/LnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gRm9uY3Rpb24gcG91ciBhZmZpY2hlciBsZSBtb2RhbCBkZSBzYWlzaWUgZHUgbm9tIGR1IHJvbWFuXHJcbiAgcHJpdmF0ZSBzaG93Tm92ZWxOYW1lUHJvbXB0KCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1vZGFsID0gbmV3IE5ld05vdmVsUHJvbXB0KHRoaXMucGx1Z2luLmFwcCwgcmVzb2x2ZSk7XHJcbiAgICAgIG1vZGFsLm9wZW4oKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGNyZWF0ZUJhc2VTdHJ1Y3R1cmUoKSB7XHJcbiAgICBjb25zdCBtb2RlbFBhdGggPSB0aGlzLm1vZGVsUmVhZGVyLmdldE1vZGVsKCkubGFiZWw7IC8vIENyw6lhdGlvbiBkdSByw6lwZXJ0b2lyZSBwcmluY2lwYWwgZHUgbW9kw6hsZVxyXG5cclxuICAgIC8vIENyw6llciBsZSByw6lwZXJ0b2lyZSBkdSBtb2TDqGxlXHJcbiAgICBhd2FpdCB0aGlzLmNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3QobW9kZWxQYXRoKTtcclxuXHJcbiAgICBhd2FpdCB0aGlzLmNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3QobW9kZWxQYXRoICsgXCJfSW1hZ2VzXCIpO1xyXG5cclxuICAgIC8vIENvcGllIGR1IG1vZGVsZVxyXG4gICAgY29uc3Qgc291cmNlTW9kZWxQYXRoID0gdGhpcy5tb2RlbFJlYWRlci5nZXRNb2RlbFRlbXBsYXRlRmlsZVBhdGgoKTtcclxuICAgIGNvbnN0IGRlc3RpbmF0aW9uTW9kZWxQYXRoID0gdGhpcy5nZXRNb2RlbEZpbGVQYXRoKG1vZGVsUGF0aCk7XHJcbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGVzdGluYXRpb25Nb2RlbFBhdGgpKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU291cmNlIFBhdGg6XCIsIHNvdXJjZU1vZGVsUGF0aCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRGVzdGluYXRpb24gUGF0aDpcIiwgZGVzdGluYXRpb25Nb2RlbFBhdGgpO1xyXG4gICAgICBcclxuICAgICAgZnMuY29weUZpbGUoc291cmNlTW9kZWxQYXRoLCBkZXN0aW5hdGlvbk1vZGVsUGF0aCwgKGVycikgPT4ge1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjb3B5aW5nIGZpbGU6XCIsIGVycik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBjb3BpZWQgc3VjY2Vzc2Z1bGx5IHRvOlwiLCBkZXN0aW5hdGlvbk1vZGVsUGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIENyw6llciBsJ2FyYm9yZXNjZW5jZSBwb3VyIGxlIG1vZMOobGUgZXQgbGVzIGNvbmNlcHRzXHJcbiAgcHVibGljIGFzeW5jIGNyZWF0ZU1vZGVsU3RydWN0dXJlKG5vdmVsTmFtZTogc3RyaW5nKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBub3ZlbERpciA9IHBhdGguam9pbih0aGlzLm1vZGVsUmVhZGVyLmdldE1vZGVsKCkubGFiZWwsIG5vdmVsTmFtZSk7XHJcbiAgICAgIGNvbnN0IGltYWdlc0RpciA9IHBhdGguam9pbihub3ZlbERpciwgXCJfSW1hZ2VzXCIpO1xyXG5cclxuICAgICAgLy8gQ3LDqWVyIGxlIHLDqXBlcnRvaXJlIGR1IHJvbWFuXHJcbiAgICAgIGF3YWl0IHRoaXMuY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdChub3ZlbERpcik7XHJcblxyXG4gICAgICAvLyBDcsOpZXIgdW4gcsOpcGVydG9pcmUgcG91ciBjaGFxdWUgY29uY2VwdCBkdSBtb2TDqGxlXHJcbiAgICAgIGZvciAoY29uc3QgY29uY2VwdCBvZiB0aGlzLm1vZGVsUmVhZGVyLmdldE1vZGVsKCkuY29uY2VwdHMpIHtcclxuICAgICAgICBjb25zdCBjb25jZXB0UGF0aCA9IHBhdGguam9pbihub3ZlbERpciwgY29uY2VwdC5sYWJlbCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0KGNvbmNlcHRQYXRoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQ3LDqWVyIGxlIHLDqXBlcnRvaXJlIGltYWdlc1xyXG4gICAgICBhd2FpdCB0aGlzLmNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3QoaW1hZ2VzRGlyKTtcclxuXHJcbiAgICAgIC8vIENvcGllIGRlIGwnaW1hZ2UgdW5rbm93blxyXG4gICAgICBjb25zdCBzb3VyY2VJbWFnZVBhdGggPSB0aGlzLm1vZGVsUmVhZGVyLmdldFVua25vd25JbWFnZVBhdGgoKTtcclxuICAgICAgY29uc3QgZGVzdGluYXRpb25pbWFnZVBhdGggPSB0aGlzLmdldFVua25vd25JbWFnZVBhdGgobm92ZWxEaXIpO1xyXG4gICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGVzdGluYXRpb25pbWFnZVBhdGgpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTb3VyY2UgUGF0aDpcIiwgc291cmNlSW1hZ2VQYXRoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkRlc3RpbmF0aW9uIFBhdGg6XCIsIGRlc3RpbmF0aW9uaW1hZ2VQYXRoKTtcclxuICAgICAgICBcclxuICAgICAgICBmcy5jb3B5RmlsZShzb3VyY2VJbWFnZVBhdGgsIGRlc3RpbmF0aW9uaW1hZ2VQYXRoLCAoZXJyKSA9PiB7XHJcbiAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBjb3B5aW5nIGZpbGU6XCIsIGVycik7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZpbGUgY29waWVkIHN1Y2Nlc3NmdWxseSB0bzpcIiwgZGVzdGluYXRpb25pbWFnZVBhdGgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBuZXcgTm90aWNlKGBMYSBzdHJ1Y3R1cmUgZHUgcm9tYW4gXCIke25vdmVsRGlyfVwiIGEgw6l0w6kgY3LDqcOpZSBhdmVjIHN1Y2PDqHMgIWApO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIGNyw6lhdGlvbiBkZSBsYSBzdHJ1Y3R1cmUgZHUgbW9kw6hsZTpcIiwgZXJyb3IpO1xyXG4gICAgICBuZXcgTm90aWNlKGBFcnJldXIgbG9ycyBkZSBsYSBjcsOpYXRpb24gZGUgbGEgc3RydWN0dXJlIGR1IG1vZMOobGU6ICR7ZXJyb3IubWVzc2FnZX1gKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFbDqXJpZmllIHNpIHVuIHLDqXBlcnRvaXJlIGV4aXN0ZSwgZXQgbGUgY3LDqWUgc2kgbsOpY2Vzc2FpcmVcclxuICBwcml2YXRlIGFzeW5jIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3QoZGlyUGF0aDogc3RyaW5nKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBmb2xkZXIgY3JlYXRpb246ICR7ZGlyUGF0aH0gYCArIHRoaXMucGx1Z2luLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZGlyUGF0aCkpO1xyXG4gICAgICBpZiAoIXRoaXMucGx1Z2luLmFwcC52YXVsdC5nZXRBYnN0cmFjdEZpbGVCeVBhdGgoZGlyUGF0aCkpIHtcclxuICAgICAgICBhd2FpdCB0aGlzLnBsdWdpbi5hcHAudmF1bHQuY3JlYXRlRm9sZGVyKGRpclBhdGgpO1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKGBDcmVhdGVkIGZvbGRlcjogJHtkaXJQYXRofWApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRNb2RlbEZpbGVQYXRoKG1vZGVsUGF0aDogc3RyaW5nKSA6IHN0cmluZyB7XHJcbiAgICBjb25zdCB2YXVsdEJhc2VQYXRoID0gKHRoaXMucGx1Z2luLmFwcC52YXVsdC5hZGFwdGVyIGFzIGFueSkuZ2V0QmFzZVBhdGgoKTtcclxuICAgIGNvbnN0IG1vZGVsRGlyID0gYCR7dmF1bHRCYXNlUGF0aH0vJHttb2RlbFBhdGh9YDtcclxuICAgIHJldHVybiBgJHttb2RlbERpcn0vbW9kZWwueW1sYDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0VW5rbm93bkltYWdlUGF0aChub3ZlbERpcjogc3RyaW5nKSA6IHN0cmluZyB7XHJcbiAgICBjb25zdCB2YXVsdEJhc2VQYXRoID0gKHRoaXMucGx1Z2luLmFwcC52YXVsdC5hZGFwdGVyIGFzIGFueSkuZ2V0QmFzZVBhdGgoKTtcclxuICAgIGNvbnN0IG1vZGVsRGlyID0gYCR7dmF1bHRCYXNlUGF0aH0vJHtub3ZlbERpcn1gO1xyXG4gICAgcmV0dXJuIGAke21vZGVsRGlyfS9fSW1hZ2VzL3Vua25vd24ucG5nYDtcclxuICB9XHJcbn1cclxuIl19