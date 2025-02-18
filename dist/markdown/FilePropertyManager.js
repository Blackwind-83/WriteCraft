import { __awaiter } from "tslib";
import * as yaml from "js-yaml";
export class FilePropertyManager {
    constructor(plugin) {
        FilePropertyManager.plugin = plugin;
    }
    // Méthode pour lire une propriété spécifique dans le frontmatter
    static readProperty(file, propertyName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Lire le contenu du fichier via cachedRead
                const content = yield FilePropertyManager.plugin.app.vault.cachedRead(file);
                // Appeler readFrontMatter pour extraire le frontmatter
                const frontmatter = yield FilePropertyManager.readFrontMatter(content);
                if (frontmatter) {
                    console.log(`[readProperty] Contenu :`, propertyName, " = ", frontmatter[propertyName]);
                    return frontmatter[propertyName];
                }
                else {
                    console.log("Aucun frontmatter trouvé dans le fichier.");
                    return undefined;
                }
            }
            catch (err) {
                console.error("Erreur lors de la lecture du fichier ou du parsing YAML :", err);
                return undefined;
            }
        });
    }
    // Méthode pour lire le frontmatter et le parser
    static readFrontMatter(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const yamlMatch = content.match(FilePropertyManager.FRONTMATTER_REGEX);
            // Si un bloc YAML est trouvé, on le parse et on retourne un objet
            if (yamlMatch) {
                try {
                    const frontmatter = yaml.load(yamlMatch[1]);
                    return frontmatter;
                }
                catch (err) {
                    console.error("Erreur lors du parsing YAML du frontmatter :", err);
                    return null;
                }
            }
            else {
                return null;
            }
        });
    }
    // Méthode pour mettre à jour une propriété dans le frontmatter
    static updateProperty(file, key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield FilePropertyManager.plugin.app.vault.read(file);
            const updatedContent = FilePropertyManager.modifyFrontmatter(content, key, value);
            yield FilePropertyManager.plugin.app.vault.modify(file, updatedContent);
            console.log(`[updateProperty] Contenu après mise à jour :`, updatedContent);
        });
    }
    static modifyFrontmatter(content, key, value) {
        const yamlMatch = content.match(FilePropertyManager.FRONTMATTER_REGEX);
        let newContent = content;
        if (yamlMatch) {
            try {
                const frontmatter = yaml.load(yamlMatch[1]);
                // Si la valeur est vide ou un tableau vide, on supprime la clé
                if (value === null ||
                    value === undefined ||
                    value === "" ||
                    (Array.isArray(value) && value.length === 0)) {
                    delete frontmatter[key];
                }
                else {
                    // Sinon, on met à jour la propriété
                    frontmatter[key] = value;
                }
                // Vérifier si le frontmatter est désormais vide
                if (Object.keys(frontmatter).length === 0) {
                    // Supprimer entièrement le bloc YAML
                    newContent = content.replace(FilePropertyManager.FRONTMATTER_REGEX, "").trim();
                }
                else {
                    // Regénérer le bloc YAML avec js-yaml
                    const newYaml = yaml.dump(frontmatter);
                    newContent = content.replace(FilePropertyManager.FRONTMATTER_REGEX, `---\n${newYaml}\n---`);
                }
            }
            catch (err) {
                console.error("Erreur lors du parsing ou de la modification du frontmatter :", err);
            }
        }
        else {
            // Si aucun frontmatter et que la valeur est valide, en créer un
            if (value !== null && value !== undefined && value !== "" && (!Array.isArray(value) || value.length > 0)) {
                const newYaml = yaml.dump({ [key]: value });
                newContent = `---\n${newYaml}\n---\n` + content;
            }
        }
        return newContent;
    }
}
// Constante de classe pour la regex
FilePropertyManager.FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---/;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZVByb3BlcnR5TWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYXJrZG93bi9GaWxlUHJvcGVydHlNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEtBQUssSUFBSSxNQUFNLFNBQVMsQ0FBQztBQUdoQyxNQUFNLE9BQU8sbUJBQW1CO0lBTTVCLFlBQVksTUFBbUI7UUFDM0IsbUJBQW1CLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN4QyxDQUFDO0lBRUQsaUVBQWlFO0lBQ2pFLE1BQU0sQ0FBTyxZQUFZLENBQUMsSUFBVyxFQUFFLFlBQW9COztZQUN2RCxJQUFJLENBQUM7Z0JBQ0QsNENBQTRDO2dCQUM1QyxNQUFNLE9BQU8sR0FBRyxNQUFNLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFNUUsdURBQXVEO2dCQUN2RCxNQUFNLFdBQVcsR0FBRyxNQUFNLG1CQUFtQixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFdkUsSUFBSSxXQUFXLEVBQUUsQ0FBQztvQkFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7b0JBQ3hGLE9BQU8sV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO3FCQUFNLENBQUM7b0JBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO29CQUN6RCxPQUFPLFNBQVMsQ0FBQztnQkFDckIsQ0FBQztZQUNMLENBQUM7WUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkRBQTJELEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2hGLE9BQU8sU0FBUyxDQUFDO1lBQ3JCLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCxnREFBZ0Q7SUFDeEMsTUFBTSxDQUFPLGVBQWUsQ0FBQyxPQUFlOztZQUNoRCxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFdkUsa0VBQWtFO1lBQ2xFLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQ1osSUFBSSxDQUFDO29CQUNELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUF3QixDQUFDO29CQUNuRSxPQUFPLFdBQVcsQ0FBQztnQkFDdkIsQ0FBQztnQkFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO29CQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsOENBQThDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ25FLE9BQU8sSUFBSSxDQUFDO2dCQUNoQixDQUFDO1lBQ0wsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLE9BQU8sSUFBSSxDQUFDO1lBQ2hCLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCwrREFBK0Q7SUFDL0QsTUFBTSxDQUFPLGNBQWMsQ0FBQyxJQUFXLEVBQUUsR0FBVyxFQUFFLEtBQW1DOztZQUNyRixNQUFNLE9BQU8sR0FBRyxNQUFNLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RSxNQUFNLGNBQWMsR0FBRyxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xGLE1BQU0sbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztZQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLDhDQUE4QyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7S0FBQTtJQUVPLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsR0FBVyxFQUFFLEtBQWtDO1FBQzdGLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUV2RSxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUM7UUFDekIsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQztnQkFDRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBd0IsQ0FBQztnQkFFbkUsK0RBQStEO2dCQUMvRCxJQUNJLEtBQUssS0FBSyxJQUFJO29CQUNkLEtBQUssS0FBSyxTQUFTO29CQUNuQixLQUFLLEtBQUssRUFBRTtvQkFDWixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsRUFDOUMsQ0FBQztvQkFDQyxPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsQ0FBQztxQkFBTSxDQUFDO29CQUNKLG9DQUFvQztvQkFDcEMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDN0IsQ0FBQztnQkFFRCxnREFBZ0Q7Z0JBQ2hELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ3hDLHFDQUFxQztvQkFDckMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ25GLENBQUM7cUJBQU0sQ0FBQztvQkFDSixzQ0FBc0M7b0JBQ3RDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3ZDLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLGlCQUFpQixFQUFFLFFBQVEsT0FBTyxPQUFPLENBQUMsQ0FBQztnQkFDaEcsQ0FBQztZQUNMLENBQUM7WUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2dCQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsK0RBQStELEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDeEYsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ0osZ0VBQWdFO1lBQ2hFLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN2RyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QyxVQUFVLEdBQUcsUUFBUSxPQUFPLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDcEQsQ0FBQztRQUNMLENBQUM7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDOztBQWpHRCxvQ0FBb0M7QUFDWixxQ0FBaUIsR0FBRyx1QkFBdUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCAqIGFzIHlhbWwgZnJvbSBcImpzLXlhbWxcIjtcclxuaW1wb3J0IE5vdmVsUGx1Z2luIGZyb20gXCJzcmMvbWFpblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbGVQcm9wZXJ0eU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcGx1Z2luOiBOb3ZlbFBsdWdpbjtcclxuXHJcbiAgICAvLyBDb25zdGFudGUgZGUgY2xhc3NlIHBvdXIgbGEgcmVnZXhcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IEZST05UTUFUVEVSX1JFR0VYID0gL14tLS1cXG4oW1xcc1xcU10qPylcXG4tLS0vO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHBsdWdpbjogTm92ZWxQbHVnaW4pIHtcclxuICAgICAgICBGaWxlUHJvcGVydHlNYW5hZ2VyLnBsdWdpbiA9IHBsdWdpbjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNw6l0aG9kZSBwb3VyIGxpcmUgdW5lIHByb3ByacOpdMOpIHNww6ljaWZpcXVlIGRhbnMgbGUgZnJvbnRtYXR0ZXJcclxuICAgIHN0YXRpYyBhc3luYyByZWFkUHJvcGVydHkoZmlsZTogVEZpbGUsIHByb3BlcnR5TmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmcgfCBzdHJpbmcgW10gfCB1bmRlZmluZWQ+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAvLyBMaXJlIGxlIGNvbnRlbnUgZHUgZmljaGllciB2aWEgY2FjaGVkUmVhZFxyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgRmlsZVByb3BlcnR5TWFuYWdlci5wbHVnaW4uYXBwLnZhdWx0LmNhY2hlZFJlYWQoZmlsZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBcHBlbGVyIHJlYWRGcm9udE1hdHRlciBwb3VyIGV4dHJhaXJlIGxlIGZyb250bWF0dGVyXHJcbiAgICAgICAgICAgIGNvbnN0IGZyb250bWF0dGVyID0gYXdhaXQgRmlsZVByb3BlcnR5TWFuYWdlci5yZWFkRnJvbnRNYXR0ZXIoY29udGVudCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoZnJvbnRtYXR0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbcmVhZFByb3BlcnR5XSBDb250ZW51IDpgLCBwcm9wZXJ0eU5hbWUsIFwiID0gXCIsIGZyb250bWF0dGVyW3Byb3BlcnR5TmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyb250bWF0dGVyW3Byb3BlcnR5TmFtZV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkF1Y3VuIGZyb250bWF0dGVyIHRyb3V2w6kgZGFucyBsZSBmaWNoaWVyLlwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycmV1ciBsb3JzIGRlIGxhIGxlY3R1cmUgZHUgZmljaGllciBvdSBkdSBwYXJzaW5nIFlBTUwgOlwiLCBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBNw6l0aG9kZSBwb3VyIGxpcmUgbGUgZnJvbnRtYXR0ZXIgZXQgbGUgcGFyc2VyXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyByZWFkRnJvbnRNYXR0ZXIoY29udGVudDogc3RyaW5nKTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgbnVsbD4ge1xyXG4gICAgICAgIGNvbnN0IHlhbWxNYXRjaCA9IGNvbnRlbnQubWF0Y2goRmlsZVByb3BlcnR5TWFuYWdlci5GUk9OVE1BVFRFUl9SRUdFWCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gU2kgdW4gYmxvYyBZQU1MIGVzdCB0cm91dsOpLCBvbiBsZSBwYXJzZSBldCBvbiByZXRvdXJuZSB1biBvYmpldFxyXG4gICAgICAgIGlmICh5YW1sTWF0Y2gpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZyb250bWF0dGVyID0geWFtbC5sb2FkKHlhbWxNYXRjaFsxXSkgYXMgUmVjb3JkPHN0cmluZywgYW55PjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmcm9udG1hdHRlcjtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZHUgcGFyc2luZyBZQU1MIGR1IGZyb250bWF0dGVyIDpcIiwgZXJyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIE3DqXRob2RlIHBvdXIgbWV0dHJlIMOgIGpvdXIgdW5lIHByb3ByacOpdMOpIGRhbnMgbGUgZnJvbnRtYXR0ZXJcclxuICAgIHN0YXRpYyBhc3luYyB1cGRhdGVQcm9wZXJ0eShmaWxlOiBURmlsZSwga2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmcgW10gfCBib29sZWFuKSB7XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IGF3YWl0IEZpbGVQcm9wZXJ0eU1hbmFnZXIucGx1Z2luLmFwcC52YXVsdC5yZWFkKGZpbGUpO1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRDb250ZW50ID0gRmlsZVByb3BlcnR5TWFuYWdlci5tb2RpZnlGcm9udG1hdHRlcihjb250ZW50LCBrZXksIHZhbHVlKTtcclxuICAgICAgICBhd2FpdCBGaWxlUHJvcGVydHlNYW5hZ2VyLnBsdWdpbi5hcHAudmF1bHQubW9kaWZ5KGZpbGUsIHVwZGF0ZWRDb250ZW50KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhgW3VwZGF0ZVByb3BlcnR5XSBDb250ZW51IGFwcsOocyBtaXNlIMOgIGpvdXIgOmAsIHVwZGF0ZWRDb250ZW50KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbW9kaWZ5RnJvbnRtYXR0ZXIoY29udGVudDogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdIHwgYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgeWFtbE1hdGNoID0gY29udGVudC5tYXRjaChGaWxlUHJvcGVydHlNYW5hZ2VyLkZST05UTUFUVEVSX1JFR0VYKTtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgbmV3Q29udGVudCA9IGNvbnRlbnQ7XHJcbiAgICAgICAgaWYgKHlhbWxNYXRjaCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZnJvbnRtYXR0ZXIgPSB5YW1sLmxvYWQoeWFtbE1hdGNoWzFdKSBhcyBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAvLyBTaSBsYSB2YWxldXIgZXN0IHZpZGUgb3UgdW4gdGFibGVhdSB2aWRlLCBvbiBzdXBwcmltZSBsYSBjbMOpXHJcbiAgICAgICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPT09IG51bGwgfHwgXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9PT0gXCJcIiB8fCBcclxuICAgICAgICAgICAgICAgICAgICAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGZyb250bWF0dGVyW2tleV07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbm9uLCBvbiBtZXQgw6Agam91ciBsYSBwcm9wcmnDqXTDqVxyXG4gICAgICAgICAgICAgICAgICAgIGZyb250bWF0dGVyW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gVsOpcmlmaWVyIHNpIGxlIGZyb250bWF0dGVyIGVzdCBkw6lzb3JtYWlzIHZpZGVcclxuICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhmcm9udG1hdHRlcikubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU3VwcHJpbWVyIGVudGnDqHJlbWVudCBsZSBibG9jIFlBTUxcclxuICAgICAgICAgICAgICAgICAgICBuZXdDb250ZW50ID0gY29udGVudC5yZXBsYWNlKEZpbGVQcm9wZXJ0eU1hbmFnZXIuRlJPTlRNQVRURVJfUkVHRVgsIFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVnw6luw6lyZXIgbGUgYmxvYyBZQU1MIGF2ZWMganMteWFtbFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1lhbWwgPSB5YW1sLmR1bXAoZnJvbnRtYXR0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0NvbnRlbnQgPSBjb250ZW50LnJlcGxhY2UoRmlsZVByb3BlcnR5TWFuYWdlci5GUk9OVE1BVFRFUl9SRUdFWCwgYC0tLVxcbiR7bmV3WWFtbH1cXG4tLS1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyZXVyIGxvcnMgZHUgcGFyc2luZyBvdSBkZSBsYSBtb2RpZmljYXRpb24gZHUgZnJvbnRtYXR0ZXIgOlwiLCBlcnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gU2kgYXVjdW4gZnJvbnRtYXR0ZXIgZXQgcXVlIGxhIHZhbGV1ciBlc3QgdmFsaWRlLCBlbiBjcsOpZXIgdW5cclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IFwiXCIgJiYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZS5sZW5ndGggPiAwKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3WWFtbCA9IHlhbWwuZHVtcCh7IFtrZXldOiB2YWx1ZSB9KTtcclxuICAgICAgICAgICAgICAgIG5ld0NvbnRlbnQgPSBgLS0tXFxuJHtuZXdZYW1sfVxcbi0tLVxcbmAgKyBjb250ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIG5ld0NvbnRlbnQ7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=