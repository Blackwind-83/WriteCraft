import { Category } from "./Category";
import { DataList } from "./Datalist";

export class Concept {
  id: string;
  label: string;
  dirName: string;
  unknownImg: string;
  categories: Category[];
  datalists: DataList[];
}
