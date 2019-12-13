import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import qs from 'qs';

//-----------------------用户中心管理模块------------------------
import { 
	userLoginInfo
} from './data/userData';


export default {
	/**
	 * mock bootstrap
	 */
	bootstrap() {
		let mock = new MockAdapter(axios);
		// mock success request
		mock.onGet('/success').reply(200, {
			msg: 'success'
		});
		// mock error request
		mock.onGet('/error').reply(500, {
			msg: 'failure'
		});
		//检查登录
		mock.onPost('passport/signin').reply(config => {
			let {
				username,
				password,
				rememberMe
			} = qs.parse(config.data);
			let mockLoginUsers =userLoginInfo;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve([200, {
						status: 200,
						message: '登录成功',
						data: mockLoginUsers
					}]);
				}, 500);
			});
		});
	}
}