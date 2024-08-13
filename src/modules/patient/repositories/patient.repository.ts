
import { agent } from '@/plugins/axios';

const scheduleDate = new Date()

scheduleDate.setHours(scheduleDate.getHours() + 1)

const patients: any = {
  '22222222222': {
    id: "1234567",
    name: "João Neto",
    social_name: null,
    cpf: "22222222222",
    birth: "22/22/2222",
    passport: null,
    rg: "4809040800",
    sex_cd: "M",
    nacionality_id: "10",
    religion_id: "37",
    merital_status_id: "2",
    foreigner_id: null,
    first_name: "João",
    data: {
        id: "1",
        patient_id: "12345678",
        ddi_phone: null,
        ddd_phone: null,
        phone_number: "101010101",
        ddi_cellphone: null,
        ddd_cellphone: "11",
        cellphone_number: "947029695",
        email: "teste@teste.com.br",
        address_type_id: "1",
        zip_code: "09632090",
        street: "Rua Teste",
        number: "10",
        complement: "Ap. 9",
        state_cd: "SP",
        city: "São Paulo"
    },
    schedules: {
      appointment: [
        {
          schedule_sequence: "56868939",
          procedure_type: "Consulta",
          schedule_date:  new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' '+ new Date().getHours() + ':' + new Date().getMinutes(),
          establishment_code: "1",
          establishment_description: "Hospital TESTE",
          patient_code: "1117253",
          agreement_code: "340",
          agreement_description: "Bradesco Saúde S/A ",
          category_code: "3",
          category_description: "Coletivo (Saúde Top) ou (Hospitalar)",
          plan_code: "18",
          plan_description: "Rede Nacional ",
          product_code: "",
          product_description: "",
          card_number: "123456789101112",
          card_validity: "14-JUN-23",
          card_digit: "15",
          doctor_code: "159159",
          doctor_name: "Leandro Menezes",
          crm: "123456",
          council_state: "CRM-SP",
          specialty_code: "8",
          specialty_description: "Cardiologia",
          duration: "30",
          location_description: "Rua tESTE, 10 - Teste / São Paulo-SP | Torre A - 1º Andar",
          requires_authorization: 1,
          schedule_sector_code: "402"
        }
      ]
    }
  },
  '11111111111': {
        id: "1303468",
        name: "Maria Silva",
        social_name: null,
        cpf: "11111111111",
        birth: "11/11/1111",
        passport: null,
        rg: "1234567890",
        sex_cd: "F",
        nacionality_id: "10",
        religion_id: "37",
        merital_status_id: "2",
        foreigner_id: null,
        first_name: "Maria",
        data: {
            id: "2",
            patient_id: "158777",
            ddi_phone: null,
            ddd_phone: null,
            phone_number: "202020202",
            ddi_cellphone: null,
            ddd_cellphone: "11",
            cellphone_number: "947029696",
            email: "maria.silva@teste.com.br",
            address_type_id: "1",
            zip_code: "09632091",
            street: "Rua Teste",
            number: "6",
            complement: "Ap. 99",
            state_cd: "SP",
            city: "São Paulo"
        },
        schedules: {
            appointment: [
                {
                    schedule_sequence: "56868940",
                    procedure_type: "Consulta",
                    schedule_date: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' '+ new Date().getHours() + ':' + new Date().getMinutes(),
                    establishment_code: "1",
                    establishment_description: "Hospital TESTE",
                    patient_code: "1117254",
                    agreement_code: "340",
                    agreement_description: "Bradesco Saúde S/A ",
                    category_code: "3",
                    category_description: "Coletivo (Saúde Top) ou (Hospitalar)",
                    plan_code: "18",
                    plan_description: "Rede Nacional ",
                    product_code: "",
                    product_description: "",
                    card_number: "44444444444444",
                    card_validity: "15-JUN-23",
                    card_digit: "16",
                    doctor_code: "123672",
                    doctor_name: "Ana da Costa",
                    crm: "159159",
                    council_state: "CRM-SP",
                    specialty_code: "8",
                    specialty_description: "Cardiologia",
                    duration: "30",
                    location_description: "Rua Teste, 1211 - Diadema / São Paulo-SP | Torre A - 1º Andar",
                    requires_authorization: 1,
                    schedule_sector_code: "402"
                }
            ]
        }
  },
  '33333333333': {
      id: "999999",
      name: "Carlos Pereira",
      social_name: null,
      cpf: "33333333333",
      birth: "33/33/3333",
      passport: null,
      rg: "2345678901",
      sex_cd: "M",
      nacionality_id: "10",
      religion_id: "37",
      merital_status_id: "2",
      foreigner_id: null,
      first_name: "Carlos",
      data: {
          id: "3",
          patient_id: "1111111",
          ddi_phone: null,
          ddd_phone: null,
          phone_number: "303030303",
          ddi_cellphone: null,
          ddd_cellphone: "11",
          cellphone_number: "947029697",
          email: "carlos@teste.com.br",
          address_type_id: "1",
          zip_code: "09632092",
          street: "Rua Carvalho",
          number: "9",
          complement: "Ap. 1",
          state_cd: "SP",
          city: "São Bernardo do Campo"
      },
      schedules: {
          appointment: [
              {
                  schedule_sequence: "777777",
                  procedure_type: "Consulta",
                  schedule_date: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-') + ' '+ new Date().getHours() + ':' + new Date().getMinutes(),
                  establishment_code: "1",
                  establishment_description: "Hospital TESTE",
                  patient_code: "56456",
                  agreement_code: "340",
                  agreement_description: "Bradesco Saúde S/A ",
                  category_code: "3",
                  category_description: "Coletivo (Saúde Top) ou (Hospitalar)",
                  plan_code: "18",
                  plan_description: "Rede Nacional ",
                  product_code: "",
                  product_description: "",
                  card_number: "775223024414013",
                  card_validity: "16-JUN-23",
                  card_digit: "17",
                  doctor_code: "123673",
                  doctor_name: "Pedro da Costa",
                  crm: "966455",
                  council_state: "CRM-SP",
                  specialty_code: "8",
                  specialty_description: "Cardiologia",
                  duration: "30",
                  location_description: "Rua Dois, 1 - Bio Ne / São Paulo-SP | Torre X - 2º Andar",
                  requires_authorization: 1,
                  schedule_sector_code: "402"
              }
          ]
      }
  },
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateBirthDates(patientBirthDateString: string): string[] {
  const patientBirthDate = new Date(patientBirthDateString.replaceAll('-', '/'));

  const birthDates: Date[] = [];

  for (let i = 0; i < 2; i++) {
      const start = new Date(patientBirthDate.getFullYear() - 10, 0, 1);
      const end = new Date(patientBirthDate.getFullYear() + 10, 11, 31);
      birthDates.push(randomDate(start, end));
  }

  birthDates.push(patientBirthDate);

  return birthDates.map(date => date.toLocaleDateString('pt-BR'));
}

export function getChallengeByIdentifier(identifier: string): Promise<{ data: {
  name: string,
  birthDays: string[]
} }> {
  return agent.get(`/patient/${identifier}/challenge`);
  // return new Promise((res, rej) => {
  //   setTimeout(() => {
  //     const cpfs = Object.keys(patients)

  //     if (!cpfs.includes(identifier)) return rej(`Não foi possível encontrar o seu cadastro`)

  //     const patient: any = patients[identifier]

  //     console.log()
  //     return res({
  //       data: {
  //         name: patient.first_name,
  //         birthDays: generateBirthDates(patient.birth)
  //       }
  //     })
  //   }, 2000)
  // })
}

export function checkBirthDate(identifier: string, birth: string): Promise<{data: any}> {
  return agent.get('/patient/search', {
    params: {
      identifier,
      birth,
    }
  });
}

export function getSchedules(identifier: string, initialdate: string, finaldate: string) {
  return agent.get(`/patient/${identifier}/schedule`, {
    params: {
      initialdate,
      finaldate
    }
  })
}

export function updatePatientData(identifier: string, data: any): Promise<{ data: any }> {
  return agent.put(`/patient/${identifier}/data`, data);
  // return new Promise((res, rej) => {
  //   setTimeout(() => {
  //     return res({
  //       data: {}
  //     })
  //   }, 2000)
  // })
}

export function processPatientSchedule(patientId: string, ids: string[]): Promise<{ data: any }> {
  return agent.post(`/patient/${patientId}/schedule/process`, {
    ids
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

export function updatePatient(id: string, patient: PatientIdentifier) {
  return agent.put(`/patient/${id}`, patient);

  // return new Promise((res, rej) => {
  //   setTimeout(() => {

  //     if (!patient) return rej({
  //       response: {
  //         data: {
  //           message: `Não foi possível atualizar o paciente`
  //         }
  //       }
  //     })


  //     return res({
  //       data: patient
  //     })
  //   }, 1000)
  // })
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
