
function showTop10()
{
    //retrieve data
    let arr = Object.values(students);
    // console.log(arr);
    // sorted data for TopStudents page
    let arrSorted = arr.sort((x,y) => (x.gpa < y.gpa) ? 1 : (x.gpa > y.gpa) ? -1 : 0);
    // console.log(arrSorted);
    //Change table content
    let indx = 0;
    while(++indx && indx <= 10){
        document.getElementById(`name${indx}`).innerHTML = arrSorted[indx-1].name;
        document.getElementById(`id${indx}`).innerHTML = arrSorted[indx-1].id;
        document.getElementById(`gpa${indx}`).innerHTML = arrSorted[indx-1].gpa;
    }
}
showTop10();