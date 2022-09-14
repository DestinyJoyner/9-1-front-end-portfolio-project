//USER PICKS JS FROM LINK CLICK
console.log(localStorage.getItem(`link`))

//https://api.tvmaze.com/shows/315/episodes  [{}]
fetch(`https://api.tvmaze.com/shows/${localStorage.getItem(`link`)}`)
.then(resp => resp.json())
.then(respJson => {
    // variables with default values if respJson values are null
    const showName = respJson.name
    let type = null
    let backImage = `assets/No_image_available.svg.png`
    let image = `assets/No_image_available.svg.png`
    let summary = null
    let officialSite = null
    let language = null
    let genre = null
    let premiered = null
    if(respJson.image){
        backImage = respJson.image.original
        image = respJson.image.medium
    }
    if(respJson.summary){
        summary = respJson.summary
    }
    if(respJson.officialSite){
        officialSite = respJson.officialSite
    }
    if(respJson.type){
        type = respJson.type
    }
    if(respJson.officialSite){
        officialSite = respJson.officialSite
    }
    if(respJson.language){
        language = respJson.language
    }
    if(respJson.genres.length){
        genre = respJson.genres[0]
    }
    if(respJson.premiered){
        premiered = respJson.premiered
    }

    // Populate page with values from fetch
    document.body.style.backgroundImage = `url('${backImage}')`
    console.log(backImage)
    const h1 = document.querySelector(`h1`)
    h1.innerText = showName
    const tvShowInfo = document.querySelector(`.tvShowInfo`)
    const showSummary = document.querySelector(`p`)
    const mediumImage = document.querySelector(`.mediumImage`)
    mediumImage.src = image

    showSummary.innerHTML = `
    <p>${summary}</p>
    <p>${premiered}
    <p>${type}</p>
    <p>${genre}</p>
    <p>${language}</p>
    <p>${officialSite}</p>
    `
    



})
.catch(err => console.log(err))
