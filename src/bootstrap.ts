import useTenantStore from "@/modules/tenant/store";

export default function () {
  const tenantStore = useTenantStore()
  tenantStore.loadTenant()
}
