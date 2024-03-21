var studentInformationDiv;

selectedStudentID = sessionStorage.selectedStudent

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

var student = fetchStudentData(selectedStudentID)


function confirm()
{

    select = document.getElementById("dep");
    let department = select.value;
    if(department != 'general' && student.level < 3)
        alert('student has to be at least in Third Level. Only valid option is "general"');
    else
    {
        const url = `students/${selectedStudentID}/assignDepartment`;
        fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            dep: department
        })
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            alert("success: " + data.message)
        })
        .catch(error => {
            console.error('There was a problem with the fetch request');
        });    

    }

}
async function myfunction()
{
    console.log(student)
    studentInformationDiv = document.getElementById("student-information");
    if(!window.sessionStorage.selectedStudent)
    {
        studentInformationDiv.innerHTML = "Go Away, you haven't chosen any student";
    }
    else
    {
        student = await student
        studentInformationDiv.innerHTML = `
            <p id="id">ID: ${student.id}</p>
            <p id="name">Name: ${student.name}</p>
            <label for="dep">Departments:</label><br>
            <select name="dep" id="dep">
                <option value="general" ${student.dep == "general"  ? "selected" : ""}>General</option>
                <option value="CS" ${student.dep == "CS" ? "selected" : ""}>CS</option>
                <option value="IS" ${student.dep == "IS" ? "selected" : ""}>IS</option>
                <option value="AI" ${student.dep == "AI" ? "selected" : ""}>AI</option>
                <option value="it" ${student.dep == "it" ? "selected" : ""}>IT</option>
                <option value="ds" ${student.dep == "ds" ? "selected" : ""}>DS</option>
            </select><br>
            <button type="button" id="confirm-button" onclick="confirm()">assign</button>
        `;
        
    }
}

window.onload = myfunction;