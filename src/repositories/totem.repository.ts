export function findTotemById(id: string) {
    return new Promise((res, rej) => {
        const totem = {
            id: 1,
            name: 'Internação',
            description: 'Auto atendimento para internação.',
            site: {
                cd_estabelecimento: 1,
                nm_estabelecimento: 'Hospital Teste',
            },
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
                    name: 'Início',
                    component: 'Schedule'
                },
                {
                    id: 1,
                    name: 'Início',
                    component: 'Guide'
                },
                {
                    id: 1,
                    name: 'Início',
                    component: 'SignatureSuccess'
                },
                {
                    id: 1,
                    name: 'Cardápio',
                    component: 'Menu'
                },
                {
                    id: 1,
                    name: 'Tipo de Prioridade',
                    component: 'Priority'
                },
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
                    nr_seq_fila_comum: '1',
                    nr_seq_fila_preferencial: '1',
                    nr_seq_fila_preferencial_80: '1',
                },
                {
                    id: 1,
                    name: 'Agendamento de Consulta',
                    description: null,
                    icon: 'mdi-calendar-check',
                    color: 'error',
                    action: 'start',
                    to: 'init',
                    nr_seq_fila_comum: '1',
                    nr_seq_fila_preferencial: '1',
                    nr_seq_fila_preferencial_80: '1',
                },
                {
                    id: 1,
                    name: 'Laboratório',
                    description: null,
                    icon: 'mdi-beaker',
                    color: 'error',
                    action: 'start',
                    to: 'init',
                    nr_seq_fila_comum: '1',
                    nr_seq_fila_preferencial: '1',
                    nr_seq_fila_preferencial_80: '1',
                },
                {
                    id: 1,
                    name: 'Pronto Atendimento',
                    description: null,
                    icon: 'mdi-medical-bag',
                    color: 'error',
                    action: 'start',
                    to: 'init',
                    nr_seq_fila_comum: '1',
                    nr_seq_fila_preferencial: '1',
                    nr_seq_fila_preferencial_80: '1',
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