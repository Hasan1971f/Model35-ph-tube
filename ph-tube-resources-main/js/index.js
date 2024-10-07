console.log('Testing....')

function getTimeString (time){
  // get hour and res second
  const hour = parseInt(time / 3600)
   let remainSecond = time % 3600   
   const minute = parseInt(remainSecond / 60)
   remainSecond = remainSecond % 60
   return `${hour} ${minute} minute ${remainSecond} second ago`
  }
  const removeActiveClass =()=>{
 const buttons = document.getElementsByClassName("category-btn")
 console.log(buttons)
 for (let btn of buttons) {
  btn.classList.remove("active")
  
 }
  }
  // console.log(getTimeString (7865))
//  fetch  load and show catagories on html
//  create load catagories
const loadCatagories = () =>{
   fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
   .then(res => res.json())
   .then((data) => displayCategories(data.categories))
   .catch((error) => console.log(error))
}
const loadCategoryVideos = (id) =>{
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then((data) => {
    // sobi k active class remove korao
removeActiveClass() 

    // Id er class k active koro
    
    const activeBtn = document.getElementById(`btn-${id}`)
    console.log(activeBtn)
    activeBtn.classList.add("active")
    displayVideos(data.category)
  })
  .catch((error) => console.log(error))
}

const loadDetails = async(videoId) =>{
 console.log(videoId)
 const URL = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
 const res = await fetch(URL)
 const data = await res.json()
 displayDetails(data.video)


}

const displayDetails = (video) =>{
console.log(video)
const detailContainer = document.getElementById("modal-content")
detailContainer.innerHTML = `
 <img src="${video.thumbnail}"/>
<p>${video.description}</p>
 `


// way-1
// document.getElementById("showModalData").click()

// way-2
document.getElementById("customModal").showModal()

}


// const cardDemo ={
//     "category_id": "1001",
//     "video_id": "aaad",
//     "thumbnail": "https://i.ibb.co/f9FBQwz/smells.jpg",
//     "title": "Smells Like Teen Spirit",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/k4tkc42/oliviar-harris.jpg",
//             "profile_name": "Oliver Harris",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "5.4K",
//         "posted_date": "1672656000"
//     },
//     "description": "'Smells Like Teen Spirit' by Oliver Harris captures the raw energy and rebellious spirit of youth. With over 5.4K views, this track brings a grunge rock vibe, featuring powerful guitar riffs and compelling vocals. Oliver's verified profile guarantees a quality musical journey that resonates with fans of dynamic, high-energy performances."
// }



const loadVideos = (searchText = "") =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
 }

 const displayVideos = (videos) =>{
 const videoContainer = document.getElementById("videos")
 videoContainer.innerHTML = "";

 if (videos.length == 0) {
  videoContainer.classList.remove("grid")
  videoContainer.innerHTML = `
    <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
    <img src="icon.png"/>
    <h2 class="text-center text-xl font-bold">
    No content here in this category
    <h2/>
    <div/>
    `
    return
 }
 else{
  videoContainer.classList.add("grid")
 }
 videos.forEach((video) => {
//  console.log(video)
 const card = document.createElement("div")
 card.classList = "card card-compact"
 card.innerHTML =
  `
   <figure calss="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="shoes" />
      ${
        video.others.posted_date?.length == 0 ?  "" : ` <span class="absolute text-xs right-2 bg-black text-white rounded p-1 bottom-2">${getTimeString( video.others.posted_date)}<span/>`
      }
     
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
    </div>
    <div>
    <h2 class="font-bold">${video.title}<h2>
    <div class="flex items-center gap-2">
     <p class="text-gray-400">${video.authors[0].profile_name}</P>
     
     ${video.authors[0].verified == true ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=91kLZWvmd4sg&format=png"/>' : ""}

    </div>
   
    <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details<button/></P>
    </div>
  </div>
  `;
  videoContainer.append(card)
 })
 

 }

// {
//     "category_id": "1001",
//     "category": "Music"
// }

// creat display ctagories

const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById("categories")
    
    categories.forEach( (item) => {
        console.log(item)
        // create a button
        const buttonContainer = document.createElement("div")
        buttonContainer.innerHTML =
        `
        <button id="btn-${item.category_id}"onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `
      

        // add button category container
        categoryContainer.append( buttonContainer)
        
    });
}
document.getElementById("search-input").addEventListener("keyup", (e)=>{
  loadVideos(e.target.value)
})
loadCatagories()
loadVideos()
