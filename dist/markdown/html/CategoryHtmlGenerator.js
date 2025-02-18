import { __awaiter } from "tslib";
import { RadioHtmlGenerator } from "./RadioHtmlGenerator";
import { TextHtmlGenerator } from "./TextHtmlGenerator";
import { TextAreaHtmlGenerator } from "./TextAreaHtmlGenerator";
import { CheckboxHtmlGenerator } from "./CheckboxHtmlGenerator";
import { ListHtmlGenerator } from "./ListHtmlGenerator";
import { Logger } from "src/logger/Logger";
export class CategoryHtmlGenerator {
    constructor(plugin) {
        this.plugin = plugin;
        this.radioHtmlGenerator = new RadioHtmlGenerator(this.plugin);
        this.textHtmlGenerator = new TextHtmlGenerator(this.plugin);
        this.textAreaHtmlGenerator = new TextAreaHtmlGenerator(this.plugin);
        this.checkboxHtmlGenerator = new CheckboxHtmlGenerator(this.plugin);
        this.listHtmlGenerator = new ListHtmlGenerator(this.plugin);
    }
    generateEditHtmlCode(category) {
        Logger.debug(`Generating accordion for category: ${category.name}`);
        const accordionHTML = `
            <details class="accordion">
                <summary>💼 ${category.name}</summary>
                <fieldset>
                    ${category.fields.map(field => this.generateField(field)).join('')}
                </fieldset>
            </details>
        `;
        return accordionHTML;
    }
    generateField(field) {
        Logger.debug(`Generating field for: ${field.name} of type ${field.type}`);
        switch (field.type) {
            case 'radio':
                return this.radioHtmlGenerator.generateEditHtmlCode(field);
            case 'text':
                return this.textHtmlGenerator.generateEditHtmlCode(field);
            case 'textarea':
                return this.textAreaHtmlGenerator.generateEditHtmlCode(field);
            case 'checkbox':
                return this.checkboxHtmlGenerator.generateEditHtmlCode(field);
            case 'list':
                return this.listHtmlGenerator.generateEditHtmlCode(field);
            default:
                Logger.warn(`Unknown field type: ${field.type}`);
                return '';
        }
    }
    refresh(file, blocHtml) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = blocHtml.querySelectorAll("input, select, textarea, div[data-field]");
            fields.forEach((field) => __awaiter(this, void 0, void 0, function* () {
                if (field instanceof HTMLInputElement) {
                    switch (field.type) {
                        case "text":
                        case "number":
                            this.textHtmlGenerator.refresh(file, field);
                            break;
                        case "radio":
                            this.radioHtmlGenerator.refresh(file, field);
                            break;
                        case "checkbox":
                            this.checkboxHtmlGenerator.refresh(file, field);
                            break;
                    }
                }
                else if (field instanceof HTMLTextAreaElement) {
                    this.textAreaHtmlGenerator.refresh(file, field);
                }
                else if (field instanceof HTMLDivElement && field.hasAttribute("data-field")) {
                    this.listHtmlGenerator.refresh(file, field);
                }
            }));
        });
    }
    initialize(file, blocHtml) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = blocHtml.querySelectorAll("input, select, textarea, div[data-field]");
            fields.forEach((field) => __awaiter(this, void 0, void 0, function* () {
                if (field instanceof HTMLInputElement) {
                    switch (field.type) {
                        case "text":
                        case "number":
                            this.textHtmlGenerator.initialize(file, field);
                            break;
                        case "radio":
                            this.radioHtmlGenerator.initialize(file, field);
                            break;
                        case "checkbox":
                            this.checkboxHtmlGenerator.initialize(file, field);
                            break;
                    }
                }
                else if (field instanceof HTMLTextAreaElement) {
                    this.textAreaHtmlGenerator.initialize(file, field);
                }
                else if (field instanceof HTMLDivElement && field.hasAttribute("data-field")) {
                    this.listHtmlGenerator.initialize(file, field);
                }
            }));
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlIdG1sR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21hcmtkb3duL2h0bWwvQ2F0ZWdvcnlIdG1sR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFM0MsTUFBTSxPQUFPLHFCQUFxQjtJQVE5QixZQUFZLE1BQW1CO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELG9CQUFvQixDQUFDLFFBQWtCO1FBQ25DLE1BQU0sQ0FBQyxLQUFL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QUM7WUFFckYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFPLEtBQUssRUFBRSxFQUFFO2dCQUMzQixJQUFJLEtBQUssWUFBWSxnQkFBZ0IsRUFBRSxDQUFDO29CQUNwQyxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDakIsS0FBSyxNQUFNLENBQUM7d0JBQ1osS0FBSyxRQUFROzRCQUNULElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOzRCQUMvQyxNQUFNO3dCQUNWLEtBQUssT0FBTzs0QkFDUixJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzs0QkFDaEQsTUFBTTt3QkFDVixLQUFLLFVBQVU7NEJBQ1gsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7NEJBQ25ELE1BQU07b0JBQ2QsQ0FBQztnQkFDTCxDQUFDO3FCQUFNLElBQUksS0FBSyxZQUFZLG1CQUFtQixFQUFFLENBQUM7b0JBQzlDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN2RCxDQUFDO3FCQUFNLElBQUksS0FBSyxZQUFZLGNBQWMsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7b0JBQzdFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNuRCxDQUFDO1lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IE5vdmVsUGx1Z2luIGZyb20gXCJzcmMvbWFpblwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeSwgRmllbGQgfSBmcm9tIFwiLi4vcGFyc2VyL0Zvcm1JbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7IFJhZGlvSHRtbEdlbmVyYXRvciB9IGZyb20gXCIuL1JhZGlvSHRtbEdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBUZXh0SHRtbEdlbmVyYXRvciB9IGZyb20gXCIuL1RleHRIdG1sR2VuZXJhdG9yXCI7XHJcbmltcG9ydCB7IFRleHRBcmVhSHRtbEdlbmVyYXRvciB9IGZyb20gXCIuL1RleHRBcmVhSHRtbEdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBDaGVja2JveEh0bWxHZW5lcmF0b3IgfSBmcm9tIFwiLi9DaGVja2JveEh0bWxHZW5lcmF0b3JcIjtcclxuaW1wb3J0IHsgTGlzdEh0bWxHZW5lcmF0b3IgfSBmcm9tIFwiLi9MaXN0SHRtbEdlbmVyYXRvclwiO1xyXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwic3JjL2xvZ2dlci9Mb2dnZXJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXRlZ29yeUh0bWxHZW5lcmF0b3Ige1xyXG4gICAgcHJpdmF0ZSBwbHVnaW46IE5vdmVsUGx1Z2luO1xyXG4gICAgcHJpdmF0ZSByYWRpb0h0bWxHZW5lcmF0b3I6IFJhZGlvSHRtbEdlbmVyYXRvcjtcclxuICAgIHByaXZhdGUgdGV4dEh0bWxHZW5lcmF0b3I6IFRleHRIdG1sR2VuZXJhdG9yO1xyXG4gICAgcHJpdmF0ZSB0ZXh0QXJlYUh0bWxHZW5lcmF0b3I6IFRleHRBcmVhSHRtbEdlbmVyYXRvcjtcclxuICAgIHByaXZhdGUgY2hlY2tib3hIdG1sR2VuZXJhdG9yOiBDaGVja2JveEh0bWxHZW5lcmF0b3I7XHJcbiAgICBwcml2YXRlIGxpc3RIdG1sR2VuZXJhdG9yOiBMaXN0SHRtbEdlbmVyYXRvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwbHVnaW46IE5vdmVsUGx1Z2luKSB7XHJcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcbiAgICAgICAgdGhpcy5yYWRpb0h0bWxHZW5lcmF0b3IgPSBuZXcgUmFkaW9IdG1sR2VuZXJhdG9yKHRoaXMucGx1Z2luKTtcclxuICAgICAgICB0aGlzLnRleHRIdG1sR2VuZXJhdG9yID0gbmV3IFRleHRIdG1sR2VuZXJhdG9yKHRoaXMucGx1Z2luKTtcclxuICAgICAgICB0aGlzLnRleHRBcmVhSHRtbEdlbmVyYXRvciA9IG5ldyBUZXh0QXJlYUh0bWxHZW5lcmF0b3IodGhpcy5wbHVnaW4pO1xyXG4gICAgICAgIHRoaXMuY2hlY2tib3hIdG1sR2VuZXJhdG9yID0gbmV3IENoZWNrYm94SHRtbEdlbmVyYXRvcih0aGlzLnBsdWdpbik7XHJcbiAgICAgICAgdGhpcy5saXN0SHRtbEdlbmVyYXRvciA9IG5ldyBMaXN0SHRtbEdlbmVyYXRvcih0aGlzLnBsdWdpbik7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVFZGl0SHRtbENvZGUoY2F0ZWdvcnk6IENhdGVnb3J5KTogc3RyaW5nIHtcclxuICAgICAgICBMb2dnZXIuZGVidWcoYEdlbmVyYXRpbmcgYWNjb3JkaW9uIGZvciBjYXRlZ29yeTogJHtjYXRlZ29yeS5uYW1lfWApO1xyXG4gICAgICAgIGNvbnN0IGFjY29yZGlvbkhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkZXRhaWxzIGNsYXNzPVwiYWNjb3JkaW9uXCI+XHJcbiAgICAgICAgICAgICAgICA8c3VtbWFyeT7wn5K8ICR7Y2F0ZWdvcnkubmFtZX08L3N1bW1hcnk+XHJcbiAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtjYXRlZ29yeS5maWVsZHMubWFwKGZpZWxkID0+IHRoaXMuZ2VuZXJhdGVGaWVsZChmaWVsZCkpLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgPC9maWVsZHNldD5cclxuICAgICAgICAgICAgPC9kZXRhaWxzPlxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgcmV0dXJuIGFjY29yZGlvbkhUTUw7XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVGaWVsZChmaWVsZDogRmllbGQpOiBzdHJpbmcge1xyXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhgR2VuZXJhdGluZyBmaWVsZCBmb3I6ICR7ZmllbGQubmFtZX0gb2YgdHlwZSAke2ZpZWxkLnR5cGV9YCk7XHJcbiAgICAgICAgc3dpdGNoIChmaWVsZC50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JhZGlvJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJhZGlvSHRtbEdlbmVyYXRvci5nZW5lcmF0ZUVkaXRIdG1sQ29kZShmaWVsZCk7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dEh0bWxHZW5lcmF0b3IuZ2VuZXJhdGVFZGl0SHRtbENvZGUoZmllbGQpO1xyXG4gICAgICAgICAgICBjYXNlICd0ZXh0YXJlYSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0QXJlYUh0bWxHZW5lcmF0b3IuZ2VuZXJhdGVFZGl0SHRtbENvZGUoZmllbGQpO1xyXG4gICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGVja2JveEh0bWxHZW5lcmF0b3IuZ2VuZXJhdGVFZGl0SHRtbENvZGUoZmllbGQpO1xyXG4gICAgICAgICAgICBjYXNlICdsaXN0JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RIdG1sR2VuZXJhdG9yLmdlbmVyYXRlRWRpdEh0bWxDb2RlKGZpZWxkKTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIExvZ2dlci53YXJuKGBVbmtub3duIGZpZWxkIHR5cGU6ICR7ZmllbGQudHlwZX1gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcmVmcmVzaChmaWxlOiBURmlsZSwgYmxvY0h0bWw6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgZmllbGRzID0gYmxvY0h0bWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBkaXZbZGF0YS1maWVsZF1cIik7XHJcblxyXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGFzeW5jIChmaWVsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmllbGQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGV4dFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0SHRtbEdlbmVyYXRvci5yZWZyZXNoKGZpbGUsIGZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJhZGlvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFkaW9IdG1sR2VuZXJhdG9yLnJlZnJlc2goZmlsZSwgZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2hlY2tib3hcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2JveEh0bWxHZW5lcmF0b3IucmVmcmVzaChmaWxlLCBmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpZWxkIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0QXJlYUh0bWxHZW5lcmF0b3IucmVmcmVzaChmaWxlLCBmaWVsZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCAmJiBmaWVsZC5oYXNBdHRyaWJ1dGUoXCJkYXRhLWZpZWxkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RIdG1sR2VuZXJhdG9yLnJlZnJlc2goZmlsZSwgZmllbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdGlhbGl6ZShmaWxlOiBURmlsZSwgYmxvY0h0bWw6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgZmllbGRzID0gYmxvY0h0bWwucXVlcnlTZWxlY3RvckFsbChcImlucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBkaXZbZGF0YS1maWVsZF1cIik7XHJcblxyXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGFzeW5jIChmaWVsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmllbGQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGZpZWxkLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGV4dFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJudW1iZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0SHRtbEdlbmVyYXRvci5pbml0aWFsaXplKGZpbGUsIGZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInJhZGlvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmFkaW9IdG1sR2VuZXJhdG9yLmluaXRpYWxpemUoZmlsZSwgZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2hlY2tib3hcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVja2JveEh0bWxHZW5lcmF0b3IuaW5pdGlhbGl6ZShmaWxlLCBmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpZWxkIGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0QXJlYUh0bWxHZW5lcmF0b3IuaW5pdGlhbGl6ZShmaWxlLCBmaWVsZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmllbGQgaW5zdGFuY2VvZiBIVE1MRGl2RWxlbWVudCAmJiBmaWVsZC5oYXNBdHRyaWJ1dGUoXCJkYXRhLWZpZWxkXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RIdG1sR2VuZXJhdG9yLmluaXRpYWxpemUoZmlsZSwgZmllbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19