<template>
  <component ref="el" :is="$attrs.is ?? 'div'">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import Sortable from 'sortablejs';
import { defineEmits, defineProps, onMounted, onUnmounted, ref, useAttrs, watchEffect } from 'vue';

interface Props {
  group?: string;
  animation?: number;
  options?: Record<string, unknown>;
}

interface Events {
  (evt: 'end', value: any): void;
  (evt: 'start', value: any): void;
  (evt: 'add', value: any): void;
  (evt: 'update', value: any): void;
  (evt: 'remove', value: any): void;
  (evt: 'sort', value: any): void;
  (evt: 'filter', value: any): void;
  (evt: 'clone', value: any): void;
}

const props = defineProps<Props>();
const attrs = useAttrs();
const emit = defineEmits<Events>();

const el = ref();
const sortable = ref<null| Sortable>(null);


const createSortable = () => {
  if(!el.value) return;

  if (sortable.value) {
    sortable.value?.destroy();
  }

  console.log({...attrs})
  sortable.value = Sortable.create(el.value.$el ?? el.value, {
    ...props.options,
    ...attrs,
    group: props.group,
    animation: props.animation,
    onStart: (evt: any) => emit('start', evt),
    onEnd: (evt: any) => emit('end', evt),
    onAdd: (evt: any) => emit('add', evt),
    onUpdate: (evt: any) => emit('update', evt),
    onRemove: (evt: any) => emit('remove', evt),
    onSort: (evt: any) => emit('sort', evt),
    onFilter: (evt: any) => emit('filter', evt),
    onClone: (evt: any) => emit('clone', evt)
  });
};

onMounted(() => {
  console.log(el.value.$el)
  createSortable();
});

watchEffect(() => {
  createSortable();
});

onUnmounted(() => {
  if (sortable.value) {
    sortable.value?.destroy();
  }
});
</script>
