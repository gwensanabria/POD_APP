const url = window.location.href.split("/");
let urlcrsid = url[url.length - 1];
urlcrsid = urlcrsid.split("?");
let crsid = urlcrsid[1];
crsid = crsid.split("=");
const realcrsid = Number.parseInt(crsid[1]);
const token =window.localStorage.getItem('Token');
if(token){
  $.ajaxSetup({
    headers:{'x-access-token': token
    }});
}
$(document).ready(

    $.ajax({
        url: `${url[0]}//${url[2]}/api/userstudent/courses/lessons/${realcrsid}`,
        method: "GET",
        success: (response) => {
            console.log(response.data);

            //getting course name
            const course_name = response.data[0].Course.course_name + " Lessons";
            $("#course-name").text(course_name);

          //looping thru array of objects
          response.data.forEach(lesson => {
            const lsnContainer = $("<div>");
            //adding classes to container
            lsnContainer.addClass("column column-block filter-simple-item current lesson-card");
            lsnContainer.attr("data-crsd", lesson.id);
            //create <a> tag
            const lsnATag = $("<a>");
            lsnATag.attr("href", "#");
            lsnATag.attr("data-open", "lesson-Video");
            //create img tag
            const lsnImg = $("<img>");
            //attrs and classes for img
            lsnImg.addClass("lesson-image");
            lsnImg.attr("src", "https://spaceholder.cc/350x350");
            lsnImg.attr("alt", lesson.name);
    
            //div class middle for button
            const lsnMiddle = $("<div>");
            lsnMiddle.addClass("middle");
    
            //view lessons button
            const lsnLessons = $("<div>");
            lsnLessons.addClass("text");
            lsnLessons.text("Click to View Lesson");
    
            // appending
            lsnMiddle.append(lsnLessons);
            lsnATag.append(lsnImg);
            lsnATag.append(lsnMiddle);
            lsnContainer.append(lsnATag);
    
            //appending to existing html
            $(".courses-block").append(lsnContainer);
          });
        }
      })
);