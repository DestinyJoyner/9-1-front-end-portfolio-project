//Function for input conversion for search
const showConverter = (x) => {
  return x.split(` `).join(`+`);
};

//Function to create paragraph elements
const createPElement = (value) => {
  const pTag = document.createElement(`p`);
  pTag.innerText = value;
  return pTag;
};

const createImage = (imgSource, showName) => {
  const img = document.createElement(`img`);
  img.src = imgSource;
  img.alt = showName;
  img.classList.add(`tvShowImage`);
  return img;
};

//Function to create checkboxes and label

const createCheckbox = (id, showName) => {
  const labelCheckbox = document.createElement(`label`);
  labelCheckbox.for = id;
  labelCheckbox.innerHTML = `Add To My Watch List<br>`;

  const checkbox = document.createElement(`input`);
  checkbox.classList.add(`checkbox`);
  checkbox.type = `checkbox`;
  checkbox.name = showName;
  checkbox.value = id;
  labelCheckbox.append(checkbox);

  checkbox.addEventListener(`change`, () => {
    const userPicks = document.querySelector(`.userPicks`)
    if (checkbox.checked) {
      const li = document.createElement(`li`);
      li.setAttribute(`id`, `${checkbox.value}`);
      const aTag = document.createElement(`a`);
      aTag.href = "/UserPicks/userPick.html";
      aTag.target = `_blank`;
      aTag.classList.add(`ulLink`);
      aTag.innerText = checkbox.name;
      aTag.setAttribute(`id`, `${checkbox.value}`);
     
      //EVENT LISTENER FOR CREATED LINK 
      aTag.addEventListener(`click`, () => {
        localStorage.setItem(`link`, aTag.id)
      })
      li.append(aTag);
      userPicks.append(li);
      localStorage.setItem(`watchList`, userPicks.innerHTML)
      
    }
    if(!checkbox.checked){
        const liElements = document.querySelectorAll(`li`);
        liElements.forEach((li) => {
        if (checkbox.value === li.id) {
            li.remove();
        }
    });
    localStorage.setItem(`watchList`, userPicks.innerHTML)
}
   ;
  });

  return labelCheckbox;
};

const developerPicks = (myshow) => {
  fetch(`https://api.tvmaze.com/shows/${myshow}`)
    .then((resp) => resp.json())
    .then((respJson) => {
      const myPicks = document.querySelector(`.scrollingImageContainer`);
      const myDiv = document.createElement(`div`);
      myDiv.classList.add(`scrollingImages`);
      myDiv.innerHTML = `
            <img src="${respJson.image.medium}" alt="${respJson.name}"><br>
            ${respJson.name}
            `;
      myPicks.append(myDiv);
      localStorage.setItem(`myPicks`, myPicks.innerHTML);
    });
};

export {
  showConverter,
  createPElement,
  createCheckbox,
  createImage,
  developerPicks,
};
