<template>
    <v-dialog v-model="display" persistent width="800">
        <v-sheet class="pa-5 text-secondary" width="800">
            <div class="d-flex justify-center flex-column align-center">
                <div class="d-flex justify-center text-h2 font-weight-bold">
                    {{ modelValue.title }}
                    <div style="display: flex">
                        <div class="dot dot1" style="">.</div>
                        <div class="dot dot2">.</div>
                        <div class="dot dot3">.</div>
                    </div>
                </div>

                <div class="text-body-1 mt-4">
                    {{ modelValue.text }}
                </div>
            </div>
        </v-sheet>
    </v-dialog>
</template>
  
<script lang="ts" setup>
const props = defineProps<{
    modelValue: {
        display: boolean;
        title: string;
        text: string;
    };
}>();

import { computed } from 'vue';

const display = computed({
    get() {
        return props.modelValue.display;
    },
    set(value: boolean) {
        if (value == false) props.modelValue.display = false
    },
});
</script>
  
<style scoped>
.image {
    animation: spin 2s infinite linear;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.dot {
    animation: bounce 0.5s infinite alternate;
}

.dot1 {
    animation-delay: 0.2s;
}

.dot2 {
    animation-delay: 0.4s;
}

.dot3 {
    animation-delay: 0.6s;
}

@keyframes bounce {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-2px);
    }
}
</style>
  