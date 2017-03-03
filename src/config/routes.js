import Login from '../components/Login.vue'
import NotFound from '../components/404.vue'
import Home from "../components/home.vue"
import Task from "../components/task.vue"
import StatisticsQuery from "../components/statistics.vue"
import Data from "../components/basic_data.vue"
import System from "../components/system.vue"
//task
import AddTask from "../components/task/add_task.vue"
import ManageTask from "../components/task/manage_task.vue"
import TaskOperate from "../components/task/task_operate.vue"
import TrainData from "../components/task/train_data.vue"
import Statistics from "../components/task/statistics.vue"
import StatisticsManage from "../components/task/statistics_manage.vue"
//basic data
import TrainStyle from "../components/basic_data/train_style.vue"
import GuDao from "../components/basic_data/gudao.vue"
import XiuCheng from "../components/basic_data/xiucheng.vue"
import TrainNum from "../components/basic_data/train_num.vue"
import TaskContent from "../components/basic_data/task_content.vue"
import Maintain from "../components/basic_data/maintain.vue"
import StatusReport from "../components/basic_data/status_report.vue"
//system
import PartManage from "../components/system/part_manage.vue"
import UserManage from "../components/system/user_manage.vue"
import TaskGroupManage from "../components/system/task_group_manage.vue"
import RoleManage from "../components/system/role_manage.vue"

export default
	[
        {
            path: '/login',
            component: Login,
            name: '',
            hidden: true
        },
        {
            path: '/404',
            component: NotFound,
            name: '',
            hidden: true
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    path: '/home/task',
                    component: Task,
                    name: 'task',
                    hidden: true,
                    children: [
                        { path: '/home/task/add_task', component: AddTask, name: 'add_task' },
                        { path: '/home/task/manage_task', component: ManageTask, name: 'manage_task' },
                        { path: '/home/task/task_operate', component: TaskOperate, name: 'task_operate' },
                        { path: '/home/task/train_data', component: TrainData, name: 'train_data' },
                        { path: '/home/task/statistics', component: Statistics, name: 'statistics' },
                        { path: '/home/task/statistics_manage', component: StatisticsManage, name: 'statistics_manage' }
                    ]
                },
                { path: '/home/statistic', component: StatisticsQuery, name: 'statistics_query' },
                {
                    path: '/home/basic_data',
                    component: Data,
                    name: 'basic_data',
                    children: [
                        { path: '/home/basic_data/train_style', component: TrainStyle, name: 'train_style' },
                        { path: '/home/basic_data/gudao', component: GuDao, name: 'gudao' },
                        { path: '/home/basic_data/xiucheng', component: XiuCheng, name: 'xiucheng' },
                        { path: '/home/basic_data/train_num', component: TrainNum, name: 'train_num' },
                        { path: '/home/basic_data/task_content', component: TaskContent, name: 'task_content' },
                        { path: '/home/basic_data/maintain', component: Maintain, name: 'maintain' },
                        { path: '/home/basic_data/status_report', component: StatusReport, name: 'status_report' }
                    ]
                },
                { path: '/home/system',
                    component: System,
                    name: 'system',
                    children: [
                        { path: '/home/system/part_manage', component: PartManage, name: 'part_manage' },
                        { path: '/home/system/user_manage', component: UserManage, name: 'user_manage' },
                        { path: '/home/system/task_group_manage', component: TaskGroupManage, name: 'task_group_manage' },
                        { path: '/home/system/role_manage', component: RoleManage, name: 'role_manage' },
                    ]
                },
                { path: '/home', redirect: '/home/task' },
            ],
        },
        // {
        //     path: '/work',
        //     component: Work
        // },
        // {
        //     path: '/search',
        //     component: Search
        // },
        // {
        //     path: '/data',
        //     component: Data
        // },
        // {
        //     path: '/system',
        //     component: System
        // },
        {
            path: '*',
            redirect: '/home'
        }
	]
