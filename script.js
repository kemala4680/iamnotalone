
// if (Array.isArray(database) && database.length===0) {
  let database =  [
    {
      tag: 1,
      name: 'Rimiru Tempest',
      telp: '081292038912',
      area: 'Bekasi',
      desc: `I’m not a bad Slime`,
      img: 'profile picture/Rimuru.png'
    },
    {
      tag: 2,
      name: 'Alfiansah Komeng',
      telp: '081265455897',
      area: 'Jakarta',
      desc: 'Gas aja lah Bos-ku',
      img:'profile picture/komeng.webp'
    },
    {
      tag: 3,
      name: 'Mikasa Ackerman',
      telp: '082245872563',
      area: 'Depok',
      desc: 'Ereeennn',
      img: 'profile picture/mikasa.jpg'
    },
    {
      tag: 4,
      name: 'Naruto Uzumaki',
      telp: '082245885458',
      area: 'Tangerang',
      desc: 'Janganlah mudah putus asa, semua pasti akan ada jalannya',
      img: 'profile picture/naruto.jpg'
    },
    {
      tag: 5,
      name: 'Sung Jin Woo',
      telp: '082245546962',
      area: 'Bogor',
      desc: 'Jangan pernah menyerah karena ketika kita berhenti kita yang merugi',
      img: 'profile picture/sungjinwo.jpg'
    },
    {
      tag: 6,
      name: 'David Brendi',
      telp: '082295468593',
      area: 'Jakarta',
      desc: 'Kalo lu gak berharap banyak beneran dites, karena kalo lu gak ngarep lu gak kecewa',
      img: 'profile picture/david.jpg'
    },
    {
      tag: 7,
      name: 'Reggie Prabowo',
      telp: '082659872563',
      area: 'Depok',
      desc: 'Halo guys balik lagi sama gw miaww auuuuggg',
      img: 'profile picture/regi.webp'
    },
    {
      tag: 8,
      name: 'Cha Hae In',
      telp: '082954621598',
      area: 'Bekasi',
      desc: 'Semangat terus semuanya akan berlalu',
      img: 'profile picture/cha haein.webp'
    },
    {
      tag: 9,
      name: 'Park Chae Young',
      telp: '081594687352',
      area: 'Depok',
      desc: 'Jangan malu gagal, malu lah ketika kita tidak bangkit dari kegagalan',
      img: 'profile picture/rose.png'
    },
  ];
  // }
  
  // let a = JSON.parse(localStorage.getItem('database'))

  if (a) {
    database = a
  }
  
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
  }
  if (!isValidArea){
    helperAreaError.style.display = 'block';
    isValid = false;
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

  if (!helperImg.value) {
    helperImg.value = "picture/default.jpg"
  }
  
  let tempObj = {
    tag,
    name: helperName.value,
    telp: helperTelp.value,
    area: helperArea.value,
    desc: helperDesc.value,
    img: helperImg.value
  };

  database.push(tempObj);

  helperName.value = '';
  helperTelp.value = '';
  helperArea.value = '';
  helperDesc.value = '';
  helperImg.value = '';

  alert(`Your data has been entered into the system. We assume that you do not misuse this website for your own interest.`);

  readData();
}


function readData(areaInput) {
  let template = '';
  for (let i = 0; i < database.length; i++) {
    let perObj = database[i];

    let {tag, name, area, img} = perObj;

    if (!areaInput) {
      template += 
        `<div class="card">
          <img class="card-pic" src="${img}">
          <div class="card-container">
            <p>${name}</p>
            <p>${area}</p>
          </div>
          <button onclick="showMore(${tag})">-</button>
        </div>`
    } 
    if (areaInput.toLowerCase() === area.toLowerCase()) {
      template += 
        `<div class="card">
          <img class="card-pic" src="${img}">
          <div class="card-container">
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
  console.log('work');
  for (let i = 0; i < database.length; i++) {
    let perObj = database[i];

    let {name, area, telp, desc, img} = perObj;

    if (!areaInput) {
      if (perObj.tag === tag) {
        template += `
          <div class="card">
            <img class="card-pic" src="${img}">
            <div class="card-container">
              <div class="change">
                <p>${name}</p>
                <p>${area}</p>
                <p>${telp}</p>
                <p>${desc}</p>
              </div>
              <button onclick="changeData(${tag})">update</button>  
              <button onclick="removeData(${tag})">delete</button>
            </div>
            <button onclick="readData()">-</button>
          </div>`
      } else {
        template += 
          `<div class="card">
            <img class="card-pic" src="${img}">
            <div class="card-container">
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
          `<div class="card">
            <img class="card-pic" src="${img}">
            <div class="card-container">
              <p>${name}</p>
              <p>${area}</p>
              <p>${telp}</p>
              <p>${desc}</p>
            </div>
            <button onclick="nearYou()">-</button>
          </div>`
      } else {
        template += 
          `<div class="card">
            <img class="card-pic" src="${img}">
            <div class="card-container">
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

function changeData(tag) {
  
  for (let i = 0; i < database.length; i++) {
    let perObj = database[i];

    if (perObj.tag === tag) {
      perObj.area = prompt('Input New Area');
      perObj.telp = prompt('Input New Telp');
    }
  }
  readData()
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