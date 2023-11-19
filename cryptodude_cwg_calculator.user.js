// ==UserScript==
// @name         CRYPTODUDE CWG Calculator b
// @namespace    http://tampermonkey.net/
// @version      0.1.1129b
// @description  CWG Calculator for Common World Ground is a specific ingame overlay build calculator with the option to write current production per hour and improve your build.
// @author       Special thanks to Oizys (you are the man) for many functions to make it work in-game. Modified by CRYPTODUDE for better functioning + minor tweaks
// @match        *://*.gala.com/games/town-star
// @match        *://*.gala.games/games/town-star
// @match        *://*.gala.com/games/tsg-playtest
// @match        *://*.gala.games/games/tsg-playtest
// @match        *://tsf-client.gala.com/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
    'use strict';

    // Add your CSS styles
    GM_addStyle(`

    @import url("https://fonts.googleapis.com/css2?family=Skranji&display=swap");
    #container {
        max-width: 100vw;
        height: 100vh;
        position: fixed;
        left: 100px;
        top: 50px;
        display: none;          
        align-items: center;
        justify-content: center;
        user-select: none;
      }
      .container-inner {
        background: #3B4664;
        padding: 40px;
        border-radius: 30px;
        box-shadow: 5px 6px 0px -2px #252D3F, -6px 5px 0px -2px #252D3F, 0px -2px 0px 2px #252D3F, 0px 0px 0px 0px #181E2A;
        width: 400px;
      }
  
      .content {
        font-family: "Skranji", cursive;
        background: radial-gradient(#fffbf3, #ffe19e);
        padding: 5px;
        box-sizing: border-box;
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0px 0px 0px 6px #252D3F, 0px 0px 8px 6px #252D3F, inset 0px 0px 15px 0px #252D3F, 6px 6px 1px 1px #181E2A, -6px 6px 1px 1px #181E2A;
        text-align: center;
        overflow-y: scroll;
        height: 400px;
        
      }
  
      .content p {
        font-size: 18px;
        padding: 5px;
        box-sizing: border-box;
        color: #461417;
      }
  
      .top-nav-title {
        margin-top: -94px;
        display: flex;
        justify-content: normal;
        align-items: center;
        gap: 10px;
        box-sizing: border-box;
        margin-bottom: -50px;
        
        
      }
  
      .top-nav-title button {
        padding-bottom: 10px;
        padding-top: 10px;
        padding-left: 10px;
        padding-right: 10px;
        flex: 1;
        /* border-radius: 20px; */
        border: 2px solid #3B4664;
        font-family: "Skranji", cursive;
        color: #fff;
        font-size: 22px;
        text-shadow: 1px 2px 3px #000000;
        -webkit-border-top-left-radius: 20px;
        -webkit-border-top-right-radius: 20px;
        -moz-border-radius-topleft: 20px;
        -moz-border-radius-topright: 20px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        margin-bottom: 50px;
        
      }
  
      .top-nav-title button.confirm {
        background: #3B4664;
        border: 4px solid #252D3F;
        border-bottom: none;
        
      }
  
      .top-nav-title button.cancel {
        background: linear-gradient(#ea7079, #891a1a);
        box-shadow: 0px 0px 0px 4px #7e1522, 0px 2px 0px 3px #e66565;
      }
  
      .bottom-nav-version {
        margin-top: 16px;
        display: flex;
        justify-content: normal;
        align-items: center;
        gap: 30px;
        box-sizing: border-box;
        margin-bottom: -90px;
      }
  
      .bottom-nav-version button {
        padding-bottom: 5px;
        padding-top: 2px;
        padding-left: 10px;
        padding-right: 10px;
  
        /* border-radius: 20px; */
        border: 1px solid #3B4664;
        font-family: "Skranji", cursive;
        color: #fff;
        font-size: 18px;
        text-shadow: 1px 2px 3px #000000;
        -webkit-top-bottom-left-radius: 20px;
        -webkit-border-bottom-right-radius: 20px;
        -moz-top-radius-topleft: 20px;
        -moz-border-radius-topright: 20px;
        border-top-left-radius: 20px;
        border-bottom-right-radius: 20px;
  
        margin-right: -39px;
        box-shadow: 0px 0px 0px 4px #252D3F;
  
  
  
      }
  
      .bottom-nav-version button.confirm {
        background: linear-gradient(#ced869, #536d1b);
  
      }
  
      .bottom-nav-version button.cancel {
        background: linear-gradient(#ea7079, #891a1a);
  
      }
  
      .bottom-nav-donate {
        margin-top: 20px;
        display: flex;
        justify-content: normal;
        align-items: center;
        gap: 30px;
        box-sizing: border-box;
        margin-bottom: -90px;
      }
  
      .bottom-nav-donate button {
        padding-bottom: 5px;
        padding-top: 2px;
        padding-left: 10px;
        padding-right: 10px;
  
        /* border-radius: 20px; */
        border: 1px solid #3B4664;
        font-family: "Skranji", cursive;
        color: #fff;
        font-size: 16px;
        text-shadow: 1px 2px 3px #000000;
        -webkit-border-top-right-radius: 20px;
        -webkit-border-bottom-left-radius: 20px;
        -moz-border-radius-topright: 20px;
        -moz-border-radius-bottomleft: 20px;
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        margin-bottom: 51px;
        margin-left: 3px;
        box-shadow: 0px 0px 0px 4px #252D3F;
  
  
  
      }
  
      .bottom-nav-donate button.confirm {
        background: linear-gradient(#ced869, #536d1b);
  
      }
  
      .bottom-nav-donate button.cancel {
        background: linear-gradient(#ea7079, #891a1a);
  
      }
  
      /* Works on Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: #7e1522 transparent;
      }
  
      /* Works on Chrome, Edge, and Safari */
      *::-webkit-scrollbar {
        width: 8px;
      }
  
      *::-webkit-scrollbar-track {
        background: transparent;
      }
  
      *::-webkit-scrollbar-thumb {
        background-color: #7e1522;
        border-radius: 20px;
        border: 3px solid transparent;
      }
  
      /*CUSTOM FORM WITH FILTER */
      select {
  
        /* styling */
  
        font-family: "Skranji", cursive;
  
        padding: 5px;
        box-sizing: border-box;
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0px 0px 0px 4px #252D3F;
        font-size: 18px;
  
  
        background-color: #ffe19e;
        color: #461417;
  
        display: inline-block;
  
        line-height: 1.5em;
        padding: 0.5em 3.5em 0.5em 1em;
        width: 100%;
  
        /* reset */
  
        margin: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-appearance: none;
        -moz-appearance: none;
      }
  
  
      /* arrows */
  
      select.minimal {
        background-image:
          linear-gradient(45deg, transparent 50%, #461417 50%),
          linear-gradient(135deg, #461417 50%, transparent 50%),
          linear-gradient(to right, #461417, #461417);
        background-position:
          calc(100% - 20px) calc(1em + 2px),
          calc(100% - 15px) calc(1em + 2px),
          calc(100% - 2.5em) 0.5em;
        background-size:
          5px 5px,
          5px 5px,
          1px 1.5em;
        background-repeat: no-repeat;
      }
  
      select.minimal:focus {
        background-image:
          linear-gradient(45deg, #461417 50%, transparent 50%),
          linear-gradient(135deg, transparent 50%, #461417 50%),
          linear-gradient(to right, #461417, #461417);
        background-position:
          calc(100% - 15px) 1em,
          calc(100% - 20px) 1em,
          calc(100% - 2.5em) 0.5em;
        background-size:
          5px 5px,
          5px 5px,
          1px 1.5em;
        background-repeat: no-repeat;
        border-color: #203462;
        outline: 0;
      }
  
  
      select:-moz-focusring {
        color: transparent;
        text-shadow: 0 0 0 #000;
      }
  
      .calculator-select-group {
        padding-top: 15px;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 15px;
      }
  
      .calculator-quantity-group {
  
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 10px;
      }
  
      .white-text {
        color: #fff;
        font-size: 18px;
        font-family: "Skranji", cursive;
      }
  
      .calculator-quantity-group input {
  
        width: 120px;
        padding: 15px;
        margin-left: 10px;
        margin-top: 0px;
        margin-right: 10px;
        margin-bottom: 10px;
        font-family: "Skranji", cursive;
  
        padding: 5px;
        box-sizing: border-box;
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0px 0px 0px 4px #252D3F;
        font-size: 18px;
  
  
        background-color: #ffe19e;
        color: #461417;
  
        display: inline-block;
  
        line-height: 1.5em;
  
  
      }
      .bottom-nav-donate {float:left;margin-left:-43px;}
      .bottom-nav-version {float:right;}
      .bottom-area {
        padding-bottom: 22px;
        margin-bottom: -11px;
    }
    .ingredient {
        grid-column: 2/3;
    }
    #craft_content {
        text-align: left;
        height: 368px;
    }
    .craft_left {
        text-align: left;
        font-size:14px;
    }
    .recipeimages {
        width: 24px;
    }

    #cgcalculator-title-bar{
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}
.ingredient {
    display: flex;
    align-items: center;
    padding: 5px;
    border: solid 2px darkgrey;
    /* opacity: 0.5; */
    color: black;
    border-radius: 5px;
    margin: 5px;
}
.craftinfodata {
    display: flex;
    /* align-items: center; */
    align-items: center;
    width: 220px;

}
.info-button-container {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.info-button {
    background-color: #fff;
    color: #3B4664;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Skranji", cursive;
    /* font-style: italic; */
    font-size: 18px;
    margin-top: -50px;
    margin-right: -5px;
    font-weight: bold;
}

.tooltip {
    display: none;
    position: absolute;
    background-color: #3B4664;
    color: #fff;
    padding: 8px;
    border-radius: 5px;
    font-size: 16px;
    font-family: "Skranji", cursive;
    white-space: nowrap;
    top: 50%;
    transform: translateY(-50%);
    left: calc(100% + 20px);
    margin-top: 120px;
    text-shadow: 1px 2px 3px #000000;
    max-width: 370px;
    text-align: left;
}
.tooltip::before {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%; /* Adjusted from left to right */
    margin-top: -165px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent #3B4664 transparent transparent; /* Adjust the color as needed */
}

.info-button-container:hover .tooltip {
    display: block;
}

.text-center {text-align: center;}

.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    width: 600px;
    height: 450px;
}

.modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
    cursor: pointer;
}

    `);

    // Create the HTML elements
    const container = document.createElement('div');
    container.id = 'container';

    const containerInner = document.createElement('div');
    containerInner.className = 'container-inner';

    const topNavTitle = document.createElement('div');
    topNavTitle.className = 'top-nav-title';

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'confirm';
    closeButton.innerHTML = `<img src="https://icons.iconarchive.com/icons/froyoshark/enkel/24/Calculator-icon.png" width="24" height="24" style="vertical-align: middle;padding-right: 5px;">${GM_info.script.name}`;

    topNavTitle.appendChild(closeButton);

    
   // add info button

   const infoButtonContainer = document.createElement('div');
   infoButtonContainer.id = 'infoButtonContainer';
   infoButtonContainer.className = 'info-button-container';
   
   const infoButton = document.createElement('div');
   infoButton.id = 'infoButton';
   infoButton.className = 'info-button';
   infoButton.textContent = 'i';
   
   // Add a tooltip for the info button
   const tooltip = document.createElement('div');
   tooltip.className = 'tooltip';
   tooltip.innerHTML = `1. Please Select your Craft Product.
   <p>2. Add your desired production quantity.</p>
   <p>3. Check the needed materials quantity. </p>
   <p>4. Write your current materials quantity.</p>
   <p>5. Check if u are less-producing or over-producing.</p>
   <p class="text-center"><b>Try to Improve your build /hour.</b></p>
   <p class="text-center">Check for new version if u <b>click the version button</b></p>
   <p class="text-center">Want to donate for my work.</p> 
   <p class="text-center"><b>Click my Donation Tip-jar button</b></p>
   `;
   
   infoButtonContainer.appendChild(infoButton);
   infoButtonContainer.appendChild(tooltip);


    // SELECT BOX
    
    const calculatorSelectGroup = document.createElement('div');
    calculatorSelectGroup.id = 'selectCRAFTs';
    calculatorSelectGroup.className = 'calculator-select-group';

    const selectBox = document.createElement('select');
    selectBox.id = 'selectCRAFTs-select';
    selectBox.className = 'minimal';
    selectBox.addEventListener('change', DisplayCraftCalculation);

    // Create an option element for the selectCRAFTs dropdown
    const selectCRAFTsOption = document.createElement('option');
    selectCRAFTsOption.value = '';
    selectCRAFTsOption.text = '-- Select a Product --';

    selectBox.appendChild(selectCRAFTsOption);


    calculatorSelectGroup.appendChild(selectBox);






