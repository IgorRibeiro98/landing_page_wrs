<template>
  <v-sheet class="pa-4" rounded color="on-surface">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="d-flex">
          <slot name="title-prepend"></slot>
          <h1>
            <slot name="title">
              {{ title }}
            </slot>
          </h1>
          <slot name="title-append"></slot>
          <slot name="action">
            <v-menu v-if="enableAction">
              <template #activator="{ props }">
                <v-btn :icon="actionIcon" v-bind="props" class="ml-auto"></v-btn>
              </template>
              <v-list>
                <v-list-item :to="action.to" v-for="action in actions" @click="action.click">
                  <v-list-item-title>{{ action.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </slot>
        </div>
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

interface Action {
  title: string;
  click?: () => void;
  to?: any,
}

interface Props {
  title: string;
  description: string;
  enableAction: boolean;
  actionIcon: string;
  actions: Action[];
}

const props = withDefaults(defineProps<Props>(), {
  enableAction: false,
  actions: () => [],
  actionIcon: "mdi-cog",
});

</script>
