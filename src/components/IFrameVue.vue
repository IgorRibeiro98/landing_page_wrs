<template>
  <transition name="fade">
    <v-card
      v-if="showLoading && loading"
      variant="tonal"
      elevation="5"
      class="pa-5"
    >
      <slot name="loading" :loading="loading">
        <v-card
          variant="outlined"
          rounded="0"
          style="width: 800px; max-height: 1200px"
          class="mx-auto pa-10"
        >
          <v-card variant="outlined" rounded="0">
            <v-skeleton-loader
              v-for="n in 20"
              :type="n % 2 == 0 ? 'paragraph' : 'article'"
            ></v-skeleton-loader>
          </v-card>
        </v-card>
      </slot>
    </v-card>
  </transition>
  <iframe @load="loading = false" v-show="!loading" v-bind="$attrs"></iframe>
</template>
<script lang="ts" setup>
import { ref } from "vue";

interface Props {
  showLoading: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showLoading: true,
});

const loading = ref<boolean>(true);
</script>
