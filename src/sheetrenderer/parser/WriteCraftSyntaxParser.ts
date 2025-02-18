import { FormItem } from './WriteCraftItem';

export class FormParser {
    private static readonly elementRegex = /^(\w+)\s+(\w+)\s*\(([^)]*)\)\s*$/;
    private static readonly braceRegex = /\s*({|})\s*/;



    parse(source: string): FormItem | null | undefined {
        console.log("🔍 Début du parsing du formulaire...");
        //console.log("📜 Source reçue : ", source);

        // Récupération des lignes non vides
        const lines = source.split("\n").map(line => line.trim()).filter(line => line !== "");


        // Création de l'élément root
        let formItemRoot = null;
        let parentStack: { item: FormItem }[] = [];
        let braceCount = 0;

        let lastFormItem;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            console.log(`🔑 Parsing ligne ${i + 1}:`, line);

            const elementMatch = line.match(FormParser.elementRegex);
            const braceMatch = line.match(FormParser.braceRegex);

            
            if (!braceMatch && !elementMatch) {
                console.error(`❌ Erreur de syntaxe à la ligne ${i + 1} : format incorrect`);
                throw new Error(`Syntaxe incorrecte à la ligne ${i + 1}. Vérifiez le format.`);
            }

            if (elementMatch) {
                const [_, id, type, propertiesList] = elementMatch;
                console.log("elementRegex => " + id + " - " + type + " - " + propertiesList);
                const parent = parentStack.length > 0 ? parentStack[parentStack.length - 1].item : null;
                lastFormItem = this.createFormItem(id, type, propertiesList, parent);
            }

            if (braceMatch) {
                const [_, brace] = braceMatch;
                console.log("braceRegex => " + brace);
                if (brace === "{") {
                    braceCount++;
                    if (lastFormItem) {
                        console.log("push parent " + lastFormItem.id);
                        parentStack.push({ item: lastFormItem });
                    }
                } else {
                    braceCount--;
                    if (braceCount < 0) {
                        console.error(`❌ Erreur de syntaxe : accolade fermante en trop à la ligne ${i + 1}`);
                        throw new Error(`Syntaxe incorrecte : accolade fermante en trop à la ligne ${i + 1}.`);
                    }
                    console.log("pop parent ");
                    formItemRoot = parentStack.pop()?.item;
                }
            }
        }

        return formItemRoot;
    }
    private createFormItem(id: string, type: string, propertiesList: string, parent: FormItem | null): FormItem {
        const properties = this.parseOptions(propertiesList);
        const newItem = new FormItem(id, type, properties, []);
        console.log(`🎯 Création de l'élément "${id}" (${type}) avec options :`, properties);
        
        if (parent) {
            parent.children.push(newItem);
            console.log(`🔗 Ajout de l'élément "${id}" en tant qu'enfant de "${parent.id}"`);
        }

        return newItem;
    }

    private parseOptions(options: string): { [key: string]: any } {
        const optionsObject: { [key: string]: any } = {};
        const optionPairs = options.split(';').map(pair => pair.trim()).filter(pair => pair !== "");

        optionPairs.forEach((pair, index) => {
            const match = pair.match(/^(\w+)\s*=\s*(.*)$/);
            if (!match) {
                console.error(`❌ Erreur de syntaxe dans les options à l'index ${index} : "${pair}"`);
                throw new Error(`Syntaxe incorrecte dans les options : "${pair}".`);
            }

            const [_, key, value] = match;
            if (value.startsWith('[') && value.endsWith(']')) {
                optionsObject[key] = value.slice(1, -1).split(',').map(val => val.trim().replace(/"/g, ''));
            } else {
                optionsObject[key] = value.replace(/"/g, '');
            }
        });

        return optionsObject;
    }
}
