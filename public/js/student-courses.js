const url = window.location.href.split("/");
const token =window.localStorage.getItem('Token');
if(token){
  $.ajaxSetup({
    headers:{'x-access-token': token
    }});
}
$(document).ready(

    $.ajax({
        url: `${url[0]}//${url[2]}/api/user/student/courses`,
        method: "GET",
        success: (response) => {
            console.log(response.data);
            $("#stu-name").text(`Courses for ${response.data.first_name} ${response.data.last_name}`);
          //looping thru array of objects
          response.data.Courses.forEach(course => {
            const crsContainer = $("<div>");
            //adding classes to container
            crsContainer.addClass("column column-block filter-simple-item current lesson-card");
            crsContainer.attr("data-crsd", course.id);
            //create <a> tag
            const crsATag = $("<a>");
            crsATag.attr("href", `/lesson?id=${course.Users_Courses.courseId}`);
            //create img tag
            const crsImg = $("<img>");
            //attrs and classes for img
            crsImg.addClass("lesson-image");
            crsImg.attr("src", "https://spaceholder.cc/350x350");
            crsImg.attr("alt", course.course_name);
    
            //div class middle for button
            const crsMiddle = $("<div>");
            crsMiddle.addClass("middle");
    
            //view lessons button
            const crsLessons = $("<div>");
            crsLessons.addClass("text");
            crsLessons.text("View Lessons");
    
            // appending
            crsMiddle.append(crsLessons);
            crsATag.append(crsImg);
            crsATag.append(crsMiddle);
            crsContainer.append(crsATag);
    
            //appending to existing html
            $("#courses-block").append(crsContainer);
          });
        }
      })
);