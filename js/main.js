"use strict";
// Listen on authentication state change
firebase.auth().onAuthStateChanged(function(user) {
  let nav = document.querySelector('nav');
  if (user) { // if user exists and is authenticated
    homeContent("home", user);
    appendUser(user);
    nav.classList.add("active");
  } else { // if user is not logged in
    showPage("login");
    nav.classList.remove("active");
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  showLoader(false);
});

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


function homeContent(page, user){
    let htmlTemplate = `
    <h1>Velkommen ${user.displayName}</h1>
    `;
    document.querySelector('#home').innerHTML = htmlTemplate;

showPage(page);
}
