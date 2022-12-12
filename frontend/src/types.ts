export interface IRes<T> {
    succes: boolean,
    errMessage: string,
    data: T
}

export interface IUser {
    name: string,
    email: string,
    phoneNumber: number
}

export interface IRestaurant {
    id: number
    name: string
    email: string
    image: string
    phoneNumber: number
    openTime: string
    closeTime: string
    description: string
    distance: number
    price: number
    address: string
}

export interface IMenuItem {
    title: string
    description: string
    price: number
}

export interface IRestaurantFull extends IRestaurant {
    menuItems: IMenuItem[]
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

export interface IReservation {
    id: number,
    restaurantId: number,
    restaurantName: string,
    image: string,
    time: string,
    peopleNum: number,
    date: string,
    comment: string, 
    status: "accepted", 
}
