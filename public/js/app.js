$(document).foundation()

const pwd_create = document.getElementById("pwd1");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");

//Class person for use all over the app
// class User {
//     constructor(fname, lname, email){
//       this.fname = fname;
//       this.lname = lname;
//       this.email = email;
//     }

// }

//lessons content filtering
// shows and hides filtered items
$(".filter-simple-button").click(function() {
    var value = $(this).attr('data-filter');
    if(value === "all") {
      $('.filter-simple-item').show('1000');
    } else {
      $(".filter-simple-item").not('.'+value).hide('3000');
      $('.filter-simple-item').filter('.'+value).show('3000');
    }
  });
  
  // changes active class on filter buttons
  $('.filter-simple-button').click(function () {
    $(this).siblings().removeClass('is-active');
    $(this).addClass('is-active');
  });

  //Log in button
  $("#login-Modal")
    .on("invalid.zf.abide", function(ev, elem){
        $("#signin-Login").prop("disabled", true)
  })
    .on("valid.zf.abide", function(ev, elem){
      $("#signin-Login").prop("disabled", false)
      
    })
  
    $("#signin-Login").on("click", function(){
      event.preventDefault()
      let userId = $("#userID-Login").val()
      let pwd = $("#pwd-Login").val()
      console.log("Am here")
      //Ajax call here
      $.ajax({
        // url: location.hostname + "/api/auth/signin",
        url: "http://localhost:8000/api/auth/signin",
        method: "POST",
        data: {
              "email": userId,
              "password": pwd,
            },
        success: (response) =>{
          console.log("my response", response);
          if (response.auth){
            let user_Name = response.fname;
            let token = response.accessToken;
            let role = response.role;
            localStorage.setItem("User", user_Name)
            console.log(user_Name)
            console.log(token)
            console.log(role)
            localStorage.setItem("Token", token)
            localStorage.setItem("Role", role)
            if (role === "STUDENT"){
              window.location.replace(window.location.href + "students");
              //$(".login-button").text("Student logged in:" + user_Name)

            } else {
              window.location.replace(window.location.href + "instructors");
              //$(".login-button").text("Instructor logged in:" + user_Name)

            }

          }
          //hide login button
        }
      });

    })

  //function to register new account
  $("#register-form")
    .on("invalid.zf.abide", function(ev, elem){
      $("#register").prop("disabled", true)
    })
    .on("valid.zf.abide", function(ev, elem){
      $("#register").prop("disabled", false)
     
    });

    $("#register").on("click", function(){
      event.preventDefault();
      console.log("Am here")
      let fname = $("#fname").val()
      let lname = $("#lname").val()
      let email = $("#mail-register").val()
      let pwd = $("#pwd1").val() 
      //Ajax post call goes here 
      console.log(fname, lname, email, pwd)  

      $.ajax({
        // url: location.hostname + "/api/auth/signup",
        url: "http://localhost:8000/api/auth/signup",
        method: "POST",
        data: {
              "first_name": fname,
              "last_name": lname,
              "email": email,
              "role": "STUDENT",
              "password": pwd
            },
        success: (response) =>{
          console.log("my response", response);
          //hide login button
        }
      });
    })

    $("#hmpg-instructor").on("click", () => {
      redirFromHome("instructors");
    });

    $("#hmpg-student").on("click", () => {
      redirFromHome("students");
    });

    validateLogin()
    function validateLogin(){
      let token = localStorage.getItem("Token")
      if (location.pathname !== '/' && !token){
        window.location.href = "/";
        return;
      }
      $.ajaxSetup({
        headers:{'x-access-token': token
      }});
      return token;
  }

  function redirFromHome(viewName){
    //1. check for token
    //2. if token, validate
    //if token valid -> load instructors page
    const usrToken = validateLogin();
    if (usrToken) {
      authToken(viewName);
    }
  }

  //Function to authenticate Token
  function authToken(viewName){
    const url = window.location.href.split("/");
    $.ajax({
      // url: location.hostname + "/api/auth/signup",
      url: `${url[0]}//${url[2]}/api/auth/token`, 
      method: "GET",
      success: (response) =>{
        if (response.auth){
          window.location.href = viewName;
        } else {
          console.log("Token not valid.");
        }
      }
    });
  }

  /*Function to create verify password
  pwd_create.onfocus = function() {
    document.getElementById("#messagePwd").style.display = "block";
  }
  
  // When the user clicks outside of the password field, hide the message box
  pwd_create.onblur = function() {
    document.getElementById("#messagePwd").style.display = "none";
  }
  
  // When the user starts to type something inside the password field
  pwd_create.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(pwd_create.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
  }
  
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(pwd_create.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
  
    // Validate numbers
    var numbers = /[0-9]/g;
    if(pwd_create.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
  
    // Validate length
    if(pwd_create.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }*/
  
  //function to validate email
  function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }



  

  
  
