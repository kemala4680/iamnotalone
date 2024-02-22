let database = [
  {
    tag: 1,
    name: 'Rimiru Tempest',
    telp: '081292038912',
    area: 'Bekasi',
    desc: `I’m not a bad Slime`
  },
  {
    tag: 2,
    name: 'Alex Bhize',
    telp: '081265455897',
    area: 'Jakarta',
    desc: 'Gas aja lah Bos-ku'
  },
  {
    tag: 3,
    name: 'Mikasa Ackerman',
    telp: '082245872563',
    area: 'Depok',
    desc: 'Ereeennn'
  }
];

function addData() {
  let helperName = document.getElementById("helper-name-input");
  let helperTelp = document.getElementById("helper-telp-input");
  let helperArea = document.getElementById("helper-area-input");
  let helperDesc = document.getElementById("helper-desc-input");

  let tag = 1;
  if (database.length > 0) {
    tag = database[database.length-1].tag + 1;
  }

  let tempObj = {
    tag,
    name: helperName.value,
    telp: helperTelp.value,
    area: helperArea.value,
    desc: helperDesc.value
  };

  database.push(tempObj);

  helperName.value = '';
  helperTelp.value = '';
  helperArea.value = '';
  helperDesc.value = '';

  readData();
}

function readData(areaInput) {
  let template = '';
  for (let i = 0; i < database.length; i++) {
    let perObj = database[i];

    let {tag, name, area} = perObj;

    if (!areaInput) {
      template += `<div class="small-card">
          <p>${name}</p>
          <p>${area}</p>
          <button onclick="showMore(${tag})">-</button>
        </div>`
    } 
    if (areaInput === area) {
      template += `<div class="small-card">
          <p>${name}</p>
          <p>${area}</p>
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
        template += `<div class="big-card">
              <p>${name}</p>
              <p>${area}</p>
              <p>${telp}</p>
              <p>${desc}</p>
              <button onclick="removeData(${tag})">delete</button>
              <button onclick="readData()">-</button>
            </div>`
      } else {
        template += `<div class="small-card">
            <p>${name}</p>
            <p>${area}</p>
            <button onclick="showMore(${tag})">-</button>
          </div>`
      }
    }
    if (areaInput === area) {
      if (perObj.tag === tag) {
        template += `<div class="big-card">
              <p>${name}</p>
              <p>${area}</p>
              <p>${telp}</p>
              <p>${desc}</p>
              <button onclick="nearYou()">-</button>
            </div>`
      } else {
        template += `<div class="small-card">
            <p>${name}</p>
            <p>${area}</p>
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