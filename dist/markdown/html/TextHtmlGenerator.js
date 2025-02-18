import { __awaiter } from "tslib";
import { FilePropertyManager } from "../FilePropertyManager";
import { Utils } from "src/Utils";
import { FormInterface } from "../parser/FormInterfaces";
export class TextHtmlGenerator {
    constructor(plugin) {
        this.plugin = plugin;
    }
    generateEditHtmlCode(field) {
        const label = FormInterface.getPropertyValueFromField(field, 'label');
        const placeholder = FormInterface.getPropertyValueFromField(field, 'placeholder');
        const datalist = FormInterface.getPropertyValueFromField(field, 'datalist');
        const link = FormInterface.getPropertyValueFromField(field, 'link');
        console.log(`Generating text field: ${field.name}, placeholder: ${placeholder}, datalist: ${datalist}, link: ${link}`);
        return `
            <div class="form-group form-input text">
                <label for="${field.name}">${label} :</label>
                <input type="text" name="${field.name}" id="${field.name}" placeholder="${placeholder}" list="${datalist}" data-link="${link}">
            </div>
        `;
    }
    refresh(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = (yield FilePropertyManager.readProperty(file, field.id)) || "";
            field.value = text.toString().replace("[[", "").replace("]]", "");
        });
    }
    initialize(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            Utils.addDebouncedEventListener(field, "input", () => __awaiter(this, void 0, void 0, function* () {
                let value = field.value;
                if (field.dataset.link && value) {
                    value = "[[" + value + "]]";
                }
                yield FilePropertyManager.updateProperty(file, field.id, value);
            }));
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEh0bWxHZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFya2Rvd24vaHRtbC9UZXh0SHRtbEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEVBQVMsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUsTUFBTSxPQUFPLGlCQUFpQjtJQUcxQixZQUFZLE1BQW1CO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxLQUFZO1FBQzdCLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEUsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNsRixNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEUsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsS0FBSyxDQUFDLElBQUksa0JBQWtCLFdBQVcsZUFBZSxRQUFRLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUV2SCxPQUFPOzs4QkFFZSxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUs7MkNBQ1AsS0FBSyxDQUFDLElBQUksU0FBUyxLQUFLLENBQUMsSUFBSSxrQkFBa0IsV0FBVyxXQUFXLFFBQVEsZ0JBQWdCLElBQUk7O1NBRW5JLENBQUM7SUFDTixDQUFDO0lBRUssT0FBTyxDQUFDLElBQVcsRUFBRSxLQUF1Qjs7WUFDOUMsTUFBTSxJQUFJLEdBQUcsQ0FBQSxNQUFNLG1CQUFtQixDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFJLEVBQUUsQ0FBQztZQUMxRSxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEUsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLElBQVcsRUFBRSxLQUF1Qjs7WUFDakQsS0FBSyxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBUyxFQUFFO2dCQUN2RCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUN4QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO29CQUM5QixLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2hDLENBQUM7Z0JBQ0QsTUFBTSxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEUsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IE5vdmVsUGx1Z2luIGZyb20gXCJzcmMvbWFpblwiO1xyXG5pbXBvcnQgeyBGaWxlUHJvcGVydHlNYW5hZ2VyIH0gZnJvbSBcIi4uL0ZpbGVQcm9wZXJ0eU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwic3JjL1V0aWxzXCI7XHJcbmltcG9ydCB7IEZpZWxkLCBGb3JtSW50ZXJmYWNlIH0gZnJvbSBcIi4uL3BhcnNlci9Gb3JtSW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRIdG1sR2VuZXJhdG9yIHtcclxuICAgIHByaXZhdGUgcGx1Z2luOiBOb3ZlbFBsdWdpbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwbHVnaW46IE5vdmVsUGx1Z2luKSB7XHJcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVFZGl0SHRtbENvZGUoZmllbGQ6IEZpZWxkKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IEZvcm1JbnRlcmZhY2UuZ2V0UHJvcGVydHlWYWx1ZUZyb21GaWVsZChmaWVsZCwgJ2xhYmVsJyk7XHJcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBGb3JtSW50ZXJmYWNlLmdldFByb3BlcnR5VmFsdWVGcm9tRmllbGQoZmllbGQsICdwbGFjZWhvbGRlcicpO1xyXG4gICAgICAgIGNvbnN0IGRhdGFsaXN0ID0gRm9ybUludGVyZmFjZS5nZXRQcm9wZXJ0eVZhbHVlRnJvbUZpZWxkKGZpZWxkLCAnZGF0YWxpc3QnKTtcclxuICAgICAgICBjb25zdCBsaW5rID0gRm9ybUludGVyZmFjZS5nZXRQcm9wZXJ0eVZhbHVlRnJvbUZpZWxkKGZpZWxkLCAnbGluaycpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBHZW5lcmF0aW5nIHRleHQgZmllbGQ6ICR7ZmllbGQubmFtZX0sIHBsYWNlaG9sZGVyOiAke3BsYWNlaG9sZGVyfSwgZGF0YWxpc3Q6ICR7ZGF0YWxpc3R9LCBsaW5rOiAke2xpbmt9YCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1pbnB1dCB0ZXh0XCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtmaWVsZC5uYW1lfVwiPiR7bGFiZWx9IDo8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIiR7ZmllbGQubmFtZX1cIiBpZD1cIiR7ZmllbGQubmFtZX1cIiBwbGFjZWhvbGRlcj1cIiR7cGxhY2Vob2xkZXJ9XCIgbGlzdD1cIiR7ZGF0YWxpc3R9XCIgZGF0YS1saW5rPVwiJHtsaW5rfVwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHJlZnJlc2goZmlsZTogVEZpbGUsIGZpZWxkOiBIVE1MSW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IGF3YWl0IEZpbGVQcm9wZXJ0eU1hbmFnZXIucmVhZFByb3BlcnR5KGZpbGUsIGZpZWxkLmlkKSB8fCBcIlwiO1xyXG4gICAgICAgIGZpZWxkLnZhbHVlID0gdGV4dC50b1N0cmluZygpLnJlcGxhY2UoXCJbW1wiLCBcIlwiKS5yZXBsYWNlKFwiXV1cIiwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdGlhbGl6ZShmaWxlOiBURmlsZSwgZmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBVdGlscy5hZGREZWJvdW5jZWRFdmVudExpc3RlbmVyKGZpZWxkLCBcImlucHV0XCIsIGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gZmllbGQudmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZC5kYXRhc2V0LmxpbmsgJiYgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gXCJbW1wiICsgdmFsdWUgKyBcIl1dXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXdhaXQgRmlsZVByb3BlcnR5TWFuYWdlci51cGRhdGVQcm9wZXJ0eShmaWxlLCBmaWVsZC5pZCwgdmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==