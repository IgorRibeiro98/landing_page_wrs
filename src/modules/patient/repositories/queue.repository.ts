
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