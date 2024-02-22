let database = [
  {
    name: 'Rimiru Tempest',
    telp: '081225234068',
    area: 'Bekasi'
  }
];


function validateAndSubmit() {
  let helperName = document.getElementById("helper-name-input");
  let helperTelp = document.getElementById("helper-telp-input");
  let helperArea = document.getElementById("helper-area-input");

  let helperNameError = document.getElementById("helper-name-error");
  let helperTelpError = document.getElementById("helper-telp-error");
  let helperAreaError = document.getElementById("helper-area-error");

  helperNameError.style.display = 'none';
  helperTelpError.style.display = 'none';
  helperAreaError.style.display = 'none';

  let isValid = true;

  if (!helperName.value){
    helperNameError.style.display = 'block';
    isValid = false;
  } 

  if(helperTelp.value.length !== 12 || isNaN(helperTelp.value)){
    helperTelpError.style.display = 'block';
    isValid = false;
  }

  let area = ['jakarta', 'bogor', 'depok', 'tangerang', 'bekasi'];
  let isValidArea = false;
    for (let x = 0; x < area.length; x++){
      let perArea = area[x]
      if(perArea === helperArea.value.toLowerCase()){
        isValidArea = true;
        break;
      }
      if (!isValidArea){
        helperAreaError.style.display = 'block';
        isValid = false;
      }
    }

  if(isValid) {
    addData();
  }
}

function addData() {
  let helperName = document.getElementById("helper-name-input");
  let helperTelp = document.getElementById("helper-telp-input");
  let helperArea = document.getElementById("helper-area-input");
  
  let tempObj = {
    name: helperName.value,
    telp: helperTelp.value,
    area: helperArea.value
  };

  database.push(tempObj);

  helperName.value = '';
  helperTelp.value = '';
  helperArea.value = '';

  readData();
}


function readData(areaInput) {
  let template = '';
  for (let i = 0; i < database.length; i++) {
    let perObj = database[i];

    let {name, telp, area} = perObj;

    if (!areaInput) {
      template += `<div class="card">
          <p>${name}</p>
          <p>${telp}</p>
          <p>${area}</p>
          <button>-</button>
        </div>`
    } else if (areaInput === area) {
      template += `<div class="card">
          <p>${name}</p>
          <p>${telp}</p>
          <p>${area}</p>
          <button>-</button>
        </div>`
    }
  }

  if (!areaInput) {
    let helperCard = document.getElementById("helper-card");
    
    helperCard.innerHTML = template;
  } else {
    let nearYouCard = document.getElementById("near-you-card");

    nearYouCard.innerHTML = template
  }

}

function nearYou(){
  let userArea = document.getElementById("user-area-input");

  readData(userArea.value);
}

readData();