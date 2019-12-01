var Serverurl = "https://www.pzhyy360.com";
//var Serverurl02 = "http://120.78.94.46:8989";
var api = {
	GetLineList: Serverurl + "/PZHManage/PZHManageAPI/GetLineList" ,//学生下单线路
	CreateStudentOrder: Serverurl + "/PZHManage/PZHManageAPI/CreateStudentOrder" ,//创建学生订单
	Studentpay: Serverurl + "/PZHManage/PZHManageAPI/Stu_GetPayInfo" ,//学生订单支付
	GetStudentOrderList: Serverurl + "/PZHManage/PZHManageAPI/GetStudentOrderList" ,//学生订单列表
	GetStudentOrderInfo: Serverurl + "/PZHManage/PZHManageAPI/GetStudentOrderInfo" ,//学生订单详情
	CancelStudentOrder: Serverurl + "/PZHManage/PZHManageAPI/CancelStudentOrder" ,//学生订单取消
	CreateCharteredCarOrder: Serverurl + "/PZHManage/PZHManageAPI/CreateCharteredCarOrder" ,//包车下单
	CancelCharteredCarOrder: Serverurl + "/PZHManage/PZHManageAPI/CancelCharteredCarOrder" ,//取消包车
	CancelCharteredCarOrder: Serverurl + "/PZHManage/PZHManageAPI/UpdatePayCharteredCarOrder" ,//修改包车订单
	GetCharteredCarOrderList: Serverurl + "/PZHManage/PZHManageAPI/GetCharteredCarOrderList" ,//包车订单列表
	GetCharteredCarOrderInfo: Serverurl + "/PZHManage/PZHManageAPI/GetCharteredCarOrderInfo" ,//包车详情
	GetCheckCode: Serverurl + "/YunSPOrderManage/YunSPOrderWX/GetCheckCode" ,	//获取验证码
	MobileChecked: Serverurl + "/YunSPOrderManage/YunSPOrderWX/MobileChecked" ,	//绑定手机
	travelLine: Serverurl + "/PZHManage/PZHManageAPI/GetTouristTicketPlanList" ,	//旅游套票线路列表
	travelLineDetail: Serverurl + "/PZHManage/PZHManageAPI/GetTouristTicketPlanInfo" ,	//旅游套票线路详情
	travelMakerOrder: Serverurl + "/PZHManage/PZHManageAPI/CreateTouristTicketOrder" ,	//旅游套票下单
	travelOrder: Serverurl + "/PZHManage/PZHManageAPI/GetTouristTicketOrderList" ,	//旅游套票订单列表
	LytpTunePay: Serverurl + "/PZHManage/PZHManageAPI/LytpTunePay" ,	//旅游套票订单详情支付
	CancelTouristTicketOrder: Serverurl + "/PZHManage/PZHManageAPI/CancelTouristTicketOrder",	//旅游套票订取消单
	RefundRuleTouristTicketOrder: Serverurl + "/PZHManage/PZHManageAPI/RefundRuleTouristTicketOrder",	//旅游套票退票提示
	RefundTouristTicketOrder: Serverurl + "/PZHManage/PZHManageAPI/RefundTouristTicketOrder",	//旅游套票退票
}

function goorders() {
	mui.openWindow({
		url: '../orderindex/orderindex.html?openid=' + openid
	});
}

function goindex() {
	mui.openWindow({
		url: '../index/index.html?openid=' + openid
	});
}

function goperson() {
	mui.openWindow({
		url: '../personal/personal.html?openid=' + openid
	});
}

//点击按钮调用的方法
function refresh() {
	window.location.reload(); //刷新当前页面.
	//或者下方刷新方法
	//parent.location.reload()刷新父亲对象（用于框架）--需在iframe框架内使用
	// opener.location.reload()刷新父窗口对象（用于单开窗口
	//top.location.reload()刷新最顶端对象（用于多开窗口）
}

//解决苹果刷新
function iosrefresh() {
	var isPageHide = false;
	window.addEventListener('pageshow', function() {
		if(isPageHide) {
			window.location.reload();
		}
	});
	window.addEventListener('pagehide', function() {
		isPageHide = true;
	});

}

//身份证验证
function IdentityCodeValid(code) {
	var city = {
		11: "北京",
		12: "天津",
		13: "河北",
		14: "山西",
		15: "内蒙古",
		21: "辽宁",
		22: "吉林",
		23: "黑龙江 ",
		31: "上海",
		32: "江苏",
		33: "浙江",
		34: "安徽",
		35: "福建",
		36: "江西",
		37: "山东",
		41: "河南",
		42: "湖北 ",
		43: "湖南",
		44: "广东",
		45: "广西",
		46: "海南",
		50: "重庆",
		51: "四川",
		52: "贵州",
		53: "云南",
		54: "西藏 ",
		61: "陕西",
		62: "甘肃",
		63: "青海",
		64: "宁夏",
		65: "新疆",
		71: "台湾",
		81: "香港",
		82: "澳门",
		91: "国外 "
	};
	var pass = true;
	if(code == "" || code == null) {
		pass = false;
	}
	if(!code || !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
		//"身份证号格式错误";
		pass = false;
	} else if(!city[code.substr(0, 2)]) {
		//"地址编码错误";
		pass = false;
	} else {
		//18位身份证需要验证最后一位校验位
		if(code.length == 18) {
			code = code.split('');
			//∑(ai×Wi)(mod 11)
			//加权因子
			var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			//校验位
			var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
			var sum = 0;
			var ai = 0;
			var wi = 0;
			for(var i = 0; i < 17; i++) {
				ai = code[i];
				wi = factor[i];
				sum += ai * wi;
			}
			var last = parity[sum % 11];
			if(parity[sum % 11] != code[17]) {
				//"校验位错误";
				pass = false;
			}
		}
	}
	return pass;

}

//验证手机号
function checktel(data) {
	var regtel = /^1\d{10}$/;
	var telpass = true;
	if(data == "" || data == null) {
		telpass = false;
	} else if(!regtel.test(data)) {
		telpass = false;
	}
	return telpass;
}

//验证姓名
function checkname(data) {
	var regname = /^([\u4e00-\u9fa5]){2,7}$/;
	var namepass = true;
	if(data == "" || data == null) {
		namepass = false;
	} else if(!regname.test(data)) {
		namepass = false;
	}
	return namepass;
}

//截取字符串信息处理
function plusXing(str, frontLen, endLen) {
	var len = str.length - frontLen - endLen;
	var xing = '';
	for(var i = 0; i < len; i++) {
		xing += '*';
	}
	return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
}