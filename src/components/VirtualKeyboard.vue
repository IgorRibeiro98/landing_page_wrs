<template>
    <div @pointerdown.prevent v-show="visible" style="width: 100%">
        <v-row v-if="type == 'email'">
            <v-col cols="12" class="d-flex justify-center">
                <v-chip-group column>
                    <v-chip v-for="(domain, index) in emailDomains" @click="input(domain)" :key="index" size="x-large"
                        color="secondary" class="text-h4">
                        {{ domain }}</v-chip>
                </v-chip-group>
            </v-col>
        </v-row>
        <v-row dense class="mt-1" v-for="(line, i) in keyboard" :key="i" justify="center">
            <v-col v-for="(item, j) in line" :key="j" :cols="item.col ?? 1">
                <keyboard-btn class="text-body-2" :rounded="settings.button.rounded" :variant="settings.button.variant"
                    :size="settings.button.size ?? 'small'" :key="j" :disabled="item.disabled" @click.native="
                        item.action ? item.action() : input(letter(item.value))
                        " v-ripple :color="item.color ?? settings.button.color" width="100%"
                    :height="settings.button.height ?? 80">
                    <v-icon v-if="item.icon" color="white" :icon="item.icon" size="50">
                    </v-icon>

                    <span v-else class="text-h4">
                        {{ item.action ? item.value : letter(item.value) }}
                    </span>
                </keyboard-btn>
            </v-col>
        </v-row>
    </div>
</template>
  
<style lang="scss"></style>
  
<script setup lang="ts">
interface Keyboard extends Array<Array<LineKeyboard>> { }

interface LineKeyboard {
    value?: string | number;
    color?: string;
    icon?: string;
    action?: () => any;
    disabled?: boolean;
    col?: number;
}

interface SpecialLineKeyboard {
    [key: string]: LineKeyboard;
}

import { ref, onUpdated, watch, computed, Ref } from 'vue';
import { useDisplay } from 'vuetify';

const upperCase = ref(true);
const visible = ref(false);

const { name } = useDisplay();

interface ButtonResponsiveSettings {
    [key: string]: {
        size?: string;
        height?: number;
    };
}

interface Settings {
    button: {
        color: string;
        rounded: boolean;
        variant: 'outlined';
        size?: string;
        height?: number;
    };
}

const emit = defineEmits(['open']);

const buttonResponsiveSettings: Ref<ButtonResponsiveSettings> = ref({
    xl: {},
    lg: {},
    md: {},
    sm: {
        height: 55,
    },
    xs: {
        height: 40,
    },
    xxl: {},
});

const buttonSettings = computed(() => {
    return buttonResponsiveSettings.value[name.value];
});

const settings: Ref<Settings> = ref({
    button: {
        color: 'secondary',
        rounded: false,
        variant: 'flat',
        ...buttonSettings.value,
    },
});

const toLetter = ref(false);

const emailDomains = [
    '@bol.com.br',
    '@globo.com',
    '@gmail.com',
    '@hotmail.com',
    '@icloud.com',
    '@ig.com.br',
    '@outlook.com',
    '@terra.com.br',
    '@uol.com.br',
    '@yahoo.com',
];

const actions: SpecialLineKeyboard = {
    clear: {
        icon: 'mdi-eraser',
        color: 'error',
        action: clear,
    },
    backspace: {
        icon: 'mdi-backspace-outline',
        color: 'primary',
        action: backspace,
    },
    moveLeft: {
        icon: 'mdi-chevron-left',
        color: 'primary',
        action() {
            moveCursor(-1);
        },
    },
    moveRight: {
        icon: 'mdi-chevron-right',
        color: 'primary',
        action() {
            moveCursor(1);
        },
    },
    shift: {
        icon: 'mdi-apple-keyboard-shift',
        action() {
            upperCase.value = !upperCase.value;
        },
    },
    toNumeric: {
        icon: 'mdi-numeric',
        color: 'primary',
        action() {
            keyboard.value = numericKeyboard;
            toLetter.value = true;
        },
    },
    toAccent: {
        value: 'ÁÁÁ',
        color: 'primary',
        action() {
            setKeyboard(accentKeyboard);
        },
    },
    toSpecial: {
        value: '@_-',
        color: 'primary',
        action() {
            setKeyboard(specialCharacters);
        },
    },
    space: {
        icon: 'mdi-keyboard-space',
        color: 'primary',
        col: 6,
        action: space,
    },
    continue: {
        value: 'Continuar',
        color: 'success',
        col: 2,
        action: enter,
    },
    toLetter: {
        icon: 'mdi-alphabetical-variant',
        color: 'primary',
        action() {
            keyboard.value = letterKeyboard;
        },
    },
};

