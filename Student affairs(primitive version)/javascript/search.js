let result_list;
var results = null;
function getSearchResults(searchQuery)
{

    let results = [];
    if (isNaN(searchQuery) || searchQuery == '')
        results = findStudentsByName(searchQuery);
    else
    {
        let user = getStudent(searchQuery);
        if(user)
            results = [user];
    }
    return results;
}

function parseQueryString(queryString) {
    const queryObj = {};
  
    if (queryString) {
      const queryArray = queryString.slice(1).split('&');
      for (let i = 0; i < queryArray.length; i++) {
        const queryParam = queryArray[i].split('=');
        queryObj[decodeURIComponent(queryParam[0])] = decodeURIComponent(queryParam[1] || '');
      }
    }
  
    return queryObj;
  }
  
const queryString = window.location.search;
const queryObj = parseQueryString(queryString);
if('search' in queryObj)
{
    results = getSearchResults(queryObj.search);
}
function showResults()
{
    if(!results)
        return;
    result_list = document.querySelector("table.result-table tbody");
    for (var i = 0; i < results.length; i++)
    {
        myElement = document.createElement("tr");
        myElement.innerHTML = `
        <td class="id">${results[i].id}</td>
        <td class="name">${results[i].name}</td>
        <td class="status">${results[i].status}</td>
        <td class="action">
            <button type="button" onclick="editStudent(${results[i].id})">edit</button>
            <button type="button" onclick="AssignDepartment(${results[i].id})"
            ${results[i].status == 'inactive'?"disabled":""}>assign</button>
        </td>
        `
        result_list.append(myElement);
    }   
        
}

function AssignDepartment(id)
{
    window.sessionStorage.selectedStudent = id;
    window.location.href='AssignDepartment.html';
}
function editStudent(id)
{
    window.sessionStorage.selectedStudent = id;
    window.location.href = 'UpdateInformation.html';
}
window.onload = showResults;
  

