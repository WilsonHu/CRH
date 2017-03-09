/**
 * Created by PC-LHF on 2017-02-06.
 */


var EveryPageNum = 20;

function isNull(obj) {
	if (typeof (obj) != 'number') {
		return obj == null;
	}
	return false;
}

function isUndefined(obj) {
	return typeof (obj) == "undefined";
}

function numberFormat(numObj, intBit) {
	var val = numObj;
	var str = "";
	var i = 0;
	if (val != "") {
		for (i = 0; i < intBit; i++)
			str = str + "0";
		val = str + val;
		val = val.substring(val.length - intBit, val.length);
	}
	return val;
}
//判断部门编号是不否合法(Format:00x0xx)
function regIsCorrectDep(fData) {
	var reg = new RegExp("^\(0010[0-9]{2})$");
	return reg.test(fData);
}

String.prototype.endsWith = function (str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
}

function getStatisticsOptions() {
	return new Array(
		{
			value: 1,
			text: '是'
		},
		{
			value: 0,
			text: '否'
		});
}

//验证数据是否改动过
function validateIsDifferent(obj1, obj2) {
	var isDifferent = false;
	for (var i in obj1) {
		var item = obj1[i];
		if (typeof(obj1[item]) == "function") {
			continue;
		}
		else if (typeof(obj1[item]) == "number") {
			if (obj1[item].toString() != obj2[item].toString()) {
				isDifferent = true;
				break;
			}
		}
		else if (obj1[item] != obj2[item]) {
			isDifferent = true;
			break;
		}
	}
	return isDifferent;
}

function isInteger(obj) {
	return (obj | 0) === obj;
}

function isStringEmpty(data) {

	if (data == null)
		return true;
	return data.replace(/(^s*)|(s*$)/g, "").length == 0;
}

//验证Email是否正确
function regIsEmail(fData) {
	var reg = new RegExp("^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$");
	return reg.test(fData);
}

//判断手机号是否正确
function regIsPhone(fData) {
	var reg = /^1\d{10}$/;
	return reg.test(fData);
}

function getAudioType(fileName) {
	var voiceExt = fileName.substr(fileName.lastIndexOf(".")).toLowerCase();
	var audioType = "audio/mp3";
	switch (voiceExt) {
		case  ".mp3": {
			audioType = "audio/mp3";
			break;
		}
		case ".wav": {
			audioType = "audio/wav";
			break;
		}
		case ".wma": {
			audioType = "audio/wma";
			break;
		}
		case ".mid":
		case ".midi": {
			audioType = "audio/mid";
			break;
		}
		case ".ogg": {
			audioType = "audio/ogg";
			break;
		}
		default:
			break;
	}
	return audioType;
}


Date.prototype.format = function (format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(),    //day
		"h+": this.getHours(),   //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)if (new RegExp("(" + k + ")").test(format))
		format = format.replace(RegExp.$1,
			RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

//返回一个对象的副本，以免直接赋值，引起对象引用问题
function copyObject(item) {
	return $.extend({}, item);
}

//success/warning/info/error
function showMessage(obj, msg, msgType) {

	var dialogType = 'success';
	switch (msgType) {
		case 0:
			dialogType = 'error';
			break;
		case 1:
			dialogType = 'success';
			break;
		case 2:
			dialogType = 'warning';
			break;
		case 3:
			dialogType = 'info';
			break;
	}
	var dialog = obj.$message({
		showClose: true,
		message: msg,
		type: dialogType,
	});
}

