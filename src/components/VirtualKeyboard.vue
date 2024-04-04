<template>
  <table
    style="border-spacing: 1.2em; margin: -1.2em;border-collapse: separate; font-size: 20px"
    @pointerdown.prevent
    v-show="visible"
  >
    <tr v-for="(line, i) in keyboard" :key="i">
      <td
        :colspan="item.col"
        :style="settings.button.style"
        v-for="(item, j) in line"
        :key="j"
      >
        <keyboard-btn
          v-if="item.show ?? true"
          class="keyboard-key text-center"
          width="100%"
          height="100%"
          v-bind="settings.button.props"
          :key="j"
          :disabled="item.disabled"
          @click.native="
            item.action ? item.action() : input(letter(item.value!))
          "
        >
          <v-icon v-if="item.icon" :icon="item.icon" size="30" />

          <span v-else class="text-h4">
            {{ item.action ? item.value : letter(item.value!) }}
          </span>
        </keyboard-btn>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
interface Keyboard extends Array<Array<LineKeyboard>> {}

interface LineKeyboard {
  value?: string | number;
  icon?: string;
  action?: () => any;
  disabled?: boolean;
  color?: string;
  col?: number
  show?: boolean
}

interface SpecialLineKeyboard {
  [key: string]: LineKeyboard;
}

import { onUpdated, ref, watch } from "vue";

const upperCase = ref(true);
const visible = ref(false);

interface Settings {
  button: {
    props: {
      color: string;
      rounded: boolean | string;
      variant: "outlined" | "tonal" | "elevated" | "flat" | "plain" | "text";
      size?: string;
    };
    style: string
  };
}

