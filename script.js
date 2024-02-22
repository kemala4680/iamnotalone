let database = [
  {
    name: 'Rimiru Tempest',
    telp: '081225234068',
    area: 'Bekasi'
  }
];

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