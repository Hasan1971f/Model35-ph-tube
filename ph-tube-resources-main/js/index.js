console.log('Testing....')
//  fetch  load and show catagories on html

//  create load catagories
const loadCatagories = () =>{
   fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
   .then(res => res.json())
   .then((data) => displayCategories(data.categories))
   .catch((error) => console.log(error))
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
        const button = document.createElement("button")
        button.classList = "btn"
        button.innerText = item.category

        // add button category container
        categoryContainer.append(button)
    });
}

loadCatagories()