// Create a div element for the selectCRAFTs-QTY

    const calculatorQuantityGroup = document.createElement('div');
    calculatorQuantityGroup.className = 'calculator-quantity-group';

    const quantityLabel = document.createElement('span');
    quantityLabel.className = 'white-text';
    quantityLabel.textContent = 'PRODUCTION QTY : ';

    const quantityInput = document.createElement('input');
    quantityInput.id = 'selectCRAFTs-QTY-input';
    quantityInput.type = 'number';
    quantityInput.min = '1';
    quantityInput.value = '1';
    quantityInput.max = '9999';
    quantityInput.step = '1';



    const quantityUnit = document.createElement('span');
    quantityUnit.className = 'white-text';
    quantityUnit.textContent = '/ HOUR';

    calculatorQuantityGroup.appendChild(quantityLabel);
    calculatorQuantityGroup.appendChild(quantityInput);
    calculatorQuantityGroup.appendChild(quantityUnit);

    const content = document.createElement('div');
    content.className = 'content';
    content.id = 'craft_content';

    


    const bottomArea = document.createElement('div');
    bottomArea.className = 'bottom-area';

    const bottomNavDonate = document.createElement('div');
    bottomNavDonate.className = 'bottom-nav-donate';
    const donateButton = document.createElement('button');
    donateButton.type = 'button';
    donateButton.className = 'confirm';
    donateButton.textContent = 'DONATION TIP-JAR';
    bottomNavDonate.appendChild(donateButton);

    const bottomNavVersion = document.createElement('div');
    bottomNavVersion.className = 'bottom-nav-version';
    const versionButton = document.createElement('button');
    versionButton.type = 'button';
    versionButton.className = 'cancel';
    versionButton.textContent = `v.${GM_info.script.version}`;
    bottomNavVersion.appendChild(versionButton);

    bottomArea.appendChild(bottomNavDonate);
    bottomArea.appendChild(bottomNavVersion);

    // Append elements to the DOM
    containerInner.appendChild(topNavTitle);
    containerInner.appendChild(infoButtonContainer);
    containerInner.appendChild(calculatorSelectGroup);
    containerInner.appendChild(calculatorQuantityGroup);
    containerInner.appendChild(content);
    containerInner.appendChild(bottomArea);
    container.appendChild(containerInner);
    document.body.appendChild(container);




// CALCULATOR SCRIPT
const selectCRAFTsQtyInputa = document.getElementById('selectCRAFTs-QTY-input');
selectCRAFTsQtyInputa.addEventListener('input', DisplayCraftCalculation);

// Global variables
const maxRequirement = 4;
const maxLoop = 9999;
let loopCount = 0;

// Function to populate dropdown
function populateCraftsDropdownvtwo() {
    const productSelect = $('#selectCRAFTs-select');
    const productNames = Object.keys(recipes);
  
    $.each(productNames, function(index, productName) {
      const option = $('<option>', {
        value: productName,
        text: getPrettyName(productName)
      });
      productSelect.append(option);
    });
  }

  // Function to display calculation info
function DisplayCalcInfo() {
    RemoveInfoTabSelected();
    document.querySelector('#calculation-tab').classList.add('selected');
    document.querySelector('#container').style.display = 'block';
  }


  // Modified function to get product craft requirement
function GetProductCraftRequirement(productName, multiple = 1, requirements) {
    loopCount++;
    const craft = recipes[productName];
  
    for (let i = 1; i <= maxRequirement; i++) {
      const requirement = craft["Req" + i];
  
      if (requirement === "none" || requirement === undefined) {
        return;
      }
  
      if (requirements[requirement] === undefined) {
        requirements[requirement] = 0;
      }
  
      const value = craft["Value" + i];
      const newValue = value * multiple;
  
      requirements[requirement] += Math.ceil(newValue);
      GetProductCraftRequirement(requirement, newValue, requirements);
    }
  }

  // Function to display craft calculation
function DisplayCraftCalculation() {
    const productName = $('#selectCRAFTs-select').val();
    const rate = $('#selectCRAFTs-QTY-input').val();
    const craft = recipes[productName];

    if (!craft || rate <= 0) {
        return;
    }

    const requirements = {};
    loopCount = 0;
    GetProductCraftRequirement(productName, 1, requirements);

    // Clear previous content.
    $('#craft_content').empty();

    const sortedRequirements = SortObject(requirements);

    for (const requirement in sortedRequirements) {
        const value = sortedRequirements[requirement] * rate;

        const requirementContainer = $('<div>').addClass('ingredient');
        const craftInfoData = $('<div>').addClass('craftinfodata'); // Create craftinfodata div

        const requirementImage = $('<img>').attr('src', getCraftIcon(requirement)).addClass('recipeimages');

        const requirementValue = $('<span>').addClass('product-QTY-value').text(` ( ${value.toFixed(0)} ) `).css({
            paddingLeft: '2px',
            paddingRight: '2px',
        });

        const requirementName = $('<span>')
        .addClass('product-QTY-name')
        .text(getPrettyName(requirement))
        .css({
            paddingLeft: '2px',
            paddingRight: '2px',
        });

    // Check the length of requirementName and reduce font size if necessary
    if (requirementName.text().length > 20) {
        requirementName.css('font-size', '12px');
    }

        // Add a new element with an input field for currentValue
        const currentValue = $('<span>').addClass('product-QTY-value');
        const currentValueInput = $('<input>')
            .attr('type', 'text')
            .attr('value', '')
            .css({
                maxWidth: '50px',
                paddingLeft: '2px',
                paddingRight: '2px',
            });

        // Create a calcoutput span
        const calcoutput = $('<span>').css({
            paddingLeft: '5px',
            paddingRight: '2px',
            color: 'black', // Set the default text color to red
            fontSize: '12px',
        }).text('< insert value'); // Set the default text

        // Add an event listener to allow only numeric input and update calcoutput
        currentValueInput.on('input', function (event) {
            const inputValue = event.target.value;
            const numericValue = inputValue.replace(/[^0-9]/g, '');

            if (numericValue === '') {
                calcoutput.text('< insert value').css({
                    color: 'black',
                });
            } else {
                const result = parseFloat(numericValue) - value;
                if (result < 0) {
                    calcoutput.text(`Missing ${Math.abs(result).toFixed(0)}`).css({
                        color: 'red',
                    });
                } else {
                    calcoutput.text(`More by ${result.toFixed(0)}`).css({
                        color: 'green',
                    });
                }
            }
        });

        currentValue.append(currentValueInput);

        craftInfoData.append(requirementImage); // Add requirementImage to craftinfodata
        craftInfoData.append(requirementValue); // Add requirementValue to craftinfodata
        craftInfoData.append(requirementName);  // Add requirementName to craftinfodata

        requirementContainer.append(craftInfoData); // Append craftinfodata to requirementContainer
        requirementContainer.append(currentValue);
        requirementContainer.append(calcoutput);

        $('#craft_content').append(requirementContainer);
    }
}

function SortObject(obj) {
    return Object.keys(obj)
      .sort()
      .reduce(function (result, key) {
        result[key] = obj[key];
        return result;
      }, {});
  }

  function getPrettyName(name) {
    return name.replaceAll("_", " ");
  }

  function getCraftIcon(craft) {
    return getFullURL(recipes[craft]?.FileUrl);
    };

        // Overwrite getFullURL
        function getFullURL(assetPath) {
            let url = '';
            if (assetPath) {
               url = `https://www.dnkdesign.com.mk/lwgtsv/${assetPath}`;
  //              url = `http://127.0.0.1:5500/${assetPath}`; // smeni go od https vo http dokolku ima problem
                if (assetPath.substring(0,4) == "http") {
                    url = assetPath;
                }
            }
            return url;
        }



// SAVE DRAG POSITION AND FUNCTION FOR DRAGGING
// Add drag functionality
let offsetX, offsetY, isDragging = false;

