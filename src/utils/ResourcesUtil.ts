import * as fs from "fs";
import * as path from "path";
import { Plugin } from "obsidian";

export class ResourcesUtil {

    static copyResourcesModel(plugin: Plugin, modelid: string, vaultDir: string) {
        // resources directory
        const src = path.join(this.getPluginDir(plugin), "resources", "models", modelid);
        
        // vault directory
        const vaultBasePath = (plugin.app.vault.adapter as any).getBasePath();
        const dest = `${vaultBasePath}/${vaultDir}`;
      
        this.copyDirectory(src, dest);
    }


    static copyDirectory(src: string, dest: string) {
        try {
            // Créer le dossier de destination
            fs.mkdirSync(dest, { recursive: true });
            
            // Lire le contenu du dossier source
            const entries = fs.readdirSync(src, { withFileTypes: true });
    
            for (const entry of entries) {
                const srcPath = path.join(src, entry.name);
                const destPath = path.join(dest, entry.name);

                if (entry.isDirectory()) {
                    // Si c'est un répertoire, copier récursivement
                    this.copyDirectory(srcPath, destPath);
                } else if (entry.isFile()) {
                    // Si c'est un fichier, le copier
                    fs.copyFileSync(srcPath, destPath);
                }
            }
        } catch (error) {
            console.error(`Erreur lors de la copie du répertoire: ${error}`);
        }
    }
    
    static getPluginDir(plugin: Plugin): string {
        const basePath = (plugin.app.vault.adapter as any).getBasePath();
        if (plugin.manifest.dir) {
            return path.join(basePath, plugin.manifest.dir);
        } else {
            throw new Error("Le path du répertoire d'installation du plugin est introuvable.");
        }
    }
    
    static getModelResourcesPath(plugin: Plugin): string {
        return path.join(this.getPluginDir(plugin), "resources", "models", "novel");
    }


    static getUnknownImagePath(plugin: Plugin): string {
        return path.join(this.getPluginDir(plugin), "resources", "images", "unknown.jpg");
    }
}