import { FieldParser } from "./FieldParser";
export class CategoryParser {
    static parse(source) {
        const categories = [];
        let match;
        while ((match = this.categoryRegex.exec(source)) !== null) {
            categories.push({
                name: match[1],
                fields: FieldParser.parse(match[2]),
            });
        }
        return categories;
    }
}
CategoryParser.categoryRegex = /\s*category\s*"([^"]+)"\s*\{([\s\S]+?)\n\s*\}/g;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnlQYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFya2Rvd24vcGFyc2VyL0NhdGVnb3J5UGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUMsTUFBTSxPQUFPLGNBQWM7SUFHdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFjO1FBQ3ZCLE1BQU0sVUFBVSxHQUFlLEVBQUUsQ0FBQztRQUNsQyxJQUFJLEtBQUssQ0FBQztRQUVWLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUN4RCxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUNaLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE1BQU0sRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQzs7QUFidUIsNEJBQWEsR0FBRyxnREFBZ0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vRm9ybUludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgRmllbGRQYXJzZXIgfSBmcm9tIFwiLi9GaWVsZFBhcnNlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENhdGVnb3J5UGFyc2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGNhdGVnb3J5UmVnZXggPSAvXFxzKmNhdGVnb3J5XFxzKlwiKFteXCJdKylcIlxccypcXHsoW1xcc1xcU10rPylcXG5cXHMqXFx9L2c7XHJcblxyXG4gICAgc3RhdGljIHBhcnNlKHNvdXJjZTogc3RyaW5nKTogQ2F0ZWdvcnlbXSB7XHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcmllczogQ2F0ZWdvcnlbXSA9IFtdO1xyXG4gICAgICAgIGxldCBtYXRjaDtcclxuXHJcbiAgICAgICAgd2hpbGUgKChtYXRjaCA9IHRoaXMuY2F0ZWdvcnlSZWdleC5leGVjKHNvdXJjZSkpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNhdGVnb3JpZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBtYXRjaFsxXSxcclxuICAgICAgICAgICAgICAgIGZpZWxkczogRmllbGRQYXJzZXIucGFyc2UobWF0Y2hbMl0pLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhdGVnb3JpZXM7XHJcbiAgICB9XHJcbn1cclxuIl19