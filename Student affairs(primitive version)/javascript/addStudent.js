var form;

function storeData(){
    const formData = new FormData(form);
    let studObj = Object.fromEntries(formData);
    addStudent(new Student(
        parseInt(studObj.id),
        studObj.name,
        studObj.date,
        parseFloat(studObj.gpa),
        studObj.gender.toLowerCase(),
        parseInt(studObj.level),
        studObj.stat.toLowerCase(),
        studObj.dep.toLowerCase(),
        studObj.email,
        studObj.phone
    ));
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