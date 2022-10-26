const spaceId = process.env.SPACEID;
const spaceName = "Uova";
const environmentId = "master"
const accessToken = process.env.ACCESSTOKEN;
const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environmentId}/entries?access_token=${accessToken}&order=fields.order&content_type=menuItems`

const sectionTag = document.querySelector('section.grid')

const grabData = function () {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            //store assets
            const assets = data.includes.Asset;


            // turn our contentful data into something more useful 

            return data.items.map(item =>{
                let imgUrl = 'assets/image1.jpg'

                const imgId = item.fields.image.sys.id;

                const imageData = assets.find(asset => {
                    return asset.sys.id == imgId;
                })

                if(imageData){
                    imgUrl = imageData.fields.file.url;
                }

                item.fields.image = imgUrl;
                return item.fields;
            })
        })
}

//run this function on load
grabData().then(data => {
    //in here do something with the returned data
    console.log(data);

    //remove the loader
    sectionTag.innerHTML= ""

    data.forEach(item => {
        sectionTag.innerHTML = sectionTag.innerHTML + `
        <div class='item'>
            <img src=${item.image}>
             <div class='title'>
                <h2>${item.title}</h2>
                <p>${item.price}</p>
             </div>
             <p>${item.description}</p>

        </div>
        `
    })

})

