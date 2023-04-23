const socket = io("http://localhost:8080/", { transports: ["websocket"] })



let urlparams = new URLSearchParams(window.location.search)
let msgdiv = document.getElementById("messages")
let roomname = document.getElementById("roomname")
let usersname = document.getElementById("usersname")
let btnmsgele = document.getElementById("btnmsg")

let username = urlparams.get("username")
let room = urlparams.get("room")

socket.emit("newuser", ({ username, room }))
socket.on("message", (msg) => {
    display(msg)

})

btnmsgele.addEventListener("click", (e) => {
    e.preventDefault()
    let messageinp = document.getElementById("inputmsg").value

    messageinp = messageinp.trim();

    if (!messageinp) {
        return false;
    }

    socket.emit("newmessage", messageinp)
})



function display(data) {

    let div = document.createElement("div")
    let p = document.createElement("p")
    p.innerText = data.username
    let p1 = document.createElement("p")
    p1.innerText = data.text
    let time = document.createElement("p")
    time.innerText = data.time
    let newvar = `${p.innerText = data.username} :- ${p1.innerText = data.text} (${time.innerText = data.time}) `
    div.append(newvar)
    msgdiv.append(div)


}

socket.on("roomusers", (data) => {
    outputUsers(data)

    outputusersname(data.users)
})

function outputUsers(data) {
    roomname.innerHTML = ""
    let div = document.createElement("div")
    let p = document.createElement("p")
    p.innerText = `Room Name :- ${data.room}`
    div.append(p)
    roomname.append(div)


}
function outputusersname(data) {
    usersname.innerHTML = ""

    data.forEach((ele) => {
        let div = document.createElement("div")
        let li = document.createElement("li")
        li.innerText = `Users :- ${ele.username}`
        div.append(li)
        usersname.append(div)


    });
}

let leavebtn = document.getElementById("leave")
leavebtn.addEventListener("click",(e)=>{
    let confirmplease = confirm("Are You Sure !! ")
    if(confirmplease){
        window.location.href = "./index.html"
    }
})