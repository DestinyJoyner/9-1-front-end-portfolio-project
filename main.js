//JS FOR LANDING PAGE
 
//Import functions
import {showConverter, createPElement, createCheckbox,createImage, developerPicks} from '/functions.js';

//Variable for main Article on page
const mainArticle = document.querySelector(`article.mainArticle`);

//Variable for input 'submit' form on page
const form = document.querySelector(`form`);

//Variable for 'clickForMoreLink' on page
const clickForMore = document.querySelector(`.showHiddenResults`);

//FUNCTION FOR FETCH DATA
function fetchInput(tvShow, index) {
  fetch(`https://api.tvmaze.com/search/shows?q=${showConverter(tvShow)}`)
    .then((resp) => resp.json())
    .then((respJson) => {
      respJson.forEach(({ show }, i) => {
        const tvInfo = document.createElement(`div`);
        let tvImage = "assets/No_image_available.svg.png";
        let tvShowCountry = "Unknown";
        if (show.image) {
          tvImage = show.image.medium
        } 
        if (show.network) {
          tvShowCountry = show.network.country.name;
        }
        tvInfo.append(createImage(tvImage, show.name));
        tvInfo.append(createPElement(show.name));
        tvInfo.append(createPElement(tvShowCountry))
        tvInfo.append(show.genres[0])
        tvInfo.append(createPElement(``))
        tvInfo.append(createCheckbox(show.id, show.name))
        
        if (i >= 3) {
          tvInfo.classList.add(`hidden`);
        }
        if (index) {
          if (i > 0) {
            tvInfo.classList.add(`hidden`);
          }
        }
        mainArticle.append(tvInfo);
      });
    })
    .catch((err) => console.log(err));
}

//Default shows on LANDING screen -> call fetchInfo with index value to only display first result
function landingPageInfo(defaultShow, index) {
  fetchInput(defaultShow, true);
  clickForMore.classList.add(`hidden`);
}
landingPageInfo(`house of the dragon`);
landingPageInfo(`rick and morty`);
landingPageInfo(`the walking dead`);

//Populate My Picks on the Page
developerPicks(82)
developerPicks(526)
developerPicks(540)
developerPicks(912)
developerPicks(315)

//EVENT LISTENER FOR FORM INPUT
form.addEventListener(`submit`, (e) => {
  e.preventDefault();
  //ERROR MESSAGE IF NO INPUT
  if (!form.input.value) {
    window.alert(
      `If you didn't want to watch anything, you wouldn't be here. Please enter a TVShow`
    );
  } else {
    mainArticle.innerHTML = ``;
    mainArticle.append(clickForMore);
    const input = showConverter(form.input.value);
    fetchInput(input);
    clickForMore.classList.toggle(`hidden`);
    form.reset();
  }
});

//EVENT LISTENER FOR 'clickForMore' LINK
clickForMore.addEventListener(`click`, (e) => {
  e.preventDefault();
  const hidden = document.querySelectorAll(`.hidden`);
  if (!hidden.length) {
    clickForMore.classList.remove(`hidden`);
  } else {
    hidden.forEach((x, i) => {
      x.classList.toggle(`hidden`);
    });
  }
  clickForMore.classList.toggle(`hidden`);
});

//RESTORE USERPICKS (watchlist) from localstorage
document.querySelector(`.userPicks`).innerHTML = localStorage.getItem(`watchList`)

//EVENT LISTNER FOR USERPICK LINKS ON PAGE
const watchLinks = document.querySelectorAll(`a.ulLink`)
watchLinks.forEach(link => {
  link.addEventListener(`click`, (e) =>{
    localStorage.setItem(`link`, link.id)
    
  })
})

const removeButtons = document.querySelectorAll(`button`)
removeButtons.forEach(button => {
  button.addEventListener(`click`, () => {
    document.getElementById(`${button.classList}`).remove()
    const c1 = document.querySelectorAll(`.checkbox`)
    c1.forEach(c => {
        if(c.value === button.classList[0]){
            c.checked = false
        }
    })
  })
})


// Clear out previous stored 'link' and 'watchList' data
// localStorage.setItem(`link`, ``)
// localStorage.setItem(`watchList`, ``)
