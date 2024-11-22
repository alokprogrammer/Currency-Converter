const BASE_URL =  "https://api.currencyapi.com/v3/latest?apikey=cur_live_zVbLyuHirTPWaqFNtkM3SYhtO8r59l7I0Va0zMZI";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select ");
const toCurr = document.querySelector(".to select ");

const  msg = document.querySelector(".msg");

window.addEventListener("load", () =>{
  updateExchangeRate();

})

for (let select of dropdowns) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
          newOption.selected = "selected";
        }else if (select.name === "to" && currCode === "INR") {
          newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
      updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
  
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
  
});

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  //console.log(fromCurr.value,toCurr.value);
  

  const URL = `${BASE_URL}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;

  let response = await fetch(URL);
  if (response.ok) {
    let data = await response.json();
    let rate = data.data[toCurr.value].value;
    let convertedAmount = amtVal * rate;
    console.log(`Converted Amount: ${convertedAmount}`);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${convertedAmount}${toCurr.value}`;
    // Optionally display this value on the page
  } else {
    console.error("Failed to fetch exchange rate.");
  }
  
}