<template>
  <v-row>
    <v-col cols="auto" v-for="trait in traits" :key="trait">
      <v-switch
        :label="trait.description"
        :model-value="trait.enabled"
        :true-value="true"
        :false-value="false"
        @click="traitChange(trait)"
        />
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  screenTraits: ScreenTrait[];
  screenTotemTraits: ScreenTotemTrait[];
  screenTotem: ScreenTotem;
}

const props = defineProps<Props>();

interface ScreenTraitWithEnabled extends ScreenTrait{
  enabled: boolean;
}
const traits = computed(():ScreenTraitWithEnabled[] => {
  return props.screenTraits.map((trait) => {
    return {
      ...trait,
      enabled: props.screenTotemTraits.some((screenTotemTrait) => {
        return screenTotemTrait.trait_id == trait.id && screenTotemTrait.enabled == 1;
      }),
    }
  });
});
function traitChange(trait: ScreenTraitWithEnabled) {
  const index = props.screenTotemTraits.findIndex((screenTotemTrait) => {
    return screenTotemTrait.trait_id === trait.id;
  });
  if (index !== -1) {
    if(props.screenTotemTraits[index].enabled == 1)
      props.screenTotemTraits[index].enabled = 0;
    else
      props.screenTotemTraits[index].enabled = 1;
  } else {
    props.screenTotemTraits.push({
      data:trait,
      trait_id: trait.id,
      enabled: 1,
      screen_totem_id: props.screenTotem.id,
    });
  }
}
</script>
