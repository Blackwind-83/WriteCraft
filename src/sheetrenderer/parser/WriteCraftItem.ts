export class FormItem {
    id: string;
    type: string;
    properties: { [key: string]: any };
    children: FormItem[];
    constructor(id: string, type: string, properties: { [key: string]: any } = {}, children: FormItem[] = []) {
        this.id = id;
        this.type = type;
        this.properties = properties;
        this.children = children;
    }
}
