// const isVerified = ""
// // if (isVerified === true) {
// //     console.log("user is verified")
// // }
// // else{
// //     console.log("user is  not verified")
// // }

// console.log(`${isVerified === true ? "user is verified" : "user is  not verified"}`)

function getTimeString (time){
// get hour and res second
const hour = parseInt(time / 3600)
 let remainSecond = time % 3600   
 const minute = parseInt(remainSecond / 60)
 remainSecond = remainSecond % 60
 return `${hour} ${minute} minute ${remainSecond} second ago`
}
console.log(getTimeString (7865))