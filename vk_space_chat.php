<!DOCTYPE html>
<html> 
<head>
<meta charset="UTF-8" /> 
<link rel="stylesheet" href="./vk_space_chat.css" />

<script src='../games_resources/libs/three.js/build/three.min.js'></script>
<script src='../games_resources/libs/three.js/examples/js/controls/FirstPersonControls.js'></script>
<script src='../games_resources/libs/three.js/examples/js/controls/PointerLockControls.js'></script>
<script src='../games_resources/libs/three.js/examples/js/controls/FlyControls.js'></script>
<script src='../games_resources/libs/three.js/src/extras/THREEx/THREEx.FullScreen.js'></script>
<script src='../games_resources/libs/three.js/src/extras/THREEx/THREEx.KeyboardState.js'></script>
<script src='../games_resources/libs/three.js/src/extras/THREEx/THREEx.WindowResize.js'></script>
<script src='../games_resources/libs/three.js/examples/js/renderers/CSS3DRenderer.js'></script>		 
<script src="../games_resources/libs/jquery.js"></script>
<script src="../games_resources/libs/peer.min.js"></script>

<script src="./vk_space_chat_constants_and_general_functions.js"></script>
<script src="./vk_space_chat_net_messages.js"></script>
<script src="./vk_space_chat.js"></script>
<script src="./vk_space_chat_menu.js"></script>
<script src="./vk_space_chat_users.js"></script>
<script src="./vk_space_chat_visual_keeper.js"></script>
<script src="./vk_space_chat_hint.js"></script>
<script src="./vk_space_chat_body.js"></script>
</head>

<body>

<video id="monitor" autoplay width="160" height="120" style=
"visibility: hidden; float:left;"></video> 
<canvas id="videoImage" 
width="160" height="120" style="visibility: hidden; float:left;"
></canvas>
<div id="errorMessage"></div>

<script>
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL;

var camvideo = document.getElementById('monitor');

	if (!navigator.getUserMedia) 
	{
		document.getElementById('errorMessage').innerHTML = 'Sorry. <code>navigator.getUserMedia()</code> is not available.';
	} else {
		navigator.getUserMedia({video: true}, gotStream, noStream);
	}

function gotStream(stream) 
{
	if (window.URL) 
	{   camvideo.src = window.URL.createObjectURL(stream);   } 
	else // Opera
	{   camvideo.src = stream;   }

	camvideo.onerror = function(e) 
	{   stream.stop();   };

	stream.onended = noStream;
}

function noStream(e) 
{
	var msg = 'No camera available.';
	if (e.code == 1) 
	{   msg = 'User denied access to use camera.';   }
	document.getElementById('errorMessage').textContent = msg;
}
</script>


<script>
// создаем игру при загрузке приложения			
//var ActivityObj = new _VKSpaceChat();
var MenuObj = new _Menu();

</script>


</body>
</html>

