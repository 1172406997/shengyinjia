/**
 * Created by zhouweipeng on 2016/12/28.
 */
// JavaScript Document
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//弹出框
$(".weui-dialog__ft").click(function(){
    $(".weui-mask").removeClass("weui-mask--visible");
    $(".weui-dialog").removeClass("weui-dialog--visible");
});

function closeAlert(){
	$(".weui-mask").removeClass("weui-mask--visible");
    $(".weui-dialog").removeClass("weui-dialog--visible");
}

function toAlert(_msg) {
	$(".weui-dialog__bd").html(_msg);
	
	$(".weui-mask").addClass("weui-mask--visible");
    $(".weui-dialog").addClass("weui-dialog--visible");
}
// 分享弹出框
function shareBtn(){
    $(".share-mask").addClass("share-mask--visible");
    $(".share-dialog").addClass("share-dialog--visible");
}
$(".share_btn>img").click(function(){
    $(".share-mask").removeClass("share-mask--visible");
    $(".share-dialog").removeClass("share-dialog--visible");
})
$(".share-mask").click(function(){
    $(".share-mask").removeClass("share-mask--visible");
    $(".share-dialog").removeClass("share-dialog--visible");
});
//分享弹出框end
// 奖金弹出框
function popup4() {
    $(".surpass_Popup").removeClass("surpass_Popup_in").addClass("surpass_Popup_fade");
    $(".surpass_Popup-backdrop").removeClass("surpass_Popup_in2").removeClass("surpass_Popup_fade").addClass("surpass_Popup_fade");
}
$(".visaLevel-close").click(function(){//这个是关闭弹出框
    $(".surpass_Popup-dialog").animate({top: -1000});
    setTimeout("popup4()", 200);
});
function bonus(){  //调这个方法弹出
    $(".surpass_Popup-backdrop").toggleClass("surpass_Popup_in2");
    $(".surpass_Popup").toggleClass("surpass_Popup_in");
    $(".surpass_Popup-dialog").animate({top: 150});
}
$(".surpass_masked").click(function(){
    $(".surpass_Popup-dialog").animate({top: -1000});
    setTimeout("popup4()", 200);
});
// 奖金弹出框end
function indexPopup(url){
    $(".index-dialog_sure").attr("href",url);
    $(".index-mask").addClass("index-mask--visible");
    $(".index-dialog").addClass("index-dialog--visible");
}

$(".index-dialog_cancel").click(function(){
    $(".index-mask").removeClass("index-mask--visible");
    $(".index-dialog").removeClass("index-dialog--visible");
});

function closeTwoBtnTips(){
    $(".index-mask").removeClass("index-mask--visible");
    $(".index-dialog").removeClass("index-dialog--visible");
};

var formatDateTime3 = function(time, format){  
    var t = new Date(time);  
    var tf = function(i){return (i < 10 ? '0' : '') + i};  
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){  
        switch(a){  
            case 'yyyy':  
                return tf(t.getFullYear());  
                break;  
            case 'MM':  
                return tf(t.getMonth() + 1);  
                break;  
            case 'mm':  
                return tf(t.getMinutes());  
                break;  
            case 'dd':  
                return tf(t.getDate());  
                break;  
            case 'HH':  
                return tf(t.getHours());  
                break;  
            case 'ss':  
                return tf(t.getSeconds());  
                break;  
        }  
    });  
};


function isIdCard(value){
	
	var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X])$/;

	return reg.test(value);
}

function isMobile(value){
	
	var reg = /(^1[34578]\d{9}$)/;

	return reg.test(value);
}

function isRealName(value) {

//	var reg = /^[\u4E00-\u9FA5]+$/;
	var reg = /^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$/;

	return reg.test(value);
}

function isNumber(value){
	
    var reg = /^[0-9]*$/;
    
    return reg.test(value);
};


// 二维码生成
function makeCode(url){
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 200,//设置宽高
        height : 200
    });
    qrcode.makeCode(url);
}

//二维码生成
function makeCodeById(url,_id){
    var qrcode = new QRCode(document.getElementById(_id), {
        width : 200,//设置宽高
        height : 200
    });
    qrcode.makeCode(url);
}

function showWechat(wechatNo,qrCode,path) {
	if (qrCode != null && qrCode != '' && qrCode != 'null') {
		$("#qrCodeImg").attr("src",qrCode);
		$(".order_weichatTip").html('扫一扫上面的二维码图案，加我微信');
		
		if (wechatNo != null && wechatNo != '' && wechatNo != 'null') {
			$("#order_weichatNum").html(wechatNo);
			$(".order_weichatTip").removeClass('active');
		}else {
			$("#wechatNoDiv").attr('style','display:none');
			$(".order_weichatTip").addClass('active');
		}
	}else {
		$("#qrCodeImg").attr("src",path + "/resources/img/Qrcode@2x.png");
		
		if (wechatNo != null && wechatNo != '' && wechatNo != 'null') {
			$("#order_weichatNum").html(wechatNo);
			$(".order_weichatTip").html('请使用下方微信号，加我微信');
			$(".order_weichatTip").removeClass('active');
		}else {
			$(".order_weichatTip").html('该用户未完善资料，可通过手机号联系！');
			$(".order_weichatTip").addClass('active');
			$("#wechatNoDiv").attr('style','display:none');
		}
	}
}
$(function(){
    var source = document.getElementById('commonScript').getAttribute('source');
    if(source == 'app'){
        $(".nav").css("display","none");
    }else{
        $(".nav").css("display","block");
    }
    
})