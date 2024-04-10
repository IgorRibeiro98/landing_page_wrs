
const scheduleDate = new Date()

scheduleDate.setHours(scheduleDate.getHours() + 1)

const patients: any = {
    '11111111111': {
        id: '1234',
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
        id: '1234',
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
                }
            }
        ],
    },
    '33333333333': {
        id: '1234',
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
                }
            }
        ],
    },
    '00000000000': {
        id: '00000',
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
                }
            },
        ]
    }
}

export function findByIdentifier(identifier: any): Promise<{ data: PatientIdentifier }> {
    return new Promise((res, rej) => {
        setTimeout(() => {
            const cpfs = Object.keys(patients)

            if (!cpfs.includes(identifier)) return rej(new Error(`Paciente ${identifier} não foi encontrado`))

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
