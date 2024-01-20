// ==UserScript==
// @name         CRYPTODUDE CGW Calculator
// @namespace    http://tampermonkey.net/
// @version      0.1.1120b
// @description  CGW Calculator for Common World Ground is a specific ingame overlay build calculator with the option to write current production per hour and improve your build.
// @author       Special thanks to Oizys (you are the man) for many functions to make it work in-game. Modified by CRYPTODUDE for better functioning + minor tweaks
// @match        *://*.gala.com/games/town-star
// @match        *://*.gala.games/games/town-star
// @match        *://*.gala.com/games/tsg-playtest
// @match        *://*.gala.games/games/tsg-playtest
// @match        *://tsf-client.gala.com/*
// @run-at       document-start
// @grant        GM_info
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://lwgtsv.dnkdesign.com.mk/recipes.js?timestamp=@TIMESTAMP@
// ==/UserScript==

// CRYPTODUDE CGW Calculator 0.0.1120a
// changes
//  - Added timestamp so it can load correctly the recipes from normal visuliaser.
//  - This will be last auto recipes version.
//  - Fixed some type mistakes.

// CRYPTODUDE CGW Calculator 0.0.1119a
// changes
//  - You can open close the calculator by pressing c or C
//  - New total reworked UI and restyled everything.
//  - Added Help icon with tooltip.
//  - Added Donation button and Version button areas.
//  - Added Donation window tab, if someone wants to donate or clicked donate.
//  - Added global visualiser recipe script so when i update the recipe on the visualiser it will be auto updated here (no need for versions for that)
//  - Next to do is auto-update button.
//  - Fixed some type mistakes.

// CRYPTODUDE CGW Calculator 0.0.1118a
// changes
//  - Newest Apple Pie recipe added.

// CRYPTODUDE CGW Calculator-Build 0.0.1023a
// changes
//  - Changed version to be more date oriented.
//  - Added newest recipes and newest meta.

// CRYPTODUDE CGW Calculator-Build 0.0.01a
// changes
//  - First build of the calculator (there will be a lot of fixes).

(function() {
    'use strict';

        // Generate a timestamp
    const timestamp = new Date().getTime();

    // Replace @TIMESTAMP@ in the @require directive with the actual timestamp
    const scriptUrl = `https://lwgtsv.dnkdesign.com.mk/recipes.js?timestamp=${timestamp}`;
    GM_addStyle(`@require ${scriptUrl}`);

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
     <p class="text-center">You can Check your version down on the right</b></p>
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
        currentValueInput.on('input', function(event) {
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
        craftInfoData.append(requirementName); // Add requirementName to craftinfodata

        requirementContainer.append(craftInfoData); // Append craftinfodata to requirementContainer
        requirementContainer.append(currentValue);
        requirementContainer.append(calcoutput);

        $('#craft_content').append(requirementContainer);
      }
    }

    function SortObject(obj) {
      return Object.keys(obj)
        .sort()
        .reduce(function(result, key) {
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
        if (assetPath.substring(0, 4) == "http") {
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

    // add function to buttons
    // Make the buttons clickable
    const donateButtonc = document.querySelector('.bottom-nav-donate button.confirm');
    // Make the donate button open a modal box
    donateButtonc.addEventListener('click', () => {
      const modalContent = `
          <div id="donateModal" class="modal">
              <div class="modal-content">
                  <span class="modal-close">&times;</span>
                  <iframe src="https://lwgtsv.dnkdesign.com.mk/cryptodude-donation.html" width="600" height="450" scrolling="no" frameborder="0"></iframe>
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


    populateCraftsDropdownvtwo();


  })();
