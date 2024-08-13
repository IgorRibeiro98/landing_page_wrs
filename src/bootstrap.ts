import useTenantStore from "@/modules/tenant/store";
import useAuthStore from "@/stores/user";

export default function () {
  const tenantStore = useTenantStore()
  const userStore = useAuthStore()
  userStore.loadUser()
  tenantStore.loadTenant()
}
