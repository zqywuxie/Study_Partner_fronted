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
import UserMyFriendsPage from "../pages/User/UserMyFriendsPage.vue";
import UserFollowPage from "../pages/User/UserFollowPage.vue";


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
    {path: '/user/register', component: UserRegisterPage, title: "用户登录"},
    {path: '/user/detail', component: UserDetailPage, title: "用户详情"},
    {path: '/blog/edit', title: '博文编辑', component: BlogEditPage, meta: {layout: 'blog-edit'}},
    {path: '/message', title: '聊天界面', component: MessagePage},
    {path: '/user/fans', title: '粉丝列表', component: UserFansPage},
    {path: '/user/friends', title: '好友列表', component: UserMyFriendsPage},
    {path: '/user/follows', title: '关注列表', component: UserFollowPage},
    {path: '/user/blog', title: '我的博文', component: UserBlogPage},
    {path: '/update/password', component: UpdatePasswordPage, title: "修改密码"},
    {path: '/search', component: SearchPage, title: "查找伙伴"},
    {path: '/team', component: TeamPage, title: "找队伍"},
    {path: '/team/add', component: TeamAddPage, title: "添加队伍"},
    {path: '/team/update', component: TeamUpdatePage, title: "队伍更新"},
    {path: '/team/detail', component: TeamDetailPage, title: "队伍更新"},
]
export default routes