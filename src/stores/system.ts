import { defineStore } from "pinia";
import { ref } from "vue";

import logo from '@/assets/logo.png'

export const useSystemStore = defineStore('system', () => {
    const state = ref({
        logo,
    })

    const breadcrumbs = ref<Breadcrumb[]>([])

    function setBreadcrumbs(breadcrumbsValue: Breadcrumb[]) {
        breadcrumbs.value = breadcrumbsValue
    }
    return {
        state,
        breadcrumbs,
        setBreadcrumbs
    }
})

export default useSystemStore
