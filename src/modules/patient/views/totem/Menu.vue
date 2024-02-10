<template>
    <div class="d-flex align-center justify-center fill-height">
        <v-row justify="center" no-gutters>
            <v-col cols="12" class="">
                <p :class="title" class="text-center">
                    Selecione uma das opções abaixo.
                </p>
            </v-col>

            <v-col cols="4" class="mr-2 mt-2 d-flex justify-start flex-column" v-for="(queue, index) in totem.queues"
                :key="index">
                <v-sheet style="min-height: 140px" color="primary" v-ripple
                    class="text-center rounded d-flex justify-center align-center cursor-pointer"
                    @click="emit('next', null)" width="100%">
                    <div>
                        <p class="font-weight-bold responsive-fonts">{{ queue.name }}</p>
                        <v-icon :icon="queue.icon" size="60" />
                    </div>
                </v-sheet>

                <div class="d-flex" :class="{ 'py-2': !queue.description }">
                    <v-icon v-if="queue.description" size="x-large" icon="mdi-information" color="info" class="mr-2" />

                    <p v-if="queue.description" class="text-body text-secondary font-weight-bold text-h5"
                        v-html="queue.description">
                    </p>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import useResponsive from '@patient/helpers/responsives';

const { title } = useResponsive()

interface Props {
    modelValue: Data;
    totem: Totem
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'next', 'to', 'start']);

const data: any = computed({
    get() {
        return props.modelValue;
    },
    set() {
        emit('update:modelValue', data);
    },
});

</script>

<style scoped lang="scss">
.responsive-fonts {
    font-size: clamp(1rem, 2vw, 3rem) !important;
}

.cursor-pointer {
    cursor: pointer;
}
</style>