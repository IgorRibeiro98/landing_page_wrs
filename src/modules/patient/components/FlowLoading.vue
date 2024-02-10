<template>
    <v-dialog v-model="display" persistent width="auto">
        <v-sheet width="auto" class="pa-4">
            <div :class="title" class="d-flex justify-center font-weight-bold">
                {{ modelValue.title }}
                <div class="d-flex">
                    <div class="dot dot1">.</div>
                    <div class="dot dot2">.</div>
                    <div class="dot dot3">.</div>
                </div>
            </div>

            <div :class="subtitle" v-html="modelValue.text"></div>
        </v-sheet>
    </v-dialog>
</template>
  
<script lang="ts" setup>
import { computed } from 'vue';
import useResponsive from '@patient/helpers/responsives';

const props = defineProps<{
    modelValue: {
        display: boolean;
        title: string;
        text: string;
    };
}>();

const { title, subtitle } = useResponsive()

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
  