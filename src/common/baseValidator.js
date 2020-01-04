const formValidate = {
	/*是否合法IP地址*/
	validateIP:(rule, value, callback)=>{
		if(value == '' || value == undefined || value == null) {
			callback();
		} else {
			const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
			if((!reg.test(value)) && value != '') {
				callback(new Error('请输入正确的IP地址'));
			} else {
				callback();
			}
		}
	},
	/* 是否手机号码或者固话*/
	validatePhoneTwo:(rule, value, callback) =>{
		const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;;
		if(value == '' || value == undefined || value == null) {
			callback();
		} else {
			if((!reg.test(value)) && value != '') {
				callback(new Error('请输入正确的电话号码或者固话号码'));
			} else {
				callback();
			}
		}
	},
	/* 是否固话*/
	validateTelphone:(rule, value, callback) =>{
		const reg = /0\d{2}-\d{7,8}/;
		if(value == '' || value == undefined || value == null) {
			callback();
		} else {
			if((!reg.test(value)) && value != '') {
				callback(new Error('请输入正确的固话（格式：区号+号码,如010-1234567）'));
			} else {
				callback();
			}
		}
	},
	/* 是否手机号码*/
	validatePhone:(rule, value, callback) =>{
		const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
		if(value == '' || value == undefined || value == null) {
			callback();
		} else {
			if((!reg.test(value)) && value != '') {
				callback(new Error('请输入正确的电话号码'));
			} else {
				callback();
			}
		}
	},
	/* 是否身份证号码*/
	validateIdNo:(rule, value, callback) =>{
		const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(value == '' || value == undefined || value == null) {
			callback();
		} else {
			if((!reg.test(value)) && value != '') {
				callback(new Error('请输入正确的身份证号码'));
			} else {
				callback();
			}
		}
	},
	/* 合法uri*/
	validateURL:(textval)=>{
		const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
		return urlregex.test(textval);
	},

	/*验证内容是否英文数字以及下划线*/
	isPassword:(rule, value, callback) =>{
		const reg = /^[_a-zA-Z0-9]+$/;
		if(value == '' || value == undefined || value == null) {
			callback();
		} else {
			if(!reg.test(value)) {
				callback(new Error('密码仅由英文字母，数字以及下划线组成'));
			} else {
				callback();
			}
		}
	},

	/*自动检验数值的范围*/
	checkMax20000:(rule, value, callback) =>{
		if(value == '' || value == undefined || value == null) {
			callback();
		} else if(!Number(value)) {
			callback(new Error('请输入[1,20000]之间的数字'));
		} else if(value < 1 || value > 20000) {
			callback(new Error('请输入[1,20000]之间的数字'));
		} else {
			callback();
		}
	},

	//验证数字输入框最大数值,32767
	checkMaxVal:(rule, value, callback) =>{
		if(value < 0 || value > 32767) {
			callback(new Error('请输入[0,32767]之间的数字'));
		} else {
			callback();
		}
	},
	//验证是否1-99之间
	isOneToNinetyNine:(rule, value, callback) =>{
		if(!value) {
			return callback(new Error('输入不可以为空'));
		}
		setTimeout(() => {
			if(!Number(value)) {
				callback(new Error('请输入正整数'));
			} else {
				const re = /^[1-9][0-9]{0,1}$/;
				const rsCheck = re.test(value);
				if(!rsCheck) {
					callback(new Error('请输入正整数，值为【1,99】'));
				} else {
					callback();
				}
			}
		}, 0);
	},

	// 验证是否整数
	isInteger:(rule, value, callback) =>{
		if(!value) {
			return callback(new Error('输入不可以为空'));
		}
		setTimeout(() => {
			if(!Number(value)) {
				callback(new Error('请输入正整数'));
			} else {
				const re = /^[0-9]*[1-9][0-9]*$/;
				const rsCheck = re.test(value);
				if(!rsCheck) {
					callback(new Error('请输入正整数'));
				} else {
					callback();
				}
			}
		}, 0);
	},
	// 验证是否整数,非必填
	isIntegerNotMust:(rule, value, callback) =>{
		if(!value) {
			callback();
		}
		setTimeout(() => {
			if(!Number(value)) {
				callback(new Error('请输入正整数'));
			} else {
				const re = /^[0-9]*[1-9][0-9]*$/;
				const rsCheck = re.test(value);
				if(!rsCheck) {
					callback(new Error('请输入正整数'));
				} else {
					callback();
				}
			}
		}, 1000);
	},

	// 验证是否是[0-1]的小数
	isDecimal:(rule, value, callback) =>{
		if(!value) {
			return callback(new Error('输入不可以为空'));
		}
		setTimeout(() => {
			if(!Number(value)) {
				callback(new Error('请输入[0,1]之间的数字'));
			} else {
				if(value < 0 || value > 1) {
					callback(new Error('请输入[0,1]之间的数字'));
				} else {
					callback();
				}
			}
		}, 100);
	},

	// 验证是否是[1-10]的小数,即不可以等于0
	isBtnOneToTen:(rule, value, callback) =>{
		if(typeof value == 'undefined') {
			return callback(new Error('输入不可以为空'));
		}
		setTimeout(() => {
			if(!Number(value)) {
				callback(new Error('请输入正整数，值为[1,10]'));
			} else {
				if(!(value == '1' || value == '2' || value == '3' || value == '4' || value == '5' || value == '6' || value == '7' || value == '8' || value == '9' || value == '10')) {
					callback(new Error('请输入正整数，值为[1,10]'));
				} else {
					callback();
				}
			}
		}, 100);
	},
	// 验证是否是[1-100]的小数,即不可以等于0
	isBtnOneToHundred:(rule, value, callback) =>{
		if(!value) {
			return callback(new Error('输入不可以为空'));
		}
		setTimeout(() => {
			if(!Number(value)) {
				callback(new Error('请输入整数，值为[1,100]'));
			} else {
				if(value < 1 || value > 100) {
					callback(new Error('请输入整数，值为[1,100]'));
				} else {
					callback();
				}
			}
		}, 100);
	},
	// 验证是否是[0-100]的小数
	isBtnZeroToHundred:(rule, value, callback) =>{
		if(!value) {
			return callback(new Error('输入不可以为空'));
		}
		setTimeout(() => {
			if(!Number(value)) {
				callback(new Error('请输入[1,100]之间的数字'));
			} else {
				if(value < 0 || value > 100) {
					callback(new Error('请输入[1,100]之间的数字'));
				} else {
					callback();
				}
			}
		}, 100);
	},

	// 验证端口是否在[0,65535]之间
	isPort:(rule, value, callback) =>{
		if(!value) {
			return callback(new Error('输入不可以为空'));
		}
		setTimeout(() => {
			if(value == '' || typeof(value) == undefined) {
				callback(new Error('请输入端口值'));
			} else {
				const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
				const rsCheck = re.test(value);
				if(!rsCheck) {
					callback(new Error('请输入在[0-65535]之间的端口值'));
				} else {
					callback();
				}
			}
		}, 100);
	},
	// 验证端口是否在[0,65535]之间，非必填,isMust表示是否必填
	isCheckPort:(rule, value, callback) =>{
		if(!value) {
			callback();
		}
		setTimeout(() => {
			if(value == '' || typeof(value) == undefined) {
				//callback(new Error('请输入端口值'));
			} else {
				const re = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
				const rsCheck = re.test(value);
				if(!rsCheck) {
					callback(new Error('请输入在[0-65535]之间的端口值'));
				} else {
					callback();
				}
			}
		}, 100);
	},

	/* 小写字母*/
	validateLowerCase:(str)=>{
		const reg = /^[a-z]+$/;
		return reg.test(str);
	},
	/*保留2为小数*/
	validatetoFixedNew:(str)=>{
		return str;
	},

	/* 大写字母*/
	validateUpperCase:(str)=>{
		const reg = /^[A-Z]+$/;
		return reg.test(str);
	},
	/* 大小写字母*/
	validateAlphabets:(str)=>{
		const reg = /^[A-Za-z]+$/;
		return reg.test(str);
	},
	/**
	 * 验证姓名
	 */
	validateName:(rule, value, callback) =>{
		let newValue = value.trim();
		if(newValue.length == 0) {
			callback(new Error('请输入员工姓名(2~17个字符)'));
		}else if(newValue.length < 2 || newValue.length > 17) {
			callback(new Error('员工姓名必须是2~17个字符'));
		}else {
			callback();
		}
	},
	/**
	 * 验证用户名
	 */
	validateUserName:(rule, value, callback) =>{
		let newValue = value.trim();
		if(newValue.length == 0) {
			callback(new Error('请输入用户名(3~50个字符)'));
		}else if(newValue.length < 2 || newValue.length > 17) {
			callback(new Error('用户名必须是3~50个字符'));
		}else {
			callback();
		}
	},
	/**
	 * 验证密码
	 */
	validatePassword:(rule, value, callback) =>{
		let newValue = value.trim();
		if(newValue.length == 0) {
			callback(new Error('请输入密码(6~15个字符)'));
		}else if(newValue.length < 2 || newValue.length > 17) {
			callback(new Error('密码必须是6~15个字符'));
		}else {
			callback();
		}
	},
	/**
	 * 验证邮箱
	 */
	validateEmail:(rule,value,callback)=>{
		let newValue = value.trim();
        if(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(newValue) == false){
            callback(new Error("邮箱无效!"));
        }else{
            callback();
        }
    },
	/**
	 * 验证手机号
	 */
	validatePhone:(rule,value,callback)=>{
		let newValue = value.trim();
        if(/^1[3456789]\d{9}$/.test(newValue) == false){
            callback(new Error("手机号码无效!"));
        }else{
            callback();
        }
    }
};
export default formValidate;