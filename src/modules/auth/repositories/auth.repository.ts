import client from '@/plugins/axios';

export function loginPopUp(url: string): Window {

    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const w = 300;
    const h = 300;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop

    return window.open(url, '_blank', `
        scrollbars=yes,
        width=${w / systemZoom},
        height=${h / systemZoom},
        top=${top},
        left=${left}
    `)!;
}

export function loginRedirect(url: string) {
    window.open(url, '_self')
}

export function revokeToken(token: string) {
    return client.post(`/logout`)
}

interface AuthorizationCode {
    grant_type: 'authorization_code',
    code: string,
    redirect_uri: string,
    client_id: string,
    code_verifier: string
}

interface RefreshToken {
    grant_type: 'refresh_token',
    refresh_token: string,
    client_id: string,
}

export type AuthorizationPayload = AuthorizationCode | RefreshToken

export function getToken(payload: AuthorizationPayload) {
    return client.post('oauth/token', payload)
}

export function introspect() {
    return client.get('me')
}


export function changeTenant(id: string) {
  return client.post(`me/tenant/change/${id}`);
}

export function update(body: {
    name: string,
    password: string
}) {
    return client.put('me', body)
}
