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

export interface IFilter {
    longtitude: number,
    latitude: number,

    searchString: string,
    sortBy: "distance" | "price",
    maxDistance: number,

    categories: number[]
}
