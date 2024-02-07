
export function pushQueue(body: any) {
    return new Promise((res) => {
        setTimeout(() => {
            const queue = { "ds_senha": "T1", "dt_entrada": "2024-02-05T09:24:19.000Z" }

            return res({
                data: queue
            })
        }, 1000)
    })
}

export function sendSMSQueue(phone: string, queue: any) {
    return new Promise((res) => {
        setTimeout(() => {

            return res({
                data: `Encaminhado SMS para o ${phone}, senha: ${queue.ds_senha}`
            })
        }, 2000)
    })
}

export function printQueue(queue: any) {
    return new Promise((res) => {
        setTimeout(() => {

            return res({
                data: `imprimido a senha: ${queue.ds_senha}`
            })
        }, 2000)
    })
}

