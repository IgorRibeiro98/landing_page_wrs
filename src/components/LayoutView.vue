<template>
    <v-sheet color="surface" rounded>
        <v-row>
            <v-col class="d-flex align-center">
                <h1>
                    <slot name="title">
                        <v-icon :icon="props.icon">

                        </v-icon>

                        {{ props.title }}
                    </slot>
                </h1>

                <v-spacer></v-spacer>

                <slot name="action">

                </slot>
            </v-col>

            <v-col cols="12">
                <slot name="content">
                </slot>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script lang="ts" setup>

const props = defineProps<{
    icon: string,
    title: string,
}>()
</script>