console.log("user file loaded")
var userName= "ram"
var userAge = 23

//export
// module.exports = userAge
// module.exports = userName


const printUserData =(a)=>{ 

  console.log("print userdata fuction from user.js file...",a)}

module.exports = {
  userAge, userName, printUserData
}