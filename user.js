const users = []

function newuser(username,room,id){
  const user = {username,room,id}
  users.push(user)
  return user
}
function getusersRoom(room){
    return users.filter(user=> user.room == room)
}
function getCurrentUser(id){
    return users.find(user=>user.id==id)
}
function userLeave(id){
    let index = users.findIndex(user=>user.id==id)

    if(index!==-1){
        return users.splice(index,1)[0]
    }

}

module.exports = {newuser,getusersRoom,getCurrentUser,userLeave}