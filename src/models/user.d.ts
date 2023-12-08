/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    useraccount: string;
    avatarUrl?: string;
    profile?: string;
    gender: number;
    phone: string;
    email: string;
    status: number;
    // userRole: number;
    tags: string;
    deptId: number;
    createTime: Date;
};