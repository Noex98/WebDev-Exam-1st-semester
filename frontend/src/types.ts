export interface IUser {
    firstname: string,
    lastname: string,
    age: number,
    gender: "male" | "female",
    height: number
}

export interface ICurrentUser extends IUser {
    preferences: {
        ageMin: number,
        ageMax: number,
        heightMin: number,
        heightMax: number,
        gender: "male" | "female" | "all"
    };
    birthday: string
}

export interface IRes<T> {
    succes: boolean,
    errMessage: string,
    data: T
}