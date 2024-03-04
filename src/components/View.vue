<template>
  <v-sheet class="pa-4" rounded color="on-surface">
    <v-row no-gutters>
      <v-col cols="12">
        <slot name="title-prepend"></slot>
        <h1>
          <slot name="title">
            {{ title }}
          </slot>
        </h1>
        <slot name="title-append"></slot>
        <p>
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </v-col>
      <v-col cols="12">
        <slot></slot>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts" setup>
interface Props {
  title: string;
  description: string;
}
defineProps<Props>();
</script>
