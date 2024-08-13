export function checkToken(code: string): Promise<{ data: boolean }> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (code == '123456') return res({data: true})

            return rej({
                data: {
                    message: 'Token inválido',
                    maxAttempts: maxAttempts--
                }
            })
        }, 1000)
    })
}

export function sendToken(): Promise<{ data: boolean }> {
    return new Promise((res) => {
        setTimeout(() => {
            return res({
                data: true
            })
        }, 1000)
    })
}

var maxAttempts = 2

export function signature(code: string): Promise<{ data: boolean }> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (code == '123456') return res({data: true})

            return rej({
                data: {
                    message: 'Token inválido',
                    maxAttempts: maxAttempts--
                }
            })
        }, 4000)
    })
}

export function clearSignatureAttempts() {
    maxAttempts = 2
}
