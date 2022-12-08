export const createAppointmentMockRequest = {
    _id: '507f191e810c19729de860ea',
    weekOfYear: 48,
    year: 2022,
    user: {
        _id: '507f191e810c19729de860ea',
        name: 'Rodrigo Correa',
        email: 'rodrigo.tornaciole@leanonsystems.com',
        availability: 'Full'
    },
    project: {
        _id: '507f191e810c19729de860ea',
        name: 'Nextly Mock',
        tag: 'NMK'
    },
    status: 'Allocated',
    availability: 'Full'
}

export const createAppointmentMockResponse = {
    weekOfYear: 48,
    year: 2022,
    user: {
        _id: '507f191e810c19729de860ea',
        name: 'Rodrigo Correa',
        email: 'rodrigo.tornaciole@leanonsystems.com',
        availability: 'Full'
    },
    project: {
        _id: '507f191e810c19729de860ea',
        name: 'Nextly Mock',
        tag: 'NMK'
    },
    status: 'Allocated',
    availability: 'Full'
}

export const updateAppointmentMockResponse = {
    availability: 'Part-time'
}

export const searchAppointmentMockRequest = {
    startWeekOfYear: 48,
    endWeekOfYear: 48,
    year: 2022
}