<template>
  <v-sheet color="surface" rounded ref="rootElement">
    <v-btn-group
      variant="text"
      density="comfortable"
      multiple
      class="bg-background rounded-s-0 w-100 overflow-auto"
    >
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props"> {{ activeTextButton?.label }} </v-btn>
        </template>

        <v-list ref="headersListElement">
          <v-list-item
            v-for="(btn, index) in textButtons"
            :key="index"
            :value="index"
            @click="btn.action()"
          >
            <v-list-item-title>{{ btn.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu>
        <template v-slot:activator="menu">
          <v-tooltip location="top" text="Cor do texto">
            <template #activator="{ props }">
              <v-btn
                variant="text"
                :color="color"
                v-bind="{ ...menu.props, ...props }"
                icon="mdi-format-text-variant"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </template>
        <v-color-picker
          ref="colorPickerElement"
          hide-inputs
          show-swatches
          v-model="color"
          mode="hex"
        ></v-color-picker>
      </v-menu>
      <v-tooltip
        location="top"
        v-for="(btn, index) in buttons"
        :key="index"
        :text="btn.description"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            @click="btn.action(btn.name)"
            :disabled="btn?.disabled ? btn.disabled() : false"
            :active="btn.active(btn.name, btn.options)"
            :icon="btn.icon"
          >
          </v-btn>
        </template>
      </v-tooltip>
      <v-menu v-for="group in buttonGroups">
        <template #activator="menu">
          <v-tooltip location="top" :text="group.name">
            <template #activator="{ props }">
              <v-btn v-bind="{ ...menu.props, ...props }" :icon="group.icon">
              </v-btn>
            </template>
          </v-tooltip>
        </template>
        <v-btn-toggle>
          <v-tooltip
            location="top"
            v-for="(btn, index) in group.buttons"
            :key="index"
            :text="btn.description"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                @click="btn.action(btn.name)"
                :disabled="btn?.disabled ? btn.disabled() : false"
                :active="btn.active(btn.name, btn.options)"
                :icon="btn.icon"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </v-btn-toggle>
      </v-menu>
    </v-btn-group>

    <v-progress-linear
      :indeterminate="true"
      v-show="isLoading"
    ></v-progress-linear>

    <editor-content :editor="editor" @drop="upload" name="teste" />

    <v-text-field
      v-model="content"
      @update:modelValue="reset"
      style="display: none"
    />

    <v-alert
      position="fixed"
      prominent
      location="right bottom"
      class="ma-4"
      density="comfortable"
      v-model="alert.show"
      :text="alert.text"
      type="warning"
      closable
    >
    </v-alert>
  </v-sheet>

  <input
    type="file"
    ref="fileInput"
    style="display: none"
    @change="handleFileUpload"
  />
</template>

<script lang="ts" setup>
import { Color } from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { computed, ref } from "vue";

// import { createFile } from '@/repositories/fileRepository';

interface Props {
  modelValue: string | null | undefined;
  placeholder?: string;
  hideDetails?: boolean | string;
  density?: string;
  variant?: string;
  flat?: boolean;
  name?: string;
  rules?: Array<() => boolean | string>;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
  (e: "click:outside", value: any): void;
}

interface Button {
  name: string;
  description: string;
  options?: object;
  icon: string;
  action: (name: string) => boolean;
  disabled?: () => boolean;
  active: (name: string, options?: object) => boolean;
}

interface ButtonGroup {
  name: string;
  icon: string;
  buttons: Button[];
}

const isLoading = ref(false);

const alert = ref({
  show: false,
  text: "",
});

const eventHandlers: any = {
  ClipboardEvent: getFormDataFromClipboard,
  DragEvent: getFormDataFromDrop,
  Event: getFormDataFromGenericEvent,
};

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

function reset() {
  editor.commands.clearContent();
}

const content = computed<string>({
  get() {
    return props.modelValue ?? "";
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});

const editor = new Editor({
  extensions: [
    StarterKit.configure({
      bulletList: {
        HTMLAttributes: {
          class: "li-margin",
        },
      },
    }),
    Underline,
    Image,
    Color,
    TextStyle,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
  ],
  editorProps: {
    attributes: {
      class: "pa-4 margin-1 rounded",
    },
  },
  content: content.value,
  onUpdate: () => {
    if (editor.getHTML()) content.value = editor.getHTML();
  },
});

const fileInput = ref();

const color = computed<string>({
  get() {
    return editor.getAttributes("textStyle").color;
  },
  set(value) {
    editor.chain().focus().setColor(value).run();
  },
});

const textButtons = [
  {
    name: "paragraph",
    label: "Normal",
    action: () => editor.chain().focus().setParagraph().run(),
    active: (name: string) => editor.isActive(name),
  },
  {
    name: "heading",
    label: "Título 1",
    options: {
      level: 1,
    },
    action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    active: (name: string, options: { level: number } | object = {}) =>
      editor.isActive(name, options),
  },
  {
    name: "heading",
    label: "Título 2",
    options: {
      level: 2,
    },
    action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    active: (name: string, options: { level: number } | object = {}) =>
      editor.isActive(name, options),
  },
  {
    name: "heading",
    label: "Título 3",
    options: {
      level: 3,
    },
    action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    active: (name: string, options: { level: number } | object = {}) =>
      editor.isActive(name, options),
  },
  {
    name: "heading",
    label: "Título 4",

    options: {
      level: 4,
    },
    action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
    active: (name: string, options: { level: number } | object = {}) =>
      editor.isActive(name, options),
  },
  {
    name: "heading",
    label: "Título 5",
    options: {
      level: 5,
    },
    action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
    active: (name: string, options: { level: number } | object = {}) =>
      editor.isActive(name, options),
  },
  {
    name: "heading",
    label: "Título 6",
    options: {
      level: 6,
    },
    action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
    active: (name: string, options: { level: number } | object = {}) =>
      editor.isActive(name, options),
  },
];

const activeTextButton = computed(() => {
  const activeBtn: any = textButtons.find((btn) => {
    return btn.active(btn.name, btn.options);
  });
  if (activeBtn) return activeBtn;

  return textButtons[0];
});

const buttons: Button[] = [
  {
    name: "bold",
    description: "Negrito",
    icon: "mdi-format-bold",
    action: () => editor.chain().focus().toggleBold().run(),
    disabled: () => !editor.can().chain().focus().toggleBold().run(),
    active: (name: string) => editor.isActive(name),
  },
  {
    name: "italic",
    description: "Itálico",
    icon: "mdi-format-italic",
    action: () => editor.chain().focus().toggleItalic().run(),
    disabled: () => !editor.can().chain().focus().toggleItalic().run(),
    active: (name: string) => editor.isActive(name),
  },
  {
    name: "underline",
    description: "Sublinhaddo",
    icon: "mdi-format-underline",
    action: () => editor.chain().focus().toggleUnderline().run(),
    disabled: () => false,
    active: (name: string) => editor.isActive(name),
  },
  // {
  //     name: 'image',
  //     description: 'Upload de imagem',
  //     icon: 'mdi-image-area',
  //     action: () => fileInput.value.click(),
  //     disabled: () => false,
  //     active: () => false,
  // },
  {
    name: "strike",
    description: "Tachado",
    icon: "mdi-format-strikethrough",
    action: () => editor.chain().focus().toggleStrike().run(),
    disabled: () => !editor.can().chain().focus().toggleStrike().run(),
    active: (name: string) => editor.isActive(name),
  },
  {
    name: "blockquote",
    description: "Citação",
    icon: "mdi-format-quote-open",
    action: () => editor.chain().focus().toggleBlockquote().run(),
    active: (name: string) => editor.isActive(name),
  },
];

const activeAlignmentIcon = computed(() => {
  if (editor.isActive({ textAlign: "justify" })) {
    return "mdi-format-align-justify";
  }
  if (editor.isActive({ textAlign: "center" })) {
    return "mdi-format-align-center";
  }
  if (editor.isActive({ textAlign: "right" })) {
    return "mdi-format-align-right";
  }

  return "mdi-format-align-left";
});

const activeCodeIcon = computed(() => {
  if (editor.isActive("codeBlock")) {
    return "mdi-code-tags";
  }

  if (editor.isActive("code")) {
    return "mdi-code-braces";
  }

  return "mdi-code-tags";
});

const activeListIcon = computed(() => {
  if (editor.isActive("bulletList")) {
    return "mdi-format-list-bulleted";
  }

  if (editor.isActive("orderedList")) {
    return "mdi-format-list-numbered";
  }

  return "mdi-format-list-bulleted";
});

const buttonGroups = computed<ButtonGroup[]>(() => {
  return [
    {
      name: "Alinhamento",
      icon: activeAlignmentIcon.value,
      buttons: [
        {
          name: "justify",
          description: "Justificado",
          icon: "mdi-format-align-justify",
          action: (name: string) =>
            editor.chain().focus().setTextAlign(name).run(),
          disabled: () => false,
          active: (name: string) => editor.isActive({ textAlign: name }),
        },
        {
          name: "left",
          description: "Alinhar à esquerda",
          icon: "mdi-format-align-left",
          action: (name: string = "") =>
            editor.chain().focus().setTextAlign(name).run(),
          disabled: () => false,
          active: (name: string) => editor.isActive({ textAlign: name }),
        },
        {
          name: "center",
          description: "Centralizado",
          icon: "mdi-format-align-center",
          action: (name: string) =>
            editor.chain().focus().setTextAlign(name).run(),
          disabled: () => false,
          active: (name: string) => editor.isActive({ textAlign: name }),
        },
        {
          name: "right",
          description: "Alinha à direita",
          icon: "mdi-format-align-right",
          action: (name: string) =>
            editor.chain().focus().setTextAlign(name).run(),
          disabled: () => false,
          active: (name: string) => editor.isActive({ textAlign: name }),
        },
      ],
    },
    {
      name: "Listas",
      icon: activeListIcon.value,
      buttons: [
        {
          name: "bulletList",
          description: "Lista com marcadores",
          icon: "mdi-format-list-bulleted",
          action: () => editor.chain().focus().toggleBulletList().run(),
          active: (name: string) => editor.isActive(name),
        },
        {
          name: "orderedList",
          description: "Lista numerada",
          icon: "mdi-format-list-numbered",
          action: () => editor.chain().focus().toggleOrderedList().run(),
          active: (name: string) => editor.isActive(name),
        },
      ],
    },
    {
      name: "Código",
      icon: activeCodeIcon.value,
      buttons: [
        {
          name: "code",
          description: "Código inline",
          icon: "mdi-code-braces",
          action: () => editor.chain().focus().toggleCode().run(),
          disabled: () => !editor.can().chain().focus().toggleCode().run(),
          active: (name: string) => editor.isActive(name),
        },
        {
          name: "codeBlock",
          description: "Bloco de código",
          icon: "mdi-code-tags",
          action: () => editor.chain().focus().toggleCodeBlock().run(),
          active: (name: string) => editor.isActive(name),
        },
      ],
    },

    {
      name: "Ações",
      icon: "mdi-dots-horizontal", // mdi-cog mdi-lightbulb-on,
      buttons: [
        {
          name: "clear marks",
          description: "Limpar formatação",
          icon: "mdi-format-clear",
          action: () => editor.chain().focus().unsetAllMarks().run(),
          active: () => false,
        },
        {
          name: "clear nodes",
          description: "Limpa todos os nós do editor",
          icon: "mdi-broom",
          action: () => editor.commands.clearContent(),
          active: () => false,
        },
        {
          name: "horizontal rule",
          description: "Linha horizontal",
          icon: "mdi-minus",
          action: () => editor.chain().focus().setHorizontalRule().run(),
          active: () => false,
        },
        {
          name: "hard break",
          description: "Quebra de linha",
          icon: "mdi-arrow-right-bold-box-outline",
          action: () => editor.chain().focus().setHardBreak().run(),
          active: () => false,
        },
        {
          name: "undo",
          description: "Desfazer",
          icon: "mdi-undo",
          action: () => editor.chain().focus().undo().run(),
          disabled: () => !editor.can().chain().focus().undo().run(),
          active: () => false,
        },
        {
          name: "redo",
          description: "Refazer",
          icon: "mdi-redo",
          action: () => editor.chain().focus().redo().run(),
          disabled: () => !editor.can().chain().focus().redo().run(),
          active: () => false,
        },
      ],
    },
  ];
});

function handleFileUpload(event: any) {
  upload(event);
}

function upload(event: any) {
  event.preventDefault();

  try {
    const handler = eventHandlers[event.constructor.name];

    if (!handler)
      throw `Não existe manipulador para o tipo de evento ${event.constructor.name}`;

    const formData = handler(event);

    isLoading.value = true;
    createFile(formData)
      .then((res) => {
        setImage(res.data.url);
      })
      .finally(() => (isLoading.value = false));
  } catch (exception: any) {
    alert.value = {
      show: true,
      text: exception,
    };

    setTimeout(() => (alert.value.show = false), 2000);
  }
}

function createFile(formData: any): Promise<any> {
  return new Promise((res) => {
    res({
      data: {
        url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstore.steampowered.com%2Fapp%2F374320%2FDARK_SOULS_III%2F%3Fl%3Dportuguese%26snr%3D1_1056_4__1057%26curator_clanid%3D27254015&psig=AOvVaw1NkpsiMxQ92VhIneMrbTMC&ust=1702668206834000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjdyMDTj4MDFQAAAAAdAAAAABAD",
      },
    });
  });
}

function setImage(url: string) {
  editor.chain().focus().setImage({ src: url }).run();
}

function getFormDataFromClipboard(event: ClipboardEvent) {
  const items = event.clipboardData?.items;

  if (!items) throw "Nenhum arquivo encotrado";

  const formData = new FormData();

  for (let index in items) {
    const item = items[index];

    if (item.kind === "file") {
      const blob = item.getAsFile();

      if (!blob) continue;

      if (!blob.type.startsWith("image"))
        throw "Não é possível anexar arquivos que não sejam imagens";

      formData.append("file", blob);

      return formData;
    }
  }
}

function getFormDataFromDrop(event: DragEvent) {
  const file = event.dataTransfer?.files[0];

  if (!file) throw "Nenhum arquivo encotrado";

  if (!file.type.startsWith("image"))
    throw "Não é possível anexar arquivos que não sejam imagensnn";

  const formData = new FormData();

  formData.append("file", file);

  return formData;
}

function getFormDataFromGenericEvent(event: any) {
  const file = event.target?.files[0];

  if (!file.type.startsWith("image"))
    throw "Não é possível anexar arquivos que não sejam imagens";

  const formData = new FormData();

  formData.append("file", file);

  return formData;
}
const rootElement = ref<null | HTMLElement>(null);
const headersListElement = ref<null | HTMLElement>(null);
const colorPickerElement = ref<null | HTMLElement>(null);
</script>

<style lang="scss">
.tiptap {
  > * + * {
    margin-top: 0.5rem;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.8);
    padding: 4px;
    color: #ffffff;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  .li-margin {
    margin-left: 20px;
  }
}

.tiptap {
  border: 1px solid rgb(var(--v-border-color)) !important;
}

.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
<style lang="scss" scoped></style>
