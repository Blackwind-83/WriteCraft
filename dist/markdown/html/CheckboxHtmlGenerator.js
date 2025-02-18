import { __awaiter } from "tslib";
import { FilePropertyManager } from "../FilePropertyManager";
import { Utils } from "src/Utils";
import { FormInterface } from "../parser/FormInterfaces";
export class CheckboxHtmlGenerator {
    constructor(plugin) {
        this.plugin = plugin;
    }
    generateEditHtmlCode(field) {
        const label = FormInterface.getPropertyValueFromField(field, 'label');
        const options = FormInterface.getPropertyValueFromField(field, 'options');
        console.log(`Generating checkbox field: ${field.name}, options: ${options}`);
        return `
            <div class="form-group form-input checkbox">
                <label for="${field.name}">${label} :</label>
                <div class="checkbox-group">
                    ${options === null || options === void 0 ? void 0 : options.map((option) => `
                        <input type="checkbox" id="${option}" name="${field.name}" />
                        <label for="${option}">${option}</label>
                    `).join('')}
                </div>
            </div>
        `;
    }
    refresh(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const eltList = yield FilePropertyManager.readProperty(file, field.name);
            if (eltList instanceof Array) {
                field.checked = eltList.includes(field.id);
            }
        });
    }
    initialize(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            Utils.addDebouncedEventListener(field, "change", () => __awaiter(this, void 0, void 0, function* () {
                let eltList = yield FilePropertyManager.readProperty(file, field.name);
                if (!eltList) {
                    eltList = [];
                }
                if (eltList instanceof Array) {
                    if (field.checked) {
                        eltList.push(field.id);
                    }
                    else {
                        eltList.remove(field.id);
                    }
                    yield FilePropertyManager.updateProperty(file, field.name, eltList);
                }
            }));
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tib3hIdG1sR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21hcmtkb3duL2h0bWwvQ2hlY2tib3hIdG1sR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBUyxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxNQUFNLE9BQU8scUJBQXFCO0lBRzlCLFlBQVksTUFBbUI7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUdELG9CQUFvQixDQUFDLEtBQVk7UUFDN0IsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0RSxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBYSxDQUFDO1FBQ3RGLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEtBQUssQ0FBQyxJQUFJLGNBQWMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUU3RSxPQUFPOzs4QkFFZSxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUs7O3NCQUU1QixPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsR0FBRyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQztxREFDRixNQUFNLFdBQVcsS0FBSyxDQUFDLElBQUk7c0NBQzFDLE1BQU0sS0FBSyxNQUFNO3FCQUNsQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7OztTQUd0QixDQUFDO0lBQ04sQ0FBQztJQUVLLE9BQU8sQ0FBQyxJQUFXLEVBQUUsS0FBdUI7O1lBQzlDLE1BQU0sT0FBTyxHQUFHLE1BQU0sbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDeEUsSUFBSSxPQUFPLFlBQVksS0FBSyxFQUFFLENBQUM7Z0JBQzNCLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0MsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxJQUFXLEVBQUUsS0FBdUI7O1lBQ2pELEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQVMsRUFBRTtnQkFDeEQsSUFBSSxPQUFPLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDdEUsSUFBSSxDQUFFLE9BQU8sRUFBRSxDQUFDO29CQUNaLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLENBQUM7Z0JBQ0QsSUFBSSxPQUFPLFlBQVksS0FBSyxFQUFFLENBQUM7b0JBQzNCLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDM0IsQ0FBQzt5QkFDSSxDQUFDO3dCQUNGLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM3QixDQUFDO29CQUNELE1BQU0sbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUN4RSxDQUFDO1lBQ0wsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IE5vdmVsUGx1Z2luIGZyb20gXCJzcmMvbWFpblwiO1xyXG5pbXBvcnQgeyBGaWxlUHJvcGVydHlNYW5hZ2VyIH0gZnJvbSBcIi4uL0ZpbGVQcm9wZXJ0eU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwic3JjL1V0aWxzXCI7XHJcbmltcG9ydCB7IEZpZWxkLCBGb3JtSW50ZXJmYWNlIH0gZnJvbSBcIi4uL3BhcnNlci9Gb3JtSW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZWNrYm94SHRtbEdlbmVyYXRvciB7XHJcbiAgICBwcml2YXRlIHBsdWdpbjogTm92ZWxQbHVnaW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocGx1Z2luOiBOb3ZlbFBsdWdpbikge1xyXG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xyXG4gICAgfVxyXG5cclxuICAgICAgICAgICAgXHJcbiAgICBnZW5lcmF0ZUVkaXRIdG1sQ29kZShmaWVsZDogRmllbGQpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gRm9ybUludGVyZmFjZS5nZXRQcm9wZXJ0eVZhbHVlRnJvbUZpZWxkKGZpZWxkLCAnbGFiZWwnKTtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gRm9ybUludGVyZmFjZS5nZXRQcm9wZXJ0eVZhbHVlRnJvbUZpZWxkKGZpZWxkLCAnb3B0aW9ucycpIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBHZW5lcmF0aW5nIGNoZWNrYm94IGZpZWxkOiAke2ZpZWxkLm5hbWV9LCBvcHRpb25zOiAke29wdGlvbnN9YCk7XHJcbiAgICBcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBmb3JtLWlucHV0IGNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiJHtmaWVsZC5uYW1lfVwiPiR7bGFiZWx9IDo8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoZWNrYm94LWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtvcHRpb25zPy5tYXAoKG9wdGlvbjogc3RyaW5nKSA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7b3B0aW9ufVwiIG5hbWU9XCIke2ZpZWxkLm5hbWV9XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cIiR7b3B0aW9ufVwiPiR7b3B0aW9ufTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYXN5bmMgcmVmcmVzaChmaWxlOiBURmlsZSwgZmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBlbHRMaXN0ID0gYXdhaXQgRmlsZVByb3BlcnR5TWFuYWdlci5yZWFkUHJvcGVydHkoZmlsZSwgZmllbGQubmFtZSlcclxuICAgICAgICBpZiAoZWx0TGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGZpZWxkLmNoZWNrZWQgPSBlbHRMaXN0LmluY2x1ZGVzKGZpZWxkLmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdGlhbGl6ZShmaWxlOiBURmlsZSwgZmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBVdGlscy5hZGREZWJvdW5jZWRFdmVudExpc3RlbmVyKGZpZWxkLCBcImNoYW5nZVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbHRMaXN0ID0gYXdhaXQgRmlsZVByb3BlcnR5TWFuYWdlci5yZWFkUHJvcGVydHkoZmlsZSwgZmllbGQubmFtZSlcclxuICAgICAgICAgICAgaWYgKCEgZWx0TGlzdCkge1xyXG4gICAgICAgICAgICAgICAgZWx0TGlzdCA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChlbHRMaXN0IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmaWVsZC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWx0TGlzdC5wdXNoKGZpZWxkLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsdExpc3QucmVtb3ZlKGZpZWxkLmlkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGF3YWl0IEZpbGVQcm9wZXJ0eU1hbmFnZXIudXBkYXRlUHJvcGVydHkoZmlsZSwgZmllbGQubmFtZSwgZWx0TGlzdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=