const letterKeyboard: Keyboard = [
    [
        { value: 'q' },
        { value: 'w' },
        { value: 'e' },
        { value: 'r' },
        { value: 't' },
        { value: 'y' },
        { value: 'u' },
        { value: 'i' },
        { value: 'o' },
        { value: 'p' },
        { ...actions.clear },
    ],
    [
        { value: 'a' },
        { value: 's' },
        { value: 'd' },
        { value: 'f' },
        { value: 'g' },
        { value: 'h' },
        { value: 'j' },
        { value: 'k' },
        { value: 'l' },
        { value: 'ç' },
        { ...actions.backspace },
    ],
    [
        { ...actions.shift },
        { value: 'z' },
        { value: 'x' },
        { value: 'c' },
        { value: 'v' },
        { value: 'b' },
        { value: 'n' },
        { value: 'm' },
        { ...actions.moveLeft },
        { ...actions.moveRight },
    ],
    [
        { ...actions.toNumeric },
        { ...actions.toAccent },
        { ...actions.toSpecial },
        { ...actions.space },
        { ...actions.continue },
    ],
];

const numericKeyboard: Keyboard = [
    [
        { value: 1, col: 2 },
        { value: 2, col: 2 },
        { value: 3, col: 2 },
    ],
    [
        { value: 4, col: 2 },
        { value: 5, col: 2 },
        { value: 6, col: 2 },
    ],
    [
        { value: 7, col: 2 },
        { value: 8, col: 2 },
        { value: 9, col: 2 },
    ],
    [
        { ...actions.backspace, col: 2 },
        { value: 0, col: 2 },
        { ...actions.continue, col: 2 },
    ],
    [
        {
            ...actions.toLetter,
            col: 2,
        },
    ],
];

const accentKeyboard: Keyboard = [
    [
        { value: 'à' },
        { value: 'á' },
        { value: 'â' },
        { value: 'ã' },
        { value: 'ä' },
        { value: 'è' },
        { value: 'é' },
        { value: 'ê' },
        { value: 'ë' },
    ],
    [
        { value: 'ì' },
        { value: 'í' },
        { value: 'î' },
        { value: 'ï' },
        { value: 'ò' },
        { value: 'ó' },
        { value: 'ô' },
    ],
    [
        { ...actions.shift },
        { value: 'ù' },
        { value: 'ú' },
        { value: 'û' },
        { value: 'ü' },
        { value: 'õ' },
        { value: 'ö' },
        { ...actions.backspace },
    ],
    [
        { ...actions.toNumeric },
        { ...actions.toLetter },
        { ...actions.toSpecial },
        { ...actions.space },
        { ...actions.continue },
    ],
];

const specialCharacters: Keyboard = [
    [
        { value: '!' },
        { value: '@' },
        { value: '#' },
        { value: '$' },
        { value: '%' },
        { value: '&' },
        { value: '*' },
        { value: '(' },
        { value: ')' },
        { value: '-' },
        { ...actions.clear },
    ],
    [
        { value: '_' },
        { value: '=' },
        { value: '/' },
        { value: '\\' },
        { value: '<' },
        { value: '>' },
        { value: ':' },
        { value: '.' },
        { value: '+' },
        { value: '?' },
        { ...actions.backspace },
    ],
    [
        { value: '.com' },
        { value: '{' },
        { value: '}' },
        { value: '[' },
        { value: ']' },
        { value: '|' },
        { value: '"' },
        { value: "'" },
        { ...actions.moveLeft },
        { ...actions.moveRight },
    ],
    [
        { ...actions.toNumeric },
        { ...actions.toAccent },
        { ...actions.toLetter },
        { ...actions.space },
        { ...actions.continue },
    ],
];

const keyboard: Ref<any> = ref(letterKeyboard);

const type = ref<string | null>('text');

watch(name, () => {
    settings.value.button = {
        ...settings.value.button,
        ...buttonResponsiveSettings.value[name.value],
    };
});

