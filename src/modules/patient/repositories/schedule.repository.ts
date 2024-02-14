export function openAttendance(sequences: number[]): Promise<any> {
    return new Promise((res, rej) => {

        setTimeout(() => {
            // rej({
            //     response: {
            //         data: {
            //             message: 'Não foi possível abrir seu atendimento'
            //         }
            //     }
            // })
            const data = {
                elegivel: true,
                carteirinha: "88888459653390018",
                nr_seq_autorizacao: 6546748,
                atendimento: {
                    nr_atendimento: 5087294,
                    nr_prescricao: 19828424,
                },
                guia: {}
            }

            return res({
                data
            })
        }, 2000)
    })
}

export function signatureGuide() {
    return new Promise((res, rej) => {

        setTimeout(() => {
            const data = {
                "nr_sequencia_autor": "6546748",
                "guia": {
                    "nr_guia": 5087294,
                    "nr_prescricao": 19828424,
                    "codigomensagem": "0",
                    "ds_mensagem": "Guia assinada com sucesso"
                }
            }

            return res({
                data
            })
        }, 4000)
    })
}

export function findQueueBySchedule(totemId: number, scheduleIds: number[]): Promise<any> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const data = {
                id: 1,
                name: 'Agendamento de Exame',
                description: 'Exames de imagem, laboratório e outros.',
                icon: 'mdi-file',
                color: 'primary',
                action: 'next',
                to: 'identifier',
                nr_seq_fila_comum: '1',
                nr_seq_fila_preferencial: '1',
                nr_seq_fila_preferencial_80: '1',
            }

            res({ data })
        }, 500)
    })
}