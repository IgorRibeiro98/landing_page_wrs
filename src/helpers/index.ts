export function changeTenant(newSubdomain: string): void {
  const url = new URL(window.location.href)

  const [subdomain, domain] = url.hostname.split('.')

  if (domain)
    url.hostname = url.hostname.replace(subdomain, newSubdomain)
  else
    url.hostname = `${newSubdomain}.${subdomain}`

  if (url.hostname == `${newSubdomain}.${newSubdomain}`)
    url.hostname = newSubdomain

  url.searchParams.set('accessToken', localStorage.getItem('accessToken') as string)

  const href = `${url.origin}/${url.hash}${url.search}`;

  window.location.href = href
}
