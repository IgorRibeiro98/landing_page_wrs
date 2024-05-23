<template>
    <v-list-group v-if="item.items" :fluid="rail">
        <template #activator="{ props }">
            <v-list-item :title="item.title" v-if="item.acl ? authorization.acl(item.acl) : true" v-bind="props"
                :active="checkActive(item.route.name)">
                <v-tooltip v-if="rail" activator="parent" location="top" content-class="bg-nav-color">
                    <span>
                        {{ item.title }}
                    </span>
                </v-tooltip>
                <template #prepend="{ isActive }">
                    <v-icon size="24" :color="isActive ? 'white' : undefined">{{
        item.icon
    }}</v-icon>
                </template>
                <template #title>
                    <span :class="{
            'font-weight-semi-bold': checkActive(item.route.name),
        }">{{ item.title }}</span>
                </template>
            </v-list-item>
        </template>
        <DrawerItem :item="sub" v-for="sub in item.items" :rail="rail" />
    </v-list-group>
    <v-list-item :active="checkActive(item.route.name)" :title="item.title" @click="$router.push(item.route)"
        value="home" v-else-if="item.acl ? authorization.acl(item.acl) : true" v-bind="$attrs">
        <v-tooltip v-if="rail" activator="parent" location="top" content-class="bg-nav-color">
            <span>
                {{ item.title }}
            </span>
        </v-tooltip>
        <template #prepend="{ isActive }">
            <v-icon size="24" :color="isActive ? 'white' : undefined">{{
        item.icon
    }}</v-icon>
        </template>
        <template #title>
            <span :class="{
            'font-weight-semi-bold': checkActive(item.route.name),
          }">{{ item.title }}</span>
        </template>
    </v-list-item>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import authorization from "../plugins/authorization";

interface Props {
    item: DrawerItem;
    rail: boolean;
}

defineProps<Props>();

const route = useRoute();

const checkActive = (routeName: string): boolean => {
    return route.matched.some((route) => {
        return route.name == routeName;
    });
};
</script>