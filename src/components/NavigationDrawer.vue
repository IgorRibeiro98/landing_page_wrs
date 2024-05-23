<template>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent color="primary" class="position-fixed">
        <v-list density="compact" nav>
            <v-list-item>
                <template #prepend>
                    <Avatar :user="authUser" color="secondary" size="24" />
                </template>
                <template #title>
                    <span class="pl-4 font-weight-semi-bold">{{
        authUser.name
    }}</span>
                </template>
            </v-list-item>
        </v-list>
        <v-divider />
        <v-btn color="primary" size="28" class="toggle-rail-drawer"
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'" @click.stop="toggleRail"></v-btn>
        <v-list class="mt-3" nav>
            <template v-for="(drawerItem, index) in items" :key="index">
                <DrawerItem :item="drawerItem" :rail="rail" />
            </template>
        </v-list>
        <v-list density="compact" nav class="logout">
            <DrawerItem :item="logoutItem" :rail="rail" />
        </v-list>

    </v-navigation-drawer>
</template>
<script setup lang="ts">
import Avatar from "@/components/Avatar.vue";
import useAuthStore from "@/stores/user";
import { computed, ref, onBeforeMount } from "vue";
import DrawerItem from "./DrawerItem.vue";
import { useRoute } from "vue-router";

interface Props {
    items: DrawerItem[];
}

defineProps<Props>();

const drawer = ref(true);
const rail = ref(true);
const navDrawerLeftPosition = computed<string>(() => {
    if (rail.value) {
        return "73%";
    }
    return "94%";
});
const logoutItem = ref({
    icon: "mdi-logout",
    title: "Sair",
    route: {
        name: "auth.logout",
    },
});

const route = useRoute();
const userStore = useAuthStore();
const authUser = userStore.user;

const toggleRail = () => {
    localStorage.setItem("rail", rail.value.toString());
    if (rail.value) {
        return (rail.value = false);
    }
    rail.value = true;
};

onBeforeMount(() => {
    const railValue = localStorage.getItem("rail");
    if (railValue) {
        rail.value = !(railValue == "true");
    }
});
</script>
<style scoped lang="scss">
.toggle-rail-drawer {
    position: absolute;
    top: 5%;
    left: v-bind(navDrawerLeftPosition);
    font-size: 1rem;
}

.logout {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>