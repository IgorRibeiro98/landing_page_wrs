<template>
    <v-avatar color="primary" :size="size" :density="density">
        <span>
            {{ user?.name.split(' ').map((n) => n[0]).join('') }}
        </span>
        <v-tooltip v-if="showTooltip" activator="parent" location="top" content-class="bg-primary">
            <span>
                {{ user?.name }}
            </span>
        </v-tooltip>
    </v-avatar>
</template>
<script setup lang="ts">

interface Props {
    user?: User
    size?: string | number
    density?: 'default' | 'comfortable' | 'compact'
    showTooltip?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    size: 'default',
    density: 'default',
    showTooltip: false
})

</script>
<scoped scoped lang="scss"></scoped>