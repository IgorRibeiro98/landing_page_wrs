
const scheduleDate = new Date()

scheduleDate.setHours(scheduleDate.getHours() + 1)

const patients: any = {
    '11111111111': {
        id: '11111111111',
        first_name: 'Jessica',
        schedules: [
            {
                date: new Date().toLocaleString(),
                specialty: {
                    id: '12345',
                    name: 'Ortopedia'
                },
                doctor: {
                    id: '123456',
                    name: 'Carla Souza'
                }
            }
        ],
    },
    '22222222222': {
        id: '22222222222',
        first_name: 'Jose',
        schedules: [
            {
                date: new Date().toLocaleString(),
                specialty: {
                    id: '12345',
                    name: 'Ortopedia'
                },
                doctor: {
                    id: '123456',
                    name: 'Carla Souza'
                },
                conventant: {
                  id: '123456',
                  name: 'Unimed'
                }
            },
            {
                date: new Date().toLocaleString(),
                specialty: {
                    id: '12345',
                    name: 'Dermatologia'
                },
                doctor: {
                    id: '123456',
                    name: 'Sônia Melo'
                },
                conventant: {
                  id: '123456',
                  name: 'Unimed'
                }
            }
        ],
    },
    '33333333333': {
        id: '33333333333',
        first_name: 'Jessica',
        schedules: [
            {
                date: new Date().toLocaleString(),
                specialty: {
                    id: '12345',
                    name: 'Ortopedia'
                },
                doctor: {
                    id: '123456',
                    name: 'Carla Souza'
                },
                conventant: {
                  id: '123456',
                  name: 'Unimed'
                }
            },
            {
                date: new Date().toLocaleString(),
                specialty: {
                    id: '12345',
                    name: 'Ginecologia'
                },
                doctor: {
                    id: '123456',
                    name: 'João Paulo'
                },
                conventant: {
                  id: '123456',
                  name: 'Leve Saúde'
                }
            },
            {
                date: new Date().toLocaleString(),
                specialty: {
                    id: '12345',
                    name: 'Dermatologia'
                },
                doctor: {
                    id: '123456',
                    name: 'Sônia Melo'
                },
                conventant: {
                  id: '123456',
                  name: 'Unimed'
                }
            }
        ],
    },
    '00000000000': {
        id: '00000000000',
        first_name: 'Mariana',
        schedules: [
            {
                date: new Date((new Date()).setDate((new Date().getDate() +2))).toLocaleString(),
                specialty: {
                    id: '12345',
                    name: 'Ortopedia'
                },
                doctor: {
                    id: '123456',
                    name: 'Carla Souza'
                },
                conventant: {
                  id: '123456',
                  name: 'Unimed'
                }
            },
            {
                date: new Date((new Date()).setDate((new Date().getDate() +3))).toLocaleString(),
                specialty: {
                    id: '12345',
                    name: 'Ginecologia'
                },
                doctor: {
                    id: '123456',
                    name: 'João Paulo'
                },
                conventant: {
                  id: '123456',
                  name: 'Leve'
                }
            },
        ]
    },
    '44444444444': {
        id: '44444444444',
        first_name: 'Mariana',
        schedules: []
    },

}

export function findByIdentifier(identifier: any): Promise<{ data: any }> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const cpfs = Object.keys(patients)

            if (!cpfs.includes(identifier)) return rej(`Não foi possível encontrar o seu cadastro`)

            const patient: any = patients[identifier]

            return res({
                data: patient
            })
        }, 2000)
    })
}

export function validPatientByBirth(identifier: string, birth: string): Promise<{ data: Patient }> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const patient: any = Object.values(patients).find((item: any) => {
                return item.cd_pessoa_fisica == identifier && item.dt_nascimento == birth
            })

            if (!patient) return rej({
                response: {
                    data: {
                        message: `Não foi possível prosseguir com o atendimento`
                    }
                }
            })

            return res({
                data: patient
            })
        }, 2000)
    })
}

export function updatePatient(patient: any) {
    return new Promise((res, rej) => {
        setTimeout(() => {

            if (!patient) return rej({
                response: {
                    data: {
                        message: `Não foi possível atualizar o paciente`
                    }
                }
            })


            return res({
                data: patient
            })
        }, 1000)
    })
}
