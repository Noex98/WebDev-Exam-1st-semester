export interface IRes<T> {
    succes: boolean,
    errMessage: string,
    data: T
}

export interface IUser {
    firstname: string,
    lastname: string,
    email: string,
    phoneNumber: number
}

export interface IResturant {
    id: number,
    name: string,
    email: string,
    image: string,
    phoneNumber: number
    openTime: string,
    closeTime: string,
    description: string,
    location: string,
}

