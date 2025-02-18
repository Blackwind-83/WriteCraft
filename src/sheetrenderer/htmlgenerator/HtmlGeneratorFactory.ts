import { FormItem } from "../parser/WriteCraftItem";
import { FormHtmlGenerator } from "./FormHtmlGenerator";
import { CategoryHtmlGenerator } from "./CategoryHtmlGenerator";
import { RadioHtmlGenerator } from "./RadioHtmlGenerator";
import { TextHtmlGenerator } from "./TextHtmlGenerator";
import { CheckboxHtmlGenerator } from "./CheckboxHtmlGenerator";
import { DataListHtmlGenerator } from "./DataListHtmlGenerator";
import { ImageHtmlGenerator } from "./ImageHtmlGenerator";
import { TextAreaHtmlGenerator } from "./TextAreaHtmlGenerator";
import { ListHtmlGenerator } from "./ListHtmlGenerator";
import { HtmlGenerator } from "./HtmlGenerator";
import NovelPlugin from "src/main";
import { TFile } from "obsidian";

export class HtmlGeneratorFactory {
    static create(plugin: NovelPlugin, file: TFile, formItem: FormItem) : HtmlGenerator {
        switch (formItem.type) {
            case "form":
                return new FormHtmlGenerator(plugin, file,  formItem);
            case "category":
                return new CategoryHtmlGenerator(plugin, file,  formItem);
            case "datalist":
                return new DataListHtmlGenerator(plugin, file,  formItem);
            case "image":
                return new ImageHtmlGenerator(plugin, file,  formItem);
            case "text":
                return new TextHtmlGenerator(plugin, file,  formItem);
            case "textarea":
                return new TextAreaHtmlGenerator(plugin, file,  formItem);
            case "radio":
                return new RadioHtmlGenerator(plugin, file,  formItem);
            case "checkbox":
                return new CheckboxHtmlGenerator(plugin, file,  formItem);
            case "list":
                return new ListHtmlGenerator(plugin, file,  formItem);
            default:
                throw new Error(`Unknown form item type: ${formItem.type}`);
        }
    }
}
