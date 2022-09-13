//Variable for main Article on page
const mainArticle = document.querySelector(`article.mainArticle`);

//Variable for 'clickForMoreLink' on page
const clickForMore = document.querySelector(`.showHiddenResults`)

//Function for input conversion for search
const showConverter = (x) => {
  return x.split(` `).join(`+`);
};

//FUNCTION FOR FETCH DATA 
function fetchInput(tvShow,index) {
  fetch(`https://api.tvmaze.com/search/shows?q=${showConverter(tvShow)}`)
    .then((resp) => resp.json())
    .then((respJson) => {
      respJson.forEach(
        ({ show, status, premiered, ended, webpage, network }, i) => {
          const tvInfo = document.createElement(`p`);
          const tvImage = document.createElement(`img`);
          tvImage.classList.add(`tvShowImage`);
          let tvShowCountry = "Unknown";
          if (show.image) {
            tvImage.setAttribute("src", show.image.medium);
          } else {
            tvImage.setAttribute("src", "assets/No_image_available.svg.png");
          }
          if (show.network) {
            tvImage.setAttribute("alt", show.network.country.name);
            tvShowCountry = show.network.country.name;
          }
          if (!show.rating.average) {
            show.rating.average = `No rating`;
          }
          tvInfo.innerHTML = `
        <p>${show.name}</p> 
        <p>${tvShowCountry}(${show.language})</p>
        <p>${show.genres[0]}</p>
        <p>${show.rating.average}</p>
        `;
          tvInfo.prepend(tvImage);
          if (i >= 3) {
            tvInfo.classList.add(`hidden`);
          }
          if(index){
            if (i > 0){
                tvInfo.classList.add(`hidden`)
            }
        }
          mainArticle.append(tvInfo);
          
        }
      );
    });
}

//Default images on main screen -> call fetchInfo with index value to only display first result
function landingPageInfo(defaultShow, index) {
    fetchInput(defaultShow, true )
}
landingPageInfo(`house of the dragon`)
landingPageInfo(`archer`)
landingPageInfo(`the walking dead`)

clickForMore.remove()

