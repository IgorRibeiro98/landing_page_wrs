
const scheduleDate = new Date()

scheduleDate.setHours(scheduleDate.getHours() + 1)

const patients: any = {
  '00000000000': {
    id: '00000000000',
    first_name: 'João',
    phone_hint: '0251',
    birth_date: '00/00/0000',
    has_face_recognition: true,
    schedules: [
      // new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-')+ ' '+ new Date().getHours() + ':' + new Date().getMinutes(),
      {
        id: "id01",
        date: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' '+ new Date().getHours() + ':' + new Date().getMinutes(),
        doctor: {
          id: "doctor-01",
          name: "Pablo Antonio",
        },
        specialty: {
          id: "fwefwefwefwef",
          name: "Ortopedia",
        },
        conventant: {
          id: "conv-01",
          name: "Unimed",
        },
      },
      {
        id: "id02",
        date: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' '+ (new Date().getHours() + 1) + ':' + new Date().getMinutes(),
        doctor: {
          id: "doctor-02",
          name: "David Jesus",
        },
        specialty: {
          id: "fwefwefwefwef2",
          name: "Cardiologia",
        },
        conventant: {
          id: "conv-02",
          name: "Amil",
        },
      },
      {
        id: "id03",
        date: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' '+ (new Date().getHours() + 2) + ':' + new Date().getMinutes(),
        doctor: {
          id: "doctor-03",
          name: "Igor Ribeiro",
        },
        specialty: {
          id: "fwefwefwefwef3",
          name: "Urologista",
        },
        conventant: {
          id: "conv-03",
          name: "Sulamerica",
        },
      },
    ],
  },
  '11111111111': {
    id: '11111111111',
    first_name: 'Jessica',
    phone_hint: '0251',
    has_face_recognition: true,
    birth_date: '11/11/1111',
    schedules: [
      {
        id: "id01",
        date: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' '+ new Date().getHours() + ':' + new Date().getMinutes(),
        doctor: {
          id: "doctor-01",
          name: "Pablo Antonio",
        },
        specialty: {
          id: "fwefwefwefwef",
          name: "Ortopedia",
        },
        conventant: {
          id: "conv-01",
          name: "Unimed",
        },
        guide: {
          url: 'https://drive.google.com/file/d/1-K9QNOdOmcPNOSR1hfbxGCo04OkOERZ4/preview'
        }
      },
      {
        id: "id02",
        date: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' '+ (new Date().getHours() + 1) + ':' + new Date().getMinutes(),
        doctor: {
          id: "doctor-02",
          name: "David Jesus",
        },
        specialty: {
          id: "fwefwefwefwef2",
          name: "Cardiologia",
        },
        conventant: {
          id: "conv-02",
          name: "Amil",
        },
        guide: {
          url: 'https://drive.google.com/file/d/1-K9QNOdOmcPNOSR1hfbxGCo04OkOERZ4/preview'
        }
      },
      {
        id: "id03",
        date: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' '+ (new Date().getHours() + 2) + ':' + new Date().getMinutes(),
        doctor: {
          id: "doctor-03",
          name: "João Silva",
        },
        specialty: {
          id: "fwefwefwefwef3",
          name: "Dermatologia",
        },
        conventant: {
          id: "conv-03",
          name: "Sulamerica",
        },
      },
      {
        id: "id03",
        date: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' '+ (new Date().getHours() + 3) + ':' + new Date().getMinutes(),
        doctor: {
          id: "doctor-03",
          name: "Igor Ribeiro",
        },
        specialty: {
          id: "fwefwefwefwef3",
          name: "Urologista",
        },
        conventant: {
          id: "conv-03",
          name: "Sulamerica",
        },
      },
    ],
  },
  '22222222222': {
    id: '22222222222',
    first_name: 'Jose',
    phone_hint: '0251',
    birth_date: '22/22/2222',
    has_face_recognition: true,
    schedules: [
      {
        id: "id01",
        date: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' 00:00:00',
        doctor: {
          id: "doctor-01",
          name: "Pablo Antonio",
        },
        specialty: {
          id: "fwefwefwefwef",
          name: "Ortopedia",
        },
        conventant: {
          id: "conv-01",
          name: "Unimed",
        },
      },
      {
        id: "id01",
        date: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' 01:00:00',
        doctor: {
          id: "doctor-01",
          name: "Pablo Antonio",
        },
        specialty: {
          id: "fwefwefwefwef",
          name: "Ortopedia",
        },
        conventant: {
          id: "conv-01",
          name: "Unimed",
        },
      },
    ],
  },
  '33333333333': {
    id: '33333333333',
    first_name: 'Jessica',
    phone_hint: '0251',
    birth_date: '33/33/3333',
    has_face_recognition: false,
    schedules: [
      {
        id: "id01",
        date: '2025-01-01 15:30:00',
        doctor: {
          id: "doctor-01",
          name: "Pablo Antonio",
        },
        specialty: {
          id: "fwefwefwefwef",
          name: "Ortopedia",
        },
        conventant: {
          id: "conv-01",
          name: "Unimed",
        },
      },
      {
        id: "id02",
        date: '2025-04-17 15:30:00',
        doctor: {
          id: "doctor-02",
          name: "David Jesus",
        },
        specialty: {
          id: "fwefwefwefwef2",
          name: "Cardiologia",
        },
        conventant: {
          id: "conv-02",
          name: "Amil",
        },
      },
      {
        id: "id03",
        date: '2025-05-12 15:30:00',
        doctor: {
          id: "doctor-03",
          name: "João Silva",
        },
        specialty: {
          id: "fwefwefwefwef3",
          name: "Dermatologia",
        },
        conventant: {
          id: "conv-03",
          name: "Sulamerica",
        },
      },
      {
        id: "id03",
        date: '2025-06-12 15:30:00',
        doctor: {
          id: "doctor-03",
          name: "Igor Ribeiro",
        },
        specialty: {
          id: "fwefwefwefwef3",
          name: "Urologista",
        },
        conventant: {
          id: "conv-03",
          name: "Sulamerica",
        },
      },
      {
        id: "id03",
        date: '2025-06-12 15:30:00',
        doctor: {
          id: "doctor-03",
          name: "Igor Ribeiro",
        },
        specialty: {
          id: "fwefwefwefwef3",
          name: "Urologista",
        },
        conventant: {
          id: "conv-03",
          name: "Sulamerica",
        },
      },
      {
        id: "id03",
        date: '2025-06-12 15:30:00',
        doctor: {
          id: "doctor-03",
          name: "Igor Ribeiro",
        },
        specialty: {
          id: "fwefwefwefwef3",
          name: "Urologista",
        },
        conventant: {
          id: "conv-03",
          name: "Sulamerica",
        },
      },
      {
        id: "id03",
        date: '2025-06-12 15:30:00',
        doctor: {
          id: "doctor-03",
          name: "Igor Ribeiro",
        },
        specialty: {
          id: "fwefwefwefwef3",
          name: "Urologista",
        },
        conventant: {
          id: "conv-03",
          name: "Sulamerica",
        },
      },
      {
        id: "id03",
        date: '2025-06-12 15:30:00',
        doctor: {
          id: "doctor-03",
          name: "Igor Ribeiro",
        },
        specialty: {
          id: "fwefwefwefwef3",
          name: "Urologista",
        },
        conventant: {
          id: "conv-03",
          name: "Sulamerica",
        },
      },
    ],
  },
  '44444444444': {
    id: '44444444444',
    first_name: 'Mariana',
    phone_hint: '0251',
    birth_date: '44/44/4444',
    has_face_recognition: false,
    schedules: []
  },

}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateBirthDates(patientBirthDateString: string): string[] {
  const [day, month, year] = patientBirthDateString.split('/');
  const patientBirthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

  const birthDates: Date[] = [];

  for (let i = 0; i < 2; i++) {
      const start = new Date(patientBirthDate.getFullYear() - 10, 0, 1);
      const end = new Date(patientBirthDate.getFullYear() + 10, 11, 31);
      birthDates.push(randomDate(start, end));
  }

  birthDates.push(patientBirthDate);

  return birthDates.map(date => `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`);
}

function shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getBirthDateSugestion(identifier: any): Promise<{ data: any }>{
  return new Promise((res, rej) => {

    const cpfs = Object.keys(patients)

    if (!cpfs.includes(identifier)) return rej(`Não foi possível encontrar o seu cadastro`)

    const patient: any = patients[identifier]

    return res({
      data: shuffleArray([...generateBirthDates(patient.birth_date), patient.birth_date])
    })
  })
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

export function checkBirthDate(identifier: string, birthDate: string): Promise<{data: any}> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const cpfs = Object.keys(patients)

      if (!cpfs.includes(identifier)) return rej(`Não foi possível encontrar o seu cadastro`)

      const patient: any = patients[identifier]

      if (patient.birth_date !== birthDate) return rej(`Data de nascimento inválida`)

      return res({
        data: patient
      })
    }, 2000)
  })
}

export function processPatientSchedule(): Promise<{ data: any }> {
  return new Promise((res, rej) => {
    setTimeout(() => {
      // const generateError = Math.random() > 0.5
      // if (generateError) return rej(`Não foi possível processar o agendamento`)

      return res({
        data: {}
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

export function recognizePatient(photo: string, identifier: string) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if(identifier === '11111111111') return rej({
        data: {}
      });

      return res({
        data: {}
      })
    }, 1000)
  })
}
