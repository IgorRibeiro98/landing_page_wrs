import instance from '@/plugins/axios';

export function getAttendanceTypes() {
    return instance.get('/attendance-type')
}

export function createAttendanceType(item: FormData) {
    return instance.post(`/attendance-type`, item);
}

export function updateAttendanceType(id: number, item: FormData) {
    item.append('_method', 'PUT')

    return instance.post(`/attendance-type/${id}`, item);
}

export function deleteAttendanceType(id: number) {
    return instance.delete(`/attendance-type/${id}`);
}