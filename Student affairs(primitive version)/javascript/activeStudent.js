

let tbody = document.querySelector("table tbody");


var count = 1;
for (var i in students){

    myDiv = `<tr>   
     <td class="num">${count}</td>
     <td class="id">${students[i].id}/${students[i].name}</td>
     <td class="status"><div class="button"> <button onclick="changeStatus(event,${students[i].id})">${students[i].status}</button>
     <span class="tooltiptext">Change the status of the student</span>
     </div></td>
     </tr>`
     
     tbody.innerHTML += myDiv;
     count++;
}
// search function start
let searchInput = document.querySelector(".heading input");
let studentID = document.querySelectorAll("table tbody td.id");

searchInput.addEventListener("keyup", function(){
    for (var i = 0; i < studentID.length; i++) {
        if (studentID[i].innerHTML.toLowerCase().includes(searchInput.value.toLowerCase())) {
            studentID[i].parentElement.style.display = "flex";
        } else {
            studentID[i].parentElement.style.display = "none";
        }
    }
})
// search function end

let inactiveStud = document.querySelectorAll("table tbody td.status button");
for (var i = 0; i < inactiveStud.length; i++){
    if (inactiveStud[i].innerHTML == "inactive"){
        inactiveStud[i].style.color = "crimson";
    }
}

function changeStatus(event,id){
    var target = event.target;
    if (target.innerHTML == "active"){
        target.innerHTML = "inactive";
        target.style.color = "crimson";
        let student = getStudent(id);
        student.status = "inactive";
        addStudent(student);
    }
    else{
        target.innerHTML = "active";
        target.style.color = "var(--headings)";
        let student = getStudent(id);
        student.status = "active";
        addStudent(student);
    }
}
