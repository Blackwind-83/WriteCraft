export class Utils {
    static addDebouncedEventListener(element: HTMLElement, event: string, callback: () => void, delay = 300) {
        let timer: number;
        element.addEventListener(event, () => {
            clearTimeout(timer);
            timer = window.setTimeout(callback, delay);
        });
    }
}