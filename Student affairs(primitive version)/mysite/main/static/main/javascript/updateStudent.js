var selectedStudentID;

if(!sessionStorage.selectedStudent)
    window.location.href = 'AddStudent';
selectedStudentID = parseInt(sessionStorage.selectedStudent)
const fetchStudentData = (id) => {
    const url = `students/${id}`;
    return fetch(url)
    .then(response => {
    if (response.status === 200) {
        return response.json();
    } else {
        throw new Error(`Error fetching student data: ${response.status}`);
    }
    })
    .catch(error => {
        console.error(error);
        // window.location.href = 'AddStudent';
        return null;
    });
};

function storeData(){
    var form = document.querySelector("form");
    const formData = new FormData(form);
    let studObj = Object.fromEntries(formData);
    console.log(studObj)
    student_data ={
        'id': parseInt(studObj.id),
        'gpa': parseFloat(studObj.gpa),
        'name': studObj.name,
        'email': studObj.email,
        'phone': studObj.phone,
        'date': studObj.date,
        'gender': studObj.gender.toLowerCase(),
        'level': parseInt(studObj.level.toLowerCase()),
        'stat': studObj.stat.toLowerCase(),

    }
    const xhr = new XMLHttpRequest();

    // Set the request method and URL
    xhr.open(`PUT`, `students/${selectedStudentID}`);
    // Set the request headers
    xhr.setRequestHeader("Content-Type", "application/json");
    const json_data = JSON.stringify(student_data);
    xhr.onload = function () {
        console.log("hello")
        if (xhr.status === 201) {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
          alert("student was updated")
        } else {
            const response = JSON.parse(xhr.responseText);
            alert("Error:" + response['errors']);
        }
      };

      // Set the onerror function to handle any network errors
    xhr.onerror = function (e) {
        console.error("Network Error"  + e);
    };
    console.log("sending")
    xhr.send(json_data)
}

function checkValidation(event){
    let validData = true;
    let validID = parseInt(document.getElementById("id").value);
    let idLength = validID.length;
    if (validID < 0){
        alert("Invalid ID");
        validData = false;
    }

    if(validID != selectedStudentID && getStudent(validID) != null)
    {
        alert("ID already already exists");
        validData = false;
    }
    
    let validName = document.getElementById("name").value;
    if (/[0-9]/.test(validName)){
        alert("Name Must be a string");
        validData = false;
    }
    
    let validGPA = document.getElementById("gpa").value;
    if (validGPA < 0 || validGPA > 4){
        alert("GPA out of Range");
        validData = false;
    }else if(!/[0-9]/.test(validGPA)){
        alert("GPA must be a number");
        validData = false;
    }
    return validData
}



function fillForm(student)
{
    var form = document.querySelector("form");

    idField = form.querySelector("#id");
    nameField = form.querySelector("#name");
    emailField = form.querySelector("#email");
    phoneField = form.querySelector("#phone");
    dateField = form.querySelector("#date");
    gpaField = form.querySelector("#gpa");
    femaleField = form.querySelector("#female");
    maleField = form.querySelector("#male");
    levelField = form.querySelector("#lvl");
    statusField = form.querySelector("#stat");
    departmentField = form.querySelector("#dep");

    idField.value = student.id;
    nameField.value = student.name;
    emailField.value = student.email;
    phoneField.value = student.phone;
    dateField.value = student.date;
    gpaField.value = student.gpa;
    femaleField.checked = student.gender.toLowerCase() == "female";
    maleField.checked = student.gender.toLowerCase() == "male";
    levelField.value = student.level;
    statusField.value = student.stat;
    departmentField.value = student.dep;
}

function updateStudent(event)
{
    event.preventDefault();
    isvalid = checkValidation();
    console.log(isvalid)
    if(isvalid)
        storeData()
}
window.onload = async function ()
{
    submitButton = document.getElementById('submit-button')
    submitButton.onclick = updateStudent
    student = await fetchStudentData(sessionStorage.selectedStudent);
    fillForm(student);
}


function deleteSelectedStudent()
{
    if(confirm("do you really want to delete the student?"))
    {
        fetch(`students/${selectedStudentID}`, {
            method: 'DELETE'
          })
            .then(response => {
              if (response.ok) {
                console.log('Student deleted successfully');
                sessionStorage.removeItem("selectedStudent");
              } else {
                throw new Error('Failed to delete student');
              }
              window.location.href = 'Search';
            })
            .catch(error => console.error(error));
        
    }
}
