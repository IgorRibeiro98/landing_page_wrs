<template>
    <div class="text-end">
        <v-progress-linear class="progress" height="30" v-model="porcentage" color="primary">
            <span class="font-weight-bold text-secondary text-h4" v-if="!hideNumber">
                {{ timer }}
            </span>
        </v-progress-linear>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, withDefaults, watch } from 'vue'

interface Props {
    time?: number
    hideNumber?: boolean
}

interface PropsWithDefaults extends Props {
    time: number
}

const props = withDefaults(defineProps<Props>(), {
    time: 10,
    hideNumber: false,
})
const emit = defineEmits(['timerEnd'])

const timer = ref(props.time);
const interval = ref<any>();
const timeout = ref<any>();

watch(props, (current: PropsWithDefaults, old: PropsWithDefaults) => {
    if (current.time < old.time) return

    timer.value = props.time
    clearTime()
    startTimer()
})

function clearTime() {
    clearInterval(interval.value)
    clearTimeout(timeout.value)
}

const porcentage = computed(() => (timer.value * 100) / props.time);

function startTimer() {
    interval.value = setInterval(() => {
        timer.value--;
    }, 1000);

    timeout.value = setTimeout(() => {
        clearInterval(interval.value);
        emit('timerEnd');
    }, props.time * 1000);
}

onMounted(() => startTimer())

</script>