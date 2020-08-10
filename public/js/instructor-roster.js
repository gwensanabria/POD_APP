const url = window.location.href.split("/");
// let urlinsid = url[url.length - 1];
// urlinsid = urlinsid.split("?");
// let insid = urlinsid[1];
// insid = insid.split("=");
// const realinsid = Number.parseInt(insid[1]);
const token =window.localStorage.getItem('Token');
if(token){
  $.ajaxSetup({
    headers:{'x-access-token': token
    }});
}

$(document).ready(

    $.ajax({
        url: `${url[0]}//${url[2]}/api/user/instructor/courses`,
        method: "GET",
        success: (response) => {
            console.log(response.data);



          //looping thru array of objects
          response.data.forEach(crsStu => {
            const courseSel = $("<option>");
            courseSel.attr("value", crsStu.id);
            courseSel.text(crsStu.course_name);
            $("#stuCourse").append(courseSel);
            crsStu.Users.forEach(user => {
                const trow = $("<tr>");
                //adding classes to container
                trow.addClass("table-expand-row");
                
                //create <td> tag
                const tdata_class = $("<td>");
                tdata_class.text(crsStu.course_name.toUpperCase());

                //create <td> tag
                const tdata_fname = $("<td>");
                tdata_fname.text(user.first_name);

                //create <td> tag
                const tdata_lname = $("<td>");
                tdata_lname.text(user.last_name);

                //create <td> tag
                const tdata_email = $("<td>");
                tdata_email.text(user.email.toUpperCase());
        
                // appending
                trow.append(tdata_class);
                trow.append(tdata_fname);
                trow.append(tdata_lname);
                trow.append(tdata_email);
                $(".table-expand tbody").append(trow);
            });
          });
        }
      })
);