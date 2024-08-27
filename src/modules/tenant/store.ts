import { getTenant } from "@/modules/tenant/repositories/tenant.repository";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useTheme } from 'vuetify';

const useTenantStore = defineStore('tenant', () => {

    const tenant = ref<Tenant>(getFromStorage('tenant') ?? {
        id: 0,
        name: '',
        logo: '',
        theme: {},
        subdomain: '',
        updated_at: '',
        created_at: '',
    });

    const theme = useTheme()

    setColorTheme(tenant.value.theme.colors)

    function getFromStorage(key: string): any | null {
        const item = JSON.parse(localStorage.getItem(key)!);

        if (!item) return null;

        Object.entries(item ?? {}).forEach(([key, value]: any) => {
            try {
                if (typeof value === 'string') {
                    item[key] = JSON.parse(value);
                }
            } catch (error) {
                item[key] = value;
            }
        })

        return item
    }

    function setColorTheme(injectColors: any) {
        const colors = Object.assign({}, theme.current.value.colors, injectColors)

        Object.assign(theme.themes.value.light, { colors })
    }

    const loadTenant = async () => {
      return getTenant()
          .then((resp) => {
              localStorage.setItem('tenant', JSON.stringify(resp.data));

              tenant.value = {
                  ...resp.data,
                  theme: JSON.parse(resp.data.theme),
              }

              setColorTheme(tenant.value.theme.colors)
          })
    };
    return {
        tenant,
        loadTenant,
    };
});

export default useTenantStore;
