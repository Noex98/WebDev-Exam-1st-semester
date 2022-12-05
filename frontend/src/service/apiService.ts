import { ICategory, IRes, IRestaurant, IRestaurantFull, IUser } from "../types";

export class apiService {

    static login = async (
        email: string, 
        password: string
    ): Promise<IRes<IUser>> => {
        const url = '/api//login'
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        return await res.json();
    }

    static continueSession = async (): Promise<IRes<IUser>> => {
        const url = '/api/continueSession'
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'Application/json'
            }
        })
        return await res.json();
    }

    static signup = async (
        name: string,
        phoneNumber: string,
        email: string,
        password: string,
    ): Promise<IRes<null>> => {
        const url = '/api/signup'
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                password: password,
            })
        })
        return await res.json();
    }

    static getRestaurantList = async(
        latitude: number,
        longtitude: number,
        maxDistance: number,
        categories: number[],
        searchString: string,
        sortBy: "price" | "distance"
    ): Promise<IRes<IRestaurant[]>> => {
        const url = '/api/restaurantList'
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                latitude: latitude,
                longtitude: longtitude,
                maxDistance: maxDistance,
                categories: categories,
                searchString: searchString,
                sortBy: sortBy
            })
        })
        return await res.json();
    }

    static getCategories = async(): Promise<IRes<ICategory[]>> => {
        const url = '/api/categories'
        const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return await res.json();

    }

    static getRestaurant = async(id: string): Promise<IRes<IRestaurantFull>> => {
        const url = '/api/restaurant'
        const res = await fetch(url, {
            method: 'POST', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },  body: JSON.stringify({
                id: id
            })
        })
        return await res.json();
    }

    
    static deleteUser = async(): Promise<IRes<null>> => {
        const url = '/api/deleteUser'
        const res = await fetch(url, {
            method: 'POST', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await res.json();
    }

    static logout = async (): Promise<IRes<null>> => {
        const url = '/api/logout'
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        })
        return await res.json();
    }
    
    static editUser = async(
        key: string, 
        value: string | number
    ) => {
        const url = '/api/editUser'
        const res = await fetch (url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                key: key,
                value: value
            })
        })
        return await res.json()
    }
}