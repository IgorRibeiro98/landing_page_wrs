import { agent } from '@/plugins/axios'
import { AxiosResponse } from 'axios'

export function createTicket(payload: TicketPayload): Promise<AxiosResponse<Ticket>> {
    return agent.post('/tasy/password', payload)
    // return new Promise((res, rej) => {
    //     setTimeout(() => {
    //         console.log(payload)
    //         if (payload.patient_id == '44444444444')
    //             return rej('Não foi possível gerar a sua senha')

    //         const data = {
    //             value: 'C219',
    //             site: 'Barra da Tijuca'
    //         }

    //         res({ data })
    //     }, 2000)
    // })
}