import UserPage from "../pages/User/UserPage.vue"
import TeamPage from "../pages/Team/Team.vue"
import SearchPage from "../pages/Search/SearchPage.vue"
import EditPage from "../pages/User/UserEditPage.vue"
import IndexPage from "../pages/Index.vue"
import SearchResultPage from "../pages/Search/SearchResultPage.vue";
import TeamAddPage from "../pages/Team/TeamAddPage.vue";
import LoginPage from "../pages/User/UserLoginPage.vue"
import UserRegisterPage from "../pages/User/UserRegisterPage.vue";
import TeamUpdatePage from "../pages/Team/TeamUpdatePage.vue";
import UserJoinTeamPage from "../pages/User/UserJoinTeamPage.vue";
import UserCreateTeamPage from "../pages/User/UserCreateTeamPage.vue";
import UserUpdatePage from "../pages/User/UserUpdatePage.vue";
import TeamDetailPage from "../pages/Team/TeamDetailPage.vue";
import UserTagsEditPage from "../pages/User/UserTagsEditPage.vue";
import UpdatePasswordPage from "../pages/User/UpdatePasswordPage.vue";
import UserDetailPage from "../pages/User/UserDetailPage.vue";
import BlogEditPage from "../pages/Blog/BlogEditPage.vue";
import UserBlogPage from "../pages/User/UserBlogPage.vue";
import MessagePage from "../pages/Chat/MessagePage.vue";
import UserFansPage from "../pages/User/UserFansPage.vue";
import UserFollowPage from "../pages/User/UserFollowPage.vue";
import UserEmailLoginPage from "../pages/User/UserEmailLoginPage.vue";
import BlogPage from "../pages/Blog/BlogPage.vue";
import UserMyFriends from "../pages/User/UserMyFriends.vue";
import UserFriendsApplicationPage from "../pages/Chat/UserFriendsApplicationPage.vue";
import ChatPage from "../pages/Chat/ChatPage.vue";
import CommentPage from "../pages/Chat/CommentPage.vue";
import LikePage from "../pages/Chat/LikePage.vue";
import FansPage from "../pages/Chat/FansPage.vue";
import SystemMessage from "../pages/Chat/SystemMessage.vue";


const routes = [
    {path: '/', component: IndexPage, title: "主页"},
    {path: '/user', component: UserPage, title: "个人信息"},
    {
        path: '/user/update', component: UserUpdatePage, title: "更新信息", meta: {
            needRefresh: true   // 需要刷新
        }
    },
    {path: '/user/joinTeam', component: UserJoinTeamPage, title: "已加队伍"},
    {path: '/user/createTeam', component: UserCreateTeamPage, title: "创建队伍"},
    {path: '/user/editTag', component: UserTagsEditPage, title: "修改用户标签"},
    {path: '/user/edit', component: EditPage, title: "编辑信息"},
    {path: '/user/list', component: SearchResultPage, title: "用户列表"},
    {path: '/user/login', component: LoginPage, title: "用户登录"},
    {path: '/user/email/login', component: UserEmailLoginPage, title: "用户登录"},
    {path: '/user/register', component: UserRegisterPage, title: "用户登录"},
    {path: '/user/detail', component: UserDetailPage, title: "用户详情"},

    {path: '/blog/edit', title: '博文编辑', component: BlogEditPage, meta: {layout: 'blog-edit'}},
    {path: '/blog/details', title: '博文详情', component: BlogPage},

    {path: '/message', title: '聊天界面', component: MessagePage},
    {path: '/user/fans', title: '粉丝列表', component: UserFansPage},


    {path: '/message/like', title: '点赞消息', component: LikePage},
    {path: '/message/fans', title: '新增粉丝消息', component: FansPage},
    {path: '/message/system', title: '系统消息', component: SystemMessage},
    {path: '/message/application', title: '好友申请消息', component: UserFriendsApplicationPage},
    {path: '/message/comment', title: '新增评论消息', component: CommentPage},


    {path: '/friend/list', title: '好友列表', component: UserMyFriends},
    {path: '/user/follows', title: '关注列表', component: UserFollowPage},
    {path: '/user/blog', title: '我的博文', component: UserBlogPage},
    {path: '/update/password', component: UpdatePasswordPage, title: "修改密码"},
    {path: '/search', component: SearchPage, title: "查找伙伴"},
    {path: '/team', component: TeamPage, title: "找队伍"},
    {path: '/team/add', component: TeamAddPage, title: "添加队伍"},
    {path: '/team/update', component: TeamUpdatePage, title: "队伍更新"},
    {path: '/team/detail', component: TeamDetailPage, title: "队伍更新"},
    {path: '/chat', component: ChatPage, title: "聊天室"},
]
export default routes