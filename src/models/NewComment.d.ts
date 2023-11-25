import {UserType} from "./user";

export type NewComment= {
    commenter: UserType,
    replyInfo: string,
    blogCover: string,
    content: string,
    createTime: Date,
}