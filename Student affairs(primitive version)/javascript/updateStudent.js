var form;
var selectedStudent;

if(!sessionStorage.selectedStudent)
    window.location.href = 'AddStudent.html';

selectedStudent = getStudent(parseInt(sessionStorage.selectedStudent));
if(!selectedStudent)
    window.location.href = 'AddStudent.html';

function storeData(){
    const formData = new FormData(form);
    let studObj = Object.fromEntries(formData);

    let newStudent = new Student(
        parseInt(studObj.id),
        studObj.name,
        studObj.date,
        parseFloat(studObj.gpa),
        studObj.gender.toLowerCase(),
        parseInt(studObj.level),
        studObj.stat.toLowerCase(),
        selectedStudent.department,
        studObj.email,
        studObj.phone
    );
    if(newStudent.id != selectedStudent.id)
    {
        deleteStudent(selectedStudent.id);
        selectedStudent = newStudent;
        sessionStorage.selectedStudent = selectedStudent.id;
    }
    addStudent(newStudent);
}

function checkValidation(event){
    let validData = true;
    let validID = parseInt(document.getElementById("id").value);
    let idLength = validID.length;
    if (validID < 0){
        alert("Invalid ID");
        validData = false;
    }
    if(validID != selectedStudent.id && getStudent(validID) != null)
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
    if (validData == true)
        storeData();
    else
        event.preventDefault();
}

function fillForm()
{
    const student = selectedStudent;
    if(!student)
        window.location.href = 'AddStudent.html';
    
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
    phoneField.value = student.mobileNumber;
    dateField.value = student.dateOfBirth;
    gpaField.value = student.gpa;
    femaleField.checked = student.gender == "female";
    maleField.checked = student.gender == "male";
    levelField.value = student.level;
    statusField.value = student.status;
    departmentField.value = student.department;
}

window.onload = function ()
{
    form = document.querySelector("form");
    fillForm();
}

function deleteSelectedStudent()
{
    if(selectedStudent)
        deleteStudent(selectedStudent.id);
    sessionStorage.removeItem("selectedStudent");
    window.location.href = 'search.html?search=';
}