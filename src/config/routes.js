import Login from '../components/Login.vue'
import NotFound from '../components/404.vue'
import NoPermission from '../components/no_permission.vue'
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
            path: '/no_permission',
            component: NoPermission,
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
                        { path: '/home/task/add_task', component: AddTask, name: 'add_task', meta:'添加作业计划'},
                        { path: '/home/task/manage_task', component: ManageTask, name: 'manage_task',meta:'作业计划管理' },
                        { path: '/home/task/task_operate', component: TaskOperate, name: 'task_operate',meta:'作业操作'},
                        { path: '/home/task/train_data', component: TrainData, name: 'train_data',meta:'一车一档查询' },
                        { path: '/home/task/statistics', component: Statistics, name: 'statistics',meta:'滤网布工作量统计' },
                        { path: '/home/task/statistics_manage', component: StatisticsManage, name: 'statistics_manage',meta:'滤网布统计管理' }
                    ]
                },
                {
                    path: '/home/statistic',
                    component: StatisticsQuery,
                    name: 'statistics_query',
                    children: []
                },
                {
                    path: '/home/basic_data',
                    component: Data,
                    name: 'basic_data',
                    children: [
                        { path: '/home/basic_data/train_style', component: TrainStyle, name: 'train_style',meta:'车型管理' },
                        { path: '/home/basic_data/gudao', component: GuDao, name: 'gudao',meta:'股道管理' },
                        { path: '/home/basic_data/xiucheng', component: XiuCheng, name: 'xiucheng',meta:'修程管理' },
                        { path: '/home/basic_data/train_num', component: TrainNum, name: 'train_num', meta:'车列号管理'},
                        { path: '/home/basic_data/task_content', component: TaskContent, name: 'task_content',meta:'作业内容' },
                        { path: '/home/basic_data/maintain', component: Maintain, name: 'maintain',meta:'故障维护' },
                        { path: '/home/basic_data/status_report', component: StatusReport, name: 'status_report',meta:'情况说明' }
                    ]
                },
                { path: '/home/system',
                    component: System,
                    name: 'system',
                    children: [
                        { path: '/home/system/part_manage', component: PartManage, name: 'part_manage', meta:'部门管理'},
                        { path: '/home/system/user_manage', component: UserManage, name: 'user_manage', meta:'用户管理' },
                        { path: '/home/system/task_group_manage', component: TaskGroupManage, name: 'task_group_manage',meta:'作业小组管理' },
                        { path: '/home/system/role_manage', component: RoleManage, name: 'role_manage',meta:'角色管理' },
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
