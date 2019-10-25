"use strict"
// Listen on authentication state change
firebase.auth().onAuthStateChanged(function(user) {
  let nav = document.querySelector('nav');
  if (user) { // if user exists and is authenticated
    homeContent(user);
    appendUser(user);
    nav.classList.add("active");
  } else { // if user is not logged in
    showPage("login");
    nav.classList.remove("active");
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  showLoader(false);
});
function subQuestions(sub){
questionRef.onSnapshot(function(snapshotData) {
  let questions = snapshotData.docs;
  appendQuestions(questions, sub);
});
}
function subNav(sub){
  let subnav = document.querySelector(`#${sub.id}`);
  subnav.innerHTML = "";
  subnav.innerHTML += `
    <div class="subclose">
    <img src="img/arrow.svg">
  </svg>
  </div>
  `;
  if (sub.classList.contains("activesub")) {
    sub.classList.remove("activesub");
  }else{
    sub.classList.add("activesub");
  }
  subQuestions(sub);
}

function appendQuestions(questions, sub) {
  let htmlTemplate = "";
  for (let question of questions) {
    if (question.data().answered == true) {
      htmlTemplate += `
      <li class="trueQuestion">
        <p>${question.data().question}</p>
      </li>
      `;
    } else {
      htmlTemplate += `
      <li>
        <p>${question.data().question}</p>
      </li>
      `;
    }
  }
  document.querySelector(`#${sub.id}`).innerHTML += htmlTemplate;
}
function  activateMenu(){
  let ul =  document.querySelector("nav > ul");
  if (ul.style.transform == "translate(-100%)") {
      ul.style.transform = "translate(0)";
      document.querySelector(".close").classList.add("spin");
   }else {
       ul.style.transform = "translate(-100%)";
      document.querySelector(".close").classList.remove("spin");
   }
}

function appendUser(user){
let htmlTemplate = `
    <img src="img/profile.svg" alt="">
    <div>
    <h4>${user.displayName}</h4>
    <a href="#" onclick="logout()">Log Out</a>
    </div>
`;
document.querySelector('.profile').innerHTML = htmlTemplate;


};


function homeContent(user){
    let htmlTemplate = `
    <h1>ArlaGården Plus</h1>
    <a href="#start" class="btn-start" onclick="showPage(start.id), userHandler(2), contentIteration()">Start Undersøgelsen</a>
    `;
    document.querySelector('#home').innerHTML = htmlTemplate;

setDefaultPage();
}

function userHandler(inputId){
  firebase.auth().onAuthStateChanged(function(user) {
    if (inputId == "2") {
    if (user) { // if user exists and is authenticated
      startContent(user);
    } else { // if user is not logged in
      showPage("login");
      nav.classList.remove("active");
      ui.start('#firebaseui-auth-container', uiConfig);
    }
    }
    showLoader(false);
  });
  function subQuestions(sub){
  questionRef.onSnapshot(function(snapshotData) {
    let questions = snapshotData.docs;
    appendQuestions(questions, sub);
  });
  }
}
userHandler(2);
function startContent(user){
  let htmlTemplate = "";
  htmlTemplate = `
    <div class="start-div" id="1">
    <div id="info1">

    <div class="start-content" id="start-1" style="transform: translateX(0)">
    <h2>Velkommen ${  user.displayName  } 1 </h2>
    <p>
    Velkommen til Arlagården Plus’ spørgeskema omkring miljøvenlighed.
</p><p>
Du vil hurtigt blive guiden igennem funktionaliteten på siden, du kan altid skippe introen, ved at trykke nederst i højre hjørne på “skip intro”
    </p>
    </div>
    <div class="start-content" id="start-2">
    <h2>Velkommen ${  user.displayName  } 2 </h2>
    <p>
    Velkommen til Arlagården Plus’ spørgeskema omkring miljøvenlighed.
</p><p>
Du vil hurtigt blive guiden igennem funktionaliteten på siden, du kan altid skippe introen, ved at trykke nederst i højre hjørne på “skip intro”
    </p>
    </div>
    <div class="start-content" id="start-3">
    <h2>Velkommen ${  user.displayName  } 3 </h2>
    <p>
    Velkommen til Arlagården Plus’ spørgeskema omkring miljøvenlighed.
</p><p>
Du vil hurtigt blive guiden igennem funktionaliteten på siden, du kan altid skippe introen, ved at trykke nederst i højre hjørne på “skip intro”
    </p>
    </div>
    </div>
    <div>
    <button class="btn-start green" onclick="contentIteration()">Næste</button>
    <div class="radio">
      <span class="active" id="radio-1"></span>
        <span id="radio-2"></span>
          <span id="radio-3"></span>
    </div>
    </div>
    </div>

  `;
  document.querySelector('#start').innerHTML = htmlTemplate;
}

  let i = 1;
function contentIteration(){
  if (i < 3) {
    console.log(i++);
    document.querySelector(`#start-${i}`).style.transform = "translateX(0)";
    document.querySelector(`#radio-${i}`).classList.add("active");
  } else {
    console.log("done");
    showPage("dashboard");
  }
}
