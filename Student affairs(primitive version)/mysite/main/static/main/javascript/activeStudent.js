

let tbody = document.querySelector("table tbody");


// var count = 1;
// for (var i in students){

//     myDiv = `<tr>   
//      <td class="num">${count}</td>
//      <td class="id">${students[i].id}/${students[i].name}</td>
//      <td class="status"><div class="button"> <button onclick="changeStatus(event,${students[i].id})">${students[i].status}</button>
//      <span class="tooltiptext">Change the status of the student</span>
//      </div></td>
//      </tr>`
     
//      tbody.innerHTML += myDiv;
//      count++;
// }

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


        const url = `students/${id}`;
        fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stat: "inactive"
        })
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            target.innerHTML = "inactive";
            target.style.color = "crimson";
        })
        .catch(error => {
            console.error('There was a problem with the fetch request');
        });
    }
    else{

        const url = `students/${id}`;
        fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stat: "active"
        })
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            target.innerHTML = "active";
            target.style.color = "var(--headings)";
        })
        .catch(error => {
            console.error('There was a problem with the fetch request');
        });
    }
}
