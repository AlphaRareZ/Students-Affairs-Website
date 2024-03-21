var studentInformationDiv;

function confirm()
{
    student = getStudent(parseInt(window.sessionStorage.selectedStudent));
    select = document.getElementById("dep");

    let department = select.value;
    if(department != 'general' && student.level < 3)
        alert('student has to be at least in Third Level. Only valid option is "general"');
    else
    {
        student.department = department;
        addStudent(student);
        window.sessionStorage.removeItem("selectedStudent");
        window.location.href = 'search.html?search=';
    }

}
function myfunction()
{
    studentInformationDiv = document.getElementById("student-information");
    if(!window.sessionStorage.selectedStudent)
    {
        studentInformationDiv.innerHTML = "Go Away, you haven't chosen any student";
    }
    else
    {
        student = getStudent(parseInt(window.sessionStorage.selectedStudent));
        studentInformationDiv.innerHTML = `
            <p id="id">ID: ${student.id}</p>
            <p id="name">Name: ${student.name}</p>
            <label for="dep">Departments:</label><br>
            <select name="dep" id="dep">
                <option value="general" ${student.department == "general"  ? "selected" : ""}>General</option>
                <option value="CS" ${student.department == "CS" ? "selected" : ""}>CS</option>
                <option value="IS" ${student.department == "IS" ? "selected" : ""}>IS</option>
                <option value="AI" ${student.department == "AI" ? "selected" : ""}>AI</option>
                <option value="it" ${student.department == "it" ? "selected" : ""}>IT</option>
                <option value="ds" ${student.department == "ds" ? "selected" : ""}>DS</option>
            </select><br>
            <button type="button" onclick="confirm()">assign</button>
        `;
    }
}

window.onload = myfunction;