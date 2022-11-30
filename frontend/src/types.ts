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

export interface IRestaurant {
    id: number
    name: string
    email: string | null
    image: string | null
    phoneNumber: number | null
    openTime: string | null
    closeTime: string | null
    description: string | null
    distance: number
    price: number
}

export interface ICategory {
    id: number
    name: string
    image: string
}

export interface IFilter {
    longtitude: number,
    latitude: number,

    searchString: string,
    sortBy: "distance" | "price",
    maxDistance: number,

    categories: number[]
}
