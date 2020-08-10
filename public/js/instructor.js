$(document).foundation()
// const handlebars = require("express-handlebars");
// const db = require("../models/index");

// closes the panel on click outside
$(document).mouseup(function (e) {
    var container = $('#contact-panel');
    if (!container.is(e.target) // if the target of the click isn't the container...
    && container.has(e.target).length === 0) // ... nor a descendant of the container
      {
        container.removeClass('is-active');
      }
});

  //student roster toggling
  $('[data-open-details]').click(function (e) {
    e.preventDefault();
    $(this).next().toggleClass('is-active');
    $(this).toggleClass('is-active');
  });

    // first create a Student Roster TABLE structure by adding few headers.
    // function createTable() {
    //     let headerArray = ['First Name', 'Last Name', 'Email Address', '']; // table headers.
    //     let emptyTable = $('<thead>');
    //     emptyTable.attr('id', 'emptyTable');  // table id.
    //     emptyTable.attr('class', 'responsive-card-table unstriped');  // table class.

    //     let tBody = $("<tbody>")
    //     let tr = $("<tr>");

    //     for (let i = 0; i < headerArray.length; i++) {
    //         let th = $('<th>'); // the header object.
    //         th.attr('id', 'table-header')
            
    //         th.text(headerArray[i]);
    //         tr.append(th);
    //     }
    //     tBody.append(tr);
    //     emptyTable.append(tBody);

    //     let div = $('.table-expand');
    //     div.append(emptyTable);    // add table to a container.
    // }
    // createTable();

    // function to add new row.
    function addRow() {
        var empTab = $('#emptyTable');
        var rowCnt = empTab.length;    // get the number of rows.
        var empRow = $('.table-row')
        // var tr = []; // table row.
        empTab.insertRow(empRow);

        let newStudent = {
          firstName: $(".student-first-name").val(),
          lastName: $(".student-last-name").val(),
          email: $(".student-email").val()
        };


        for (let c = 0; c < headerArray.length; c++) {

            if (c == 3) {   // if its the 3rd column of the table.
                // add a button control.
                let button = $('<input>');

                // set the attributes.
                button.attr('type', 'button');
                button.attr('value', 'Delete');

                // add button's "onclick" event.
                button.attr('onclick', 'removeRow(this)');

                td.append(button);
            }
            else if (c == 0) {
              let firstName = $('<td>').addClass("first-name");          // TABLE DEFINITION.
              firstName.text(newStudent.firstName);
              var ele = $('<input>');
              ele.attr('type', 'text');
              ele.attr('value', '');
              firstName.append(ele);
            }
            else if (c == 1) {
              var lastName = $('<td>').addClass("last-name");          // TABLE DEFINITION.
              lastName.text(newStudent.lastName);
              var ele = $('<input>');
              ele.attr('type', 'text');
              ele.attr('value', '');
              lastName.append(ele);
            }
            else if (c == 2) {
              var email = $('<td>').addClass("email");          // TABLE DEFINITION.
              email.text(newStudent.email);
              ele.attr('type', 'text');
              ele.attr('value', '');
              email.append(ele);
            }
            empRow.push(newStudent);
        }
    }

    // function to delete a row.
    function removeRow(oButton) {
        var empTab = $('#emptyTable');
        empTab.deleteRow(oButton.parentNode.parentNode.rowIndex); // buttton -> td -> tr
    }

    // function to extract and submit table data.
    function submit() {
        var myTab = $('#emptyTable');
        var arrValues = new Array();

        // loop through each row of the table.
        for (row = 1; row < myTab.rows.length - 1; row++) {
            // loop through each cell in a row.
            for (c = 0; c < myTab.rows[row].cells.length; c++) {
                var element = myTab.rows.item(row).cells[c];
                if (element.childNodes[0].attr('type') == 'text') {
                    arrValues.push("'" + element.childNodes[0].value + "'");
                }
            }
        }
        
        // finally, show the result in the console.
        console.log(arrValues);
  }
    
   // function to create new table row entry with add student button click
   /*$(".student-modal-submit-button").on("click", function (e) {
     e.preventDefault();
      // addRow();
      let newStudent = {
        firstName: $(".student-first-name").val(),
        lastName: $(".student-last-name").val(),
        email: $(".student-email").val()
      };
    console.log("you got clicked!", newStudent)

    //ajax call to route on the backend that saves new student to the DB!!

  });*/

  //Add new student
  $("#AddStu").on("click", function(){
    event.preventDefault();
    let fname = $("#stuFirst").val()
    let lname = $("#stuLast").val()
    let email = $("#stuMail").val()
    let crsid = $("#stuCourse").val()
    console.log("course id", crsid);
    let pwd = $("#stuPwd").val() 
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
            "password": pwd,
            "crsid": crsid
          },
      success: (response) =>{
        console.log("my response", response);
        //Refresh roster to show student
      }
    });
  })

  //Target login button after student is checked in
    let user = localStorage.getItem("User")
    $("#LoginIns").text("Logged in:" + user)
    $("#LoginIns").css("color","green")
    $("#LoginIns").hover(function(){
        $("#LoginIns").addClass("hide")
        $("#LogoutIns").removeClass("hide")

},
    function(){
        $("#LogoutIns").addClass("hide")
        $("#LoginIns").removeClass("hide")

  }
)

//funtion to log out
$("#LogoutIns").on("click", function(){
  window.location.href = "/";
  localStorage.clear()

})

//function to add Course

