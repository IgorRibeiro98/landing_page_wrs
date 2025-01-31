import { changeTenant as change } from "@/modules/auth/repositories/auth.repository";

import useAlertStore from "@/stores/alert";

export function changeTenant(tenant: Tenant)   {
  const { openAlert } = useAlertStore();

  const newSubdomain = tenant.subdomain;

  return change(tenant.id)
    .then(() => {
      changeTenantLegacy(newSubdomain);
    })
    .catch(err => {
      openAlert('Erro ao trocar de tenant', err);
    })
}

function changeTenantLegacy(newSubdomain: string) {
  const url = new URL(window.location.href)
  const containHash = window.location.href.includes('#/');

  const [subdomain, domain] = url.hostname.split('.')

  if (domain)
    url.hostname = url.hostname.replace(subdomain, newSubdomain)
  else
    url.hostname = `${newSubdomain}.${subdomain}`

  if (url.hostname == `${newSubdomain}.${newSubdomain}`)
    url.hostname = newSubdomain

  url.searchParams.set('accessToken', localStorage.getItem('accessToken') as string)

  if (containHash) {
    url.hash = `#/tenant/change`;
    url.pathname = '';
  }

  const href = `${url.origin}/${url.hash}${url.search}`;

  window.location.href = href
}
