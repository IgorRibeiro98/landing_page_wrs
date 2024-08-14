import { getTenant } from "@/modules/tenant/repositories/tenant.repository";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useTheme } from 'vuetify';

const useTenantStore = defineStore('tenant', () => {

    const tenant = ref<Tenant>(JSON.parse(localStorage.getItem('tenant')!) ?? {
        id: 0,
        name: '',
        logo: '',
        theme: {},
        domain: '',
        updated_at: '',
        created_at: '',
    });

    const theme = useTheme()

    const loadTenant = async () => {
        try {
            return getTenant()
                .then((resp) => {
                    tenant.value = {
                        ...resp.data,
                        theme: JSON.parse(resp.data.theme),
                    }

                    const colors = Object.assign({}, theme.current.value.colors, tenant.value.theme.colors)
                    
                    Object.assign(theme.themes.value.light, { colors })
                })
        } catch (error) {
            console.error({error});
        }
    };
    return {
        tenant,
        loadTenant,
    };
});

export default useTenantStore;
