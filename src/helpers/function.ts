export function debounce(callback: Function, delay: number = 500) {
    let timerId: number | undefined;

    return function (...args: any) {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            callback(...args)
            timerId = undefined;
        }, delay);
    };
}