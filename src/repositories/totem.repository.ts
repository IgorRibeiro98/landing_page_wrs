export function findTotemById(id: string) {
    return new Promise(res => {
        const totem = {
            id: 1,
            name: 'Internação',
            description: 'Auto atendimento para internação.',
            screens: [

                {
                    id: 1,
                    name: 'Início',
                    component: 'Init'
                },
                {
                    id: 1,
                    name: 'Identificação Paciente',
                    component: 'Identifier'
                },
                {
                    id: 1,
                    name: 'Nascimento',
                    component: 'Birth'
                },
                {
                    id: 1,
                    name: 'Formulário de Dados Pessoais',
                    component: 'PersonalDataForm'
                },
                {
                    id: 1,
                    name: 'Formulário de Dados de Contato',
                    component: 'ContactDataForm'
                },
                {
                    id: 1,
                    name: 'Cardápio',
                    component: 'Menu'
                }
            ],
            queues: [
                {
                    id: 1,
                    name: 'Agendamento de Exame',
                    description: 'Agende um exame para o paciente.',
                    icon: 'mdi-file',
                    color: 'primary',
                    action: 'next',
                    to: 'identifier',
                },
                {
                    id: 1,
                    name: 'Agendamento de Consulta',
                    description: null,
                    icon: 'mdi-calendar-check',
                    color: 'error',
                    action: 'start',
                    to: 'init',
                },
                {
                    id: 1,
                    name: 'Laboratório',
                    description: null,
                    icon: 'mdi-beaker',
                    color: 'error',
                    action: 'start',
                    to: 'init',
                },
                {
                    id: 1,
                    name: 'Pronto Atendimento',
                    description: null,
                    icon: 'mdi-medical-bag',
                    color: 'error',
                    action: 'start',
                    to: 'init',
                },
            ]
        }

        setTimeout(() => {
            res({
                data: totem
            })
        }, 1000)

    })
}