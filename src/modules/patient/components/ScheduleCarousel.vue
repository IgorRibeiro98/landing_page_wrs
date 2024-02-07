<template>
    <div class="d-flex justify-end text-h5">
        {{ itemNumber }} / {{ schedules.length }}
    </div>
    <div class="d-flex align-center">
        <v-btn class="mr-2" icon="mdi-chevron-left" :color="disabledPrevious ? '' : 'primary'" :disabled="disabledPrevious">
        </v-btn>

        <v-carousel v-model="carousel" :show-arrows="false" hide-delimiters height="auto">
            <v-carousel-item v-for="(schedule, index) in schedules" :key="index">
                <ScheduleCard :schedule="schedule"></ScheduleCard>
            </v-carousel-item>
        </v-carousel>

        <v-btn class="ml-2" icon="mdi-chevron-right" :color="disabledNext ? '' : 'primary'" :disabled="disabledNext">
        </v-btn>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import ScheduleCard from './ScheduleCard.vue';

const props = defineProps<{
    modelValue: Agendamento[]
}>()

const emit = defineEmits(['update:modelValue'])

const schedules = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const itemNumber = computed(() => {
    return carousel.value + 1
})


const carousel = ref(0)

const disabledPrevious = computed(() => {
    return carousel.value === 0;
});

const disabledNext = computed(() => {
    return carousel.value === schedules.value.length - 1;
});
</script>