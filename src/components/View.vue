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
                <v-btn
                  v-if="authorization.acl(slugs)"
                  :icon="actionIcon"
                  v-bind="props"
                  class="ml-auto"
                ></v-btn>
              </template>
              <v-list>
                <template v-for="action in actions">
                  <v-list-item
                    :to="action.to"
                    @click="action.click"
                    v-if="authorization.acl(action.slug)"
                  >
                    <v-list-item-title>{{ action.title }}</v-list-item-title>
                  </v-list-item>
                </template>
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
import { computed } from 'vue';
import authorization from '@/plugins/authorization';

interface Action {
  title: string;
  click?: () => void;
  to?: any;
  slug: string;
}

interface Props {
  title: string;
  description?: string | null;
  enableAction?: boolean;
  actionIcon?: string;
  actions?: Action[];
}

const props = withDefaults(defineProps<Props>(), {
  enableAction: false,
  actions: () => [],
  actionIcon: "mdi-cog",
});

const slugs = computed(() => {
  return props.actions.map(action => action.slug).join('|')
})
</script>
