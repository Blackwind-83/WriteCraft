import { TFile } from "obsidian";
import * as yaml from "js-yaml";
import NovelPlugin from "src/main";

export class FilePropertyUtils {
    private static plugin: NovelPlugin;

    // Constante de classe pour la regex
    private static readonly FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---/;

    constructor(plugin: NovelPlugin) {
        FilePropertyUtils.plugin = plugin;
    }

    // Méthode pour lire une propriété spécifique dans le frontmatter
    static async readProperty(file: TFile, propertyName: string): Promise<string | string [] | undefined> {
        try {
            // Lire le contenu du fichier via cachedRead
            const content = await FilePropertyUtils.plugin.app.vault.cachedRead(file);

            // Appeler readFrontMatter pour extraire le frontmatter
            const frontmatter = await FilePropertyUtils.readFrontMatter(content);
            
            if (frontmatter) {
                console.log(`[readProperty] Contenu :`, propertyName, " = ", frontmatter[propertyName]);
                return frontmatter[propertyName];
            } else {
                console.log("Aucun frontmatter trouvé dans le fichier.");
                return undefined;
            }
        } catch (err) {
            console.error("Erreur lors de la lecture du fichier ou du parsing YAML :", err);
            return undefined;
        }
    }

    // Méthode pour lire le frontmatter et le parser
    private static async readFrontMatter(content: string): Promise<Record<string, any> | null> {
        const yamlMatch = content.match(FilePropertyUtils.FRONTMATTER_REGEX);
        
        // Si un bloc YAML est trouvé, on le parse et on retourne un objet
        if (yamlMatch) {
            try {
                const frontmatter = yaml.load(yamlMatch[1]) as Record<string, any>;
                return frontmatter;
            } catch (err) {
                console.error("Erreur lors du parsing YAML du frontmatter :", err);
                return null;
            }
        } else {
            return null;
        }
    }

    // Méthode pour mettre à jour une propriété dans le frontmatter
    static async updateProperty(file: TFile, key: string, value: string | string [] | boolean) {
        const content = await FilePropertyUtils.plugin.app.vault.read(file);
        const updatedContent = FilePropertyUtils.modifyFrontmatter(content, key, value);
        await FilePropertyUtils.plugin.app.vault.modify(file, updatedContent);
        console.log(`[updateProperty] Contenu après mise à jour :`, updatedContent);
    }
    
    private static modifyFrontmatter(content: string, key: string, value: string | string[] | boolean): string {
        const yamlMatch = content.match(FilePropertyUtils.FRONTMATTER_REGEX);
        
        let newContent = content;
        if (yamlMatch) {
            try {
                const frontmatter = yaml.load(yamlMatch[1]) as Record<string, any>;
    
                // Si la valeur est vide ou un tableau vide, on supprime la clé
                if (
                    value === null || 
                    value === undefined || 
                    value === "" || 
                    (Array.isArray(value) && value.length === 0)
                ) {
                    delete frontmatter[key];
                } else {
                    // Sinon, on met à jour la propriété
                    frontmatter[key] = value;
                }
    
                // Vérifier si le frontmatter est désormais vide
                if (Object.keys(frontmatter).length === 0) {
                    // Supprimer entièrement le bloc YAML
                    newContent = content.replace(FilePropertyUtils.FRONTMATTER_REGEX, "").trim();
                } else {
                    // Regénérer le bloc YAML avec js-yaml
                    const newYaml = yaml.dump(frontmatter);
                    newContent = content.replace(FilePropertyUtils.FRONTMATTER_REGEX, `---\n${newYaml}\n---`);
                }
            } catch (err) {
                console.error("Erreur lors du parsing ou de la modification du frontmatter :", err);
            }
        } else {
            // Si aucun frontmatter et que la valeur est valide, en créer un
            if (value !== null && value !== undefined && value !== "" && (!Array.isArray(value) || value.length > 0)) {
                const newYaml = yaml.dump({ [key]: value });
                newContent = `---\n${newYaml}\n---\n` + content;
            }
        }
    
        return newContent;
    }
    
}
