import { __awaiter } from "tslib";
import { FilePropertyManager } from "../FilePropertyManager";
import { Utils } from "src/Utils";
import { FormInterface } from "../parser/FormInterfaces";
export class ListHtmlGenerator {
    constructor(plugin) {
        this.plugin = plugin;
    }
    generateEditHtmlCode(field) {
        const label = FormInterface.getPropertyValueFromField(field, 'label');
        const placeholder = FormInterface.getPropertyValueFromField(field, 'placeholder');
        const datalist = FormInterface.getPropertyValueFromField(field, 'datalist');
        const link = FormInterface.getPropertyValueFromField(field, 'link');
        console.log(`Generating text field: ${field.name}`);
        return `
        <div class="form-group form-input list" id="${field.name}" data-field="true">
            <label for="children-list">${label} : <label id="${field.name}-sum"/></label>
            <button id="${field.name}-addbtn" class="btn-list">➕</button></label>
            <input type="hidden" id="${field.name}-placeholder" value="${placeholder}">
            <input type="hidden" id="${field.name}-datalist" value="${datalist}">
            <input type="hidden" id="${field.name}-link" value="${link}">
            <ul id="${field.name}-list" class="grid-container">
            </ul>
        </div>
        `;
    }
    refresh(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const eltList = (yield FilePropertyManager.readProperty(file, field.id)) || "";
            if (eltList instanceof Array) {
                eltList.forEach((elt) => {
                    console.log("Elt:", elt);
                    this.createElement(field, file);
                });
                this.setEltList(field, eltList);
                this.updateSumElt(field);
            }
        });
    }
    updateSumElt(field) {
        const sumElt = field.querySelector(`#${field.id}-sum`);
        if (sumElt) {
            const eltList = this.getEltList(field);
            sumElt.innerHTML = eltList.length.toString();
        }
    }
    initialize(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const addBtn = field.querySelector(`#${field.id}-addbtn`);
            if (addBtn && addBtn instanceof HTMLButtonElement) {
                Utils.addDebouncedEventListener(addBtn, "click", () => __awaiter(this, void 0, void 0, function* () {
                    this.createElement(field, file);
                }));
            }
        });
    }
    createElement(field, file) {
        const list = field.querySelector(`#${field.id}-list`);
        const elt = document.createElement(`${field.id}-elt`);
        const placeholderField = field.querySelector(`#${field.id}-placeholder`);
        const datalistField = field.querySelector(`#${field.id}-datalist`);
        const linkField = field.querySelector(`#${field.id}-link`);
        if (list && elt && list instanceof HTMLUListElement && placeholderField && datalistField && linkField) {
            elt.classList.add("child-entry");
            const placeholder = placeholderField.getAttribute("value");
            const datalist = datalistField.getAttribute("value");
            const link = datalistField.getAttribute("value");
            console.log("Placeholder:", placeholder);
            console.log("Datalist:", datalist);
            elt.innerHTML = `
                <input type="text" id="${field.id}-field" class="children-field" placeholder="${placeholder}" list="${datalist}" data-link="${link}">
                <button id="${field.id}-elt-rmbtn" class="btn-list">❌</button>
            `;
            // element delete button
            const deleteBtn = elt.querySelector(`#${field.id}-elt-rmbtn`);
            if (deleteBtn) {
                deleteBtn.addEventListener("click", () => {
                    elt.remove();
                    this.updateProperty(file, field);
                    this.updateSumElt(field);
                });
            }
            list.appendChild(elt);
            // element field
            const eltField = elt.querySelector(`#${field.id}-field`);
            if (eltField && eltField instanceof HTMLInputElement) {
                eltField.addEventListener("input", () => __awaiter(this, void 0, void 0, function* () {
                    console.log("Input value:", eltField.value);
                    this.updateProperty(file, field);
                    this.updateSumElt(field);
                }));
            }
            list.appendChild(elt);
        }
    }
    updateProperty(file, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const listElt = this.getEltList(field);
            yield FilePropertyManager.updateProperty(file, field.id, listElt);
        });
    }
    getEltList(field) {
        const eltFields = field.querySelectorAll("input:not([type='hidden'])");
        const children = [];
        eltFields.forEach((elt) => {
            if (elt instanceof HTMLInputElement) {
                let value = elt.value;
                if (value) {
                    if (elt.dataset.link) {
                        value = "[[" + value + "]]";
                    }
                    children.push(value);
                }
            }
        });
        return children;
    }
    setEltList(field, list) {
        const eltFields = field.querySelectorAll("input:not([type='hidden'])");
        eltFields.forEach((elt, index) => {
            if (elt instanceof HTMLInputElement) {
                elt.value = list[index].toString().replace("[[", "").replace("]]", "");
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdEh0bWxHZW5lcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFya2Rvd24vaHRtbC9MaXN0SHRtbEdlbmVyYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNsQyxPQUFPLEVBQVMsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFaEUsTUFBTSxPQUFPLGlCQUFpQjtJQUcxQixZQUFZLE1BQW1CO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxLQUFZO1FBQzdCLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEUsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLHlCQUF5QixDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNsRixNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEUsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFFcEQsT0FBTztzREFDdUMsS0FBSyxDQUFDLElBQUk7eUNBQ3ZCLEtBQUssaUJBQWlCLEtBQUssQ0FBQyxJQUFJOzBCQUMvQyxLQUFLLENBQUMsSUFBSTt1Q0FDRyxLQUFLLENBQUMsSUFBSSx3QkFBd0IsV0FBVzt1Q0FDN0MsS0FBSyxDQUFDLElBQUkscUJBQXFCLFFBQVE7dUNBQ3ZDLEtBQUssQ0FBQyxJQUFJLGlCQUFp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LE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM3QixJQUFJLEdBQUcsWUFBWSxnQkFBZ0IsRUFBRSxDQUFDO2dCQUNsQyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDM0UsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVEZpbGUgfSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IE5vdmVsUGx1Z2luIGZyb20gXCJzcmMvbWFpblwiO1xyXG5pbXBvcnQgeyBGaWxlUHJvcGVydHlNYW5hZ2VyIH0gZnJvbSBcIi4uL0ZpbGVQcm9wZXJ0eU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwic3JjL1V0aWxzXCI7XHJcbmltcG9ydCB7IEZpZWxkLCBGb3JtSW50ZXJmYWNlIH0gZnJvbSBcIi4uL3BhcnNlci9Gb3JtSW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIExpc3RIdG1sR2VuZXJhdG9yIHtcclxuICAgIHByaXZhdGUgcGx1Z2luOiBOb3ZlbFBsdWdpbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwbHVnaW46IE5vdmVsUGx1Z2luKSB7XHJcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcbiAgICB9XHJcblxyXG4gICAgZ2VuZXJhdGVFZGl0SHRtbENvZGUoZmllbGQ6IEZpZWxkKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IEZvcm1JbnRlcmZhY2UuZ2V0UHJvcGVydHlWYWx1ZUZyb21GaWVsZChmaWVsZCwgJ2xhYmVsJyk7XHJcbiAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBGb3JtSW50ZXJmYWNlLmdldFByb3BlcnR5VmFsdWVGcm9tRmllbGQoZmllbGQsICdwbGFjZWhvbGRlcicpO1xyXG4gICAgICAgIGNvbnN0IGRhdGFsaXN0ID0gRm9ybUludGVyZmFjZS5nZXRQcm9wZXJ0eVZhbHVlRnJvbUZpZWxkKGZpZWxkLCAnZGF0YWxpc3QnKTtcclxuICAgICAgICBjb25zdCBsaW5rID0gRm9ybUludGVyZmFjZS5nZXRQcm9wZXJ0eVZhbHVlRnJvbUZpZWxkKGZpZWxkLCAnbGluaycpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBHZW5lcmF0aW5nIHRleHQgZmllbGQ6ICR7ZmllbGQubmFtZX1gKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGZvcm0taW5wdXQgbGlzdFwiIGlkPVwiJHtmaWVsZC5uYW1lfVwiIGRhdGEtZmllbGQ9XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaGlsZHJlbi1saXN0XCI+JHtsYWJlbH0gOiA8bGFiZWwgaWQ9XCIke2ZpZWxkLm5hbWV9LXN1bVwiLz48L2xhYmVsPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwiJHtmaWVsZC5uYW1lfS1hZGRidG5cIiBjbGFzcz1cImJ0bi1saXN0XCI+4p6VPC9idXR0b24+PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cIiR7ZmllbGQubmFtZX0tcGxhY2Vob2xkZXJcIiB2YWx1ZT1cIiR7cGxhY2Vob2xkZXJ9XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCIke2ZpZWxkLm5hbWV9LWRhdGFsaXN0XCIgdmFsdWU9XCIke2RhdGFsaXN0fVwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwiJHtmaWVsZC5uYW1lfS1saW5rXCIgdmFsdWU9XCIke2xpbmt9XCI+XHJcbiAgICAgICAgICAgIDx1bCBpZD1cIiR7ZmllbGQubmFtZX0tbGlzdFwiIGNsYXNzPVwiZ3JpZC1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHJlZnJlc2goZmlsZTogVEZpbGUsIGZpZWxkOiBIVE1MRGl2RWxlbWVudCkge1xyXG4gICAgICAgIGNvbnN0IGVsdExpc3QgPSBhd2FpdCBGaWxlUHJvcGVydHlNYW5hZ2VyLnJlYWRQcm9wZXJ0eShmaWxlLCBmaWVsZC5pZCkgfHwgXCJcIjtcclxuICAgICAgICBpZiAoZWx0TGlzdCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGVsdExpc3QuZm9yRWFjaCgoZWx0OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRWx0OlwiLCBlbHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVFbGVtZW50KGZpZWxkLCBmaWxlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RWx0TGlzdChmaWVsZCwgZWx0TGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3VtRWx0KGZpZWxkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVTdW1FbHQoZmllbGQ6IEhUTUxEaXZFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc3VtRWx0ID0gZmllbGQucXVlcnlTZWxlY3RvcihgIyR7ZmllbGQuaWR9LXN1bWApO1xyXG4gICAgICAgIGlmIChzdW1FbHQpIHtcclxuICAgICAgICAgICAgY29uc3QgZWx0TGlzdCA9IHRoaXMuZ2V0RWx0TGlzdChmaWVsZCk7XHJcbiAgICAgICAgICAgIHN1bUVsdC5pbm5lckhUTUwgPSBlbHRMaXN0Lmxlbmd0aC50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBpbml0aWFsaXplKGZpbGU6IFRGaWxlLCBmaWVsZDogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBhZGRCdG4gPSBmaWVsZC5xdWVyeVNlbGVjdG9yKGAjJHtmaWVsZC5pZH0tYWRkYnRuYCk7XHJcbiAgICAgICAgaWYgKGFkZEJ0biAmJiBhZGRCdG4gaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xyXG4gICAgICAgICAgICBVdGlscy5hZGREZWJvdW5jZWRFdmVudExpc3RlbmVyKGFkZEJ0biwgXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZUVsZW1lbnQoZmllbGQsIGZpbGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjcmVhdGVFbGVtZW50KGZpZWxkOiBIVE1MRGl2RWxlbWVudCwgZmlsZTogVEZpbGUpIHtcclxuICAgICAgICBjb25zdCBsaXN0ID0gZmllbGQucXVlcnlTZWxlY3RvcihgIyR7ZmllbGQuaWR9LWxpc3RgKTtcclxuICAgICAgICBjb25zdCBlbHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGAke2ZpZWxkLmlkfS1lbHRgKTtcclxuICAgICAgICBjb25zdCBwbGFjZWhvbGRlckZpZWxkID0gIGZpZWxkLnF1ZXJ5U2VsZWN0b3IoYCMke2ZpZWxkLmlkfS1wbGFjZWhvbGRlcmApO1xyXG4gICAgICAgIGNvbnN0IGRhdGFsaXN0RmllbGQgPSAgZmllbGQucXVlcnlTZWxlY3RvcihgIyR7ZmllbGQuaWR9LWRhdGFsaXN0YCk7XHJcbiAgICAgICAgY29uc3QgbGlua0ZpZWxkID0gIGZpZWxkLnF1ZXJ5U2VsZWN0b3IoYCMke2ZpZWxkLmlkfS1saW5rYCk7XHJcbiAgICAgICAgaWYgKGxpc3QgJiYgZWx0ICYmIGxpc3QgaW5zdGFuY2VvZiBIVE1MVUxpc3RFbGVtZW50ICYmIHBsYWNlaG9sZGVyRmllbGQgJiYgZGF0YWxpc3RGaWVsZCAmJiBsaW5rRmllbGQpIHtcclxuICAgICAgICAgICAgZWx0LmNsYXNzTGlzdC5hZGQoXCJjaGlsZC1lbnRyeVwiKTtcclxuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBwbGFjZWhvbGRlckZpZWxkLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhbGlzdCA9IGRhdGFsaXN0RmllbGQuZ2V0QXR0cmlidXRlKFwidmFsdWVcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmsgPSBkYXRhbGlzdEZpZWxkLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYWNlaG9sZGVyOlwiLCBwbGFjZWhvbGRlcik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGF0YWxpc3Q6XCIsIGRhdGFsaXN0KTtcclxuICAgICAgICAgICAgZWx0LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiJHtmaWVsZC5pZH0tZmllbGRcIiBjbGFzcz1cImNoaWxkcmVuLWZpZWxkXCIgcGxhY2Vob2xkZXI9XCIke3BsYWNlaG9sZGVyfVwiIGxpc3Q9XCIke2RhdGFsaXN0fVwiIGRhdGEtbGluaz1cIiR7bGlua31cIj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCIke2ZpZWxkLmlkfS1lbHQtcm1idG5cIiBjbGFzcz1cImJ0bi1saXN0XCI+4p2MPC9idXR0b24+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGVsZW1lbnQgZGVsZXRlIGJ1dHRvblxyXG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBlbHQucXVlcnlTZWxlY3RvcihgIyR7ZmllbGQuaWR9LWVsdC1ybWJ0bmApO1xyXG4gICAgICAgICAgICBpZiAoZGVsZXRlQnRuKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbHQucmVtb3ZlKClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVByb3BlcnR5KGZpbGUsIGZpZWxkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVN1bUVsdChmaWVsZCk7XHJcbiAgICAgICAgICAgICAgICB9KTsgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsaXN0LmFwcGVuZENoaWxkKGVsdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGVsZW1lbnQgZmllbGRcclxuICAgICAgICAgICAgY29uc3QgZWx0RmllbGQgPSBlbHQucXVlcnlTZWxlY3RvcihgIyR7ZmllbGQuaWR9LWZpZWxkYCk7XHJcbiAgICAgICAgICAgIGlmIChlbHRGaWVsZCAmJiBlbHRGaWVsZCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVsdEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJbnB1dCB2YWx1ZTpcIiwgZWx0RmllbGQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvcGVydHkoZmlsZSwgZmllbGQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU3VtRWx0KGZpZWxkKTtcclxuICAgICAgICAgICAgICAgIH0pOyAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQoZWx0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhc3luYyB1cGRhdGVQcm9wZXJ0eShmaWxlOiBURmlsZSwgZmllbGQ6IEhUTUxEaXZFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgbGlzdEVsdCA9IHRoaXMuZ2V0RWx0TGlzdChmaWVsZCk7XHJcbiAgICAgICAgYXdhaXQgRmlsZVByb3BlcnR5TWFuYWdlci51cGRhdGVQcm9wZXJ0eShmaWxlLCBmaWVsZC5pZCwgbGlzdEVsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRFbHRMaXN0KGZpZWxkOiBIVE1MRGl2RWxlbWVudCk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBlbHRGaWVsZHMgPSBmaWVsZC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQ6bm90KFt0eXBlPSdoaWRkZW4nXSlcIik7XHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW46IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgZWx0RmllbGRzLmZvckVhY2goKGVsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZWx0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gZWx0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsdC5kYXRhc2V0LmxpbmspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBcIltbXCIgKyB2YWx1ZSArIFwiXV1cIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gY2hpbGRyZW47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzZXRFbHRMaXN0KGZpZWxkOiBIVE1MRGl2RWxlbWVudCwgbGlzdDogc3RyaW5nW10pIHtcclxuICAgICAgICBjb25zdCBlbHRGaWVsZHMgPSBmaWVsZC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQ6bm90KFt0eXBlPSdoaWRkZW4nXSlcIik7XHJcbiAgICAgICAgZWx0RmllbGRzLmZvckVhY2goKGVsdCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVsdCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVsdC52YWx1ZSA9IGxpc3RbaW5kZXhdLnRvU3RyaW5nKCkucmVwbGFjZShcIltbXCIsIFwiXCIpLnJlcGxhY2UoXCJdXVwiLCBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==