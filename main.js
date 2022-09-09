
const movieUrl =  `http://www.omdbapi.com/?apikey=ec8686fe&t=t`

const tvGuideUrl = `https://api.tvmaze.com/search/shows?q=`

let input = `the office`
const showConverter = (x) => {
    return x.split(` `).join(`+`)
}
console.log(showConverter(input))

fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
.then(resp => resp.json())
.then(respJson => {
    console.log(respJson)
})
.catch(err => console.log(err))

