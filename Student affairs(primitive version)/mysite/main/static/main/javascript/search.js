
function getSearchResults(searchQuery)
{

    let results = [];
    let url = `students/?name=${searchQuery}`;
    if (isNaN(searchQuery) || searchQuery == '')
        url = `students/?name=${searchQuery}`;
    else
        url = `students/?id=${searchQuery}`;

    fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        })
        
        .then(response => {
            if (!response.ok) {
            throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log(data.students)
            let by_status = document.querySelector("#by-status")
            if (by_status.checked){
                data.students = data.students.filter(student => student.stat == "active")
            }
            showResults(data.students)
        })
        .catch(error => {
            console.error("Error:", error);
        });
     return results;
}

function showResults(results)
{
    if(!results)
        return;

    result_list = document.querySelector("table.result-table tbody");
    result_list.innerHTML = ''
    for (var i = 0; i < results.length; i++)
    {
        myElement = document.createElement("tr");
        myElement.innerHTML = `
        <td class="id">${results[i].id}</td>
        <td class="name">${results[i].name}</td>
        <td class="status">${results[i].stat}</td>
        <td class="action">
            <button type="button" onclick="editStudent(${results[i].id})">edit</button>
            <button type="button" onclick="AssignDepartment(${results[i].id})"
            ${results[i].stat == 'inactive'?"disabled":""}>assign</button>
        </td>
        `
        result_list.append(myElement);
    }   
        
}

function AssignDepartment(id)
{
    window.sessionStorage.selectedStudent = id;
    window.location.href='AssignDepartment';
}
function editStudent(id)
{
    window.sessionStorage.selectedStudent = id;
    window.location.href = 'UpdateInformation';
}
window.onload = function()
{
    var searchField = document.getElementById("searchField")
    var goButton = document.getElementById("Go")
    goButton.onclick = (e) => {
        e.preventDefault()
        let searchQuery = searchField.value
        results = getSearchResults(searchQuery)
    }
}
  

