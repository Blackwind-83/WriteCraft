import NovelPlugin from "src/main";
import { FormItem } from "../parser/WriteCraftItem";
import { HtmlGeneratorFactory } from "./HtmlGeneratorFactory";
import { TFile } from "obsidian";
import { WritecraftMode, WritecraftState } from "src/WritecraftState";

export enum HtmlMode {
    FORM,
    CARD
}

export abstract class HtmlGenerator {
    protected file: TFile;
    protected plugin: NovelPlugin;
    protected formItem: FormItem;
    protected children: HtmlGenerator[] = [];

    constructor(plugin: NovelPlugin, file: TFile, formItem: FormItem) {
        this.plugin = plugin;
        this.file = file;
        this.formItem = formItem;
        this.children = formItem.children.map(child => HtmlGeneratorFactory.create(plugin, file, child));
    }

    protected async generateChildren(): Promise<string> {
        const childrenHtml = await Promise.all(this.children.map(async child => await child.generate()));
        return childrenHtml.join('');
    }

    public async generate(): Promise<string> {
        let content;
        if (WritecraftState.getInstance().getMode() == WritecraftMode.FORM) {
            content = await this.generateForm();
        }
        else {
            content = await this.generateCard();
        }
        return content;
    }

    async initialize(html: HTMLElement): Promise<void> {
        if (WritecraftState.getInstance().getMode() == WritecraftMode.FORM) {
            this.initializeSelf(html);
            this.children.map(child => child.initialize(html));
        }
    }

    protected abstract initializeSelf(field: HTMLElement): Promise<void>;


    protected abstract generateForm(): Promise<string>;
    protected abstract generateCard(): Promise<string>;

}
