import { ICategory, IReservation, IRestaurant, IRestaurantFull, IUser } from "../types";

export class apiService {

    static xCsrfToken = '';

    static getCsrfToken = async() => {
        const url = 'api/csrf/'
        const res = await fetch(url, {
            credentials: "include",
        })
        this.xCsrfToken = await res.text();
    }

    static login = async (
        email: string, 
        password: string
    ): Promise<IUser> => {
        const url = '/api//login/'
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.xCsrfToken
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if(res.ok) return await res.json();
        throw await res.text();
    }

    static continueSession = async (): Promise<IUser> => {
        const url = '/api/continueSession/'
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'Application/json',
                'X-Csrf-Token': this.xCsrfToken
            }
        })

        if(res.ok) return await res.json();
        throw await res.text();
    }

    static signup = async (
        name: string,
        phoneNumber: string,
        email: string,
        password: string,
    ): Promise<boolean> => {
        const url = '/api/signup/'
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.xCsrfToken
            },
            body: JSON.stringify({
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                password: password,
            })
        })
        if(res.ok) return true;
        throw await res.text();
    }

    static getRestaurantList = async(
        latitude: number,
        longtitude: number,
        maxDistance: number,
        categories: number[],
        searchString: string,
        sortBy: "price" | "distance"
    ): Promise<IRestaurant[]> => {
        const url = '/api/restaurantList/'
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.xCsrfToken
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
        if(res.ok) return await res.json();
        throw await res.text();
    }

    static getCategories = async(): Promise<ICategory[]> => {
        const url = '/api/categories/'
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.xCsrfToken
            }
        })
        if(res.ok) return await res.json();
        throw await res.text();
    }

    static getRestaurant = async(id: string): Promise<IRestaurantFull> => {
        const url = '/api/restaurant/'
        const res = await fetch(url, {
            method: 'POST', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.xCsrfToken
            },  body: JSON.stringify({
                id: id
            })
        })
        if(res.ok) return await res.json();
        throw await res.text();
    }

    static createReservation = async(
        restaurantId: number,
        peopleNum: number,
        date: any,
        time: any,
        comment: string
    ): Promise<boolean> => {
        const url = '/api/createReservation/'
        const res = await fetch(url, {
            method: 'POST', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.xCsrfToken
            },
            body: JSON.stringify({
                restaurantId: restaurantId,
                date: date,
                time: time,
                comment: comment,
                peopleNum: peopleNum
            })
        })
        if(res.ok) return true;
        throw await res.text();
    }

    static getReservations = async(): Promise<IReservation[]> =>{
        const url = '/api/reservations/'
        const res = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.xCsrfToken
            }
        })
        if(res.ok) return await res.json();
        throw await res.text();
    }

    static deleteReservation = async(id: number): Promise<null> => {
        const url = '/api/deleteReservation/'
        const res = await fetch(url, {
            method: 'POST', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.xCsrfToken
            }, 
            body: JSON.stringify({
                id: id
            })
        })

        if(res.ok) return null;
        throw await res.text();
    }

    static deleteUser = async(): Promise<boolean> => {
        const url = '/api/deleteUser/'
        const res = await fetch(url, {
            method: 'POST', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.xCsrfToken
            }
        })
        if(res.ok) return true;
        throw await res.text();
    }

    static logout = async (): Promise<null> => {
        const url = '/api/logout/'
        await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.xCsrfToken
            },
        })
        return null;
    }
    
    static editUser = async(
        key: string, 
        value: string | number
    ): Promise<boolean> => {
        const url = '/api/editUser/'
        const res = await fetch (url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': this.xCsrfToken
            }, body: JSON.stringify({
                key: key,
                value: value
            })
        })
        if(res.ok) return true;
        throw await res.text();
    }
}