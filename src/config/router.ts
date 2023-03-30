import UserPage from "../pages/UserPage.vue"
import TeamPage from "../pages/Team.vue"
import SearchPage from "../pages/SearchPage.vue"
import EditPage from "../pages/UserEditPage.vue"
import IndexPage from "../pages/Index.vue"
import SearchResultPage from "../pages/SearchResultPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import LoginPage from "../pages/UserLoginPage.vue"
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserJoinTeamPage from "../pages/UserJoinTeamPage.vue";
import UserCreateTeamPage from "../pages/UserCreateTeamPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import TeamDetailPage from "../pages/TeamDetailPage.vue";
import UserTagsEditPage from "../pages/UserTagsEditPage.vue";


const routes = [
    {path: '/', component: IndexPage, title: "主页"},
    {path: '/user', component: UserPage, title: "个人信息"},
    {path: '/user/update', component: UserUpdatePage,title:"更新信息"},
    {path: '/user/joinTeam', component: UserJoinTeamPage,title: "已加队伍"},
    {path: '/user/createTeam', component: UserCreateTeamPage,title: "创建队伍"},
    {path: '/user/editTag', component: UserTagsEditPage,title: "修改用户标签"},
    {path: '/user/edit', component: EditPage,title: "编辑信息"},
    {path: '/user/list', component: SearchResultPage,title: "用户列表"},
    {path: '/user/login', component: LoginPage,title: "用户登录"},
    {path: '/user/register', component: UserRegisterPage,title: "用户登录"},
    {path: '/search', component: SearchPage,title:"查找伙伴"},
    {path: '/team', component: TeamPage, title: "找队伍"},
    {path: '/team/add', component: TeamAddPage,title: "添加队伍"},
    {path: '/team/update', component: TeamUpdatePage,title: "队伍更新"},
    {path: '/team/detail', component: TeamDetailPage,title: "队伍更新"},
]
export default routes