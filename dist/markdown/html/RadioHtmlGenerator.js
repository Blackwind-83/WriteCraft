import { __awaiter } from "tslib";
import { FilePropertyManager } from "../FilePropertyManager";
import { Utils } from "src/Utils";
import { FormInterface } from "../parser/FormInterfaces";
export class RadioHtmlGenerator {
    constructor(plugin) {
        this.plugin = plugin;
    }
    generateEditHtmlCode(field) {
        const label = FormInterface.getPropertyValueFromField(field, 'label');
        const options = FormInterface.getPropertyValueFromField(field, 'options');
        console.log(`Generating radio field: ${field.name}, label: ${label}, options: ${options}`);
        return `
            <div class="form-group form-input radio">
                <label for="${field.name}">${label} :</label>
                <div class="radio-group">
                    ${options === null || options === void 0 ? void 0 : options.map((option) => `
                        <label>
                            <input type="radio" name="${field.name}" value="${option}" id="${field.name}"> ${option}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    }
    refresh(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            field.checked = (yield FilePropertyManager.readProperty(file, field.id)) === field.value;
        });
    }
    initialize(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            Utils.addDebouncedEventListener(field, "change", () => __awaiter(this, void 0, void 0, function* () {
                if (field.checked) {
                    yield FilePropertyManager.updateProperty(file, field.id, field.value);
                }
            }));
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9IdG1sR2VuZXJhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21hcmtkb3duL2h0bWwvUmFkaW9IdG1sR2VuZXJhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUM3RCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sRUFBUyxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVoRSxNQUFNLE9BQU8sa0JBQWtCO0lBRzNCLFlBQVksTUFBbUI7UUFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVELG9CQUFvQixDQUFDLEtBQVk7UUFDN0IsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0RSxNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBYSxDQUFDO1FBQ3RGLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEtBQUssQ0FBQyxJQUFJLFlBQVksS0FBSyxjQUFjLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFM0YsT0FBTzs7OEJBRWUsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLOztzQkFFNUIsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUM7O3dEQUVDLEtBQUssQ0FBQyxJQUFJLFlBQVksTUFBTSxTQUFTLEtBQUssQ0FBQyxJQUFJLE1BQU0sTUFBTTs7cUJBRTlGLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQzs7O1NBR3RCLENBQUM7SUFDTixDQUFDO0lBRUssT0FBTyxDQUFDLElBQVcsRUFBRSxLQUF1Qjs7WUFDOUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sbUJBQW1CLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzdGLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxJQUFXLEVBQUUsS0FBdUI7O1lBQ2pELEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEdBQVMsRUFBRTtnQkFDeEQsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ2hCLE1BQU0sbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUUsQ0FBQztZQUNMLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDUCxDQUFDO0tBQUE7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCBOb3ZlbFBsdWdpbiBmcm9tIFwic3JjL21haW5cIjtcclxuaW1wb3J0IHsgRmlsZVByb3BlcnR5TWFuYWdlciB9IGZyb20gXCIuLi9GaWxlUHJvcGVydHlNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcInNyYy9VdGlsc1wiO1xyXG5pbXBvcnQgeyBGaWVsZCwgRm9ybUludGVyZmFjZSB9IGZyb20gXCIuLi9wYXJzZXIvRm9ybUludGVyZmFjZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSYWRpb0h0bWxHZW5lcmF0b3Ige1xyXG4gICAgcHJpdmF0ZSBwbHVnaW46IE5vdmVsUGx1Z2luO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBsdWdpbjogTm92ZWxQbHVnaW4pIHtcclxuICAgICAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZUVkaXRIdG1sQ29kZShmaWVsZDogRmllbGQpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gRm9ybUludGVyZmFjZS5nZXRQcm9wZXJ0eVZhbHVlRnJvbUZpZWxkKGZpZWxkLCAnbGFiZWwnKTtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0gRm9ybUludGVyZmFjZS5nZXRQcm9wZXJ0eVZhbHVlRnJvbUZpZWxkKGZpZWxkLCAnb3B0aW9ucycpIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBHZW5lcmF0aW5nIHJhZGlvIGZpZWxkOiAke2ZpZWxkLm5hbWV9LCBsYWJlbDogJHtsYWJlbH0sIG9wdGlvbnM6ICR7b3B0aW9uc31gKTtcclxuICAgIFxyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGZvcm0taW5wdXQgcmFkaW9cIj5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCIke2ZpZWxkLm5hbWV9XCI+JHtsYWJlbH0gOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFkaW8tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAke29wdGlvbnM/Lm1hcCgob3B0aW9uOiBzdHJpbmcpID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9XCIke2ZpZWxkLm5hbWV9XCIgdmFsdWU9XCIke29wdGlvbn1cIiBpZD1cIiR7ZmllbGQubmFtZX1cIj4gJHtvcHRpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyByZWZyZXNoKGZpbGU6IFRGaWxlLCBmaWVsZDogSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGZpZWxkLmNoZWNrZWQgPSAoYXdhaXQgRmlsZVByb3BlcnR5TWFuYWdlci5yZWFkUHJvcGVydHkoZmlsZSwgZmllbGQuaWQpKSA9PT0gZmllbGQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgaW5pdGlhbGl6ZShmaWxlOiBURmlsZSwgZmllbGQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBVdGlscy5hZGREZWJvdW5jZWRFdmVudExpc3RlbmVyKGZpZWxkLCBcImNoYW5nZVwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaWVsZC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBhd2FpdCBGaWxlUHJvcGVydHlNYW5hZ2VyLnVwZGF0ZVByb3BlcnR5KGZpbGUsIGZpZWxkLmlkLCBmaWVsZC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iXX0=