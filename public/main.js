//Mi ip priv to guapa: 192.168.1.85. Se puede cambiar por localhost:3000 y acceder por localhosst.
var socket = io.connect("http://localhost:3000", { forceNew: true });


socket.on("messages", function (data) {
	console.log(data);
  	render(data);
});

function render(data) {
  	var html = data
    	.map(function (elem, index) {
      	return `<div>
              	<strong>${elem.author}</strong>:
              	<em>${elem.text}</em>
            	</div>`;
    })
    	.join(" ");

  	document.getElementById("messages").innerHTML = html;
}

function addMessage(e) {
  	var row = {
    	id: document.getElementById("id").value,
    	rpm: document.getElementById("rpm").value,
      tiempo: document.getElementById("tiempo").value,
  	};

  	socket.emit("new-message", message);
  	return false;
}