const props = defineProps<{
  modelValue?: boolean
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

watch(visible, (value: boolean) => {
  emit('update:modelValue', value)
})

const settings = ref<Settings>({
  button: {
    props: {
      color: "secondary",
      rounded: "lg",
      variant: "outlined",
      size: "small",
    },
    style: 'width: 72px; height:72px'
  },
});

const toLetter = ref(false);

const actions: SpecialLineKeyboard = {
  clear: {
    color: "error",
    value: "Limpar",
    action: clear,
  },
  backspace: {
    icon: "mdi-keyboard-backspace",
    color: "primary",
    action: backspace,
  },
  moveLeft: {
    icon: "mdi-chevron-left",
    color: "primary",
    action() {
      moveCursor(-1);
    },
  },
  moveRight: {
    icon: "mdi-chevron-right",
    color: "primary",
    action() {
      moveCursor(1);
    },
  },
  shift: {
    icon: "mdi-apple-keyboard-shift",
    action() {
      upperCase.value = !upperCase.value;
    },
  },
  toNumeric: {
    icon: "mdi-numeric",
    color: "primary",
    action() {
      keyboard.value = numericKeyboard;
      toLetter.value = true;
    },
  },
  toAccent: {
    value: "ÁÁÁ",
    color: "primary",
    action() {
      setKeyboard(accentKeyboard);
    },
  },
  toSpecial: {
    value: "@_-",
    color: "primary",
    action() {
      setKeyboard(specialCharacters);
    },
  },
  space: {
    icon: "mdi-keyboard-space",
    color: "primary",
    action: space,
  },
  continue: {
    value: "Continuar",
    color: "success",
    action: enter,
  },
  toLetter: {
    icon: "mdi-alphabetical-variant",
    color: "primary",
    action() {
      keyboard.value = letterKeyboard;
    },
  },
};

const letterKeyboard: Keyboard = [
  [
    { value: "q" },
    { value: "w" },
    { value: "e" },
    { value: "r" },
    { value: "t" },
    { value: "y" },
    { value: "u" },
    { value: "i" },
    { value: "o" },
    { value: "p" },
    { ...actions.clear },
  ],
  [
    { value: "a" },
    { value: "s" },
    { value: "d" },
    { value: "f" },
    { value: "g" },
    { value: "h" },
    { value: "j" },
    { value: "k" },
    { value: "l" },
    { value: "ç" },
    { ...actions.backspace },
  ],
  [
    { ...actions.shift },
    { value: "z" },
    { value: "x" },
    { value: "c" },
    { value: "v" },
    { value: "b" },
    { value: "n" },
    { value: "m" },
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
  {
      ...actions.clear,
      col: 2,
    },
    {
      ...actions.backspace,
      col: 1,
    },
  ],
  [
    {
      value: 1,
      col: 1,
    },
    {
      value: 2,
      col: 1,
    },
    {
      value: 3,
      col: 1,
    },
  ],
  [
    {
      value: 4,
      col: 1,
    },
    {
      value: 5,
      col: 1,
    },
    {
      value: 6,
      col: 1,
    },
  ],
  [
    {
      value: 7,
      col: 1,
    },
    {
      value: 8,
      col: 1,
    },
    {
      value: 9,
      col: 1,
    },
  ],
  [
    {
      show: false
    },
    {
      value: 0,
      col: 1,
    },
  ],
  // [
  //   {
  //     value: 0,
  //     col: 1,
  //   },
  //   {
  //     ...actions.clear,
  //     col: 2,
  //   },
  // ],
];

const accentKeyboard: Keyboard = [
  [
    { value: "à" },
    { value: "á" },
    { value: "â" },
    { value: "ã" },
    { value: "ä" },
    { value: "è" },
    { value: "é" },
    { value: "ê" },
    { value: "ë" },
  ],
  [
    { value: "ì" },
    { value: "í" },
    { value: "î" },
    { value: "ï" },
    { value: "ò" },
    { value: "ó" },
    { value: "ô" },
  ],
  [
    { ...actions.shift },
    { value: "ù" },
    { value: "ú" },
    { value: "û" },
    { value: "ü" },
    { value: "õ" },
    { value: "ö" },
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
    { value: "!" },
    { value: "@" },
    { value: "#" },
    { value: "$" },
    { value: "%" },
    { value: "&" },
    { value: "*" },
    { value: "(" },
    { value: ")" },
    { value: "-" },
    { ...actions.clear },
  ],
  [
    { value: "_" },
    { value: "=" },
    { value: "/" },
    { value: "\\" },
    { value: "<" },
    { value: ">" },
    { value: ":" },
    { value: "." },
    { value: "+" },
    { value: "?" },
    { ...actions.backspace },
  ],
  [
    { value: ".com" },
    { value: "{" },
    { value: "}" },
    { value: "[" },
    { value: "]" },
    { value: "|" },
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

const keyboard = ref<Keyboard>(numericKeyboard);

document.addEventListener("focusin", (event: FocusEvent) => {
  setDefaultKeyboard(event.target);
});

document.addEventListener("focusout", ({ target, relatedTarget }) => {
  if (!(target instanceof HTMLInputElement)) return;

  if (relatedTarget instanceof HTMLButtonElement) {
    setTimeout(() => {
      visible.value = false;
    }, 100);
    return;
  }

  target.scrollIntoView(false);

  return (visible.value = false);
});

onUpdated(() => {
  if (visible.value) return;
  setDefaultKeyboard(getActiveInputElement());
});

function setDefaultKeyboard(element: EventTarget | null) {
  if (!(element instanceof HTMLInputElement) || element?.localName != "input")
    return;

  if (element.type == "number" || element.getAttribute('number') != null) setKeyboard(numericKeyboard);
  else setKeyboard(letterKeyboard);

  setTimeout(() => {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 100);

  visible.value = true;
}

function enter() {
  const element: HTMLInputElement | null = getActiveInputElement();

  if (!element) return;

  window.dispatchEvent(new CustomEvent("enter"));

  element.blur();
}

function input(letter: any): void {
  const element: any = getActiveInputElement();

  if (!element) return;

  element.type == "number"
    ? inputNumber(letter, element)
    : inputLetter(letter, element);
}

function inputLetter(letter: string, element: HTMLInputElement): void {
  const { selectionStart, value }: any = element;

  let letterLength: number = 1;

  element.value =
    value.slice(0, selectionStart) + letter + value.slice(selectionStart);
  element.dispatchEvent(new InputEvent("input"));

  if (typeof letter == "string") letterLength = letter.length;

  element.selectionStart = selectionStart + letterLength;
  element.selectionEnd = selectionStart + letterLength;

  if (letter == " ") return;

  upperCase.value = false;
}

function inputNumber(number: number, element: HTMLInputElement): void {
  element.value += number;
  element.dispatchEvent(new InputEvent("input"));
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
  return typeof letter == "string" && upperCase.value
    ? letter.toUpperCase()
    : letter;
}

function getActiveInputElement(): HTMLInputElement | null {
  const element: any = document.activeElement;

  if (element?.localName != "input") return null;

  return element;
}

function clear(): void {
  const element = getActiveInputElement();

  if (!element) return;

  element.value = "";
  element.dispatchEvent(new InputEvent("input"));
}

function space(): void {
  upperCase.value = true;
  input(" ");
}

function backspace(): void {
  const element = getActiveInputElement();

  if (!element) return;

  if (element.type == "number") backspaceNumber(element);

  const { selectionStart, selectionEnd, value }: any = element;

  if (!selectionStart && !selectionEnd) return;

  if (selectionStart != selectionEnd) return backspaceSelection(element);

  element.value =
    value.slice(0, selectionStart - 1) + value.slice(selectionStart);

  element.selectionStart = selectionStart - 1;
  element.selectionEnd = selectionStart - 1;

  element.dispatchEvent(new InputEvent("input"));
}

function backspaceNumber(element: HTMLInputElement) {
  element.value = element.value.slice(0, element.value.length - 1);
  element.dispatchEvent(new InputEvent("input"));
}

function backspaceSelection(element: HTMLInputElement): void {
  const { selectionStart, selectionEnd, value }: any = element;

  element.value = value.slice(0, selectionStart) + value.slice(selectionEnd);

  element.selectionStart = selectionStart;
  element.selectionEnd = selectionStart;

  element.dispatchEvent(new InputEvent("input"));
}
</script>

<style lang="scss">
.keyboard-key {
  transition: border 1s, color 1s;
  border: rgb(var(--v-theme-keyboard)) 2px solid !important;
  color: rgb(var(--v-theme-keyboard)) !important;
  .text-h4 {
    transition: filter 2s;
    transition-delay: 2s; 
    filter: contrast(200%);
  }
}

.keyboard-key:active {
  border: rgb(var(--v-theme-primary)) 2px solid !important;
  color: rgb(var(--v-theme-primary)) !important;
  transition: none;
  filter: none;
}
</style>
