import axios from '@/plugins/axios';

export function getTotem() {
  return axios.get(`/totem`);
}

export function findTotem(id: number | string): any {
  return axios.get(`/totem/${id}`)
  // return new Promise(res => {
  //   res({
  //     data: {
  //       "id": 1,
  //       "name": "Teste",
  //       "description": "Totem fluxo hml",
  //       "department_id": null,
  //       "created_at": "2024-04-09T23:41:38.000000Z",
  //       "updated_at": "2024-04-09T23:41:38.000000Z",
  //       "queues": [
  //         {
  //           "id": 2,
  //           "off_hours_message": "<p style=\"text-align: justify\">Teste</p>",
  //           "queue_id": 2,
  //           "totem_id": 1,
  //           "data": {
  //             "id": 2,
  //             "name": "Agendar consulta",
  //             "icon_src": "https://saludti.s3.us-east-2.amazonaws.com/queue_icon/Agendar consulta.svg",
  //             "description": null,
  //             "status": "null",
  //             "created_at": "2024-04-10T21:04:16.000000Z",
  //             "updated_at": "2024-04-10T21:04:16.000000Z"
  //           },
  //           "attendance_types": [
  //             {
  //               "attendance_type_id": 1,
  //               "queue_totem_id": 2,
  //               "integration_id": "80",
  //               "data": {
  //                 "id": 1,
  //                 "name": "Preferencial +80",
  //                 "icon": "https://saludti.s3.us-east-2.amazonaws.com/attendance_types/user-heart-health.svg",
  //                 "description": "Atendimento exclusivo para pacientes +80.",
  //                 "created_at": "2024-04-09T23:48:09.000000Z",
  //                 "updated_at": "2024-04-09T23:48:09.000000Z"
  //               }
  //             },
  //             {
  //               "attendance_type_id": 2,
  //               "queue_totem_id": 2,
  //               "integration_id": "1",
  //               "data": {
  //                 "id": 2,
  //                 "name": "Grupo prioritário",
  //                 "icon": "https://saludti.s3.us-east-2.amazonaws.com/attendance_types/accessibility_new_black_24dp 1.svg",
  //                 "description": "Mulheres grávida, crianças de colo, autistas, idosos +60 e PCD.",
  //                 "created_at": "2024-04-12T21:01:06.000000Z",
  //                 "updated_at": "2024-04-12T21:01:06.000000Z"
  //               }
  //             },
  //             {
  //               "attendance_type_id": 3,
  //               "queue_totem_id": 2,
  //               "integration_id": "180",
  //               "data": {
  //                 "id": 3,
  //                 "name": "Não faço parte do grupo prioritário",
  //                 "icon": "https://saludti.s3.us-east-2.amazonaws.com/attendance_types/User, Profile, Add.svg",
  //                 "description": null,
  //                 "created_at": "2024-04-12T21:01:22.000000Z",
  //                 "updated_at": "2024-04-12T21:22:27.000000Z"
  //               }
  //             }
  //           ],
  //           "attendance_hours": [
  //             {
  //               "queue_totem_id": 2,
  //               "weekday_iso": 1,
  //               "start_time": "08:00:00",
  //               "end_time": "23:59:00"
  //             },
  //             {
  //               "queue_totem_id": 2,
  //               "weekday_iso": 2,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 2,
  //               "weekday_iso": 3,
  //               "start_time": "08:00:00",
  //               "end_time": "21:10:00"
  //             },
  //             {
  //               "queue_totem_id": 2,
  //               "weekday_iso": 4,
  //               "start_time": "08:00:00",
  //               "end_time": "10:00:00"
  //             },
  //             {
  //               "queue_totem_id": 2,
  //               "weekday_iso": 5,
  //               "start_time": "08:00:00",
  //               "end_time": "23:59:00"
  //             }
  //           ]
  //         },
  //         {
  //           "id": 3,
  //           "off_hours_message": "<p>Agendar exames</p>",
  //           "queue_id": 3,
  //           "totem_id": 1,
  //           "data": {
  //             "id": 3,
  //             "name": "Agendar exame(s)",
  //             "icon_src": "https://saludti.s3.us-east-2.amazonaws.com/queue_icon/Agendar exame(s).svg",
  //             "description": null,
  //             "status": "null",
  //             "created_at": "2024-04-10T21:04:39.000000Z",
  //             "updated_at": "2024-04-10T21:04:39.000000Z"
  //           },
  //           "attendance_types": [
  //             {
  //               "attendance_type_id": 1,
  //               "queue_totem_id": 3,
  //               "integration_id": "90",
  //               "data": {
  //                 "id": 1,
  //                 "name": "Preferencial +80",
  //                 "icon": "https://saludti.s3.us-east-2.amazonaws.com/attendance_types/user-heart-health.svg",
  //                 "description": "Atendimento exclusivo para pacientes +80.",
  //                 "created_at": "2024-04-09T23:48:09.000000Z",
  //                 "updated_at": "2024-04-09T23:48:09.000000Z"
  //               }
  //             }
  //           ],
  //           "attendance_hours": [
  //             {
  //               "queue_totem_id": 3,
  //               "weekday_iso": 1,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 3,
  //               "weekday_iso": 2,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 3,
  //               "weekday_iso": 3,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 3,
  //               "weekday_iso": 4,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 3,
  //               "weekday_iso": 5,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             }
  //           ]
  //         },
  //         {
  //           "id": 4,
  //           "off_hours_message": null,
  //           "queue_id": 4,
  //           "totem_id": 1,
  //           "data": {
  //             "id": 4,
  //             "name": "Laboratório - Coleta",
  //             "icon_src": "https://saludti.s3.us-east-2.amazonaws.com/queue_icon/Laboratório - Coleta.svg",
  //             "description": null,
  //             "status": "null",
  //             "created_at": "2024-04-10T21:04:53.000000Z",
  //             "updated_at": "2024-04-10T21:04:53.000000Z"
  //           },
  //           "attendance_types": [
  //             {
  //               "attendance_type_id": 1,
  //               "queue_totem_id": 4,
  //               "integration_id": "60",
  //               "data": {
  //                 "id": 1,
  //                 "name": "Preferencial +80",
  //                 "icon": "https://saludti.s3.us-east-2.amazonaws.com/attendance_types/user-heart-health.svg",
  //                 "description": "Atendimento exclusivo para pacientes +80.",
  //                 "created_at": "2024-04-09T23:48:09.000000Z",
  //                 "updated_at": "2024-04-09T23:48:09.000000Z"
  //               }
  //             }
  //           ],
  //           "attendance_hours": [
  //             {
  //               "queue_totem_id": 4,
  //               "weekday_iso": 1,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 4,
  //               "weekday_iso": 2,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 4,
  //               "weekday_iso": 3,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 4,
  //               "weekday_iso": 4,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 4,
  //               "weekday_iso": 5,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             }
  //           ]
  //         },
  //         {
  //           "id": 5,
  //           "off_hours_message": "<p>Exame agendado</p>",
  //           "queue_id": 1,
  //           "totem_id": 1,
  //           "data": {
  //             "id": 1,
  //             "name": "Exame agendado",
  //             "icon_src": "https://saludti.s3.us-east-2.amazonaws.com/queue_icon/Exame agendado.svg",
  //             "description": "Exames agendados apenas",
  //             "status": "null",
  //             "created_at": "2024-04-09T23:47:33.000000Z",
  //             "updated_at": "2024-04-09T23:47:33.000000Z"
  //           },
  //           "attendance_types": [
  //             {
  //               "attendance_type_id": 1,
  //               "queue_totem_id": 5,
  //               "integration_id": "6",
  //               "data": {
  //                 "id": 1,
  //                 "name": "Preferencial +80",
  //                 "icon": "https://saludti.s3.us-east-2.amazonaws.com/attendance_types/user-heart-health.svg",
  //                 "description": "Atendimento exclusivo para pacientes +80.",
  //                 "created_at": "2024-04-09T23:48:09.000000Z",
  //                 "updated_at": "2024-04-09T23:48:09.000000Z"
  //               }
  //             }
  //           ],
  //           "attendance_hours": [
  //             {
  //               "queue_totem_id": 5,
  //               "weekday_iso": 1,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 5,
  //               "weekday_iso": 2,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 5,
  //               "weekday_iso": 3,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 5,
  //               "weekday_iso": 4,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 5,
  //               "weekday_iso": 5,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             }
  //           ]
  //         },
  //         {
  //           "id": 6,
  //           "off_hours_message": "<p>Retirar exames</p>",
  //           "queue_id": 5,
  //           "totem_id": 1,
  //           "data": {
  //             "id": 5,
  //             "name": "Retirar exames",
  //             "icon_src": "https://saludti.s3.us-east-2.amazonaws.com/queue_icon/Retirar exames.svg",
  //             "description": null,
  //             "status": "null",
  //             "created_at": "2024-04-10T21:05:27.000000Z",
  //             "updated_at": "2024-04-10T21:05:27.000000Z"
  //           },
  //           "attendance_types": [
  //             {
  //               "attendance_type_id": 1,
  //               "queue_totem_id": 6,
  //               "integration_id": "9",
  //               "data": {
  //                 "id": 1,
  //                 "name": "Preferencial +80",
  //                 "icon": "https://saludti.s3.us-east-2.amazonaws.com/attendance_types/user-heart-health.svg",
  //                 "description": "Atendimento exclusivo para pacientes +80.",
  //                 "created_at": "2024-04-09T23:48:09.000000Z",
  //                 "updated_at": "2024-04-09T23:48:09.000000Z"
  //               }
  //             }
  //           ],
  //           "attendance_hours": [
  //             {
  //               "queue_totem_id": 6,
  //               "weekday_iso": 1,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 6,
  //               "weekday_iso": 2,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 6,
  //               "weekday_iso": 3,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 6,
  //               "weekday_iso": 4,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             },
  //             {
  //               "queue_totem_id": 6,
  //               "weekday_iso": 5,
  //               "start_time": "08:00:00",
  //               "end_time": "19:00:00"
  //             }
  //           ]
  //         },
  //         {
  //           "id": 7,
  //           "off_hours_message": "<p>outros</p>",
  //           "queue_id": 6,
  //           "totem_id": 1,
  //           "data": {
  //             "id": 6,
  //             "name": "Outros",
  //             "icon_src": "https://saludti.s3.us-east-2.amazonaws.com/queue_icon/Outros.svg",
  //             "description": null,
  //             "status": "null",
  //             "created_at": "2024-04-10T21:05:38.000000Z",
  //             "updated_at": "2024-04-10T21:05:38.000000Z"
  //           },
  //           "attendance_types": [
  //             {
  //               "attendance_type_id": 1,
  //               "queue_totem_id": 7,
  //               "integration_id": "90",
  //               "data": {
  //                 "id": 1,
  //                 "name": "Preferencial +80",
  //                 "icon": "https://saludti.s3.us-east-2.amazonaws.com/attendance_types/user-heart-health.svg",
  //                 "description": "Atendimento exclusivo para pacientes +80.",
  //                 "created_at": "2024-04-09T23:48:09.000000Z",
  //                 "updated_at": "2024-04-09T23:48:09.000000Z"
  //               }
  //             }
  //           ],
  //           "attendance_hours": [
  //             {
  //               "queue_totem_id": 7,
  //               "weekday_iso": 1,
  //               "start_time": "00:00:00",
  //               "end_time": "00:01:00"
  //             },
  //             {
  //               "queue_totem_id": 7,
  //               "weekday_iso": 2,
  //               "start_time": "00:00:00",
  //               "end_time": "00:01:00"
  //             },
  //             {
  //               "queue_totem_id": 7,
  //               "weekday_iso": 3,
  //               "start_time": "00:00:00",
  //               "end_time": "00:01:00"
  //             },
  //             {
  //               "queue_totem_id": 7,
  //               "weekday_iso": 4,
  //               "start_time": "00:00:00",
  //               "end_time": "00:01:00"
  //             },
  //             {
  //               "queue_totem_id": 7,
  //               "weekday_iso": 5,
  //               "start_time": "00:00:00",
  //               "end_time": "00:01:00"
  //             }
  //           ]
  //         }
  //       ],
  //       "screens": [
  //         {
  //           "id": 10,
  //           "screen_id": 6,
  //           "totem_id": 1,
  //           "order": 1,
  //           "data": {
  //             "id": 6,
  //             "name": "Bem-Vindo",
  //             "component": "Welcome",
  //             "description": "componente para o início do atendimento",
  //             "question_id": null,
  //             "created_at": "2024-04-22T23:01:24.000000Z",
  //             "updated_at": "2024-04-22T23:01:24.000000Z",
  //             "subscreens": []
  //           },
  //           "fields": [],
  //           "traits": []
  //         },
  //         {
  //           "id": 1,
  //           "screen_id": 2,
  //           "totem_id": 1,
  //           "order": 2,
  //           "data": {
  //             "id": 2,
  //             "name": "Identificação Paciente",
  //             "component": "Identifier",
  //             "description": "Componente para identificação do paciente",
  //             "question_id": null,
  //             "created_at": "2024-04-09T23:20:24.000000Z",
  //             "updated_at": "2024-04-09T23:20:24.000000Z",
  //             "subscreens": [
  //               {
  //                 "id": 1,
  //                 "name": "Data de Nascimento",
  //                 "component": "BirthDate",
  //                 "description": "Componente para confirmação de cadastro utilizando a data de nascimento",
  //                 "screen_id": 3,
  //                 "order": 0,
  //                 "created_at": "2024-06-13T22:52:01.000000Z",
  //                 "updated_at": "2024-06-13T22:52:01.000000Z"
  //               }
  //             ]
  //           },
  //           "fields": [],
  //           "traits": []
  //         },
  //         {
  //           "id": 100,
  //           "screen_id": 60,
  //           "totem_id": 10,
  //           "order": 3,
  //           "data": {
  //             "id": 6,
  //             "name": "Contato",
  //             "component": "PatientInfo",
  //             "description": "componente para o início do atendimento",
  //             "question_id": null,
  //             "created_at": "2024-04-22T23:01:24.000000Z",
  //             "updated_at": "2024-04-22T23:01:24.000000Z",
  //             "subscreens": [
  //               {
  //                 "id": 1,
  //                 "name": "ContactInfo",
  //                 "component": "ContactInfo",
  //                 "description": "Componente para confirmação de cadastro utilizando a data de nascimento",
  //                 "screen_id": 3,
  //                 "order": 0,
  //                 "created_at": "2024-06-13T22:52:01.000000Z",
  //                 "updated_at": "2024-06-13T22:52:01.000000Z"
  //               }
  //             ]
  //           },
  //           "fields": [],
  //           "traits": []
  //         },
  //         {
  //           "id": 7,
  //           "screen_id": 3,
  //           "totem_id": 1,
  //           "order": 3,
  //           "data": {
  //             "id": 3,
  //             "name": "Agendamento",
  //             "component": "Schedule",
  //             "description": "Componente para exibição de agendamentos a serem processados",
  //             "question_id": null,
  //             "created_at": "2024-04-09T23:20:24.000000Z",
  //             "updated_at": "2024-04-09T23:20:24.000000Z",
  //             "subscreens": []
  //           },
  //           "fields": [],
  //           "traits": []
  //         },
  //         {
  //           "id": 5,
  //           "screen_id": 4,
  //           "totem_id": 1,
  //           "order": 4,
  //           "data": {
  //             "id": 4,
  //             "name": "Assinatura Digital",
  //             "component": "Signature",
  //             "description": "Componente com as opções de assinatura digital.",
  //             "question_id": null,
  //             "created_at": "2024-04-09T23:20:24.000000Z",
  //             "updated_at": "2024-04-09T23:20:24.000000Z",
  //             "subscreens": [
  //               {
  //                 "id": 4,
  //                 "name": "Envio de Token",
  //                 "component": "SendToken",
  //                 "description": "Componente que trata o envio e confirmação do token paciente",
  //                 "screen_id": 4,
  //                 "order": 0,
  //                 "created_at": "2024-04-09T23:20:24.000000Z",
  //                 "updated_at": "2024-04-09T23:20:24.000000Z"
  //               },
  //               {
  //                 "id": 5,
  //                 "name": "Leitura Facial",
  //                 "component": "FaceRecognition",
  //                 "description": "Componente que faz a leitura e validação da facial do paciente.",
  //                 "screen_id": 4,
  //                 "order": 0,
  //                 "created_at": "2024-04-09T23:20:24.000000Z",
  //                 "updated_at": "2024-04-09T23:20:24.000000Z"
  //               },
  //               {
  //                 "id": 6,
  //                 "name": "Assinatura PDF",
  //                 "component": "PDFSignature",
  //                 "description": "Componente faz a chamada do pdf e a sua assinatura no tablet.",
  //                 "screen_id": 5,
  //                 "order": 0,
  //                 "created_at": "2024-06-13T22:52:01.000000Z",
  //                 "updated_at": "2024-06-13T22:52:01.000000Z"
  //              },
  //               {
  //                 "id": 6,
  //                 "name": "Orientação Checkin Sucessos",
  //                 "component": "CheckinSuccess",
  //                 "description": "Componente que exibe as orientações de um checkin bem sucedido.",
  //                 "screen_id": 4,
  //                 "order": 1,
  //                 "created_at": "2024-04-09T23:20:24.000000Z",
  //                 "updated_at": "2024-04-09T23:20:24.000000Z"
  //               }
  //             ]
  //           },
  //           "fields": [],
  //           "traits": [
  //               {
  //                 "screen_totem_id": 5,
  //                 "trait_id": 5,
  //                 "enabled": 1,
  //                 "data": {
  //                     "id": 5,
  //                     "screen_id": 5,
  //                     "slug": "faceRecognition",
  //                     "label": "Leitura da facial",
  //                     "description": "Habilita a assinatura utilizando a facial",
  //                     "created_at": "2024-06-13T22:52:21.000000Z",
  //                     "updated_at": "2024-06-13T22:52:21.000000Z"
  //                 }
  //             },
  //             {
  //                 "screen_totem_id": 5,
  //                 "trait_id": 6,
  //                 "enabled": 1,
  //                 "data": {
  //                     "id": 6,
  //                     "screen_id": 5,
  //                     "slug": "pdfSignature",
  //                     "label": "Assinatura do PDF",
  //                     "description": "Habilita a assinatura utilizando o tablet e o PDF",
  //                     "created_at": "2024-06-13T22:52:21.000000Z",
  //                     "updated_at": "2024-06-13T22:52:21.000000Z"
  //                 }
  //             },
  //             {
  //                 "screen_totem_id": 5,
  //                 "trait_id": 4,
  //                 "enabled": 1,
  //                 "data": {
  //                     "id": 4,
  //                     "screen_id": 5,
  //                     "slug": "sendToken",
  //                     "label": "Envio de token",
  //                     "description": "Habilita a opção de assinatura utilizando o token",
  //                     "created_at": "2024-06-13T22:52:21.000000Z",
  //                     "updated_at": "2024-06-13T22:52:21.000000Z"
  //                 }
  //             }
  //           ]
  //         },
  //         {
  //           "id": 8,
  //           "screen_id": 5,
  //           "totem_id": 1,
  //           "order": 5,
  //           "data": {
  //             "id": 5,
  //             "name": "Filas de Serviços",
  //             "component": "Queues",
  //             "description": "Componente de cardápio de serviços prestados pela unidade/setor",
  //             "question_id": null,
  //             "created_at": "2024-04-09T23:20:24.000000Z",
  //             "updated_at": "2024-04-09T23:20:24.000000Z",
  //             "subscreens": [
  //               {
  //                 "id": 1,
  //                 "name": "Tipo de Atendimento",
  //                 "component": "AttendanceType",
  //                 "description": "Componente para seleção do tipo de atendimento",
  //                 "screen_id": 5,
  //                 "order": 0,
  //                 "created_at": "2024-04-09T23:20:24.000000Z",
  //                 "updated_at": "2024-04-09T23:20:24.000000Z"
  //               },
  //               {
  //                 "id": 3,
  //                 "name": "Exibição de Orientação",
  //                 "component": "PasswordSuccess",
  //                 "description": "Componente para exibição de agendamentos a serem processados",
  //                 "screen_id": 5,
  //                 "order": 2,
  //                 "created_at": "2024-04-09T23:20:24.000000Z",
  //                 "updated_at": "2024-04-09T23:20:24.000000Z"
  //               }
  //             ]
  //           },
  //           "fields": [],
  //           "traits": []
  //         },
  //         {
  //           "id": 8,
  //           "screen_id": 8,
  //           "totem_id": 1,
  //           "order": 7,
  //           "data": {
  //               "id": 8,
  //               "name": "Avaliação de Uso",
  //               "component": "Evaluation",
  //               "description": "Componente para avaliação de uso do sistema",
  //               "question_id": null,
  //               "created_at": "2024-07-05T21:01:16.000000Z",
  //               "updated_at": "2024-07-05T21:01:16.000000Z",
  //               "subscreens": []
  //           },
  //           "fields": [],
  //           "traits": []
  //         }
  //       ]
  //     }
  //   })
  // })
}

export function createTotem(totem: TotemItem) {
  return axios.post(`/totem`, totem);
}

export function updateTotem(id: number, totem: TotemItem) {
  return axios.put(`/totem/${id}`, totem);
  {{ }}
}

export function deleteTotem(id: number) {
  return axios.delete(`/totem/${id}`);
}

export function updateQueueTotem(id: number, props: any) {
  return axios.post(`/totem/${id}/queue`, props);
}

export function deleteQueueTotem(id: number, queueId: string | number) {
  return axios.delete(`/totem/${id}/queue/${queueId}`);
};

export function attachScreens(id: number, screens: ScreenTotem[]) {
  return axios.post(`/totem/${id}/screen`, {
    screens
  });
}

export function deleteScreenTotem(screen: ScreenTotem) {
  return axios.delete(`/totem/${screen.totem_id}/screen/${screen.screen_id}`);
}

export function deleteScreenFieldTotem(screen: ScreenTotem, field: ScreenTotemField) {
  return axios.delete(`/totem/${screen.totem_id}/screen/${screen.screen_id}/field/${field.field_id}`);
}
