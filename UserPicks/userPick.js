//USER PICKS JS FROM LINK CLICK
const link = localStorage.getItem(`link`)

fetch(`https://api.tvmaze.com/shows/${link}`)
.then(resp => resp.json())
.then(respJson => {
    // variables with default values if respJson values are null
    const showName = respJson.name
    let type = null
    let image = `assets/No_image_available.svg.png`
    let summary = null
    let officialSite = null
    let language = null
    let genre = null
    let premiered = null
    if(respJson.image){
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
    const h1 = document.querySelector(`h1`)
    h1.innerText = showName
    const tvShowInfo = document.querySelector(`.tvShowInfo`)
    const showSummary = document.querySelector(`p`)
    const mediumImage = document.querySelector(`.mediumImage`)
    mediumImage.src = image

    tvShowInfo.innerHTML += `
    <div class="summary">${summary}</div>
    <div class="type">First Aired: ${premiered}</br>${type}</br>
    ${genre}</br>${language}</div>
    <div class="officialSite"><a href="${officialSite}" target="_blank">${officialSite}</a></div>
    `
})
.catch(err => console.log(err))

// Fetch for Episode Info
 fetch(`https://api.tvmaze.com/shows/${link}/episodes`)
 .then(resp => resp.json())
 .then(respJson => {
    respJson.forEach((ep,i) => {
        const season1 = document.querySelector(`.season1`)
        const storage = document.querySelector(`.storage`)
        if (ep.season === 1){
            const option = document.createElement(`option`)
            option.value = `${ep.id}`
            option.innerText = `${ep.name}`
            const epSummary = document.createElement('p')
            epSummary.id =`${ep.id}`
            epSummary.classList.add(`hidden`)
            if(ep.summary === ``){
                ep.summary = `No Description Available`
            }
            epSummary.innerHTML = `${ep.summary}`
            season1.append(option)
            storage.append(epSummary)
        }
    })
 })
 .catch(err => console.log(err)) 

 //EVENT LISTENER FOR DROPDOWN 
 const dropDown = document.getElementById(`season1`)
 dropDown.addEventListener(`change`, (e) => {
    if(document.querySelector(`.show`)){
        document.querySelector(`.show`).classList.toggle('hidden')
        document.querySelector(`.show`).classList.remove('show')
    
}
    document.getElementById(`${e.target.value}`).classList.toggle(`hidden`)
    document.getElementById(`${e.target.value}`).classList.add(`show`)
 })
