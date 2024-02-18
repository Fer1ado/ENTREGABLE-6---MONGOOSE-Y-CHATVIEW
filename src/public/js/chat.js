const socket = io()

const input = document.getElementById('input')
const message = document.getElementById('message')

input.addEventListener('keydown',(e) =>{
    const {key} = e
    if(key.length === 1){
        socket.emit("char", key)
    }
})

