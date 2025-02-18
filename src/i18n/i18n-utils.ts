export type Language = "en" | "fr" | "es" | "de" | "it";

export function getTranslation(featureI18n: any, key: string): string {
  const language = getUserLanguage(); // On récupère la langue de l'utilisateur avec la méthode existante

  // Vérifier si la clé existe dans les traductions de la fonctionnalité
  const translation = featureI18n[key];
  if (!translation) {
    console.warn(`Clé de traduction manquante : ${key}`);
    return key; // Retourner la clé si la traduction est manquante
  }

  // Retourner la traduction dans la langue demandée, ou la version anglaise par défaut
  return translation[language] || translation["en"];
}

export function getUserLanguage(): Language {
  const language = navigator.language.slice(0, 2) as Language;
  const supportedLanguages: Language[] = ["en", "fr", "es", "de", "it"];
  return supportedLanguages.includes(language) ? language : "en";
}