import { FormItem } from './FormItem';
export class FormParser {
    parse(source) {
        const formRoot = new FormItem('root', 'form', {}, []);
        let match;
        let remainingSource = source.trim();
        while ((match = FormParser.elementRegex.exec(remainingSource)) !== null) {
            const [_, id, type, options, childrenSource] = match;
            // Parsing des options (paires clé-valeur)
            const optionsObject = this.parseOptions(options);
            // Créer un FormItem pour chaque élément
            const formItem = new FormItem(id, type, optionsObject);
            // Si des enfants sont présents dans le bloc { ... }, on les parse récursivement
            if (childrenSource) {
                // Recursivement parser les enfants dans les blocs {}
                formItem.children = this.parse(childrenSource).children;
            }
            // Ajouter le formItem dans le formRoot (racine du formulaire)
            formRoot.children.push(formItem);
            // Mettre à jour le "remainingSource" pour ne pas parser plusieurs fois le même bloc
            remainingSource = remainingSource.slice(FormParser.elementRegex.lastIndex).trim();
            // Réinitialiser l'index de la regex pour qu'elle reparte du bon endroit
            FormParser.elementRegex.lastIndex = 0;
        }
        return formRoot;
    }
    // Méthode pour parser les options d'un élément (ex : label="Nom", options=["Masculin", "Féminin"])
    parseOptions(options) {
        const optionsObject = {};
        const optionPairs = options.split(';');
        optionPairs.forEach(pair => {
            const [key, value] = pair.split('=').map(str => str.trim());
            if (value.startsWith('[') && value.endsWith(']')) {
                // Si c'est un tableau, on le transforme en un tableau d'éléments
                optionsObject[key] = value.slice(1, -1).split(',').map(val => val.trim().replace(/"/g, ''));
            }
            else {
                optionsObject[key] = value.replace(/"/g, '');
            }
        });
        return optionsObject;
    }
}
// La regex générique pour capturer tous les éléments avec l'ID, type et options
FormParser.elementRegex = /(\w+)\s+(\w+)\s*\(([^)]*)\)\s*(\{([^}]*)\})?/g;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybVBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXJrZG93bi9wYXJzZXIvRm9ybVBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXRDLE1BQU0sT0FBTyxVQUFVO0lBSW5CLEtBQUssQ0FBQyxNQUFjO1FBQ2hCLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELElBQUksS0FBSyxDQUFDO1FBQ1YsSUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN0RSxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUVyRCwwQ0FBMEM7WUFDMUMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUVqRCx3Q0FBd0M7WUFDeEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztZQUV2RCxnRkFBZ0Y7WUFDaEYsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDakIscURBQXFEO2dCQUNyRCxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsUUFBUSxDQUFDO1lBQzVELENBQUM7WUFFRCw4REFBOEQ7WUFDOUQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFakMsb0ZBQW9GO1lBQ3BGLGVBQWUsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEYsd0VBQXdFO1lBQ3hFLFVBQVUsQ0FBQyxZQUFZLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVELG1HQUFtRztJQUNuRyxZQUFZLENBQUMsT0FBZTtRQUN4QixNQUFNLGFBQWEsR0FBMkIsRUFBRSxDQUFDO1FBQ2pELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN2QixNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDNUQsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDL0MsaUVBQWlFO2dCQUNqRSxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRyxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7O0FBbkRELGdGQUFnRjtBQUN4RCx1QkFBWSxHQUFHLCtDQUErQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9ybUl0ZW0gfSBmcm9tICcuL0Zvcm1JdGVtJztcclxuXHJcbmV4cG9ydCBjbGFzcyBGb3JtUGFyc2VyIHtcclxuICAgIC8vIExhIHJlZ2V4IGfDqW7DqXJpcXVlIHBvdXIgY2FwdHVyZXIgdG91cyBsZXMgw6lsw6ltZW50cyBhdmVjIGwnSUQsIHR5cGUgZXQgb3B0aW9uc1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgZWxlbWVudFJlZ2V4ID0gLyhcXHcrKVxccysoXFx3KylcXHMqXFwoKFteKV0qKVxcKVxccyooXFx7KFtefV0qKVxcfSk/L2c7XHJcbiAgICBcclxuICAgIHBhcnNlKHNvdXJjZTogc3RyaW5nKTogRm9ybUl0ZW0ge1xyXG4gICAgICAgIGNvbnN0IGZvcm1Sb290ID0gbmV3IEZvcm1JdGVtKCdyb290JywgJ2Zvcm0nLCB7fSwgW10pO1xyXG4gICAgICAgIGxldCBtYXRjaDtcclxuICAgICAgICBsZXQgcmVtYWluaW5nU291cmNlID0gc291cmNlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgd2hpbGUgKChtYXRjaCA9IEZvcm1QYXJzZXIuZWxlbWVudFJlZ2V4LmV4ZWMocmVtYWluaW5nU291cmNlKSkgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgY29uc3QgW18sIGlkLCB0eXBlLCBvcHRpb25zLCBjaGlsZHJlblNvdXJjZV0gPSBtYXRjaDtcclxuXHJcbiAgICAgICAgICAgIC8vIFBhcnNpbmcgZGVzIG9wdGlvbnMgKHBhaXJlcyBjbMOpLXZhbGV1cilcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uc09iamVjdCA9IHRoaXMucGFyc2VPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3LDqWVyIHVuIEZvcm1JdGVtIHBvdXIgY2hhcXVlIMOpbMOpbWVudFxyXG4gICAgICAgICAgICBjb25zdCBmb3JtSXRlbSA9IG5ldyBGb3JtSXRlbShpZCwgdHlwZSwgb3B0aW9uc09iamVjdCk7XHJcblxyXG4gICAgICAgICAgICAvLyBTaSBkZXMgZW5mYW50cyBzb250IHByw6lzZW50cyBkYW5zIGxlIGJsb2MgeyAuLi4gfSwgb24gbGVzIHBhcnNlIHLDqWN1cnNpdmVtZW50XHJcbiAgICAgICAgICAgIGlmIChjaGlsZHJlblNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbWVudCBwYXJzZXIgbGVzIGVuZmFudHMgZGFucyBsZXMgYmxvY3Mge31cclxuICAgICAgICAgICAgICAgIGZvcm1JdGVtLmNoaWxkcmVuID0gdGhpcy5wYXJzZShjaGlsZHJlblNvdXJjZSkuY2hpbGRyZW47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFqb3V0ZXIgbGUgZm9ybUl0ZW0gZGFucyBsZSBmb3JtUm9vdCAocmFjaW5lIGR1IGZvcm11bGFpcmUpXHJcbiAgICAgICAgICAgIGZvcm1Sb290LmNoaWxkcmVuLnB1c2goZm9ybUl0ZW0pO1xyXG5cclxuICAgICAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGUgXCJyZW1haW5pbmdTb3VyY2VcIiBwb3VyIG5lIHBhcyBwYXJzZXIgcGx1c2lldXJzIGZvaXMgbGUgbcOqbWUgYmxvY1xyXG4gICAgICAgICAgICByZW1haW5pbmdTb3VyY2UgPSByZW1haW5pbmdTb3VyY2Uuc2xpY2UoRm9ybVBhcnNlci5lbGVtZW50UmVnZXgubGFzdEluZGV4KS50cmltKCk7XHJcbiAgICAgICAgICAgIC8vIFLDqWluaXRpYWxpc2VyIGwnaW5kZXggZGUgbGEgcmVnZXggcG91ciBxdSdlbGxlIHJlcGFydGUgZHUgYm9uIGVuZHJvaXRcclxuICAgICAgICAgICAgRm9ybVBhcnNlci5lbGVtZW50UmVnZXgubGFzdEluZGV4ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtUm9vdDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNw6l0aG9kZSBwb3VyIHBhcnNlciBsZXMgb3B0aW9ucyBkJ3VuIMOpbMOpbWVudCAoZXggOiBsYWJlbD1cIk5vbVwiLCBvcHRpb25zPVtcIk1hc2N1bGluXCIsIFwiRsOpbWluaW5cIl0pXHJcbiAgICBwYXJzZU9wdGlvbnMob3B0aW9uczogc3RyaW5nKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uc09iamVjdDogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IG9wdGlvblBhaXJzID0gb3B0aW9ucy5zcGxpdCgnOycpO1xyXG5cclxuICAgICAgICBvcHRpb25QYWlycy5mb3JFYWNoKHBhaXIgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBwYWlyLnNwbGl0KCc9JykubWFwKHN0ciA9PiBzdHIudHJpbSgpKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoJ1snKSAmJiB2YWx1ZS5lbmRzV2l0aCgnXScpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBjJ2VzdCB1biB0YWJsZWF1LCBvbiBsZSB0cmFuc2Zvcm1lIGVuIHVuIHRhYmxlYXUgZCfDqWzDqW1lbnRzXHJcbiAgICAgICAgICAgICAgICBvcHRpb25zT2JqZWN0W2tleV0gPSB2YWx1ZS5zbGljZSgxLCAtMSkuc3BsaXQoJywnKS5tYXAodmFsID0+IHZhbC50cmltKCkucmVwbGFjZSgvXCIvZywgJycpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnNPYmplY3Rba2V5XSA9IHZhbHVlLnJlcGxhY2UoL1wiL2csICcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9uc09iamVjdDtcclxuICAgIH1cclxufVxyXG4iXX0=