document.addEventListener('focusin', ({ target }: FocusEvent) => {
    setDefaultKeyboard(target);
});

document.addEventListener('focusout', ({ target }) => {
    if (!(target instanceof HTMLInputElement)) return;

    target.scrollIntoView(false);
    return (visible.value = false);
});

onUpdated(() => {
    if (visible.value) return;
    setDefaultKeyboard(getActiveInputElement());
});

function setDefaultKeyboard(element: EventTarget | null) {
    if (!(element instanceof HTMLInputElement)) return;

    if (
        element.localName != 'input' ||
        element.getAttribute('keyboard') == 'false'
    )
        return;

    type.value = element.getAttribute('dtype');

    if (element.type == 'number' || element.getAttribute('number') != null)
        setKeyboard(numericKeyboard);
    else setKeyboard(letterKeyboard);

    emit('open', true);

    setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    visible.value = true;
}

function enter() {
    const element: HTMLInputElement | null = getActiveInputElement();

    if (!element) return;

    window.dispatchEvent(new CustomEvent('enter'));

    element.blur();
}

function input(letter: any): void {
    const element: any = getActiveInputElement();

    if (!element) return;

    element.type == 'number'
        ? inputNumber(letter, element)
        : inputLetter(letter, element);
}

function inputLetter(letter: string, element: HTMLInputElement): void {
    const { selectionStart, value }: any = element;

    let letterLength: number = 1;

    element.value =
        value.slice(0, selectionStart) + letter + value.slice(selectionStart);
    element.dispatchEvent(new InputEvent('input'));

    if (typeof letter == 'string') letterLength = letter.length;

    element.selectionStart = selectionStart + letterLength;
    element.selectionEnd = selectionStart + letterLength;

    if (letter == ' ') return;

    upperCase.value = false;
}

function inputNumber(number: number, element: HTMLInputElement): void {
    element.value += number;
    element.dispatchEvent(new InputEvent('input'));
}

function moveCursor(unit: number): void {
    const element = getActiveInputElement();

    if (!element) return;

    const { selectionStart, selectionEnd }: any = element;
    const isSelected = selectionStart != selectionEnd;

    if (isSelected) {
        const isNegative: boolean = Math.sign(unit) == -1;

        element.selectionStart = isNegative ? selectionStart : selectionEnd;
        element.selectionEnd = isNegative ? selectionStart : selectionEnd;
        return;
    }

    element.selectionStart = selectionStart + unit;
    element.selectionEnd = selectionStart + unit;
}

function setKeyboard(currentKeyboard: Keyboard) {
    keyboard.value = currentKeyboard;
}

function letter(letter: string | number): string | number {
    return typeof letter == 'string' && upperCase.value
        ? letter.toUpperCase()
        : letter;
}

function getActiveInputElement(): HTMLInputElement | null {
    const element: any = document.activeElement;

    if (element?.localName != 'input') return null;

    return element;
}

function clear(): void {
    const element = getActiveInputElement();

    if (!element) return;

    element.value = '';
    element.dispatchEvent(new InputEvent('input'));
}

function space(): void {
    upperCase.value = true;
    input(' ');
}

function backspace(): void {
    const element = getActiveInputElement();

    if (!element) return;

    if (element.type == 'number') backspaceNumber(element);

    const { selectionStart, selectionEnd, value }: any = element;

    if (!selectionStart && !selectionEnd) return;

    if (selectionStart != selectionEnd) return backspaceSelection(element);

    element.value =
        value.slice(0, selectionStart - 1) + value.slice(selectionStart);

    element.selectionStart = selectionStart - 1;
    element.selectionEnd = selectionStart - 1;

    element.dispatchEvent(new InputEvent('input'));
}

function backspaceNumber(element: HTMLInputElement) {
    element.value = element.value.slice(0, element.value.length - 1);
    element.dispatchEvent(new InputEvent('input'));
}

function backspaceSelection(element: HTMLInputElement): void {
    const { selectionStart, selectionEnd, value }: any = element;

    element.value = value.slice(0, selectionStart) + value.slice(selectionEnd);

    element.selectionStart = selectionStart;
    element.selectionEnd = selectionStart;

    element.dispatchEvent(new InputEvent('input'));
}
</script>
  