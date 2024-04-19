<template>
    <v-row class="fill-height">
        <v-col cols="8" v-if="!$vuetify.display.smAndDown" class="d-flex align-center fill-height">
            <svg width="80%" height="100%" viewBox="0 0 1031 1149" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5" filter="url(#filter0_b_0_1)">
                    <ellipse cx="818" cy="588" rx="79" ry="80" style="fill: rgb(var(--v-theme-secondary));" />
                </g>
                <ellipse cx="292.5" cy="852" rx="292.5" ry="297" style="fill: rgb(var(--v-theme-secondary));" />
                <ellipse cx="854" cy="179.5" rx="177" ry="179.5" style="fill: rgb(var(--v-theme-secondary));" />
                <ellipse cx="82.0424" cy="83.2867" rx="82.0424" ry="83.2867"
                    transform="matrix(-1 0 0 1 490.887 247.084)"
                    style="fill: rgb(var(--v-theme-secondary));  filter: brightness(25%);" />
                <rect x="287.149" y="442.808" width="242.025" height="449.748" rx="73"
                    style="fill: rgb(var(--v-theme-secondary));  filter: brightness(25%);" />
                <ellipse cx="657.707" cy="245.696" rx="82.0424" ry="83.2867"
                    style="fill: rgb(var(--v-theme-secondary));  filter: brightness(25%);" />
                <rect x="536.011" y="373.402" width="242.025" height="449.748" rx="73"
                    style="fill: rgb(var(--v-theme-secondary));  filter: brightness(25%);" />
                <g opacity="0.5" filter="url(#filter1_b_0_1)">
                    <ellipse cx="832" cy="213" rx="39" ry="40"
                        style="fill: rgb(var(--v-theme-secondary)); filter: brightness(200%);" />
                </g>
                <g opacity="0.5" filter="url(#filter2_b_0_1)">
                    <ellipse cx="136" cy="356" rx="80" ry="81" style="fill: rgb(var(--v-theme-secondary));" />
                </g>
                <defs>
                    <filter id="filter0_b_0_1" x="729.417" y="498.417" width="177.167" height="179.167"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4.79167" />
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1" result="shape" />
                    </filter>
                    <filter id="filter1_b_0_1" x="788.25" y="168.25" width="87.5" height="89.5"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2.375" />
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1" result="shape" />
                    </filter>
                    <filter id="filter2_b_0_1" x="46.25" y="265.25" width="179.5" height="181.5"
                        filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="4.875" />
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_0_1" />
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_0_1" result="shape" />
                    </filter>
                </defs>
            </svg>

        </v-col>

        <v-col cols="12" md="4" class="d-flex align-center justify-center flex-column">
            <h1 class="mb-4">Bem-vindo!</h1>
            <div class="w-100" @click="$emit('next')">
                <v-btn block rounded color="primary">
                    Iniciar
                </v-btn>
            </div>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: "next"): void;
}>()
</script>