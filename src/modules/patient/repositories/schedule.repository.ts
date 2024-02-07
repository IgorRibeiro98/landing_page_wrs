export function openAttendance(sequences: number[]) {
    return new Promise((res, rej) => {

        setTimeout(() => {
            const data = {
                "elegibilidade": {
                    "cabecalhoRetorno": {
                        "codigoOperadora": "4",
                        "sucesso": true
                    },
                    "retornoElegibilidade": {
                        "carteirinha": "55500444000158370010",
                        "nomePaciente": "EDERSON MANARIN",
                        "plano": "OSWALDOCRUZ100 - 582 - ADMINISTRADO AHO POS LEI",
                        "elegivel": true,
                        "filename": "elegibilidade-sulamerica-55500444000158370010-1707304216231"
                    }
                },
                "nr_sequencia_autor": "6546748",
                "atendimento": {
                    "nr_atendimento": 5087294,
                    "nr_prescricao": 19828424,
                    "codigomensagem": "0",
                    "ds_mensagem": "Atendimento aberto e vinculado na agenda_consulta"
                },
                guia: {

                }
            }

            return res({
                data
            })
        }, 1000)
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