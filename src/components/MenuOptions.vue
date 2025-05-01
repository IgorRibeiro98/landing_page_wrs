<template>
  <v-menu v-if="showMenu">
    <template #activator="{ props }">
      <v-btn variant="plain" icon="mdi-dots-horizontal" v-bind="{...props, ...buttonProps}"></v-btn>
    </template>
    <v-list>
      <template v-for="item in filteredItems">
        <v-list-item
          :to="item.to"
          @click="item.action ? item.action(actionArgs): undefined"
          v-if="handleShow(item)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props<TArgs = any> {
  acl?: string;
  items?: MenuItem[];
  actionArgs?: TArgs;
  buttonProps?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  acl: "",
  actionArgs: undefined,
  buttonProps: () => ({})
});

const filteredItems = computed<MenuItem[]>(() => {
  return props.items.filter((item) => handleShow(item));
});

const showMenu = computed(() => {
  const hasItems = filteredItems.value.length > 0;
  return hasItems;
});

function handleShow(item: MenuItem) {
  const validations: boolean[] = [];

  if (item.show) {
    validations.push(item.show);
  }

  return validations.every((v) => v);
}
</script>
