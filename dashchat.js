function getLookerTokenFromAPI(){
	// TODO: Have a background script keep refreshing the access token, then get it from Chrome.Storage
	return "9KFXqrrfhwjNNcS3g8Z2YsTr6wBRV8CFMYpv4WK3"
}

function getCurrentUserInfo(accessToken){
	var req = new XMLHttpRequest();
	req.open("GET","https://hack.looker.com:19999/api/3.1/user",false)
	req.setRequestHeader("Authorization","token "+accessToken)
	req.mode='cors'
	req.send()
	reqJSON = JSON.parse(req.response);
	var email = reqJSON.email;
	var fullName = reqJSON.display_name;
	return {"email":email,"name":fullName}
}

function getDisplayInfo(accessToken){
	var dispNum = getDisplayNumber();
	var req = new XMLHttpRequest();
	req.open("GET","https://hack.looker.com:19999/api/3.1/dashboards/"+dispNum,false)
	req.setRequestHeader("Authorization","token "+accessToken)
	req.mode='cors'
	req.send()
	reqJSON = JSON.parse(req.response);
	
	displayTitle = reqJSON.title;
	ownerId = reqJSON.user_id;
	
	var req = new XMLHttpRequest();
	req.open("GET","https://hack.looker.com:19999/api/3.1/users/" + ownerId,false)
	req.setRequestHeader("Authorization","token "+accessToken)
	req.mode='cors'
	req.send()
	reqJSON = JSON.parse(req.response);
	
	ownerName = reqJSON.display_name;
	
	return {"ownerId":ownerId,"ownerName":ownerName,"displayTitle":displayTitle,"displayNumber":dispNum}
}

function injectIntercomBubble(context){
	console.log("generating script");
	
	//Need to stringify the json to pass it into the script tag
	contextString = JSON.stringify(context);
	var intercomScriptText1 = `window.intercomSettings = JSON.parse('` + contextString + `');`
	
	console.log(intercomScriptText1);
	var intercomScriptText2 = `(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/fuxg69ko';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`
	
	var coviewScript = `(function(c,o,v,i,e,w){c[v]=c[v]||function(){(c[v].a=c[v].a||[]).push(arguments)};var s=o.createElement(i);s.src=e;s.async=1;var h=o.getElementsByTagName(i)[0];h.parentNode.insertBefore(s,h);c.addEventListener('error',function(err){c[v]('error',err)});c.addEventListener('message',function(msg){c[v]('message',msg)})})(window,document,'coview','script','https://cdn.coview.com/coview.js')
coview('start', {
  projectKey:'vZl2D2h8YXM'
});`

	var script1 = document.createElement('script');
	var script2 = document.createElement('script');
	var script3 = document.createElement('script');
	script1.innerHTML = intercomScriptText1;
	script2.innerHTML = intercomScriptText2;
	script3.innerHTML = coviewScript;
	console.log("adding scripts");
	document.body.appendChild(script1);
	document.body.appendChild(script2);
	document.body.appendChild(script3);
}

function getDisplayNumber(){
	return window.location.href.match("dashboards\/([0-9]+)")[1]
}

userInfo = getCurrentUserInfo(getLookerTokenFromAPI());
Object.assign(userInfo, getDisplayInfo(getLookerTokenFromAPI()));
userInfo.app_id = "fuxg69ko"

injectIntercomBubble(userInfo);
