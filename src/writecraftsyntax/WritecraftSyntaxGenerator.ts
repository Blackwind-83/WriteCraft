import { Concept } from "src/model/data/Concept";
import { Model } from "src/model/data/Model";

export class WritecraftSyntaxGenerator {

    static generate(model: Model, concept: Concept): string {
        let md = `\`\`\` writecraft\n`;
        
        // formulaire
        md += `${concept.id}_form form ( label="${concept.label}" )\n{\n`;
        
        // Génération des datalists de concept
        model.concepts.forEach(concept2 =>{
            md += `    ~${concept2.id} datalist ( tag="${concept2.id}" )\n`;
        });

        // Génération des datalists de valeurs
        concept.datalists.forEach(datalist => {
            if (datalist.values && datalist.values.length > 0) {
                md += `    ${datalist.id} datalist ( values=[${datalist.values.map(v => `"${v}"`).join(", ")}] )\n`;
            }
        });
        
        // Génération de l'image
        md += `\n    ${model.id}_image image (source="_images" ; default="_writecraft/${concept.unknownImg}")\n\n`;
        
        // Génération des catégories
        concept.categories.forEach(category => {
            md += `    ${category.id}_cat category ( label="${category.label}" )\n    {\n`;
            
            category.properties.forEach(property => {
                if (property.type == "textarea" || property.type == "list") {
                    let propertyLine = `        ${property.id} ${property.type} (label="${property.label}"`;
                    
                    if (property.values && property.values.length > 0) {
                        propertyLine += ` ; options=[${property.values.map(v => `"${v}"`).join(", ")}]`;
                    }
                    
                    if (property.source) {
                        propertyLine += ` ; datalist="${property.source}"`;
                    }
                    
                    propertyLine += `)`;
                    md += propertyLine + "\n";
                }
            });
            
            md += `    }\n\n`;
        });
        
        md += `}`;
        md += `\n\`\`\`\n`;
        
        return md;
    }
}


