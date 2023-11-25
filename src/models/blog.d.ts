import {UserType} from "./user";

export type BlogType = {
    id: number,
    author: UserType,
    userId: number,
    title: string,
    content: string,
    images?: string,
    likedNum: number,
    isLike: boolean,
    coverImage?: string,
    commentsNum: number,
    createTime: Date,
    updateTime: Date
}
