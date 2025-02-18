import { __awaiter } from "tslib";
import { FilePropertyManager } from "../FilePropertyManager";
import { Utils } from "src/Utils";
import { FormInterface } from "../parser/FormInterfaces";
export class TextAreaHtmlGenerator {
    constructor(plugin) {
        this.plugin = plugin;
    }
    generateEditHtmlCode(field) {
        const label = FormInterface.getPropertyValueFromField(field, 'label');
        const placeholder = FormInterface.getPropertyValueFromField(field, 'placeholder');
        const rows = FormInterface.getPropertyValueFromField(field, 'rows');
        console.log(`Generating textarea field: ${field.name}, rows: ${rows}, placeholder: ${placeholder}`);
        return `
            <div class="form-group form-input textarea">
                <label for="${field.name}">${label} :</label>
                <textarea name="${field.name}" id="${field.name}" rows="${rows}" placeholder="${placeholder}"></textarea>
            </div>
        `;
    }
    refresh(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = (yield FilePropertyManager.readProperty(file, field.id)) || "";
            field.value = text.toString();
        });
    }
    initialize(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            Utils.addDebouncedEventListener(field, "input", () => __awaiter(this, void 0, void 0, function* () {
                yield FilePropertyManager.updateProperty(file, field.id, field.value);
            }));
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEFyZWFIdG1sR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21hcmtkb3duL2h0bWwvVGV4dEFyZWFIdG1sR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBUyxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxNQUFNLE9BQU8scUJBQXFCO0lBRzlCLFlBQVksTUFBbUI7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVELG9CQUFvQixDQUFDLEtBQVk7UUFDN0IsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0RSxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsS0FBSyxDQUFDLElBQUksV0FBVyxJQUFJLGtCQUFrQixXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRXBHLE9BQU87OzhCQUVlLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSztrQ0FDaEIsS0FBSyxDQUFDLElBQUksU0FBUyxLQUFLLENBQUMsSUFBSSxXQUFXLElBQUksa0JBQWtCLFdBQVc7O1NBRWxHLENBQUM7SUFDTixDQUFDO0lBRUssT0FBTyxDQUFDLElBQVcsRUFBRSxLQUEwQjs7WUFDakQsTUFBTSxJQUFJLEdBQUcsQ0FBQSxNQUFNLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFJLEVBQUUsQ0FBQztZQUMxRSxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQyxDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsSUFBVyxFQUFFLEtBQTBCOztZQUNwRCxLQUFLLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFTLEVBQUU7Z0JBQ3ZELE1BQU0sbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxRSxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztLQUFBO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBURmlsZSB9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQgTm92ZWxQbHVnaW4gZnJvbSBcInNyYy9tYWluXCI7XHJcbmltcG9ydCB7IEZpbGVQcm9wZXJ0eU1hbmFnZXIgfSBmcm9tIFwiLi4vRmlsZVByb3BlcnR5TWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gXCJzcmMvVXRpbHNcIjtcclxuaW1wb3J0IHsgRmllbGQsIEZvcm1JbnRlcmZhY2UgfSBmcm9tIFwiLi4vcGFyc2VyL0Zvcm1JbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dEFyZWFIdG1sR2VuZXJhdG9yIHtcclxuICAgIHByaXZhdGUgcGx1Z2luOiBOb3ZlbFBsdWdpbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwbHVnaW46IE5vdmVsUGx1Z2luKSB7XHJcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVFZGl0SHRtbENvZGUoZmllbGQ6IEZpZWxkKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IEZvcm1JbnRlcmZhY2UuZ2V0UHJvcGVydHlWYWx1ZUZyb21GaWVsZChmaWVsZCwgJ2xhYmVsJyk7XHJcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBGb3JtSW50ZXJmYWNlLmdldFByb3BlcnR5VmFsdWVGcm9tRmllbGQoZmllbGQsICdwbGFjZWhvbGRlcicpO1xyXG4gICAgICAgIGNvbnN0IHJvd3MgPSBGb3JtSW50ZXJmYWNlLmdldFByb3BlcnR5VmFsdWVGcm9tRmllbGQoZmllbGQsICdyb3dzJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coYEdlbmVyYXRpbmcgdGV4dGFyZWEgZmllbGQ6ICR7ZmllbGQubmFtZX0sIHJvd3M6ICR7cm93c30sIHBsYWNlaG9sZGVyOiAke3BsYWNlaG9sZGVyfWApO1xyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1pbnB1dCB0ZXh0YXJlYVwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7ZmllbGQubmFtZX1cIj4ke2xhYmVsfSA6PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBuYW1lPVwiJHtmaWVsZC5uYW1lfVwiIGlkPVwiJHtmaWVsZC5uYW1lfVwiIHJvd3M9XCIke3Jvd3N9XCIgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgcmVmcmVzaChmaWxlOiBURmlsZSwgZmllbGQ6IEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgRmlsZVByb3BlcnR5TWFuYWdlci5yZWFkUHJvcGVydHkoZmlsZSwgZmllbGQuaWQpIHx8IFwiXCI7XHJcbiAgICAgICAgZmllbGQudmFsdWUgPSB0ZXh0LnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdGlhbGl6ZShmaWxlOiBURmlsZSwgZmllbGQ6IEhUTUxUZXh0QXJlYUVsZW1lbnQpIHtcclxuICAgICAgICBVdGlscy5hZGREZWJvdW5jZWRFdmVudExpc3RlbmVyKGZpZWxkLCBcImlucHV0XCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgRmlsZVByb3BlcnR5TWFuYWdlci51cGRhdGVQcm9wZXJ0eShmaWxlLCBmaWVsZC5pZCwgZmllbGQudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==