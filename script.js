let database = JSON.parse(localStorage.getItem('database')) || [
  {
    tag: 1,
    name: 'Rimiru Tempest',
    telp: '081292038912',
    area: 'Bekasi',
    desc: `I’m not a bad Slime`,
    img: ''
  },
  {
    tag: 2,
    name: 'Alex Bhize',
    telp: '081265455897',
    area: 'Jakarta',
    desc: 'Gas aja lah Bos-ku',
    img:''
  },
  {
    tag: 3,
    name: 'Mikasa Ackerman',
    telp: '082245872563',
    area: 'Depok',
    desc: 'Ereeennn',
    img: ''
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
  let helperDesc = document.getElementById("helper-desc-input");
  let helperImg = document.getElementById("helper-img-input");
  
  let tag = 1;
  if (database.length > 0) {
    tag = database[database.length-1].tag + 1;
  }
  
  let tempObj = {
    tag,
    name: helperName.value,
    telp: helperTelp.value,
    area: helperArea.value,
    desc: helperDesc.value,
    img: helperImg
  };

  database.push(tempObj);

  helperName.value = '';
  helperTelp.value = '';
  helperArea.value = '';
  helperDesc.value = '';
  helperImg.value = '';

  readData();
}


function readData(areaInput) {
  let template = '';
  for (let i = 0; i < database.length; i++) {
    let perObj = database[i];

    let {tag, name, area, img} = perObj;

    if (!areaInput) {
      template += 
        `<div class="small-card">
          <img src="${img}">
          <div>
            <p>${name}</p>
            <p>${area}</p>
          </div>
          <button onclick="showMore(${tag})">-</button>
        </div>`
    } 
    if (areaInput === area) {
      template += 
        `<div class="small-card">
          <img src="${img}">
          <div>
            <p>${name}</p>
            <p>${area}</p>
          </div>
          <button onclick="showMore(${tag},'${area}')">-</button>
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

  localStorage.setItem('database',JSON.stringify(database));
}

function nearYou() {
  let userArea = document.getElementById("user-area-input");

  readData(userArea.value);
}

function showMore(tag,areaInput) {
  let template = '';

  for (let i = 0; i < database.length; i++) {
    let perObj = database[i];

    let {name, area, telp, desc} = perObj;

    if (!areaInput) {
      if (perObj.tag === tag) {
        template += `
          <div class="big-card">
            <img src="${img}">
            <div>
              <p>${name}</p>
              <p>${area}</p>
              <p>${telp}</p>
              <p>${desc}</p>
              <button onclick="removeData(${tag})">delete</button>
            </div>
            <button onclick="readData()">-</button>
          </div>`
      } else {
        template += 
          `<div class="small-card">
            <img src="${img}">
            <div>
              <p>${name}</p>
              <p>${area}</p>
            </div>
            <button onclick="showMore(${tag})">-</button>
          </div>`
      }
    }
    if (areaInput === area) {
      if (perObj.tag === tag) {
        template += 
          `<div class="big-card">
            <img src="${img}">
            <div>
              <p>${name}</p>
              <p>${area}</p>
              <p>${telp}</p>
              <p>${desc}</p>
            </div>
            <button onclick="nearYou()">-</button>
          </div>`
      } else {
        template += 
          `<div class="small-card">
            <img src="${img}">
            <div>
              <p>${name}</p>
              <p>${area}</p>
            </div>
            <button onclick="showMore(${tag},'${area}')">-</button>
          </div>`
      }
    }

    if (!areaInput) {
      let helperCard = document.getElementById("helper-card");
      
      helperCard.innerHTML = template;
    } else {
      let nearYouCard = document.getElementById("near-you-card");
  
      nearYouCard.innerHTML = template;
    }
  }
}

function removeData(tag) {
  if (database.length === 1) {
    database = [];
  }
  for (let i = 0; i < database.length; i++) {
    let perObj = database[i];
    if (perObj.tag >= tag) {
      perObj.tag -= 1;
    }
  }
  database.splice(tag-1,1);
  readData();
}

readData();