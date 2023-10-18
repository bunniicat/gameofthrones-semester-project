var bioo; //declared for later use for custom bio according to character name from fetch

function getInfo(id) {
    fetch("https://anapioficeandfire.com/api/characters/" + id)
        .then(response => response.json())
        .then(charInfo => populateCard(charInfo));
}



const popup = document.getElementById("popup");


//is called within the fetch, populates popup with correct information
function populateCard(character) {
    popup.style.display = "block";
    const getName = character.name.replace(/\s/g, ''); //saves character name without spaces - used for custom bio & fetching correct avatar > page
    bio(getName)
    document.getElementById("popupInfo").innerHTML = "";
    document.getElementById("popupInfo").innerHTML += `<div class="character-info">
    <p class="character-bio">CHARACTER INFORMATION</p>
    <p>Character Name: ${character.name}</p>
    <p>Gender: ${character.gender}</p>
    <p>Born: ${character.born}</p>
    <p>Title: ${character.titles}</p>
    <br>
    <p class="character-bio">BIOGRAPHY:</p>
    <p class="character-bio-text">${bioo}</p>
    <div id="character-btn" class="character-bio-btn" onclick="selectChar()" data-select="${getName}"><img src="resources/symbols/like.svg" alt="heart icon"> </div>
    </div>`
}

window.onclick = function (event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

function bio(charName){
    switch(charName){
        case "PetyrBaelish":
            bioo = "I'm probably in love with your mum, but I will make you queen."
        break;
        case "CerseiLannister":
            bioo = "Swipe right or die."
        break;
        case "DaenerysTargaryen":
            bioo = "Come find out why they call me mad queen."
        break;
        case "SansaStark":
            bioo = "Been married a few times but nothing serious, not looking for another little finger in my life."
        break;
        case "Drogo":
            bioo = "The dothraki have no word for hair cut."
        break;
        case "GreyWorm":
            bioo = "Saw the love of my life get executed, not looking for anything serious atm."
        break;
        case "Melisandre":
            bioo = "Sometimes I light people on fire."
        break;
        case "AryaStark":
            bioo = "A girl has no preference."
        break;
        case "MargaeryTyrell":
            bioo = "My best relationship was with a gay man." 
        break;
    }
}

function selectChar() {
    const btn = document.querySelector("#character-btn");
    let theData = btn.getAttribute("data-select");
    sessionStorage.setItem("yourMatch", theData);
    popup.style.display = "none";
    if ("yourMatch" in sessionStorage) {
        let yourMatch = sessionStorage.getItem("yourMatch");
        document.querySelector("#instructions").innerHTML = "";
        document.querySelector("#instructions").innerHTML += `<a href="board.html"><button class="start-btn"> time for jon snow to impress his match! </button></a> ` //renders start button if a match was selected
        document.getElementById("selectedMatch").innerHTML = "";
        document.getElementById("selectedMatch").innerHTML += `<div class="matchDisplay">
        <p class="selectedCharText">Currently selected love match:</p>
        <img src="resources/chars/${yourMatch}.svg" alt="player match"> <img src="resources/symbols/like.svg" alt="heart icon"></div>`
        setTimeout(scrollToTop, 1000)
    }
}

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 10);
    }
  };

  function instructCharacter() {
    const popup = document.getElementById("instructionsCharacter");
    popup.classList.remove("hide");
    popup.classList.add("show");
    document.body.classList.add("body-no-scroll");
    if (popup.classList.contains('show')) {
        window.onclick = function (event) {
            if (event.target == popup) {
                popup.classList.add("hide");
                popup.classList.remove("show");
                document.body.classList.remove("body-no-scroll");
            }
        }
    }
}

function closePopChar(){
    const popup = document.getElementById("instructionsCharacter");
    popup.classList.add("hide");
    popup.classList.remove("show");
    document.body.classList.remove("body-no-scroll");
}

document.getElementById("instr-btn-char").addEventListener("click", instructCharacter);
document.getElementById("closeCharX").addEventListener("click", closePopChar);

setTimeout(instructCharacter, 1000);