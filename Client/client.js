const socket = io();
socket.on("connect",()=>{
            console.log(socket.id)
})

const messageBox = document.getElementById('chat-messages')
const messageInput = document.getElementById('msg')
const roomNumber = document.getElementById('room')
let roomID = null;


function sendMessage(){

     if(!roomID){
        alert("Join a room first");
        return;
    }
    const msg = messageInput.value;
    socket.emit('msg',{room:roomID,msg})
    const element = document.createElement('div');
    element.className ='message sent'

    element.textContent = msg;
    messageBox.appendChild(element)
    messageInput.value = "";

}

messageInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function joinRoom(){
    const room = roomNumber.value;

    if(!room){
        alert("Enter a room number");
        return;
    }
    
    messageBox.innerHTML = "";
    roomID = room;
    socket.emit('join-room',roomID)
    roomNumber.value='';
}

socket.on('new msg',(data)=>{

    const element = document.createElement('div');
    element.className ='message received'

    element.textContent = data;
    messageBox.appendChild(element)

})