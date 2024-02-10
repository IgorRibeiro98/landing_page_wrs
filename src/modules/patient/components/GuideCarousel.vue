<template>
    <div class="fill-height" style="overflow: scroll">
        <div class="d-flex justify-end text-h5">
            {{ itemNumber }} / {{ urls.length }}
        </div>

        <div class="d-flex align-center fill-height" style="overflow: scroll;">
            <v-btn :color="disabledPrevious ? '' : 'primary'" size="large" icon="mdi-chevron-left" class="mr-2"
                @click="carousel--" :disabled="disabledPrevious">
            </v-btn>

            <v-carousel class="fill-height" :show-arrows="false" hide-delimiters hide-delimiter-background
                v-model="carousel">
                <v-carousel-item v-for="(url, index) in urls" :key="index">
                    <IframeVue :src="url + '?page=hsn#toolbar=0'" width="100%" height="100%" style="border: none;">
                    </IframeVue>
                </v-carousel-item>
            </v-carousel>
            <v-btn :color="disabledNext ? '' : 'primary'" size="large" icon="mdi-chevron-right" :disabled="disabledNext"
                class="ml-2" @click="carousel++">
            </v-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import IframeVue from '@/components/IFrameVue.vue'

interface Props {
    urls: any[];
}

const props = defineProps<Props>();
const carousel = ref(0);

const urls = computed(() => {
    return props.urls;
});

const itemNumber = computed(() => {
    return carousel.value + 1
})

const disabledNext = computed(() => {
    return carousel.value === urls.value.length - 1;
});

const disabledPrevious = computed(() => {
    return carousel.value === 0;
});
</script>
