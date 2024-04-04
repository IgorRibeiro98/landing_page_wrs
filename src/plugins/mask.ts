import { App, Directive } from 'vue';

const mask: Directive = {
    updated(el, binding): void {
        const pattern = binding.value;

        if (!pattern) return;

        const input = el.querySelector('input');
        const value = input.value.replace(/\D/g, '')

        if (input.value.length >= pattern.length) {
            input.value = input.value.substr(0, pattern.length)
            input.dispatchEvent(new Event('input'));
            return
        }

        let formatted = '';
        let valueIndex = 0;
        let patternIndex = 0;

        while (patternIndex < pattern.length && valueIndex < value.length) {
            if (pattern[patternIndex] === '#') {
                formatted += value[valueIndex];
                valueIndex++;
            } else
                formatted += pattern[patternIndex];

            patternIndex++;
        }

        formatted += value.substr(valueIndex);

        input.value = formatted;

        input.dispatchEvent(new Event('input'));

    }
}

export default {
    install(app: App): void {
        app.directive('mask', mask)
    }
}