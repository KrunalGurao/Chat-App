 const moment = require('moment');
 function format(username,text){
    return {
        username,
        text,
        time : moment().format("h:mm a")
    }
 }

 module.exports = format