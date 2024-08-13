<template>
  <transition name="fade">
    <v-card
      v-if="showLoading && loading"
      variant="tonal"
      elevation="5"
      class="pa-5 h-100"
    >
      <slot name="loading" :loading="loading">
        <v-card
          variant="outlined"
          rounded="0"
          class="mx-auto pa-10 h-100"
          style="width: 70%"
          
        >
          <v-card variant="outlined" class="h-100" rounded="0">
            <v-skeleton-loader
              v-for="n in 6"
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
