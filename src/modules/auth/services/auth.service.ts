import { loginRedirect, getToken, type AuthorizationPayload, introspect, revokeToken } from '@/modules/auth/repositories/auth.repository'

import userUserStore from '@/stores/user'

const authKeys = [
    'accessToken',
    'refreshToken',
    'expiresIn',
    'user'
]

async function login() {
    authKeys.forEach((key: string) => {
        localStorage.removeItem(key)
    })
    
    const code_verifier = generateCodeVerifier()

    const code_challenge = await generateCodeChallengeFromVerifier(code_verifier)

    const state = generateState()

    sessionStorage.setItem('code_challenge', code_challenge)
    sessionStorage.setItem('code_verifier', code_verifier)
    sessionStorage.setItem('state', state)

    const searchParams = new URLSearchParams({
        response_type: 'code',
        redirect_uri: window.location.origin + '/#/auth/callback',
        client_id: import.meta.env.VITE_APP_CLIENT_ID,
        state: state,
        code_challenge: code_challenge,
        code_challenge_method: 'S256',
        prompt: 'login'
    })

    const url = new URL(import.meta.env.VITE_APP_API + '/oauth/authorize')

    url.search = searchParams.toString()

    loginRedirect(url.toString())
}

async function signout() {
    const {1: token} = localStorage.getItem('accessToken')!.split(' ')

    return revokeToken(token)
        .then((res) => {
            authKeys.forEach((key: string) => {
                localStorage.removeItem(key)
            })
            login()
            return res
        })
}

async function retriveToken(payload: AuthorizationPayload) {
    const store = userUserStore()

    return getToken(payload)
        .then(res => {
            localStorage.setItem('expiresIn', (new Date().getTime() + res.data.expires_in * 1000).toString())
            localStorage.setItem('accessToken', `${res.data.token_type} ${res.data.access_token}`)
            localStorage.setItem('refreshToken', res.data.refresh_token)

            if (payload.grant_type == 'authorization_code') {
                introspect()
                    .then(res => {
                        store.setAuthUser(res.data)
                    })
            }
        })
}

export { login, retriveToken, signout }


function generateState() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return base64url(array.buffer);
}

function dec2hex(dec: number) {
    return ("0" + dec.toString(16)).substr(-2);
}

function generateCodeVerifier(): string {
    let array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join("");
}

function sha256(plain: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(hashed: ArrayBuffer) {
    let str = "";
    let bytes = new Uint8Array(hashed);
    let len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
        str += String.fromCharCode(bytes[i]);
    }

    return btoa(str)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

async function generateCodeChallengeFromVerifier(codeVerifier: string) {
    var hashed = await sha256(codeVerifier);

    var base64encoded = base64urlencode(hashed);

    return base64encoded;
}

function base64url(arrayBuffer: any) {
    let str = '';
    const byteArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteArray.byteLength; i++) {
        str += String.fromCharCode(byteArray[i]);
    }
    return btoa(str)
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

