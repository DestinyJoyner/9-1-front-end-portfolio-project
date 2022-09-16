//JS FOR LANDING PAGE

//Variable for main Article on page
const mainArticle = document.querySelector(`article.mainArticle`);

//Variable for input 'submit' form on page
const form = document.querySelector(`form`);

//Variable for 'clickForMoreLink' on page
const clickForMore = document.querySelector(`.showHiddenResults`);

//Variable for User Picks 'ul'
const userPicks = document.querySelector(`.userPicks`);

//Function for input conversion for search
const showConverter = (x) => {
  return x.split(` `).join(`+`);
};

//FUNCTION FOR FETCH DATA
function fetchInput(tvShow, index) {
  fetch(`https://api.tvmaze.com/search/shows?q=${showConverter(tvShow)}`)
    .then((resp) => resp.json())
    .then((respJson) => {
      //STORE ALL FETCHED DATA LOCALLY
      localStorage.setItem(`${tvShow}`, respJson);
      respJson.forEach(({ show }, i) => {
        const tvInfo = document.createElement(`div`);
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
        <br>
        `;
        tvInfo.prepend(tvImage);
        if (i >= 3) {
          tvInfo.classList.add(`hidden`);
        }
        if (index) {
          if (i > 0) {
            tvInfo.classList.add(`hidden`);
          }
        }
        //ADD CHECKBOXES TO ADD TO USERPICKS
        const labelCheckbox = document.createElement(`label`);
        labelCheckbox.for = `${show.id}`;
        labelCheckbox.innerHTML = `Add To My Watch List<br>`;
        labelCheckbox.classList.add(`checkbox`);
        const checkbox = document.createElement(`input`);
        checkbox.type = `checkbox`;
        checkbox.name = `checkbox`;
        checkbox.value = `${show.id}`;

        //ADD EVENT LISTENER TO CHECKBOX
        checkbox.addEventListener(`change`, (e) => {
          if (e.target.checked) {
            const li = document.createElement(`li`);
            const aTag = document.createElement(`a`);
            aTag.href = `UserPicks/userPick.html`;
            aTag.target = `_blank`;
            aTag.classList.add(`ulLink`);
            //Event Listener for userPick links to store value in local storage
            aTag.addEventListener(`click`, (event) => {
              localStorage.setItem(`link`, e.target.value);
            });
            aTag.innerText = e.path[2].children[1].innerText;
            li.append(aTag);
            userPicks.append(li);
          }
          if (!e.target.checked) {
            const liElements = document.querySelectorAll(`li`);
            liElements.forEach((li) => {
              if (e.path[2].children[1].innerText === li.innerText) {
                li.remove();
              }
            });
          }
          localStorage.setItem(`watchList`, userPicks.innerHTML);
        }); //closes checkbox event listener
        labelCheckbox.append(checkbox);
        tvInfo.append(labelCheckbox);
        mainArticle.append(tvInfo);
      });
    })
    .catch((err) => console.log(err));
}

//Default images on LANDING screen -> call fetchInfo with index value to only display first result
function landingPageInfo(defaultShow, index) {
  fetchInput(defaultShow, true);
  clickForMore.classList.add(`hidden`);
}
landingPageInfo(`house of the dragon`);
landingPageInfo(`rick and morty`);
landingPageInfo(`the walking dead`);

//Use localStorage to restore userPicks on page when reloaded
userPicks.innerHTML = localStorage.getItem(`watchList`);

//Populate My Picks on the Page
// Function to fetch data initially, then will be stored in localStorage to populate the page on load up 
// Commented out and not removed for later use if local storage is cleared
const myPicks = document.querySelector(`.scrollingImageContainer`);
function developerPicks(myshow) {
  fetch(`https://api.tvmaze.com/search/shows?q=${myshow}`)
    .then((resp) => resp.json())
    .then((respJson) => {
      respJson.forEach(({ show }, i) => {
        if (i === 0) {
          const myImage = show.image.medium;
          const myShowName = show.name;
          const myDiv = document.createElement(`div`);
          myDiv.classList.add(`scrollingImages`);
          myDiv.innerHTML = `
          <img src="${myImage}" alt="${myShowName}"><br>
          ${myShowName}
          `;
          myPicks.append(myDiv);
        }
        localStorage.setItem(`myPicks`, myPicks.innerHTML)
      });
    });
}

developerPicks(`game of thrones`)
developerPicks(`archer`)
developerPicks(`martin`)
developerPicks(`the boondocks`)
developerPicks(`the office`)
// localStorage.setItem(`myPicks`, ``)
// Populate 'Developer's Picks using localStorage
myPicks.innerHTML = localStorage.getItem(`myPicks`)

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

// Clear out previous stored 'link' and 'watchList' data
// localStorage.setItem(`link`, ``)
// localStorage.setItem(`watchList`, ``)
