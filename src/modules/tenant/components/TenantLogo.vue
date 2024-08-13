<template>
    <div>
        <v-row>
            <v-col col="12" class="text-center">
                <p>Vamos definir seu Logo</p>
            </v-col>
            <v-col cols="12">
                <v-sheet :height="height" :min-height="minHeight" :width="width" :color="color" @click="click"
                    :border="border" :rounded="rounded" @drop.stop.prevent="drop" @paste.stop.prevent="paste"
                    @dragover.stop.prevent="" :class="class" class="d-flex align-center justify-center pointer">
                    <slot name="title">
                        <div class="d-flex justify-center align-center">
                            <v-icon>mdi-cloud-upload-outline</v-icon>
                            <span class="ml-2">{{ title }}</span>
                        </div>
                    </slot>
                    <v-file-input :modelValue="tenant.logo" style="display: none" :rules="[required]"
                        hide-details="auto" ref="fileInput" @change="onFilePicked" accept="image/*">
                    </v-file-input>
                    <!-- <input type="file" id="file" ref="fileInput" style="display: none" /> -->
                </v-sheet>
                <template v-if="errors.length || fileInputErrors.length">
                    <p class="text-caption text-error text-center"
                        v-for="(  error, index  ) in [...errors, ...fileInputErrors]" :key="index"> {{ error }}
                    </p>
                </template>
            </v-col>
            <v-col cols="12" v-if="previewUrl">
                <v-img :src="previewUrl" height="200"></v-img>
            </v-col>
        </v-row>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { required } from '@/rules';

interface Props {
    modelValue: Tenant
    title?: string
    color?: string
    border?: boolean | string
    rounded?: boolean | string,
    minHeight?: string | number
    height?: string | number
    width?: string | number
    class?: string,
    max_files?: number
    max_size?: number
}

interface Emits {
    (event: 'update:modelValue', value: Tenant): void
}


const props = withDefaults(defineProps<Props>(), {
    title: 'Arraste ou selecione um arquivo',
    color: 'surface',
    border: true,
    rounded: true,
    minHeight: '120px',
    height: undefined,
    width: undefined,
    class: '',
})

const emit = defineEmits<Emits>()

const previewUrl = ref<string | null>(null);

const fileInput = ref()

const errors = ref<string[]>([])

const tenant = computed<Tenant>({
    get() {
        return props.modelValue
    },
    set(value: Tenant) {
        emit('update:modelValue', value)
    }
})

const fileInputErrors = computed(() => {
    if (fileInput.value) {
        return fileInput.value.errorMessages
    }
    return []
})

function setFile(file: File) {
    tenant.value.logo = file
    previewUrl.value = URL.createObjectURL(file);
}

function click() {
    fileInput.value.click()
}

function drop(event: any) {
    errors.value = []
    const { items } = event.dataTransfer;
    const files = Object.values(items).map((item: any) => item.getAsFile())
    if (files.length > 1) {
        errors.value.push('Selecione apenas um arquivo')
        return
    }
    setFile(files[0]);

}

function paste(event: any) {
    errors.value = []
    const { files } = event.clipboardData;
    if (files.length > 1) {
        errors.value.push('Selecione apenas um arquivo')
        return
    }
    setFile(files[0]);
}

function onFilePicked(event: any) {
    errors.value = []
    const { files } = event.target;
    setFile(files[0]);
}

</script>
<style lang="scss" scoped></style>