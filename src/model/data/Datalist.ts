export class DataList {
    id: string;
    values: string[];

    isEqual(other: DataList): boolean {
        return this.id === other.id;
    }
}