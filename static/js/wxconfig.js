	function getRootPath_web() {
        //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
        var curWwwPath = window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        //获取主机地址，如： http://localhost:8083
        var localhostPaht = curWwwPath.substring(0, pos);
        //获取带"/"的项目名，如：/uimcardprj
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return (localhostPaht + projectName);
    }
    
    $(function () {
    	var appName = '',merchantKey='';
		   $.ajax({
			   url:getRootPath_web()+'/wx/index!getSignForPage.action?url='+encodeURIComponent(location.href.split('#')[0]),
			   dataType:'json',
			   success:function(data){
				   appName = data.appName;
				   merchantKey = data.merchantKey;
				   
				   wx.config({
					    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					    appId: data.appId, // 必填，公众号的唯一标识
					    timestamp: data.timestamp, // 必填，生成签名的时间戳
					    nonceStr:  data.nonce_str, // 必填，生成签名的随机串
					    signature: data.signature,// 必填，签名，见附录1
					    jsApiList: [  
					                  'checkJsApi',
								        'onMenuShareTimeline',
								        'onMenuShareAppMessage',
								        //'onMenuShareQQ',
								        'onMenuShareWeibo',
								        'hideMenuItems',
								        'showMenuItems',
								        'hideAllNonBaseMenuItem',
								        'showAllNonBaseMenuItem',
								        'translateVoice',
								        'startRecord',
								        'stopRecord',
								        'onRecordEnd',
								        'playVoice',
								        'pauseVoice',
								        'stopVoice',
								        'uploadVoice',
								        'downloadVoice',
								        'chooseImage',
								        'previewImage',
								        'uploadImage',
								        'getLocalImgData',
								        'downloadImage',
								        'getNetworkType',
								        'openLocation',
								        'getLocation',
								        'hideOptionMenu',
								        'showOptionMenu',
								        'closeWindow',
								        'scanQRCode',
								        'chooseWXPay',
								        'openProductSpecificView',
								        'addCard',
								        'chooseCard',
								        'openCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
				   
				   
				// 微信 conifg验证完成后，会进入ready方法，在这里实现你的修改
				   wx.ready(function(){
				     wx.checkJsApi({
				         jsApiList: [
				             'getNetworkType',
				             'previewImage'
				         ],
				         success: function (res) {
				            // alert("checkJsApi=="+ JSON.stringify(res));
				         }
				     });
				     var scriptArgs = document.getElementById('wxScript').getAttribute('sharePage');
				     var orgId = document.getElementById('wxScript').getAttribute('orgId');
				     var userId = document.getElementById('wxScript').getAttribute('userId');
				     var shareLogo = document.getElementById('wxScript').getAttribute('shareLogo');
				     
				     var title = "";
				     var desc = "";
				     var link = "";
				     if (scriptArgs == 'creditcard') {//信用卡推广
				    	 var nickName = document.getElementById('wxScript').getAttribute('nickName');
					     var bankName = document.getElementById('wxScript').getAttribute('bankName');
					     var creditBankId = document.getElementById('wxScript').getAttribute('creditBankId');
					     var h5Link = document.getElementById('wxScript').getAttribute('h5Link');
					     var pageLink = document.getElementById('wxScript').getAttribute('pageLink');
					     
				    	 title = '0元办卡，最高额度有50万';
				    	 desc = nickName+'力推'+bankName+'信用卡，额度高，审批快，包邮到家';
				    	 link = getRootPath_web() + '/wx/creditcard!visa_application_stepTwo.action?orgId='+orgId+"&userId="+userId+"&creditBankId="+creditBankId+"&bankName="+encodeURIComponent(encodeURIComponent(bankName))+"&h5Link="+encodeURIComponent(encodeURIComponent(h5Link))+"&pageLink="+encodeURIComponent(encodeURIComponent(pageLink));
				     }else if (scriptArgs == 'loan') {//贷款推广
				    	 var loanSourceId = document.getElementById('wxScript').getAttribute('loanSourceId');
					     var registerLink = document.getElementById('wxScript').getAttribute('registerLink');
					     var loanLink = document.getElementById('wxScript').getAttribute('loanLink');
					     var h5Link = document.getElementById('wxScript').getAttribute('h5Link');
					     
				    	 title = '送你钱花，最高给你借100万！';
				    	 desc = '最快30分钟放款，随借随还！纯信用！';
					     link = getRootPath_web() + '/wx/loan!loans_application_add.action?orgId='+orgId+"&userId="+userId+"&loanSourceId="+loanSourceId+"&registerLink="+encodeURIComponent(encodeURIComponent(registerLink))+"&loanLink="+encodeURIComponent(encodeURIComponent(loanLink))+"&h5Link="+encodeURIComponent(encodeURIComponent(h5Link));
				     }else if (scriptArgs == 'customer') {//邀请专员
				    	 var nickName = document.getElementById('wxScript').getAttribute('nickName');
					     
				    	 title = nickName + '邀请您一起加入综合服务平台！';
				    	 desc = '综合服务平台，梦想开始之地！';
					     link = getRootPath_web() + '/wx/member!view_application.action?orgId='+orgId+"&userId="+userId;
				     }else if (scriptArgs == 'posters') {//专属海报
				    	 var nickName = document.getElementById('wxScript').getAttribute('nickName');
					     
				    	 title = '综合服务平台，梦想开始之地！';
				    	 desc = nickName + '邀请您加入综合服务平台，一起成为梦想家！';
					     link = getRootPath_web() + '/wx/index!exclusivePosters.action?orgId='+orgId+"&userId="+userId;
				     }else if (scriptArgs == 'creditcardlist') {//信用卡列表
				    	 var nickName = document.getElementById('wxScript').getAttribute('nickName');
					     
				    	 title = '有颜值才自信，个性颜值卡，0元免费办>>>';
				    	 desc = nickName + '邀请您申请信用卡，包邮到家！';
					     link = getRootPath_web() + '/wx/creditcard!visa_application.action?orgId='+orgId+"&userId="+userId;
				     }else if (scriptArgs == 'loanlist') {//贷款列表
					     
				    	 title = '善“贷”自己，免费申请，极速贷款！';
				    	 desc = '纯信用无抵押贷款，随借随还！';
					     link = getRootPath_web() + '/wx/loan!loans_application.action?orgId='+orgId+"&userId="+userId;
				     } else {//其他页面
				    	 title = '综合服务平台，梦想开始之地！';
				         desc = '小投入，大收益，人人都有机会成就梦想！';
				         link = getRootPath_web() + '/wx/index!index.action?orgId='+orgId+"&userId="+userId;
				     }
				
				     wx.onMenuShareTimeline({
				    	 	title: title, // 分享标题
					        desc: desc, // 分享描述
					        link: link, //分享的链接
				            imgUrl: shareLogo, // 分享图标
				            success: function () { 
				                // 用户确认分享后执行的回调函数
				            },
				            cancel: function () { 
				                // 用户取消分享后执行的回调函数
				            }
				        }); 
				
				
				    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
				    //分享给朋友
				    wx.onMenuShareAppMessage({
				    	title: title, // 分享标题
				        desc: desc, // 分享描述
				        link: link, //分享的链接
				        imgUrl: shareLogo, // 分享图标
				        type: 'link', // 分享类型,music、video或link，不填默认为link
				        //dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				        success: function () { 
				            // 用户确认分享后执行的回调函数
				            //alert("用户确定分享");
				
				        },
				
				        cancel: function () { 
				            // 用户取消分享后执行的回调函数
				            //alert("用户取消分享");
				        }
				    });


				});
			   },
			   error:function(error){ 
				    
			   } 
			});
    });
	
	
	
	
	wx.error(function(res){
	    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
	    //alert("errormsg="+ JSON.stringify(res));
	});
	
	
	
	
	
	//判断访问终端
	var browser={
	    versions:function(){
	        var u = navigator.userAgent, app = navigator.appVersion;
	        return {
	            trident: u.indexOf('Trident') > -1, //IE内核
	            presto: u.indexOf('Presto') > -1, //opera内核
	            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
	            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
	            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
	            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
	            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
	            iPad: u.indexOf('iPad') > -1, //是否iPad
	            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
	            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
	            qq: u.match(/\sQQ/i) == " qq" //是否QQ
	        };
	    }(),
	    language:(navigator.browserLanguage || navigator.language).toLowerCase()
	}
	
	
	function checkSystem(){
		var u = navigator.userAgent;
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		//alert('是否是Android：'+isAndroid);
		//alert('是否是iOS：'+isiOS);
		return isiOS;
	}
	
	/*function chooseWXPayShop(timestamp,nonceStr,prepay_id,signType,paySign,url,url2){
		wx.chooseWXPay({
		    "timestamp":timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		    "nonceStr": nonceStr, // 支付签名随机串，不长于 32 位
		    "package": 'prepay_id='+prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
		    "signType": signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		    "paySign": paySign, // 支付签名
		    success: function (res) {
		    	if(res.errMsg=='chooseWXPay:ok'){
		    		window.location.replace(url);
		    	}
		        // 支付成功后的回调函数
		    },
			cancel:function(res){
		    	window.location.replace(url2);
		    }

		});
	}*/