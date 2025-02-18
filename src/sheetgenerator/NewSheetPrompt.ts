import { App, Modal, Notice, Setting } from "obsidian";

export class NewSheetPrompt extends Modal {
  result: string | null = null;
  onSubmit: (input: string) => void;

  constructor(app: App, onSubmit: (input: string) => void) {
    super(app);
    this.onSubmit = onSubmit;
  }

  onOpen() {
    const { contentEl } = this;

    contentEl.createEl("h2", { text: "Nom de l'élément" });

    new Setting(contentEl)
      .setName("Nom")
      .setDesc("Entrez le nom de la fiche à créer")
      .addText((text) =>
        text.onChange((value) => {
          this.result = value.trim();
        })
      );

    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Créer")
          .setCta()
          .onClick(() => {
            if (this.result) {
              this.onSubmit(this.result);
              this.close();
            } else {
              new Notice("Le nom ne peut pas être vide !");
            }
          })
      )
      .addButton((btn) =>
        btn
          .setButtonText("Annuler")
          .onClick(() => {
            this.close();
          })
      );
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
