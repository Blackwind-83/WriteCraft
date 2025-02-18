import { __awaiter } from "tslib";
import { TFile, Notice } from "obsidian";
import { ImagePickerModal } from "../ImagePickerModal";
import { FilePropertyManager } from "../FilePropertyManager";
import { Utils } from "src/Utils";
export class ImageHtmlGenerator {
    constructor(plugin) {
        this.plugin = plugin;
    }
    generateEditHtmlCode() {
        console.log('Generating image...');
        return `
            <div class="image-container">
                <div class="${ImageHtmlGenerator.ID_CONTAINER_IMG}">
                    <button class="${ImageHtmlGenerator.ID_DELETE_BUTTON}">❌</button>
                    <img id="${ImageHtmlGenerator.ID_IMAGE}">
                </div>
            </div>
        `;
    }
    refresh(file, blocHtml) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[refresh] Rafraîchissement de l'image... : ` + blocHtml.getHTML());
            const fieldImg = blocHtml.querySelector(`#${ImageHtmlGenerator.ID_IMAGE}`);
            console.log(`[initialize] Champ image trouvé :`, fieldImg);
            if (fieldImg instanceof HTMLImageElement) {
                let imagePath = (yield FilePropertyManager.readProperty(file, fieldImg.id)) || "_images/unknown.png";
                console.log(`[updateField] Récupéré depuis le fichier : ${imagePath}`);
                try {
                    if (imagePath) {
                        const fileImg = this.plugin.app.vault.getAbstractFileByPath(imagePath.toString());
                        if (fileImg instanceof TFile) {
                            const url = yield this.plugin.convertImagePathToUrl(fileImg);
                            fieldImg.src = url;
                        }
                    }
                }
                catch (err) {
                    Notice.apply(`Erreur lors de la lecture de l'image : ${err}. No "_images/unknown.png" found.`);
                }
            }
        });
    }
    initialize(file, blocHtml) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[initialize] Initialisation de l'image...`);
            // Image listener
            const fieldImg = blocHtml.querySelector(`#${ImageHtmlGenerator.ID_IMAGE}`);
            console.log(`[initialize] Champ image trouvé :`, fieldImg);
            if (fieldImg instanceof HTMLImageElement) {
                Utils.addDebouncedEventListener(fieldImg, "click", () => __awaiter(this, void 0, void 0, function* () {
                    console.log("Ouverture du sélecteur d'image...");
                    const images = yield this.getImageList();
                    if (images.length === 0) {
                        new Notice("Aucune image trouvée dans `_images`.");
                        return;
                    }
                    const modal = new ImagePickerModal(this.plugin.app, images, (selectedImage) => __awaiter(this, void 0, void 0, function* () {
                        console.log("Image sélectionnée :", selectedImage.path);
                        yield FilePropertyManager.updateProperty(file, fieldImg.id, selectedImage.path);
                        yield this.refresh(file, blocHtml);
                    }));
                    modal.open();
                }));
                // Delete button listener
                const deleteBtn = blocHtml.querySelector(`.${ImageHtmlGenerator.ID_DELETE_BUTTON}`);
                if (deleteBtn && deleteBtn instanceof HTMLButtonElement) {
                    Utils.addDebouncedEventListener(deleteBtn, "click", () => __awaiter(this, void 0, void 0, function* () {
                        console.log("Suppression de l'image");
                        yield FilePropertyManager.updateProperty(file, fieldImg.id, "");
                        yield this.refresh(file, blocHtml);
                    }));
                }
            }
        });
    }
    getImageList() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.plugin.app.vault.getFiles().filter(file => file.path.includes("_images") && /\.(png|jpg|jpeg|gif)$/i.test(file.name));
        });
    }
}
// Constante de classe pour la regex
ImageHtmlGenerator.ID_CONTAINER_IMG = "image-container-image";
ImageHtmlGenerator.ID_DELETE_BUTTON = "delete-sheet-image";
ImageHtmlGenerator.ID_IMAGE = "sheet-image";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VIdG1sR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21hcmtkb3duL2h0bWwvSW1hZ2VIdG1sR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRWxDLE1BQU0sT0FBTyxrQkFBa0I7SUFRM0IsWUFBWSxNQUFtQjtRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsb0JBQW9CO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNuQyxPQUFPOzs4QkFFZSxrQkFBa0IsQ0FBQyxnQkFBZ0I7cUNBQzVCLGtCQUFrQixDQUFDLGdCQUFnQjsrQkFDekMsa0JBQWtCLENBQUMsUUFBUTs7O1NBR2pELENBQUM7SUFDTixDQUFDO0lBRUssT0FBTyxDQUFDLElBQVcsRUFBRSxRQUFxQjs7WUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztZQUNoRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMzRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzNELElBQUksUUFBUSxZQUFZLGdCQUFnQixFQUFFLENBQUM7Z0JBQ3ZDLElBQUksU0FBUyxHQUFHLENBQUEsTUFBTSxtQkFBbUIsQ0FBQyxZQUFZLENB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LElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUN2QyxDQUFDLENBQUEsQ0FBQyxDQUFDO2dCQUNQLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRWEsWUFBWTs7WUFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQzVFLENBQUM7UUFDTixDQUFDO0tBQUE7O0FBakZELG9DQUFvQztBQUNaLG1DQUFnQixHQUFHLHVCQUF1QixDQUFDO0FBQzNDLG1DQUFnQixHQUFHLG9CQUFvQixDQUFDO0FBQ3hDLDJCQUFRLEdBQUcsYUFBYSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVEZpbGUsIE5vdGljZSB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgTm92ZWxQbHVnaW4gZnJvbSBcInNyYy9tYWluXCI7XHJcbmltcG9ydCB7IEltYWdlUGlja2VyTW9kYWwgfSBmcm9tIFwiLi4vSW1hZ2VQaWNrZXJNb2RhbFwiO1xyXG5pbXBvcnQgeyBGaWxlUHJvcGVydHlNYW5hZ2VyIH0gZnJvbSBcIi4uL0ZpbGVQcm9wZXJ0eU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwic3JjL1V0aWxzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgSW1hZ2VIdG1sR2VuZXJhdG9yIHtcclxuICAgIHByaXZhdGUgcGx1Z2luOiBOb3ZlbFBsdWdpbjtcclxuXHJcbiAgICAvLyBDb25zdGFudGUgZGUgY2xhc3NlIHBvdXIgbGEgcmVnZXhcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IElEX0NPTlRBSU5FUl9JTUcgPSBcImltYWdlLWNvbnRhaW5lci1pbWFnZVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgSURfREVMRVRFX0JVVFRPTiA9IFwiZGVsZXRlLXNoZWV0LWltYWdlXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBJRF9JTUFHRSA9IFwic2hlZXQtaW1hZ2VcIjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwbHVnaW46IE5vdmVsUGx1Z2luKSB7XHJcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVFZGl0SHRtbENvZGUoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnR2VuZXJhdGluZyBpbWFnZS4uLicpO1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke0ltYWdlSHRtbEdlbmVyYXRvci5JRF9DT05UQUlORVJfSU1HfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCIke0ltYWdlSHRtbEdlbmVyYXRvci5JRF9ERUxFVEVfQlVUVE9OfVwiPuKdjDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgaWQ9XCIke0ltYWdlSHRtbEdlbmVyYXRvci5JRF9JTUFHRX1cIj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHJlZnJlc2goZmlsZTogVEZpbGUsIGJsb2NIdG1sOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBbcmVmcmVzaF0gUmFmcmHDrmNoaXNzZW1lbnQgZGUgbCdpbWFnZS4uLiA6IGAgKyBibG9jSHRtbC5nZXRIVE1MKCkpO1xyXG4gICAgICAgIGNvbnN0IGZpZWxkSW1nID0gYmxvY0h0bWwucXVlcnlTZWxlY3RvcihgIyR7SW1hZ2VIdG1sR2VuZXJhdG9yLklEX0lNQUdFfWApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBbaW5pdGlhbGl6ZV0gQ2hhbXAgaW1hZ2UgdHJvdXbDqSA6YCwgZmllbGRJbWcpO1xyXG4gICAgICAgIGlmIChmaWVsZEltZyBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgbGV0IGltYWdlUGF0aCA9IGF3YWl0IEZpbGVQcm9wZXJ0eU1hbmFnZXIucmVhZFByb3BlcnR5KGZpbGUsIGZpZWxkSW1nLmlkKSB8fCBcIl9pbWFnZXMvdW5rbm93bi5wbmdcIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYFt1cGRhdGVGaWVsZF0gUsOpY3Vww6lyw6kgZGVwdWlzIGxlIGZpY2hpZXIgOiAke2ltYWdlUGF0aH1gKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbWFnZVBhdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlSW1nID0gdGhpcy5wbHVnaW4uYXBwLnZhdWx0LmdldEFic3RyYWN0RmlsZUJ5UGF0aChpbWFnZVBhdGgudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGVJbWcgaW5zdGFuY2VvZiBURmlsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBhd2FpdCB0aGlzLnBsdWdpbi5jb252ZXJ0SW1hZ2VQYXRoVG9VcmwoZmlsZUltZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkSW1nLnNyYyA9IHVybDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICAgICAgTm90aWNlLmFwcGx5KGBFcnJldXIgbG9ycyBkZSBsYSBsZWN0dXJlIGRlIGwnaW1hZ2UgOiAke2Vycn0uIE5vIFwiX2ltYWdlcy91bmtub3duLnBuZ1wiIGZvdW5kLmApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGluaXRpYWxpemUoZmlsZTogVEZpbGUsIGJsb2NIdG1sOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBbaW5pdGlhbGl6ZV0gSW5pdGlhbGlzYXRpb24gZGUgbCdpbWFnZS4uLmApO1xyXG4gICAgICAgIC8vIEltYWdlIGxpc3RlbmVyXHJcbiAgICAgICAgY29uc3QgZmllbGRJbWcgPSBibG9jSHRtbC5xdWVyeVNlbGVjdG9yKGAjJHtJbWFnZUh0bWxHZW5lcmF0b3IuSURfSU1BR0V9YCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFtpbml0aWFsaXplXSBDaGFtcCBpbWFnZSB0cm91dsOpIDpgLCBmaWVsZEltZyk7XHJcbiAgICAgICAgaWYgKGZpZWxkSW1nIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xyXG4gICAgICAgICAgICBVdGlscy5hZGREZWJvdW5jZWRFdmVudExpc3RlbmVyKGZpZWxkSW1nLCBcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3V2ZXJ0dXJlIGR1IHPDqWxlY3RldXIgZCdpbWFnZS4uLlwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlcyA9IGF3YWl0IHRoaXMuZ2V0SW1hZ2VMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW1hZ2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoXCJBdWN1bmUgaW1hZ2UgdHJvdXbDqWUgZGFucyBgX2ltYWdlc2AuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbCA9IG5ldyBJbWFnZVBpY2tlck1vZGFsKHRoaXMucGx1Z2luLmFwcCwgaW1hZ2VzLCBhc3luYyAoc2VsZWN0ZWRJbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSW1hZ2Ugc8OpbGVjdGlvbm7DqWUgOlwiLCBzZWxlY3RlZEltYWdlLnBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IEZpbGVQcm9wZXJ0eU1hbmFnZXIudXBkYXRlUHJvcGVydHkoZmlsZSwgZmllbGRJbWcuaWQsIHNlbGVjdGVkSW1hZ2UucGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5yZWZyZXNoKGZpbGUsIGJsb2NIdG1sKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBEZWxldGUgYnV0dG9uIGxpc3RlbmVyXHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGJsb2NIdG1sLnF1ZXJ5U2VsZWN0b3IoYC4ke0ltYWdlSHRtbEdlbmVyYXRvci5JRF9ERUxFVEVfQlVUVE9OfWApO1xyXG4gICAgICAgICAgICBpZiAoZGVsZXRlQnRuICYmIGRlbGV0ZUJ0biBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBVdGlscy5hZGREZWJvdW5jZWRFdmVudExpc3RlbmVyKGRlbGV0ZUJ0biwgXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTdXBwcmVzc2lvbiBkZSBsJ2ltYWdlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IEZpbGVQcm9wZXJ0eU1hbmFnZXIudXBkYXRlUHJvcGVydHkoZmlsZSwgZmllbGRJbWcuaWQsIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucmVmcmVzaChmaWxlLCBibG9jSHRtbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFzeW5jIGdldEltYWdlTGlzdCgpOiBQcm9taXNlPFRGaWxlW10+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wbHVnaW4uYXBwLnZhdWx0LmdldEZpbGVzKCkuZmlsdGVyKGZpbGUgPT5cclxuICAgICAgICAgICAgZmlsZS5wYXRoLmluY2x1ZGVzKFwiX2ltYWdlc1wiKSAmJiAvXFwuKHBuZ3xqcGd8anBlZ3xnaWYpJC9pLnRlc3QoZmlsZS5uYW1lKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIl19