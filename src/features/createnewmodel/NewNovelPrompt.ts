import { Modal } from "obsidian";

export class NewNovelPrompt extends Modal {
  private resolve: (value: string | null) => void;

  constructor(app: any, resolve: (value: string | null) => void) {
    super(app);
    this.resolve = resolve;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "Nom du roman" });

    const input = contentEl.createEl("input", { type: "text", placeholder: "Saisissez un nom" });
    input.style.width = "100%";

    const submitButton = contentEl.createEl("button", { text: "Créer" });
    submitButton.style.marginTop = "10px";

    submitButton.onclick = () => {
      const value = input.value.trim();
      this.resolve(value || null); // Renvoie toute la chaîne
      this.close();
    };

    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        const value = input.value.trim();
        this.resolve(value || null); // Renvoie toute la chaîne
        this.close();
      }
    });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
