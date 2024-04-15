<template>
    <v-progress-linear class="progress" height="6" v-model="porcentage" color="primary">
        <span class="font-weight-bold text-secondary text-h4" v-if="!hideNumber">
            {{ timer }}
        </span>
    </v-progress-linear>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, withDefaults, watch, defineExpose } from 'vue'

interface Props {
    time?: number
    hideNumber?: boolean
    startManual?: boolean
}

interface PropsWithDefaults extends Props {
    time: number
}

const props = withDefaults(defineProps<Props>(), {
    time: 15,
    hideNumber: false,
    startManual: false
})
const emit = defineEmits<{
    (event: 'end'): void
}>()

defineExpose({
    start
})

const timer = ref(props.time);
const interval = ref<any>();
const timeout = ref<any>();

watch(props, (current: PropsWithDefaults, old: PropsWithDefaults) => {
    if (current.time < old.time) return

    timer.value = props.time
    clearTime()
    start()
})

function clearTime() {
    clearInterval(interval.value)
    clearTimeout(timeout.value)
}

const porcentage = computed(() => (timer.value * 100) / props.time);

function start() {
    interval.value = setInterval(() => {
        timer.value--;
    }, 1000);

    timeout.value = setTimeout(() => {
        clearInterval(interval.value);
        emit('end');
    }, props.time * 1000);
}

onMounted(() => {
    if (props.startManual) return 
    
    start()
})

</script>

<style scoped>
.progress {
  transition: all 1s linear;
}
</style>