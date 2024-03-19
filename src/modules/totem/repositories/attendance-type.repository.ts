import instance from '@/plugins/axios'

export function getAttendanceTypes() {
    return instance.get('/attendance-type')
}