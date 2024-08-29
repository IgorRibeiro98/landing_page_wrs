<template>
    <v-avatar :color="color" :size="size" :density="density">
        <spa v-if="user.name">
            {{ user?.name.split(' ').slice(0,2).map((n: string) => n[0]).join('').toLocaleUpperCase() }}
        </spa>
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
}

const props = withDefaults(defineProps<Props>(), {
    size: 'default',
    density: 'default',
    showTooltip: false,
    color: 'primary'
})

</script>

<scoped scoped lang="scss">
</scoped>
