interface TicketPayload {
    patient_id?: string;
    queue_id: string
}

export function createTicket(payload: TicketPayload): Promise<any> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(payload)
            if (payload.patient_id == '44444444444')
                return rej('Não foi possível gerar a sua senha')

            const data = {
                value: 'C219',
                site: 'Barra da Tijuca'
            }

            res({ data })
        }, 2000)
    })
}