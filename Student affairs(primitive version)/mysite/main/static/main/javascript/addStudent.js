var form;

function storeData(){
    const formData = new FormData(form);
    let studObj = Object.fromEntries(formData);
    
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
        'dep': "general"
    }
    const xhr = new XMLHttpRequest();

    // Set the request method and URL
    xhr.open("POST", "students/");
    // Set the request headers
    xhr.setRequestHeader("Content-Type", "application/json");

    const json_data = JSON.stringify(student_data);
    xhr.onload = function () {
        console.log("hello")
        if (xhr.status === 201) {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
          alert("student was added")
          window.location.href = 'AddStudent'
        } else {
            const response = JSON.parse(xhr.responseText);
            alert("Error:" + response['errors']);
        }
      };
      // Set the onerror function to handle any network errors
    xhr.onerror = function () {
        console.error("Network Error");
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
    if (getStudent(validID) != null)
    {
        alert("ID already exists");
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
    if (validData == true){
        event.preventDefault();
        storeData();
    }
    else
    {
        event.preventDefault();
    }
}

window.onload = function ()
{
    form = document.querySelector("form");

}