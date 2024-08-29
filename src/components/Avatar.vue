<template>
    <v-avatar :color="color" :size="size" :density="density">
        <span v-if="user.name" :class="initialsClass">
            {{ user?.name.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toLocaleUpperCase() }}
        </span>
        <v-tooltip v-if="showTooltip" activator="parent" location="top" :content-class="`bg-${color}`">
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
    color?: string
    initialsClass?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 'default',
    density: 'default',
    showTooltip: false,
    color: 'primary',
    initialsClass: ''
})

</script>

<scoped scoped lang="scss"></scoped>