container.addEventListener('mousedown', (e) => {
    // Check if the click was on elements that should not trigger drag
    const clickedOnNonDraggableElement =
        e.target.closest('.calculator-select-group') ||
        e.target.closest('.calculator-quantity-group') ||
        e.target.closest('.bottom-nav-version') ||
        e.target.closest('.bottom-nav-donate') ||
        e.target.closest('.content');

    if (!clickedOnNonDraggableElement) {
        isDragging = true;
        offsetX = e.clientX - container.getBoundingClientRect().left;
        offsetY = e.clientY - container.getBoundingClientRect().top;
    }
});

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            container.style.left = e.clientX - offsetX + 'px';
            container.style.top = e.clientY - offsetY + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        // Save the position to local storage
        localStorage.setItem('cryptodude-calculator-pos', JSON.stringify({
            left: container.style.left,
            top: container.style.top,
        }));
    });

    // Hide the container by default
    container.style.display = 'none';

    // Show/hide container when pressing the "C" button
    document.addEventListener('keydown', (e) => {
        if (e.key === 'c' || e.key === 'C') {
            if (container.style.display === 'none') {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        }
    });

    // Load the position from local storage
    const savedPosition = localStorage.getItem('cryptodude-calculator-pos');
    if (savedPosition) {
        const parsedPosition = JSON.parse(savedPosition);
        container.style.left = parsedPosition.left;
        container.style.top = parsedPosition.top;
    }








//recipes
const recipes = {
    "350k_Stars": {
        "CityPoints": 0,
        "CityPrice": 0,
        "Class": "Produced",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cash",
        "Req2": "none",
        "Req3": "none",
        "Time0": 300,
        "Time1": 600,
        "Time2": 1200,
        "Time3": 2400,
        "Value1": 2500000,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/123368345/1/icon_350kStars.png?t=2b3c023ac3f194ab8e875a3fd955a773"
    },
    "Advanced_Salmon": {
        "CityPoints": 620,
        "CityPrice": 19000,
        "Class": "Fish",
        "Name": "Salmon",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Fish_Chum",
        "Req2": "Energy",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 3,
        "Value3": 0,
        "FileUrl": "files/assets/127806752/1/icon_farmSalmon.png?t=6789450e261a0b82da0ee22dbf7cc01c"
    },
    "Apple": {
        "CityPoints": 5,
        "CityPrice": 700,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 360,
        "Time1": 720,
        "Time2": 1440,
        "Time3": 2880,
        "Value1": 6,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets3/icon_Apple.png"
    },
    "Apple_Pie": {
        "CityPoints": 425,
        "CityPrice": 40250,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Flour",
        "Req2": "Apple",
        "Req3": "Butter",
        "Req4": "Corn_Starch",
        "Time0": 90,
        "Time1": 180,
        "Time2": 360,
        "Time3": 720,
        "Value1": 2,
        "Value2": 5,
        "Value3": 1,
        "Value4": 2,
        "FileUrl": "files/assets3/icon_Apple_Pie.png"
    },
    "Baa_Wool": {
        "CityPoints": 28,
        "CityPrice": 3750,
        "Class": "Crafted",
        "Name": "Wool",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Feed",
        "Req2": "Wood",
        "Req3": "Water",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 4,
        "Value2": 1,
        "Value3": 2,
        "FileUrl": "files/assets/24496950/1/icon_wool.png?t=70a6c832dbf65cc405378ad00a0fbac9"
    },
    "Baguette": {
        "CityPoints": 900,
        "CityPrice": 110000,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Dough",
        "Req2": "Butter",
        "Req3": "Flour",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 1,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/24496986/1/icon_baguette.png?t=37cd3e325e708883a4acc6b75c1d0625"
    },
    "Barn_Feed": {
        "CityPoints": 1,
        "CityPrice": 340,
        "Class": "Feed",
        "Name": "Feed",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "none",
        "Req2": "none",
        "Req3": "none",
        "Time0": 10,
        "Time1": 20,
        "Time2": 40,
        "Time3": 80,
        "Value1": 2,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_barn_feed.png"
    },
    "Barn_Water": {
        "CityPoints": 1,
        "CityPrice": 50,
        "Class": "Natural",
        "Name": "Water",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "none",
        "Req2": "none",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 0,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_barn_water.png"
    },
    "Batter": {
        "CityPoints": 450,
        "CityPrice": 60700,
        "Class": "Crafted",
        "ProximityBonus": "Eggs",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Flour",
        "Req2": "Eggs",
        "Req3": "Butter",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 5,
        "Value2": 3,
        "Value3": 2,
        "FileUrl": "files/assets/24496985/1/icon_batter.png?t=714a371fa955fef84f9d372fb5f09e25"
    },
    "Bicycle": {
        "CityPoints": 16600,
        "CityPrice": 120000,
        "Class": "Produced",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Blue_Steel",
        "Req2": "Mystic_Matter",
        "Req3": "Lights",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 1,
        "Value2": 1,
        "Value3": 2,
        "FileUrl": "files/assets/113156610/1/icon_bicycle.png?t=724028a107c9d6d20f49eebd7d966181"
    },
    "Blue_Steel": {
        "CityPoints": 6800,
        "CityPrice": 270950,
        "Class": "Produced",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Steel",
        "Req2": "Uniforms",
        "Req3": "Energy",
        "Time0": 90,
        "Time1": 180,
        "Time2": 360,
        "Time3": 720,
        "Value1": 5,
        "Value2": 1,
        "Value3": 10,
        "FileUrl": "files/assets/24496984/1/icon_blueSteel.png?t=0d58012fad449746318c356986708750"
    },
    "Boom_Canes": {
        "CityPoints": 650,
        "CityPrice": 12600,
        "Class": "Produced",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Magic_Powder",
        "Req2": "Mystic_Matter",
        "Req3": "Candy_Canes",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 1,
        "Value3": 2,
        "FileUrl": "files/assets/113652698/1/icon_boomCanes.png?t=a445be6b8111cd791da685a028ba0142"
    },
    "Bracelet": {
        "CityPoints": 310,
        "CityPrice": 110000,
        "Class": "Jewelry",
        "ProximityBonus": "None",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Copper_Jump_Ring",
        "Req2": "Silver_Jump_Ring",
        "Req3": "Lobster_Clasp",
        "Time0": 150,
        "Time1": 300,
        "Time2": 600,
        "Time3": 1200,
        "Value1": 6,
        "Value2": 3,
        "Value3": 1,
        "FileUrl": "files/assets2/2/icon_bracelet.png"
    },
    "Bread": {
        "CityPoints": 153,
        "CityPrice": 15550,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Flour",
        "Req2": "Milk",
        "Req3": "Salt",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 4,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/24496982/1/icon_bread.png?t=eae581e650676b6f48df84ea3de055ef"
    },
    "Bright_Corn_Starch": {
        "CityPoints": 14,
        "CityPrice": 2300,
        "Class": "Crafted",
        "Name": "Corn_Starch",
        "ProximityBonus": "Corn",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Corn",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 4,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/4/icon_Bright_Corn_Starch.png"
    },
    "Bright_Flour": {
        "CityPoints": 12,
        "CityPrice": 2000,
        "Class": "Crafted",
        "Name": "Flour",
        "ProximityBonus": "Wheat",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Wheat",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 2,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496968/1/icon_flour.png?t=54b202363da43d50e30fdf511b571609"
    },
    "Bright_Salt": {
        "CityPoints": 16,
        "CityPrice": 2250,
        "Class": "Crafted",
        "Name": "Salt",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Brine",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 4,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496956/1/icon_salt.png?t=966ccd519247d3d9303b8b6dd003b070"
    },
    "Bright_Sugar": {
        "CityPoints": 21,
        "CityPrice": 2300,
        "Class": "Crafted",
        "Name": "Sugar",
        "ProximityBonus": "Sugarcane",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Sugarcane",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 3,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496954/1/icon_sugar.png?t=f9a32fe1e00c61e73a7437ec68bcd9a4"
    },
    "Brine": {
        "CityPoints": 1,
        "CityPrice": 300,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Salty,PositiveOnlySalty",
        "ProximityReverse": true,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 180,
        "Time1": 180,
        "Time2": 75,
        "Time3": 30,
        "TimeReverse": true,
        "Value1": 3,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496979/1/icon_brine.png?t=b3c42c4a37547d53e25b0bd4a4706e36"
    },
    "Butter": {
        "CityPoints": 153,
        "CityPrice": 20000,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Milk",
        "Req2": "Salt",
        "Req3": "Sugar",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 2,
        "Value3": 1,
        "FileUrl": "files/assets/24496980/1/icon_butter.png?t=85cb1cdd97b555153961015587cb11ae"
    },
    "Cabernet_Grapes": {
        "CityPoints": 6,
        "CityPrice": 1820,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "Wood",
        "Req3": "none",
        "Time0": 420,
        "Time1": 840,
        "Time2": 1680,
        "Time3": 3360,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets/43726733/1/icon_cabernetGrapes.png?t=d8d158a2287c083ecb38dd7cf85c0a29"
    },
    "Cabernet_Sauvignon": {
        "CityPoints": 536,
        "CityPrice": 42000,
        "Class": "Crafted",
        "ProximityBonus": "Cabernet_Grapes",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cabernet_Grapes",
        "Req2": "Wine_Bottle",
        "Req3": "Oak_Barrel",
        "Time0": 270,
        "Time1": 540,
        "Time2": 1080,
        "Time3": 2160,
        "Value1": 5,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/43726732/1/icon_cabernetSauvignon.png?t=0502b79a4793abb9a0be172655eccc8d"
    },
    "Cake": {
        "CityPoints": 5500,
        "CityPrice": 214050,
        "Class": "Crafted",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Batter",
        "Req2": "Sugar",
        "Req3": "Energy",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 3,
        "Value2": 6,
        "Value3": 3,
        "FileUrl": "files/assets/24496983/1/icon_cake.png?t=1691034adb80686649e28684bb2e6cf1"
    },
    "Candy_Canes": {
        "CityPoints": 200,
        "CityPrice": 22000,
        "Class": "Crafted",
        "ProximityBonus": "Peppermint,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Peppermint",
        "Req2": "Sugar",
        "Req3": "Energy",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 3,
        "Value2": 3,
        "Value3": 5,
        "FileUrl": "files/assets/60802460/1/icon_candyCanes.png?t=1737de5b91722524304c7ce357f2c943"
    },
    "Candy_Corn": {
        "CityPoints": 360,
        "CityPrice": 22400,
        "Class": "Crafted",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Corn_Starch",
        "Req2": "Sugar",
        "Req3": "Milk",
        "Req4": "Energy",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 3,
        "Value2": 3,
        "Value3": 1,
        "Value4": 2,
        "FileUrl": "files/assets/4/icon_candy_corn.png"
    },
    "Cash": {
        "CityPoints": 0,
        "CityPrice": 0,
        "Class": null,
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "none",
        "Req2": "none",
        "Req3": "none",
        "Time0": 0,
        "Time1": 0,
        "Time2": 0,
        "Time3": 0,
        "Value1": 0,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24639092/1/icon_cash.png?t=14c610fca631db05c767c1d447bdb456"
    },
    "Ceramic_Bowl": {
        "CityPoints": 9,
        "CityPrice": 800,
        "Class": "Produced",
        "ProximityBonus": "Clay_Lump,Water_Drum,Energy",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Clay_Lump",
        "Req2": "Water_Drum",
        "Req3": "Energy",
        "Time0": 150,
        "Time1": 300,
        "Time2": 600,
        "Time3": 1200,
        "Value1": 2,
        "Value2": 1,
        "Value3": 2,
        "FileUrl": "files/assets/94518245/1/icon_ceramicBowl.png?t=99272b276b4739e5386dbfdaf951e1d8"
    },
    "Chardonnay": {
        "CityPoints": 350,
        "CityPrice": 27950,
        "Class": "Crafted",
        "ProximityBonus": "Chardonnay_Grapes",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Chardonnay_Grapes",
        "Req2": "Wine_Bottle",
        "Req3": "Oak_Barrel",
        "Time0": 240,
        "Time1": 480,
        "Time2": 960,
        "Time3": 1920,
        "Value1": 3,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/43726734/1/icon_chardonnay.png?t=6d854a703d00942cef9eb62b42d6a15a"
    },
    "Chardonnay_Grapes": {
        "CityPoints": 2,
        "CityPrice": 810,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "Wood",
        "Req3": "none",
        "Time0": 360,
        "Time1": 720,
        "Time2": 1440,
        "Time3": 2880,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets/43726735/1/icon_chardonnayGrapes.png?t=8dba9a4bc01f8f48c1a1bdba262801bd"
    },   
    "Chandelier_Earrings": {
        "CityPoints": 311,
        "CityPrice": 82740,
        "Class": "Jewelry",
        "ProximityBonus": "None",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Copper_Jump_Ring",
        "Req2": "Silver_Jump_Ring",
        "Req3": "Silver_Wire",
        "Time0": 100,
        "Time1": 200,
        "Time2": 400,
        "Time3": 800,
        "Value1": 4,
        "Value2": 2,
        "Value3": 2,
        "FileUrl": "files/assets2/2/icon_chandelier_earrings.png"
    }, //ok
    "Cheese": {
        "CityPoints": 150,
        "CityPrice": 13000,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Milk",
        "Req2": "Rice_Vinegar",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/cheese.png"
    },
    "Chocolate_Pie": {
        "CityPoints": 1650,
        "CityPrice": 45250,
        "Class": "Crafted",
        "ProximityBonus": "Eggs",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Corn_Starch",
        "Req2": "Eggs",
        "Req3": "Chocolate_Bar",
        "Req4": "Butter",
        "Time0": 180,
        "Time1": 360,
        "Time2": 720,
        "Time3": 1440,
        "Value1": 1,
        "Value2": 4,
        "Value3": 4,
        "Value4": 1,
        "FileUrl": "files/assets/4/icon_Chocolate_Pie.png"
    },
    "Corn": {
        "CityPoints": 1,
        "CityPrice": 400,
        "Class": "Crafted",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Shady,Salty",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 10,
        "Time1": 20,
        "Time2": 40,
        "Time3": 80,
        "Value1": 2,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/4/icon_corn.png"
    },
    "Corn_Starch": {
        "CityPoints": 14,
        "CityPrice": 2300,
        "Class": "Crafted",
        "ProximityBonus": "Corn",
        "ProximityPenalty": "Shady",
        "ProximityReverse": false,
        "Req1": "Corn",
        "Req2": "Wood",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 4,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets/4/icon_Corn_Starch.png"
    },
    "Copper": {
        "CityPoints": 7,
        "CityPrice": 1860,
        "Class": "Produced",
        "ProximityBonus": "Copper_Ore",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Copper_Ore",
        "Req2": "Wood",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 5,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/3/icon_copper_metal.png"
    }, //ok
    "Copper_Jump_Ring": {
        "CityPoints": 18,
        "CityPrice": 4820,
        "Class": "Jewelry",
        "ProximityBonus": "None",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Copper_Wire",
        "Req2": "none",
        "Req3": "none",
        "Time0": 10,
        "Time1": 20,
        "Time2": 40,
        "Time3": 80,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_copper_jump_ring.png"
    }, //ok
    "Copper_Ore": {
        "CityPoints": 2,
        "CityPrice": 300,
        "Class": "Ore",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 10,
        "Time1": 15,
        "Time2": 20,
        "Time3": 25,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_copper_ore.png"
    }, //ok
    "Copper_Wire": {
        "CityPoints": 17,
        "CityPrice": 4420,
        "Class": "Produced",
        "ProximityBonus": "Copper,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Copper",
        "Req2": "Energy",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_copper_wire.png"
    }, //ok
    "Four_Cheese_Pizza": {
        "CityPoints": 1200,
        "CityPrice": 138000,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Pizza_Base",
        "Req2": "Cheese",
        "Req3": "Tomato",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 1,
        "Value2": 2,
        "Value3": 5,
        "FileUrl": "files/assets2/four_cheese_pizza.png"
    },
    "Chocolate_Bar": {
        "CityPoints": 250,
        "CityPrice": 6650,
        "Class": "Crafted",
        "ProximityBonus": "Cocoa",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cocoa",
        "Req2": "Sugar",
        "Req3": "Milk",
        "Time0": 90,
        "Time1": 180,
        "Time2": 360,
        "Time3": 720,
        "Value1": 3,
        "Value2": 2,
        "Value3": 1,
        "FileUrl": "files/assets/60802462/1/icon_chocolateBar.png?t=a85b9c08d9bc904391317743c93eadb6"
    },
    "Chocolate_Covered_Strawberries": {
        "CityPoints": 500,
        "CityPrice": 22000,
        "Class": "Crafted",
        "ProximityBonus": "Strawberries,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Strawberries",
        "Req2": "Chocolate_Bar",
        "Req3": "Energy",
        "Time0": 45,
        "Time1": 90,
        "Time2": 180,
        "Time3": 360,
        "Value1": 6,
        "Value2": 2,
        "Value3": 2,
        "FileUrl": "files/assets/87147622/1/icon_chocolateCoveredStrawberries.png?t=1fa90bac2c88a40c7c9e3f36a4d2710a"
    },
    "Chromium": {
        "CityPoints": 54,
        "CityPrice": 4600,
        "Class": "Natural",
        "ProximityBonus": "Energy,Water_Drum",
        "ProximityPenalty": "Water",
        "ProximityReverse": false,
        "Req1": "Lumber",
        "Req2": "Energy",
        "Req3": "Water_Drum",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 1,
        "Value2": 3,
        "Value3": 2,
        "FileUrl": "files/assets/43726739/1/icon_chromium.png?t=bc91ea3d6a7913438fa6ae66a5cad598"
    },
    "Clay_Lump": {
        "CityPoints": 3,
        "CityPrice": 300,
        "Class": "Natural",
        "ProximityBonus": "Water",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 3,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/94518239/1/icon_clayLump.png?t=ac4ab0670a5c72c3087694a535a537e4"
    },
    "Cocoa": {
        "CityPoints": 5,
        "CityPrice": 352,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 5,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/60802463/1/icon_cocoa.png?t=3debc2a549da52d5eda754ed87708b2b"
    },
    "Cold": {
        "CityPoints": 0,
        "CityPrice": 0,
        "Class": "Natural",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "none",
        "Req2": "none",
        "Req3": "none",
        "Time0": 0,
        "Time1": 0,
        "Time2": 0,
        "Time3": 0,
        "Value1": 0,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/113760714/1/icon_cold.png?t=0ab031252cd572403a7a8a5e5cf0e543"
    },
    "Cotton": {
        "CityPoints": 1,
        "CityPrice": 350,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 4,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496930/1/icon_cotton.png?t=88c43d55100a3af0aae808b337e70a6f"
    },
    "Cotton_Yarn": {
        "CityPoints": 16,
        "CityPrice": 3250,
        "Class": "Produced",
        "ProximityBonus": "Cotton,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cotton",
        "Req2": "Lumber",
        "Req3": "Energy",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 5,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/24496977/1/icon_cottonYarn.png?t=536a340e113734fd820d78ba4dc9d1ba"
    },
    "Crude_Oil": {
        "CityPoints": 1,
        "CityPrice": 50,
        "Class": "Fuel",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "none",
        "Req2": "none",
        "Req3": "none",
        "Time0": 180,
        "Time1": 360,
        "Time2": 720,
        "Time3": 1440,
        "Value1": 0,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496975/1/icon_crudeOil.png?t=b8613c6cd6f16ef2e09f117cb8e72d55"
    },
    "Decorated_Cake": {
        "CityPoints": 13757,
        "CityPrice": 371050,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cake",
        "Req2": "Chocolate_Bar",
        "Req3": "Candy_Canes",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 1,
        "Value2": 1,
        "Value3": 2,
        "FileUrl": "files/assets/87526795/1/icon_decoratedCake.png?t=c6faaa9091ce41ea776974b45b98611a"
    },
    "Dough": {
        "CityPoints": 270,
        "CityPrice": 29150,
        "Class": "Crafted",
        "ProximityBonus": "Eggs",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Flour",
        "Req2": "Eggs",
        "Req3": "Butter",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 5,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/24496972/1/icon_dough.png?t=a69233c027a3d6ebfefdb1ff759d866c"
    },
    "Easy_Dough": {
        "CityPoints": 270,
        "CityPrice": 29150,
        "Class": "Crafted",
        "Name": "Dough",
        "ProximityBonus": "Eggs",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Flour",
        "Req2": "Eggs",
        "Req3": "none",
        "Time0": 90,
        "Time1": 180,
        "Time2": 360,
        "Time3": 720,
        "Value1": 5,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets/24496972/1/icon_dough.png?t=a69233c027a3d6ebfefdb1ff759d866c"
    },
    "Eel": {
        "CityPoints": 95,
        "CityPrice": 4500,
        "Class": "Fish",
        "ProximityBonus": "None",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Food_Mix",
        "Req2": "none",
        "Req3": "none",
        "Time0": 80,
        "Time1": 160,
        "Time2": 320,
        "Time3": 640,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/106782046/1/icon_eel.png?t=1db90cb8a2b97c3b377d3ebb04d02fac"
    },
    "Eel_Nigiri": {
        "CityPoints": 170,
        "CityPrice": 16350,
        "Class": "Crafted",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Eel",
        "Req2": "White_Rice",
        "Req3": "Wasabi",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/128233159/1/icon_eelNigiri.png?t=22eef0185131964d18eddaf796e56394"
    },
    "Eggs": {
        "CityPoints": 12,
        "CityPrice": 1650,
        "Class": "Crafted",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Feed",
        "Req2": "Wood",
        "Req3": "Water",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 3,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/24496927/1/icon_eggs.png?t=bf433510dcec27001157733569809d53"
    },
    "Enchanted_Object": {
        "CityPoints": 560,
        "CityPrice": 10500,
        "Class": "Produced",
        "ProximityBonus": "Peppermint",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Mystic_Matter",
        "Req2": "Peppermint",
        "Req3": "Molten_Glass",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 1,
        "Value2": 3,
        "Value3": 1,
        "FileUrl": "files/assets/113747927/1/icon_enchantedObject.png?t=1231b10410b01b792d58fe3a94ec3f8e"
    },
    "Energy": {
        "CityPoints": 1,
        "CityPrice": 150,
        "Class": "Produced",
        "ProximityBonus": "Crude_Oil,Water_Drum",
        "ProximityPenalty": "Shady",
        "ProximityReverse": false,
        "Req1": "Crude_Oil",
        "Req2": "Water_Drum",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets/24496973/1/icon_energy.png?t=6e3adfe40f9403610f4b9b972d04f5d4"
    },
    "Epic_Gasoline": {
        "CityPoints": 8,
        "CityPrice": 1450,
        "Class": "Fuel",
        "ProximityBonus": "Crude_Oil,Water_Drum,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Crude_Oil",
        "Req2": "Water_Drum",
        "Req3": "Energy",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 2,
        "Value2": 2,
        "Value3": 4,
        "FileUrl": "files/assets/24496966/1/icon_gasoline.png?t=a231669433ff6cc683e15871404c8f05"
    },
    "Everyone_Else_Speed": {
        "CityPoints": 0,
        "CityPrice": 0,
        "Class": "Bonus",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cash",
        "Req2": "Brine",
        "Req3": "Salmon",
        "Time0": 600,
        "Time1": 1200,
        "Time2": 2400,
        "Time3": 4800,
        "Value1": 5000000,
        "Value2": 100,
        "Value3": 50,
        "FileUrl": "files/assets/36113290/1/icon_everyoneElseSpeed.png?t=51b07322d867ed2445db57adf63ffae4"
    },
    "Fabric_Box": {
        "CityPoints": 4840,
        "CityPrice": 113350,
        "Class": "Produced",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Wooden_Box",
        "Req2": "Uniforms",
        "Req3": "Wax",
        "Time0": 40,
        "Time1": 80,
        "Time2": 160,
        "Time3": 320,
        "Value1": 1,
        "Value2": 3,
        "Value3": 1,
        "FileUrl": "files/assets/98540672/1/icon_fabricBox.png?t=2fd4d468efe1b141e89b3d69bbfbc7a4"
    },
    "Fancy_Cake": {
        "CityPoints": 7800,
        "CityPrice": 274500,
        "Class": "Crafted",
        "ProximityBonus": "Strawberries",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cake",
        "Req2": "Chocolate_Bar",
        "Req3": "Strawberries",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 3,
        "Value3": 2,
        "FileUrl": "files/assets/87526796/1/icon_fancyCake.png?t=31bf7a471c4f443f93a41bec3944c4aa"
    },
    "Farm_Salmon": {
        "CityPoints": 620,
        "CityPrice": 19000,
        "Class": "Fish",
        "Name": "Salmon",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Fish_Chum",
        "Req2": "Energy",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 6,
        "Value3": 0,
        "FileUrl": "files/assets/127806752/1/icon_farmSalmon.png?t=6789450e261a0b82da0ee22dbf7cc01c"
    },
    "Feed": {
        "CityPoints": 2,
        "CityPrice": 610,
        "Class": "Feed",
        "ProximityBonus": "Wheat",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "none",
        "Req2": "none",
        "Req3": "none",
        "Time0": 10,
        "Time1": 20,
        "Time2": 40,
        "Time3": 80,
        "Value1": 2,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496969/1/icon_feed.png?t=cee83bd2adbf464528860abd32601847"
    },
    "Fish_Chum": {
        "CityPoints": 110,
        "CityPrice": 3800,
        "Class": "Fish",
        "ProximityBonus": "Seaweed",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Seaweed",
        "Req2": "Shrimp",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 1,
        "Value2": 2,
        "Value3": 0,
        "FileUrl": "files/assets/126978415/1/icon_fishChum.png?t=e9edf050020307291d6be9772e34815c"
    },
    "Fisherman_Speed": {
        "CityPoints": 0,
        "CityPrice": 0,
        "Class": "Bonus",
        "ProximityBonus": "Seaweed",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cash",
        "Req2": "Seaweed",
        "Req3": "Shrimp",
        "Time0": 600,
        "Time1": 1200,
        "Time2": 2400,
        "Time3": 4800,
        "Value1": 2500000,
        "Value2": 100,
        "Value3": 50,
        "FileUrl": "files/assets/127661011/1/icon_fishermanSpeed.png?t=9de043819400720731206fa9c9a97c78"
    },
    "Flour": {
        "CityPoints": 12,
        "CityPrice": 2000,
        "Class": "Crafted",
        "ProximityBonus": "Wheat",
        "ProximityPenalty": "Shady",
        "ProximityReverse": false,
        "Req1": "Wheat",
        "Req2": "Wood",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets/24496968/1/icon_flour.png?t=54b202363da43d50e30fdf511b571609"
    },
    "Foundry_Copper_Jump_Ring": {
        "CityPoints": 18,
        "CityPrice": 4820,
        "Class": "Jewelry",
        "Name": "Copper_Jump_Ring",
        "ProximityBonus": "Copper,Silica",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Copper",
        "Req2": "Silica",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_copper_jump_ring.png"
    },
    "Foundry_Silver_Jump_Ring": {
        "CityPoints": 21,
        "CityPrice": 4990,
        "Class": "Jewelry",
        "Name": "Silver_Jump_Ring",
        "ProximityBonus": "Silver,Silica",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Silver",
        "Req2": "Silica",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_silver_jump_ring.png"
    },    
    "Food_Mix": {
        "CityPoints": 48,
        "CityPrice": 2800,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Roe",
        "Req2": "Worms",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets/128897567/1/icon_foodMix.png?t=b0a58d4197a3f2c84f503d438ff64f25"
    },
    "Food_Parcel": {
        "CityPoints": 9650,
        "CityPrice": 165000,
        "Class": "Produced",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Honey",
        "Req2": "Jam",
        "Req3": "Baguette",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 2,
        "Value3": 3,
        "FileUrl": "files/assets/98540886/1/icon_foodParcel.png?t=d523e3767594d309fc4402438ed6ac80"
    },
    "Gasoline": {
        "CityPoints": 8,
        "CityPrice": 1450,
        "Class": "Fuel",
        "ProximityBonus": "Water_Drum,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Petroleum",
        "Req2": "Water_Drum",
        "Req3": "Energy",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 2,
        "Value3": 6,
        "FileUrl": "files/assets/24496966/1/icon_gasoline.png?t=a231669433ff6cc683e15871404c8f05"
    },
    "Gift_Parcel": {
        "CityPoints": 28000,
        "CityPrice": 750000,
        "Class": "Produced",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Decorated_Cake",
        "Req2": "Sangria",
        "Req3": "Pumpkin_Pie",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/98540887/1/icon_giftParcel.png?t=ab74c738d259622ff650e293361b5d6c"
    },
    "Global_Speed": {
        "CityPoints": 0,
        "CityPrice": 0,
        "Class": "Bonus",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cash",
        "Req2": "Fish_Chum",
        "Req3": "Salmon_Nigiri",
        "Time0": 1800,
        "Time1": 3600,
        "Time2": 7200,
        "Time3": 14400,
        "Value1": 15000000,
        "Value2": 100,
        "Value3": 50,
        "FileUrl": "files/assets/119698546/1/icon_globalSpeed.png?t=c5c523e39781c4afc3d9dfdae5e3c899"
    },
    "Glue": {
        "CityPoints": 370,
        "CityPrice": 5500,
        "Class": "Crafted",
        "ProximityBonus": "Clay_Lump",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Honeycomb",
        "Req2": "Honey",
        "Req3": "Clay_Lump",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 1,
        "Value3": 2,
        "FileUrl": "files/assets/113238167/1/icon_glue.png?t=8034bcaaa7dea0bb390147dc095f53ba"
    },
    "Gold": {
        "CityPoints": 10,
        "CityPrice": 4880,
        "Class": "Produced",
        "ProximityBonus": "Gold_Ore",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Gold_Ore",
        "Req2": "Wood",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 3,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_gold.png"
    },
    "Golden_Heart_Necklace": {
        "CityPoints": 370,
        "CityPrice": 130800,
        "Class": "Ore",
        "ProximityBonus": "None",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Gold-Plated_Heart_Pendant",
        "Req2": "Lobster_Clasp",
        "Req3": "Silver_Jump_Ring",
        "Time0": 180,
        "Time1": 360,
        "Time2": 720,
        "Time3": 1440,
        "Value1": 1,
        "Value2": 1,
        "Value3": 5,
        "FileUrl": "files/assets2/2/icon_golden_heart_necklace.png"
    },
    "Gold_Ore": {
        "CityPoints": 2,
        "CityPrice": 800,
        "Class": "Ore",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 30,
        "Time2": 40,
        "Time3": 50,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_gold_ore.png"
    },
    "Gold-Plated_Heart_Pendant": {
        "CityPoints": 60,
        "CityPrice": 12650,
        "Class": "Produced",
        "ProximityBonus": "Copper,Gold",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Heart-Shaped_Print",
        "Req2": "Copper",
        "Req3": "Gold",
        "Time0": 40,
        "Time1": 80,
        "Time2": 160,
        "Time3": 320,
        "Value1": 1,
        "Value2": 1,
        "Value3": 2,
        "FileUrl": "files/assets2/2/icon_gold-plated_heart_pendant.png"
    },
    "Golden_Apple": {
        "CityPoints": 5,
        "CityPrice": 700,
        "Class": "Crop",
        "Name": "Apple",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 90,
        "Time1": 180,
        "Time2": 360,
        "Time3": 720,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets3/icon_Apple.png"
    },
    "Green_Copper": {
        "CityPoints": 7,
        "CityPrice": 1860,
        "Class": "Produced",
        "Name": "Copper",
        "ProximityBonus": "Copper_Ore",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Copper_Ore",
        "Req2": "none",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 5,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/3/icon_copper_metal.png"
    },
    "Green_Gold": {
        "CityPoints": 10,
        "CityPrice": 4880,
        "Class": "Produced",
        "Name": "Gold",
        "ProximityBonus": "Gold_Ore",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Gold_Ore",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 3,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_gold.png"
    },
    "Green_Silver": {
        "CityPoints": 8,
        "CityPrice": 1920,
        "Class": "Produced",
        "Name": "Silver",
        "ProximityBonus": "Silver_Ore",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Silver_Ore",
        "Req2": "none",
        "Req3": "none",
        "Time0": 10,
        "Time1": 20,
        "Time2": 40,
        "Time3": 80,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/3/icon_silver_metal.png"
    },
    "Heart-Shaped_Print": {
        "CityPoints": 13,
        "CityPrice": 3240,
        "Class": "Produced",
        "ProximityBonus": "Clay_Lump,Energy,Strawberries",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Clay_Lump",
        "Req2": "Energy",
        "Req3": "Strawberries",
        "Time0": 150,
        "Time1": 300,
        "Time2": 600,
        "Time3": 1200,
        "Value1": 2,
        "Value2": 2,
        "Value3": 1,
        "FileUrl": "files/assets2/2/icon_heart-shaped_print.png"
    },
    "Honey": {
        "CityPoints": 170,
        "CityPrice": 7500,
        "Class": "Pantry",
        "ProximityBonus": "Nectar",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Nectar",
        "Req2": "Lumber",
        "Req3": "Ceramic_Bowl",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 3,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/94518244/1/icon_honey.png?t=6b81306f7ce787c1206a0a037914ca2a"
    },
    "Honeycomb": {
        "CityPoints": 200,
        "CityPrice": 1000,
        "Class": "Pantry",
        "ProximityBonus": "Nectar",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Nectar",
        "Req2": "Lumber",
        "Req3": "Ceramic_Bowl",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 6,
        "Value2": 2,
        "Value3": 1,
        "FileUrl": "files/assets/94518238/1/icon_honeycomb.png?t=236ecf62976bec81827fc509e04e4f93"
    },
    "Husk_Rice": {
        "CityPoints": 5,
        "CityPrice": 470,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 8,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/126666837/1/icon_huskRice.png?t=416724c0380d9e867b6daa482e78a8f9"
    },
    "Ice_Block": {
        "CityPoints": 70,
        "CityPrice": 4500,
        "Class": "Crafted",
        "ProximityBonus": "Cold,Water_Drum",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cold",
        "Req2": "Water_Drum",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 3,
        "Value2": 2,
        "Value3": 0,
        "FileUrl": "files/assets/113656564/1/icon_iceBlock.png?t=08b8b84b788052760ca1d34f7a5ebccb"
    },
    "Industrial_Ice_Block": {
        "CityPoints": 70,
        "CityPrice": 4500,
        "Class": "Crafted",
        "Name": "Ice_Block",
        "ProximityBonus": "Water_Drum,Cold",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Water_Drum",
        "Req2": "Cold",
        "Req3": "none",
        "Time0": 600,
        "Time1": 1200,
        "Time2": 2400,
        "Time3": 4800,
        "Value1": 2,
        "Value2": 3,
        "Value3": 0,
        "FileUrl": "files/assets/127806923/1/icon_industrialIceBlock.png?t=08b8b84b788052760ca1d34f7a5ebccb"
    },
    "Iron": {
        "CityPoints": 54,
        "CityPrice": 4600,
        "Class": "Produced",
        "ProximityBonus": "Energy,Water_Drum",
        "ProximityPenalty": "Water",
        "ProximityReverse": false,
        "Req1": "Lumber",
        "Req2": "Energy",
        "Req3": "Water_Drum",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/24496967/1/icon_iron.png?t=9385218ac79d399c00d60e815abc039c"
    },
    "Jack_O_Lantern": {
        "CityPoints": 721,
        "CityPrice": 1000,
        "Class": "Produced",
        "ProximityBonus": "Pumpkin",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Pumpkin",
        "Req2": "Wax",
        "Req3": "Cotton_Yarn",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 1,
        "Value2": 2,
        "Value3": 2,
        "FileUrl": "files/assets/105790267/1/icon_jackOLantern.png?t=163a7d78f2d3b010e4226e2f057ca77e"
    },
    "Jam": {
        "CityPoints": 275,
        "CityPrice": 25000,
        "Class": "Pantry",
        "ProximityBonus": "Strawberries,Water_Drum",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Strawberries",
        "Req2": "Sugar",
        "Req3": "Water_Drum",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 10,
        "Value2": 3,
        "Value3": 1,
        "FileUrl": "files/assets/86818175/1/icon_jam.png?t=caa7502d1ff1e7859643a41422d7f6ae"
    },
    "Jet_Fuel": {
        "CityPoints": 27,
        "CityPrice": 1900,
        "Class": "Fuel",
        "ProximityBonus": "Water_Drum,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Petroleum",
        "Req2": "Water_Drum",
        "Req3": "Energy",
        "Time0": 90,
        "Time1": 180,
        "Time2": 360,
        "Time3": 720,
        "Value1": 3,
        "Value2": 2,
        "Value3": 3,
        "FileUrl": "files/assets/24496964/1/icon_jetFuel.png?t=bbeb4de39f03aba76d960a96ee8599f6"
    },
    "Jewelry_Set": {
        "CityPoints": 3600,
        "CityPrice": 12650,
        "Class": "Jewelry",
        "ProximityBonus": "Copper,Gold",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Wooden_Box",
        "Req2": "Bracelet",
        "Req3": "Chandelier_Earrings",
        "Req4": "Golden_Heart_Necklace",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 1,
        "Value3": 2,
        "Value4": 1,
        "FileUrl": "files/assets2/2/icon_jewelry_set.png"
    },
    "Lasagna": {
        "CityPoints": 25000,
        "CityPrice": 150000,
        "Class": "Crafted",
        "ProximityBonus": "Eggs",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cheese",
        "Req2": "Pasta_Sauce",
        "Req3": "Eggs",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 2,
        "Value2": 2,
        "Value3": 1,
        "FileUrl": "files/assets2/lasagna.png"
    },
    "Legendary_Oak_Wood": {
        "CityPoints": 1,
        "CityPrice": 300,
        "Class": "Timber",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 80,
        "Time1": 160,
        "Time2": 320,
        "Time3": 640,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/104052614/1/icon_legendaryOakWood.png?t=6fb2a970d4fce8f8ff913cba5734e6f1"
    },
    "Legendary_Wood": {
        "CityPoints": 1,
        "CityPrice": 250,
        "Class": "Timber",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/100773174/1/icon_legendaryWood.png?t=5813663b26908d759b293a10d5557cca"
    },
    "Lights": {
        "CityPoints": 87,
        "CityPrice": 2500,
        "Class": "Produced",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Molten_Glass",
        "Req2": "Energy",
        "Req3": "none",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 2,
        "Value2": 3,
        "Value3": 0,
        "FileUrl": "files/assets/113238166/1/icon_lights.png?t=c0a6f33c878cebe9f86295d1b2bbf52b"
    },
    "Limestone": {
        "CityPoints": 54,
        "CityPrice": 4600,
        "Class": "Natural",
        "ProximityBonus": "Energy,Water_Drum",
        "ProximityPenalty": "Water",
        "ProximityReverse": false,
        "Req1": "Lumber",
        "Req2": "Energy",
        "Req3": "Water_Drum",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 1,
        "Value2": 3,
        "Value3": 2,
        "FileUrl": "files/assets/43726737/1/icon_limestone.png?t=01fa2771cbf79e1954ccb83914497d53"
    },
    "Lobster_Clasp": {
        "CityPoints": 100,
        "CityPrice": 15000,
        "Class": "Jewelry",
        "ProximityBonus": "None",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Sterling_Silver_Jump_Ring",
        "Req2": "Copper_Jump_Ring",
        "Req3": "Silver_Wire",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 1,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets2/2/icon_lobster_clasp.png"
    },
    "Lumber": {
        "CityPoints": 8,
        "CityPrice": 1350,
        "Class": "Produced",
        "ProximityBonus": "Energy,Water_Drum",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Wood",
        "Req2": "Energy",
        "Req3": "Water_Drum",
        "Time0": 10,
        "Time1": 20,
        "Time2": 40,
        "Time3": 80,
        "Value1": 5,
        "Value2": 2,
        "Value3": 1,
        "FileUrl": "files/assets/24496963/1/icon_lumber.png?t=3821bb767168e17ed77fa8fb6429e96a"
    },
    "Magic_Powder": {
        "CityPoints": 55,
        "CityPrice": 6500,
        "Class": "Produced",
        "ProximityBonus": "Pumpkin,Strawberries",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Pumpkin",
        "Req2": "Brine",
        "Req3": "Strawberries",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 1,
        "Value2": 2,
        "Value3": 2,
        "FileUrl": "files/assets/113652699/1/icon_magicPowder.png?t=13c9f49fb7b9e5cb1f68a2ce76cdcaab"
    },
    "Magical_Ice_Block": {
        "CityPoints": 70,
        "CityPrice": 4500,
        "Class": "Crafted",
        "Name": "Ice_Block",
        "ProximityBonus": "Cold,Water_Drum",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cold",
        "Req2": "Water_Drum",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 3,
        "Value2": 2,
        "Value3": 0,
        "FileUrl": "files/assets/127807569/1/icon_magicalIceBlock.png?t=08b8b84b788052760ca1d34f7a5ebccb"
    },
    "Milk": {
        "CityPoints": 20,
        "CityPrice": 4000,
        "Class": "Crafted",
        "ProximityBonus": "Water,Barn_Water,Barn_Feed",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Feed",
        "Req2": "Wood",
        "Req3": "Water",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 8,
        "Value2": 1,
        "Value3": 3,
        "FileUrl": "files/assets/24496962/1/icon_milk.png?t=bf243cea5c9cdc7457d693b50a1adfd1"
    },
    "Milk_Barn_Speed": {
        "CityPoints": 0,
        "CityPrice": 0,
        "Class": "Bonus",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cash",
        "Req2": "Milk",
        "Req3": "Wood",
        "Time0": 600,
        "Time1": 1200,
        "Time2": 2400,
        "Time3": 4800,
        "Value1": 7000000,
        "Value2": 100,
        "Value3": 100,
        "FileUrl": "files/assets/123183603/1/icon_milkBarnSpeed.png?t=6555183080f83dfd70342287ca4cba7a"
    },
    "Mill_Feed": {
        "CityPoints": 2,
        "CityPrice": 610,
        "Class": "Feed",
        "Name": "Feed",
        "ProximityBonus": "Wheat",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Wheat",
        "Req2": "none",
        "Req3": "none",
        "Time0": 10,
        "Time1": 20,
        "Time2": 40,
        "Time3": 80,
        "Value1": 2,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/4/icon_Mill_Feed.png"
    },
    "Molten_Glass": {
        "CityPoints": 145,
        "CityPrice": 13500,
        "Class": "Produced",
        "ProximityBonus": "Silica,Limestone,Chromium",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Silica",
        "Req2": "Limestone",
        "Req3": "Chromium",
        "Time0": 180,
        "Time1": 360,
        "Time2": 720,
        "Time3": 1440,
        "Value1": 4,
        "Value2": 1,
        "Value3": 2,
        "FileUrl": "files/assets/113238165/1/icon_moltenGlass.png?t=d71f320ea5aef1fea95996639d786c4b"
    },
    "Mystic_Matter": {
        "CityPoints": 550,
        "CityPrice": 26750,
        "Class": "Produced",
        "ProximityBonus": "Limestone",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Glue",
        "Req2": "Cotton_Yarn",
        "Req3": "Limestone",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 1,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/113238168/1/icon_mysticMatter.png?t=9f1ac59d11a02133701274b8e3dcf84a"
    },
    "Nectar": {
        "CityPoints": 0,
        "CityPrice": 0,
        "Class": "Natural",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "none",
        "Req2": "none",
        "Req3": "none",
        "Time0": 50,
        "Time1": 100,
        "Time2": 200,
        "Time3": 400,
        "Value1": 0,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/94533067/1/icon_nectar.png?t=e4c3314f6b6a60ab3178349784d087bc"
    },
    "Nourish_Milk": {
        "CityPoints": 20,
        "CityPrice": 4000,
        "Class": "Crafted",
        "Name": "Milk",
        "ProximityBonus": "Feed",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Feed",
        "Req2": "Wood",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 5,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_nourish_milk.png"
    },
    "Oak_Barrel": {
        "CityPoints": 63,
        "CityPrice": 5500,
        "Class": "Produced",
        "ProximityBonus": "Iron,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Oak_Wood",
        "Req2": "Iron",
        "Req3": "Energy",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 3,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/43726738/1/icon_oakBarrel.png?t=4a61c81bbdd998c733a5ebc74fed372d"
    },
    "Oak_Wood": {
        "CityPoints": 1,
        "CityPrice": 300,
        "Class": "Timber",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 5,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/43726736/1/icon_oakWood.png?t=6fb2a970d4fce8f8ff913cba5734e6f1"
    },
    "Party_Box": {
        "CityPoints": 37400,
        "CityPrice": 1000000,
        "Class": "Produced",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Food_Parcel",
        "Req2": "Gift_Parcel",
        "Req3": "Wooden_Box",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/98540674/1/icon_partyBox.png?t=2da83bfc177154ceccb2728c7608aaf5"
    },
    "Pasta_Sauce": {
        "CityPoints": 250,
        "CityPrice": 17000,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Tomato_Paste",
        "Req2": "Salt",
        "Req3": "Sugar",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 3,
        "Value3": 1,
        "FileUrl": "files/assets2/pasta_sauce.png"
    },
    "Peppermint": {
        "CityPoints": 8,
        "CityPrice": 400,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 180,
        "Time1": 360,
        "Time2": 720,
        "Time3": 1440,
        "Value1": 3,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/60802464/1/icon_peppermint.png?t=3f5fd165f9e366ee23815047a403dd6a"
    },
    "Petroleum": {
        "CityPoints": 4,
        "CityPrice": 450,
        "Class": "Fuel",
        "ProximityBonus": "Crude_Oil,Water_Drum,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Crude_Oil",
        "Req2": "Water_Drum",
        "Req3": "Energy",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 1,
        "Value3": 2,
        "FileUrl": "files/assets/24496959/1/icon_petroleum.png?t=a4473cadfc09d4f0672e009303509b1f"
    },
    "Pinot_Noir": {
        "CityPoints": 808,
        "CityPrice": 57200,
        "Class": "Crafted",
        "ProximityBonus": "Pinot_Noir_Grapes",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Pinot_Noir_Grapes",
        "Req2": "Wine_Bottle",
        "Req3": "Oak_Barrel",
        "Time0": 300,
        "Time1": 600,
        "Time2": 1200,
        "Time3": 2400,
        "Value1": 6,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/43726740/1/icon_pinotNoir.png?t=c48e5f006b84f8ac995d588403126737"
    },
    "Pinot_Noir_Grapes": {
        "CityPoints": 10,
        "CityPrice": 2670,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "Wood",
        "Req3": "none",
        "Time0": 450,
        "Time1": 900,
        "Time2": 1800,
        "Time3": 3600,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets/43726741/1/icon_pinotNoirGrapes.png?t=cd70f710d9ffa9e3079b444344ee43fb"
    },
    "Pizza_Base": {
        "CityPoints": 750,
        "CityPrice": 110000,
        "Class": "Produced",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Dough",
        "Req2": "Cheese",
        "Req3": "Tomato_Paste",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 2,
        "Value3": 1,
        "FileUrl": "files/assets2/pizza_base.png"
    },
    "Pumpkin": {
        "CityPoints": 2,
        "CityPrice": 1000,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 150,
        "Time1": 300,
        "Time2": 600,
        "Time3": 1200,
        "Value1": 10,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/36897915/1/icon_Pumpkin.png?t=c0af83e4e234482d619f70bb536941b1"
    },
    "Pumpkin_Pie": {
        "CityPoints": 816,
        "CityPrice": 49750,
        "Class": "Crafted",
        "ProximityBonus": "Pumpkin,Eggs",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Pumpkin",
        "Req2": "Sugar",
        "Req3": "Eggs",
        "Time0": 180,
        "Time1": 360,
        "Time2": 720,
        "Time3": 1440,
        "Value1": 6,
        "Value2": 5,
        "Value3": 10,
        "FileUrl": "files/assets/37126455/1/icon_pumpkinPie.png?t=6d2b3f6730dd7eb844f5fe188c2d43ea"
    },
    "Rare_Gasoline": {
        "CityPoints": 8,
        "CityPrice": 1450,
        "Class": "Fuel",
        "ProximityBonus": "Crude_Oil,Water_Drum,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Crude_Oil",
        "Req2": "Water_Drum",
        "Req3": "Energy",
        "Time0": 40,
        "Time1": 80,
        "Time2": 160,
        "Time3": 320,
        "Value1": 2,
        "Value2": 2,
        "Value3": 6,
        "FileUrl": "files/assets/24496966/1/icon_gasoline.png?t=a231669433ff6cc683e15871404c8f05"
    },
    "Red_Steel": {
        "CityPoints": 6800,
        "CityPrice": 270950,
        "Class": "Produced",
        "ProximityBonus": "Water_Drum,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Steel",
        "Req2": "Water_Drum",
        "Req3": "Energy",
        "Time0": 90,
        "Time1": 180,
        "Time2": 360,
        "Time3": 720,
        "Value1": 5,
        "Value2": 5,
        "Value3": 10,
        "FileUrl": "files/assets/119798114/1/icon_redSteel.png?t=288db012b0973fdcbbb7be59fca85481"
    },
    "Rice_Vinegar": {
        "CityPoints": 107,
        "CityPrice": 4730,
        "Class": "Crafted",
        "ProximityBonus": "Water,Sugarcane",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "White_Rice",
        "Req3": "Sugarcane",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets2/rice_vinegar.png"
    },
    "Risotto": {
        "CityPoints": 700,
        "CityPrice": 44000,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "White_Rice",
        "Req2": "Cheese",
        "Req3": "Milk",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 7,
        "Value2": 2,
        "Value3": 1,
        "FileUrl": "files/assets2/risotto.png"
    },
    "Rocking_Horse": {
        "CityPoints": 1200,
        "CityPrice": 24500,
        "Class": "Produced",
        "ProximityBonus": "Iron",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Oak_Wood",
        "Req2": "Enchanted_Object",
        "Req3": "Iron",
        "Time0": 180,
        "Time1": 360,
        "Time2": 720,
        "Time3": 1440,
        "Value1": 4,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/113764005/1/icon_rockingHorse.png?t=a7f058674307cf5cf71d433b67081a06"
    },
    "Roe": {
        "CityPoints": 17,
        "CityPrice": 580,
        "Class": "Fish",
        "ProximityBonus": "Seaweed",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Seaweed",
        "Req2": "none",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/106782051/1/icon_roe.png?t=abb8650f4207403f85dd246add592d87"
    },
    "Salmon": {
        "CityPoints": 620,
        "CityPrice": 19000,
        "Class": "Fish",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Fish_Chum",
        "Req2": "Energy",
        "Req3": "none",
        "Time0": 180,
        "Time1": 360,
        "Time2": 720,
        "Time3": 1440,
        "Value1": 1,
        "Value2": 3,
        "Value3": 0,
        "FileUrl": "files/assets/106782043/1/icon_salmon.png?t=6789450e261a0b82da0ee22dbf7cc01c"
    },
    "Salmon_Nigiri": {
        "CityPoints": 1400,
        "CityPrice": 45000,
        "Class": "Crafted",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "White_Rice",
        "Req2": "Salmon",
        "Req3": "Energy",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 1,
        "Value3": 3,
        "FileUrl": "files/assets/127521007/1/icon_salmonNigiri.png?t=9ebe4f8db8a069650eeedb1d399bc91b"
    },
    "Salt": {
        "CityPoints": 16,
        "CityPrice": 2250,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "Shady",
        "ProximityReverse": false,
        "Req1": "Brine",
        "Req2": "Wood",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 4,
        "Value2": 2,
        "Value3": 0,
        "FileUrl": "files/assets/24496956/1/icon_salt.png?t=966ccd519247d3d9303b8b6dd003b070"
    },
    "Salty_Brine": {
        "CityPoints": 1,
        "CityPrice": 300,
        "Class": "Crop",
        "Name": "Brine",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Salty,PositiveOnlySalty",
        "ProximityReverse": true,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 50,
        "Time1": 20,
        "Time2": 20,
        "Time3": 20,
        "TimeReverse": true,
        "Value1": 3,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496979/1/icon_brine.png?t=b3c42c4a37547d53e25b0bd4a4706e36"
    },
    "Sangria": {
        "CityPoints": 1290,
        "CityPrice": 58900,
        "Class": "Crafted",
        "ProximityBonus": "Strawberries",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cabernet_Sauvignon",
        "Req2": "Sugar",
        "Req3": "Strawberries",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 1,
        "Value2": 2,
        "Value3": 2,
        "FileUrl": "files/assets/96233967/1/icon_sangria.png?t=629335475a46e62e79dcc09c01d7a2bc"
    },
    "Seaweed": {
        "CityPoints": 6,
        "CityPrice": 300,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Salty,PositiveOnlySalty",
        "ProximityReverse": true,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 40,
        "Time1": 20,
        "Time2": 10,
        "Time3": 5,
        "TimeReverse": true,
        "Value1": 2,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/127516936/1/icon_seaweed.png?t=b8e7967b56adc558d643727c4483eead"
    },
    "Shallow_Chromium": {
        "CityPoints": 54,
        "CityPrice": 4600,
        "Class": "Natural",
        "Name": "Chromium",
        "ProximityBonus": "Energy,Water_Drum",
        "ProximityPenalty": "Water",
        "ProximityReverse": false,
        "Req1": "Lumber",
        "Req2": "Energy",
        "Req3": "Water_Drum",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 1,
        "Value2": 3,
        "Value3": 2,
        "FileUrl": "files/assets/102442531/1/icon_shallowChromium.png?t=bc91ea3d6a7913438fa6ae66a5cad598"
    },
    "Shallow_Iron": {
        "CityPoints": 54,
        "CityPrice": 4600,
        "Class": "Produced",
        "Name": "Iron",
        "ProximityBonus": "Energy,Water_Drum",
        "ProximityPenalty": "Water",
        "ProximityReverse": false,
        "Req1": "Lumber",
        "Req2": "Energy",
        "Req3": "Water_Drum",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 1,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/102442534/1/icon_shallowIron.png?t=9385218ac79d399c00d60e815abc039c"
    },
    "Shallow_Limestone": {
        "CityPoints": 54,
        "CityPrice": 1000,
        "Class": "Natural",
        "Name": "Limestone",
        "ProximityBonus": "Energy,Water_Drum",
        "ProximityPenalty": "Water",
        "ProximityReverse": false,
        "Req1": "Lumber",
        "Req2": "Energy",
        "Req3": "Water_Drum",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 1,
        "Value2": 3,
        "Value3": 2,
        "FileUrl": "files/assets/102642649/1/icon_shallowLimestone.png?t=01fa2771cbf79e1954ccb83914497d53"
    },
    "Shrimp": {
        "CityPoints": 30,
        "CityPrice": 1800,
        "Class": "Fish",
        "ProximityBonus": "Seaweed",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Seaweed",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 2,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/106782044/1/icon_shrimp.png?t=8bc16a6abfb14c0ac0f600944f1e6803"
    },
    "Shrimp_Pizza": {
        "CityPoints": 1300,
        "CityPrice": 120000,
        "Class": "Produced",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Pizza_Base",
        "Req2": "Shrimp",
        "Req3": "Energy",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 1,
        "Value2": 5,
        "Value3": 3,
        "FileUrl": "files/assets2/shrimp_pizza.png"
    },
    "Silica": {
        "CityPoints": 2,
        "CityPrice": 1000,
        "Class": "Natural",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "Salty,Sandy",
        "ProximityReverse": true,
        "Req1": "Energy",
        "Req2": "none",
        "Req3": "none",
        "Time0": 120,
        "Time1": 120,
        "Time2": 60,
        "Time3": 30,
        "TimeReverse": true,
        "Value1": 2,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/43726742/1/icon_silica.png?t=32700ede2d2144dab72fd17a274484d6"
    },
    "Silver": {
        "CityPoints": 8,
        "CityPrice": 1920,
        "Class": "Produced",
        "ProximityBonus": "Silver_Ore",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Silver_Ore",
        "Req2": "Wood",
        "Req3": "none",
        "Time0": 10,
        "Time1": 20,
        "Time2": 40,
        "Time3": 80,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/3/icon_silver_metal.png"
    }, //ok
    "Silver_Jump_Ring": {
        "CityPoints": 21,
        "CityPrice": 4990,
        "Class": "Jewelry",
        "ProximityBonus": "None",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Silver_Wire",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_silver_jump_ring.png"
    }, //ok
    "Silver_Ore": {
        "CityPoints": 2,
        "CityPrice": 400,
        "Class": "Ore",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 40,
        "Time1": 60,
        "Time2": 80,
        "Time3": 100,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_silver_ore.png"
    }, //ok
    "Silver_Wire": {
        "CityPoints": 18,
        "CityPrice": 4390,
        "Class": "Produced",
        "ProximityBonus": "Silver,Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Silver",
        "Req2": "Energy",
        "Req3": "none",
        "Time0": 10,
        "Time1": 20,
        "Time2": 40,
        "Time3": 80,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_silver_wire.png"
    }, //ok
    "Smith_Copper_Jump_Ring": {
        "CityPoints": 18,
        "CityPrice": 4820,
        "Class": "Jewelry",
        "Name": "Copper_Jump_Ring",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Copper",
        "Req2": "none",
        "Req3": "none",
        "Time0": 15,
        "Time1": 30,
        "Time2": 60,
        "Time3": 120,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_copper_jump_ring.png"
    },
    "Smith_Copper_Wire": {
        "CityPoints": 17,
        "CityPrice": 4420,
        "Class": "Produced",
        "Name": "Copper_Wire",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Copper",
        "Req2": "none",
        "Req3": "none",
        "Time0": 10,
        "Time1": 20,
        "Time2": 40,
        "Time3": 80,
        "Value1": 1,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_copper_wire.png"
    },
    "Stack_Box": {
        "CityPoints": 79750,
        "CityPrice": 2500000,
        "Class": "Produced",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Party_Box",
        "Req2": "Fabric_Box",
        "Req3": "Supply_Box",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/98540669/1/icon_stackBox.png?t=a7ce335249751e27d936f6f2dae390fa"
    },
    "Stars": {
        "CityPoints": 0,
        "CityPrice": 0,
        "Class": null,
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "none",
        "Req2": "none",
        "Req3": "none",
        "Time0": 0,
        "Time1": 0,
        "Time2": 0,
        "Time3": 0,
        "Value1": 0,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/121859456/1/icon_stars.png?t=2b3c023ac3f194ab8e875a3fd955a773"
    },
    "Steel": {
        "CityPoints": 768,
        "CityPrice": 47000,
        "Class": "Produced",
        "ProximityBonus": "Iron,Energy,Water_Drum",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Iron",
        "Req2": "Energy",
        "Req3": "Water_Drum",
        "Time0": 90,
        "Time1": 180,
        "Time2": 360,
        "Time3": 720,
        "Value1": 10,
        "Value2": 5,
        "Value3": 5,
        "FileUrl": "files/assets/24496955/1/icon_steel.png?t=633c24af6182ecb6a1a857e4873f86aa"
    },
    "Strawberries": {
        "CityPoints": 2,
        "CityPrice": 250,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/87142360/1/icon_strawberries.png?t=af693d328a33a94b5ad1eca268300ede"
    },
    "Sterling_Silver": {
        "CityPoints": 20,
        "CityPrice": 6400,
        "Class": "Produced",
        "ProximityBonus": "Copper,Silver",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Copper",
        "Req2": "Silver",
        "Req3": "none",
        "Time0": 40,
        "Time1": 80,
        "Time2": 160,
        "Time3": 320,
        "Value1": 1,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_sterling_silver.png"
    },
    "Sterling_Silver_Jump_Ring": {
        "CityPoints": 45,
        "CityPrice": 12500,
        "Class": "Produced",
        "ProximityBonus": "Silica",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Sterling_Silver",
        "Req2": "Silica",
        "Req3": "none",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 1,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets2/2/icon_sterling_silver_jump_ring.png"
    },
    "Sugar": {
        "CityPoints": 21,
        "CityPrice": 2300,
        "Class": "Crafted",
        "ProximityBonus": "Sugarcane",
        "ProximityPenalty": "Shady",
        "ProximityReverse": false,
        "Req1": "Sugarcane",
        "Req2": "Wood",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 3,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets/24496954/1/icon_sugar.png?t=f9a32fe1e00c61e73a7437ec68bcd9a4"
    },
    "Sugarcane": {
        "CityPoints": 1,
        "CityPrice": 400,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 4,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496957/1/icon_sugarcane.png?t=51aeb4a0643ee5aca60b4fcbe4e2b2cb"
    },
    "Supply_Box": {
        "CityPoints": 855,
        "CityPrice": 22000,
        "Class": "Produced",
        "ProximityBonus": "None",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Ceramic_Bowl",
        "Req2": "Wax",
        "Req3": "Wooden_Box",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 2,
        "Value2": 2,
        "Value3": 1,
        "FileUrl": "files/assets/98540675/1/icon_supplyBox.png?t=ddb97d37baaae09a54811e2cdeb27f55"
    },
    "Sushi_Boat": {
        "CityPoints": 85000,
        "CityPrice": 285000,
        "Class": "Crafted",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Salmon_Nigiri",
        "Req2": "Eel_Nigiri",
        "Req3": "Rice_Vinegar",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/106782052/1/icon_sushiBoat.png?t=0bc915aaa5585fc149378c1d47f68b84"
    },
    "Trick-or-Treat_Bag": {
        "CityPoints": 3126,
        "CityPrice": 126820,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Chocolate_Bar",
        "Req2": "Candy_Corn",
        "Req3": "Cotton_Yarn",
        "Time0": 40,
        "Time1": 80,
        "Time2": 160,
        "Time3": 320,
        "Value1": 3,
        "Value2": 3,
        "Value3": 1,
        "FileUrl": "files/assets/4/icon_Trick-or-Treat_Bag.png"
    },
    "Tomato": {
        "CityPoints": 1,
        "CityPrice": 350,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 3,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets2/tomatoes.png"
    },
    "Tomato_Paste": {
        "CityPoints": 150,
        "CityPrice": 6000,
        "Class": "Crafted",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Rice_Vinegar",
        "Req2": "Tomato",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 1,
        "Value2": 3,
        "Value3": 0,
        "FileUrl": "files/assets2/tomato_paste.png"
    },
    "Tractor_Speed": {
        "CityPoints": 0,
        "CityPrice": 0,
        "Class": "Bonus",
        "ProximityBonus": "None",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cash",
        "Req2": "Husk_Rice",
        "Req3": "White_Rice",
        "Time0": 600,
        "Time1": 1200,
        "Time2": 2400,
        "Time3": 4800,
        "Value1": 2500000,
        "Value2": 100,
        "Value3": 50,
        "FileUrl": "files/assets/123183604/1/icon_tractorSpeed.png?t=de3e0ff17f25ae1c9eab2726c388b8e9"
    },
    "Uniforms": {
        "CityPoints": 560,
        "CityPrice": 34450,
        "Class": "Produced",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cotton_Yarn",
        "Req2": "Wool_Yarn",
        "Req3": "Energy",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 3,
        "Value2": 1,
        "Value3": 3,
        "FileUrl": "files/assets/24496958/1/icon_uniforms.png?t=c3758c33624d5e93f69598d848c1f222"
    },
    "Wasabi": {
        "CityPoints": 16,
        "CityPrice": 450,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Shady",
        "ProximityReverse": true,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 240,
        "Time1": 240,
        "Time2": 120,
        "Time3": 60,
        "TimeReverse": true,
        "Value1": 3,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/128573671/1/icon_wasabi.png?t=b8c310e3810a8febf19efd084e1b9ccf"
    },
    "Water": {
        "CityPoints": 1,
        "CityPrice": 50,
        "Class": "Natural",
        "ProximityBonus": "None",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "none",
        "Req2": "none",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 0,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496953/1/icon_water.png?t=f7dfc58adc3d81b7b2d6efdc11bb71c2"
    },
    "Water_Drum": {
        "CityPoints": 1,
        "CityPrice": 50,
        "Class": "Produced",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 3,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/32374821/1/icon_waterDrum.png?t=06ee1896b7c3fbbe42b747d31adf4f15"
    },
    "Water_Facility_Speed": {
        "CityPoints": 0,
        "CityPrice": 0,
        "Class": "Bonus",
        "ProximityBonus": "Water_Drum",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Cash",
        "Req2": "Water_Drum",
        "Req3": "none",
        "Time0": 600,
        "Time1": 1200,
        "Time2": 2400,
        "Time3": 4800,
        "Value1": 75000000,
        "Value2": 100,
        "Value3": 0,
        "FileUrl": "files/assets/121729522/1/icon_waterFacilitySpeed.png?t=e8211da3502678c619ac1fafd2ea99be"
    },
    "Wax": {
        "CityPoints": 170,
        "CityPrice": 2000,
        "Class": "Pantry",
        "ProximityBonus": "Nectar",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Nectar",
        "Req2": "Lumber",
        "Req3": "Ceramic_Bowl",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 3,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/94518237/1/icon_wax.png?t=43cf28f5a93b281c67779ceea842c9fa"
    },
    "Wheat": {
        "CityPoints": 1,
        "CityPrice": 300,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 20,
        "Time1": 40,
        "Time2": 80,
        "Time3": 160,
        "Value1": 3,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496952/1/icon_wheat.png?t=98cdc630e5951ef3f4b7cab7e504e6ad"
    },
    "White_Rice": {
        "CityPoints": 40,
        "CityPrice": 1700,
        "Class": "Crafted",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Husk_Rice",
        "Req2": "Energy",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets/126666838/1/icon_whiteRice.png?t=4fd8a59d0b981cf4835cab616b136f27"
    },
    "Wild_Salmon": {
        "CityPoints": 620,
        "CityPrice": 19000,
        "Class": "Fish",
        "Name": "Salmon",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Fish_Chum",
        "Req2": "Energy",
        "Req3": "none",
        "Time0": 180,
        "Time1": 360,
        "Time2": 720,
        "Time3": 1440,
        "Value1": 1,
        "Value2": 3,
        "Value3": 0,
        "FileUrl": "files/assets/127807564/1/icon_wildSalmon.png?t=6789450e261a0b82da0ee22dbf7cc01c"
    },
    "Wine_Bottle": {
        "CityPoints": 126,
        "CityPrice": 12800,
        "Class": "Produced",
        "ProximityBonus": "Silica,Chromium,Limestone",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Silica",
        "Req2": "Chromium",
        "Req3": "Limestone",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 3,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/43726743/1/icon_wineBottle.png?t=04041ab6c35dc173822c370af9467f49"
    },
    "Wood": {
        "CityPoints": 1,
        "CityPrice": 250,
        "Class": "Timber",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty,Shady",
        "ProximityReverse": false,
        "Req1": "Water",
        "Req2": "none",
        "Req3": "none",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 5,
        "Value2": 0,
        "Value3": 0,
        "FileUrl": "files/assets/24496903/1/icon_wood.png?t=5813663b26908d759b293a10d5557cca"
    },
    "Wooden_Box": {
        "CityPoints": 14,
        "CityPrice": 2400,
        "Class": "Produced",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Lumber",
        "Req2": "Wood",
        "Req3": "Energy",
        "Time0": 120,
        "Time1": 240,
        "Time2": 480,
        "Time3": 960,
        "Value1": 1,
        "Value2": 2,
        "Value3": 2,
        "FileUrl": "files/assets/98540676/1/icon_woodenBox.png?t=1fb2113cc405373782b3fddbd72d02d3"
    },
    "Wool": {
        "CityPoints": 28,
        "CityPrice": 3750,
        "Class": "Crafted",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty",
        "ProximityReverse": false,
        "Req1": "Feed",
        "Req2": "Wood",
        "Req3": "Water",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 8,
        "Value2": 1,
        "Value3": 5,
        "FileUrl": "files/assets/24496950/1/icon_wool.png?t=70a6c832dbf65cc405378ad00a0fbac9"
    },
    "Wool_Yarn": {
        "CityPoints": 215,
        "CityPrice": 14750,
        "Class": "Produced",
        "ProximityBonus": "Energy",
        "ProximityPenalty": "None",
        "ProximityReverse": false,
        "Req1": "Wool",
        "Req2": "Lumber",
        "Req3": "Energy",
        "Time0": 60,
        "Time1": 120,
        "Time2": 240,
        "Time3": 480,
        "Value1": 5,
        "Value2": 1,
        "Value3": 1,
        "FileUrl": "files/assets/24496900/1/icon_yarn.png?t=40ca00c8293fe3c12489901c58e00dad"
    },
    "Worms": {
        "CityPoints": 8,
        "CityPrice": 250,
        "Class": "Crop",
        "ProximityBonus": "Water",
        "ProximityPenalty": "Dirty,Salty",
        "ProximityReverse": false,
        "Req1": "Husk_Rice",
        "Req2": "Water",
        "Req3": "none",
        "Time0": 30,
        "Time1": 60,
        "Time2": 120,
        "Time3": 240,
        "Value1": 2,
        "Value2": 1,
        "Value3": 0,
        "FileUrl": "files/assets/128779922/1/icon_worms.png?t=8d5d492b004261bcbb7b5cef358c3432"
    }
};
// add function to buttons
// Make the buttons clickable
const donateButtonc = document.querySelector('.bottom-nav-donate button.confirm');
// Make the donate button open a modal box
donateButtonc.addEventListener('click', () => {
    const modalContent = `
        <div id="donateModal" class="modal">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <iframe src="https://lwgtsv.dnkdesign.com.mk/donation.html" width="600" height="450" scrolling="no" frameborder="0"></iframe>
            </div>
        </div>
    `;

    // Append the modal content to the container using jQuery
    $(container).append(modalContent);

    // Show the modal using jQuery
    positionModal();
    $('#donateModal').fadeIn();

    // Attach a click event handler for the close button
    $('.modal-close').on('click', closeDonateModal);

    // Attach an event listener for the "Escape" key
    $(document).on('keydown', handleEscapeKey);

    // Attach a resize event listener to reposition the modal on window resize
    $(window).on('resize', positionModal);
});

// Function to position the modal in the center of the screen
function positionModal() {
    const modal = $('#donateModal');
    const windowHeight = window.innerHeight;
    const modalHeight = modal.outerHeight();

    // Calculate the top position to center the modal
    const topPosition = Math.max(0, (windowHeight - modalHeight) / 2);

    // Set the top position of the modal using jQuery
    modal.css('top', topPosition + 'px');
}

// Function to close the donate modal
function closeDonateModal() {
    // Hide and remove the modal using jQuery
    $('#donateModal').fadeOut(400, function() {
        $(this).remove();
    });

    // Remove the click event handler to avoid potential issues
    $('.modal-close').off('click', closeDonateModal);

    // Remove the "Escape" key event listener
    $(document).off('keydown', handleEscapeKey);

    // Remove the window resize event listener
    $(window).off('resize', positionModal);
}
// Function to handle the "Escape" key
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeDonateModal();
    }
}
const versionButtonc = document.querySelector('.bottom-nav-version button.cancel');
versionButtonc.addEventListener('click', () => {
    // Add the desired functionality for the version button
    // For example, you can open a new window with release notes or other information.
    alert('Version button clicked!');
});
populateCraftsDropdownvtwo();
})();
