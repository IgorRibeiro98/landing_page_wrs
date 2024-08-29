<template>
  <v-sheet class="pa-4" rounded color="on-surface">
    <v-row no-gutters>
      <v-col cols="auto" class="mr-4">
        <div class="d-flex">
          <slot name="title-prepend"></slot>
          <h1 class="d-flex justify-center">
            <v-icon v-if="icon" :icon="props.icon" class="mr-2"> </v-icon>
            <slot name="title">
              {{ title }}
            </slot>
          </h1>
          <slot name="title-append"></slot>
        </div>
      </v-col>
      <v-col cols="auto" class="ml-auto d-flex align-center">
        <v-btn
          v-if="
            btnActionText &&
            (btnActionAcl ? authorization.acl(btnActionAcl) : true)
          "
          :text="btnActionText"
          @click="emit('click:btnAction')"
          color="primary"
        ></v-btn>
        <slot name="action">
          <slot name="action-prepend"></slot>

          <v-menu v-if="enableAction">
            <template #activator="{ props }">
              <v-btn
                v-if="authorization.acl(slugs)"
                :icon="actionsIcon"
                v-bind="props"
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
      </v-col>
      <v-col cols="12">
        <p :class="{'mt-4': description}">
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </v-col>
      <v-col cols="12" class="mt-4">
        <slot></slot>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script lang="ts" setup>
import authorization from "@/plugins/authorization";
import { computed } from "vue";

interface Emit {
  (event: "click:btnAction"): void;
}

interface Action {
  title: string;
  click?: () => void;
  to?: any;
  slug: string;
}

interface Props {
  title: string;
  icon?: string;
  description?: string | null;
  btnActionText?: string;
  btnActionAcl?: string;
  enableAction?: boolean;
  actionsIcon?: string;
  actions?: Action[];
}

const props = withDefaults(defineProps<Props>(), {
  enableAction: false,
  actions: () => [],
  btnActionText: "",
  btnActionAcl: "",
  actionsIcon: "mdi-cog",
});

const emit = defineEmits<Emit>();
const slugs = computed(() => {
  return props.actions.map((action) => action.slug).join("|");
});
</script>
