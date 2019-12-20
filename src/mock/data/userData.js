import Mock from 'mockjs';
//平台用户信息
const userLoginInfo = {
	"id": 1,
	"createTime": "2018-01-02T01:32:15.000+0000",
	"updateTime": "2019-12-11T09:41:33.000+0000",
	"username": "root",
	"password": "CGUx1FN++xS+4wNDFeN6DA==",
	"nickname": "超级管理员",
	"mobile": "15151551516",
	"email": "843977358@qq.com",
	"qq": "843977358",
	"birthday": null,
	"gender": null,
	"avatar": "https://static.zhyd.me/static/img/favicon.ico",
	"userType": "ROOT",
	"regIp": null,
	"lastLoginIp": "192.168.2.15",
	"lastLoginTime": "2019-12-11T09:41:33.000+0000",
	"loginCount": 418,
	"remark": null,
	"status": 1,
	"token": "5ARoRf5ArsFLyTwza66cYQ==",
	"userId": null,
	"isAdmin": null
};
const userList = [{
		id: "10001",
		password: "100001",
		name: "张三1",
		username: "zhangsan1",
		roleId: "1010",
		roleName: "管理员",
		phone: "13355556666",
		email: "xhhuang@dhlk-tech.com",
		lastLoginTime: "20191215 18:35",
	},
	{
		id: "10002",
		name: "张三2",
		password: "100002",
		username: "zhangsan2",
		roleId: "1010",
		roleName: "管理员",
		phone: "13355556666",
		email: "xhhuang@dhlk-tech.com",
		lastLoginTime: "20191215 18:35",
	},
	{
		id: "10003",
		password: "100003",
		name: "张三3",
		username: "zhangsan3",
		roleId: "1011",
		roleName: "管理员",
		phone: "13355556666",
		email: "xhhuang@dhlk-tech.com",
		lastLoginTime: "20191215 18:35",
	},
	{
		id: "10004",
		password: "100004",
		name: "张三4",
		username: "zhangsan4",
		roleId: "1012",
		roleName: "管理员",
		phone: "13355556666",
		email: "xhhuang@dhlk-tech.com",
		lastLoginTime: "20191215 18:35",
	},
	{
		id: "10005",
		password: "100005",
		name: "张三5",
		username: "zhangsan5",
		roleId: "1011",
		roleName: "管理员",
		phone: "13355556666",
		email: "xhhuang@dhlk-tech.com",
		lastLoginTime: "20191215 18:35",
	},
	{
		id: "10006",
		name: "张三6",
		password: "100006",
		username: "zhangsan6",
		roleId: "1010",
		roleName: "管理员",
		phone: "13355556666",
		email: "xhhuang@dhlk-tech.com",
		lastLoginTime: "20191215 18:35",
	},
	{
		id: "10007",
		password: "100007",
		name: "张三7",
		username: "zhangsan7",
		roleId: "1011",
		roleName: "管理员",
		phone: "13355556666",
		email: "xhhuang@dhlk-tech.com",
		lastLoginTime: "20191215 18:35",
	},
	{
		id: "10008",
		password: "100008",
		name: "张三8",
		username: "zhangsan8",
		roleId: "1012",
		roleName: "管理员",
		phone: "13355556666",
		email: "xhhuang@dhlk-tech.com",
		lastLoginTime: "20191215 18:35",
	},
	{
		id: "10009",
		name: "张三9",
		password: "100009",
		username: "zhangsan9",
		roleId: "1010",
		roleName: "管理员",
		phone: "13355556666",
		email: "xhhuang@dhlk-tech.com",
		lastLoginTime: "20191215 18:35",
	},
	{
		id: "10010",
		password: "100010",
		name: "张三10",
		username: "zhangsan10",
		roleId: "1011",
		roleName: "管理员",
		phone: "13355556666",
		email: "xhhuang@dhlk-tech.com",
		lastLoginTime: "20191215 18:35",
	},
	{
		id: "10011",
		password: "100011",
		name: "张三11",
		username: "zhangsan11",
		roleId: "1012",
		roleName: "管理员",
		phone: "13355556666",
		email: "xhhuang@dhlk-tech.com",
		lastLoginTime: "20191215 18:35",
	}
];
const roleList = [{
		id: "10001",
		roleName: "超级管理员",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	},
	{
		id: "10002",
		roleName: "主管",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	},
	{
		id: "10003",
		roleName: "普通用户",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	},
	{
		id: "10004",
		roleName: "超级管理员",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	},
	{
		id: "10005",
		roleName: "主管",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	},
	{
		id: "10006",
		roleName: "普通用户",
		remark: "管理员",
		userIds: "张三,里斯,王五"
	}
];
const deptUserList = [{
	value: 'zhinan',
	label: '指南',
	children: [{
		value: 'shejiyuanze',
		label: '设计原则',
		children: [{
			value: 'yizhi',
			label: '一致'
		}, {
			value: 'fankui',
			label: '反馈'
		}, {
			value: 'xiaolv',
			label: '效率'
		}, {
			value: 'kekong',
			label: '可控'
		}]
	}, {
		value: 'daohang',
		label: '导航',
		children: [{
			value: 'cexiangdaohang',
			label: '侧向导航'
		}, {
			value: 'dingbudaohang',
			label: '顶部导航'
		}]
	}]
}, {
	value: 'zujian',
	label: '组件',
	children: [{
		value: 'basic',
		label: 'Basic',
		children: [{
			value: 'layout',
			label: 'Layout 布局'
		}, {
			value: 'color',
			label: 'Color 色彩'
		}, {
			value: 'typography',
			label: 'Typography 字体'
		}, {
			value: 'icon',
			label: 'Icon 图标'
		}, {
			value: 'button',
			label: 'Button 按钮'
		}]
	}, {
		value: 'form',
		label: 'Form',
		children: [{
			value: 'radio',
			label: 'Radio 单选框'
		}, {
			value: 'checkbox',
			label: 'Checkbox 多选框'
		}, {
			value: 'input',
			label: 'Input 输入框'
		}, {
			value: 'input-number',
			label: 'InputNumber 计数器'
		}, {
			value: 'select',
			label: 'Select 选择器'
		}, {
			value: 'cascader',
			label: 'Cascader 级联选择器'
		}, {
			value: 'switch',
			label: 'Switch 开关'
		}, {
			value: 'slider',
			label: 'Slider 滑块'
		}, {
			value: 'time-picker',
			label: 'TimePicker 时间选择器'
		}, {
			value: 'date-picker',
			label: 'DatePicker 日期选择器'
		}, {
			value: 'datetime-picker',
			label: 'DateTimePicker 日期时间选择器'
		}, {
			value: 'upload',
			label: 'Upload 上传'
		}, {
			value: 'rate',
			label: 'Rate 评分'
		}, {
			value: 'form',
			label: 'Form 表单'
		}]
	}, {
		value: 'data',
		label: 'Data',
		children: [{
			value: 'table',
			label: 'Table 表格'
		}, {
			value: 'tag',
			label: 'Tag 标签'
		}, {
			value: 'progress',
			label: 'Progress 进度条'
		}, {
			value: 'tree',
			label: 'Tree 树形控件'
		}, {
			value: 'pagination',
			label: 'Pagination 分页'
		}, {
			value: 'badge',
			label: 'Badge 标记'
		}]
	}, {
		value: 'notice',
		label: 'Notice',
		children: [{
			value: 'alert',
			label: 'Alert 警告'
		}, {
			value: 'loading',
			label: 'Loading 加载'
		}, {
			value: 'message',
			label: 'Message 消息提示'
		}, {
			value: 'message-box',
			label: 'MessageBox 弹框'
		}, {
			value: 'notification',
			label: 'Notification 通知'
		}]
	}, {
		value: 'navigation',
		label: 'Navigation',
		children: [{
			value: 'menu',
			label: 'NavMenu 导航菜单'
		}, {
			value: 'tabs',
			label: 'Tabs 标签页'
		}, {
			value: 'breadcrumb',
			label: 'Breadcrumb 面包屑'
		}, {
			value: 'dropdown',
			label: 'Dropdown 下拉菜单'
		}, {
			value: 'steps',
			label: 'Steps 步骤条'
		}]
	}, {
		value: 'others',
		label: 'Others',
		children: [{
			value: 'dialog',
			label: 'Dialog 对话框'
		}, {
			value: 'tooltip',
			label: 'Tooltip 文字提示'
		}, {
			value: 'popover',
			label: 'Popover 弹出框'
		}, {
			value: 'card',
			label: 'Card 卡片'
		}, {
			value: 'carousel',
			label: 'Carousel 走马灯'
		}, {
			value: 'collapse',
			label: 'Collapse 折叠面板'
		}]
	}]
}, {
	value: 'ziyuan',
	label: '资源',
	children: [{
		value: 'axure',
		label: 'Axure Components'
	}, {
		value: 'sketch',
		label: 'Sketch Templates'
	}, {
		value: 'jiaohu',
		label: '组件交互文档'
	}]
}];
const homeMenuList=[//主页菜单
    {
        "id": 14,
        "createTime": "2019-12-10 23:02:52",
        "updateTime": "2019-12-10 23:02:52",
        "appUrl": "http://www.baidu.com",
        "appIcon": "../assets/img/light.png",
        "appName": "用户管理",
        "projectId": 1,
        "xaxis": "string",
        "yaxis": "string"
    },
    {
        "id": 15,
        "createTime": "2019-12-11 18:03:18",
        "updateTime": "2019-12-11 18:03:21",
        "appUrl": "http://www.baidu.com",
        "appIcon": "../assets/img/light.png",
        "appName": "系统设置",
        "projectId": 1,
        "xaxis": null,
        "yaxis": null
    },
    {
        "id": 16,
        "createTime": "2019-12-11 18:04:21",
        "updateTime": "2019-12-11 18:04:21",
        "appUrl": "http://www.baidu.com",
        "appIcon": "../assets/img/light.png",
        "appName": "数据监控",
        "projectId": 1,
        "xaxis": null,
        "yaxis": null
    },
    {
        "id": 17,
        "createTime": "2019-12-11 18:05:45",
        "updateTime": "2019-12-11 18:05:45",
        "appUrl": "http://www.baidu.com",
        "appIcon": "../assets/img/light.png",
        "appName": "部门管理",
        "projectId": 1,
        "xaxis": null,
        "yaxis": null
    },
    {
        "id": 18,
        "createTime": "2019-12-11 18:06:38",
        "updateTime": "2019-12-11 18:06:38",
        "appUrl": "http://www.baidu.com",
        "appIcon": "../assets/img/light.png",
        "appName": "产品管理",
        "projectId": 1,
        "xaxis": null,
        "yaxis": null
    }
];
export {
	userLoginInfo,
	userList,
	roleList,
	homeMenuList
};