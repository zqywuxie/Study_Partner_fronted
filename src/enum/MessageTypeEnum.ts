// 消息类型枚举
export enum MessageTypeEnum {
    BLOG_LIKE = 0,
    BLOG_COMMENT_LIKE = 1,
    COMMENT_ADD = 2,
    FRIEND_APPLICATION = 3,
    SYSTEM_MESSAGES = 4,
    FOLLOW_NOTIFICATIONS = 5,
}

// 消息类型文本映射
export const MessageTypeText = {
    [MessageTypeEnum.BLOG_LIKE]: "博文点赞",
    [MessageTypeEnum.BLOG_COMMENT_LIKE]: "博文评论点赞",
    [MessageTypeEnum.COMMENT_ADD]: "博文评论添加",
    [MessageTypeEnum.FRIEND_APPLICATION]: "好友申请",
    [MessageTypeEnum.SYSTEM_MESSAGES]: "系统消息",
    [MessageTypeEnum.FOLLOW_NOTIFICATIONS]: "关注通知",
};
