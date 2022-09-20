//Function for input conversion for search
 const showConverter = (x) => {
    return x.split(` `).join(`+`);
  };

//Function to create paragraph elements
 const createPElement = (value) => {
    const pTag = document.createElement(`p`)
    pTag.innerText = value
    return pTag
}

const createImage = (imgSource, showName) => {
    const img = document.createElement(`img`)
    img.src = imgSource
    img.alt = showName
    img.classList.add(`tvShowImage`)
    return img
}

//Function to create checkboxes and label
 const createCheckbox = (id, showName) => {
    const labelCheckbox = document.createElement(`label`);
    labelCheckbox.for = id
    labelCheckbox.innerHTML = `Add To My Watch List<br>`;
    labelCheckbox.classList.add(`checkbox`);

    const checkbox = document.createElement(`input`);
    checkbox.type = `checkbox`;
    checkbox.name = showName
    checkbox.value = id

    labelCheckbox.append(checkbox)
    return labelCheckbox

}

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
            localStorage.setItem(`myPicks`, myPicks.innerHTML)
            });
        
    
  }

export {showConverter, createPElement, createCheckbox, createImage, developerPicks}
