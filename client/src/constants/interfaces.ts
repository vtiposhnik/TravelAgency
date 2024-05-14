export interface User {
    _id: string,
    username: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    isAdmin: boolean
}

export interface ITours {
    _id: string,
    name: string,
    slug: string,
    startLoc: string,
    duration: number,
    maxPeople: number,
    difficulty: string,
    ratingAvg: number,
    price: number,
    summary: string,
    description: string,
    coverImg: string,
    images: string[],
    createdAt: string,
    updatedAt: string
}
export const initialTourState = {
    _id: '12345678',
    name: 'Untitled',
    slug: 'default',
    startLoc: 'Not Decided Yet!',
    duration: 10,
    maxPeople: 20,
    difficulty: 'medium',
    ratingAvg: 5.0,
    price: 999,
    images: ["default", "default", "default"],
    summary: 'default summary',
    description: 'default description',
    coverImg: 'default image',
    createdAt: 'default date',
    updatedAt: 'default date'
}