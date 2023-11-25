import {UserType} from "./user";
import {BlogType} from "./blog";

export type CommentType = {
    id: number,
    userId: number,
    commentUser: UserType,
    blogId: number,
    parentId?: number,
    answerId?: number,
    isLiked: boolean,
    content: string,
    likedNum: number,
    status: number,
    blog: BlogType,
    createTime: Date,
    updateTime: Date
}
