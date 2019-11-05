function executeDashChatScript(){
		//Content scripts can affect the DOM but don't exist in its context >> if we want to inject a script we do it through a div
		//inject some js
		//var script = document.createElement('script');
		//var scriptText = `console.log("do script text here")`
		//script.innerHTML = scriptText;
		//document.body.appendChild(script);
}


function injectIntercomBubble(){
	var intercomScriptText = `<script>
		 window.intercomSettings = {
		   app_id: "fuxg69ko",
		   name: "test user", // Full name
		   email: "testemail@email.com", // Email address
		 };
		</script>
		<script>(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/fuxg69ko';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();</script>`
	
	var script = document.createElement('script');
	script.innerHTML = intercomScriptText;
	document.body.appendChild(script);
}

function getDisplayNumber(){
	return window.location.href.match("dashboards\/([0-9]+)")[1]
}


injectIntercomBubble();