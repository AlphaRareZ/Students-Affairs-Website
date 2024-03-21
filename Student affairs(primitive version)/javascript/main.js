//students stores key value pairs of (id, student object)
students = {}

if(window.localStorage.students)
    students = JSON.parse(window.localStorage.students)

else
    students = {};

//create a new student object
function Student(id, name, dateOfBirth, gpa, gender,
    level, status, department, email, mobileNumber) {
    this.id = id;
    this.name = name;

    this.dateOfBirth = (typeof dateOfBirth !== 'undefined') ? dateOfBirth : "" ;
    this.gpa = (typeof gpa !== 'undefined') ? gpa : null ;
    this.gender = (typeof gender !== 'undefined') ? gender : "" ;
    this.level = (typeof level !== 'undefined') ? level : "" ;
    this.status = (typeof status !== 'undefined') ? status : "" ;
    this.department = (typeof department !== 'undefined') ? department : "" ;
    this.email = (typeof email !== 'undefined') ? email : "" ;
    this.mobileNumber = (typeof mobileNumber !== 'undefined') ? mobileNumber : "" ;
}

//add a student object to students(database)
//if student.id already exists, simply updates it.
function addStudent(student)
{
    students[student.id] = student;
    window.localStorage.students = JSON.stringify(students);
}

function deleteStudent(id)
{
    if(students[id])
    {
        delete students[id];
        window.localStorage.students = JSON.stringify(students);
    }
}

function getStudent(id)
{
    if(students[id])
        return students[id];
    else
        return null;
}

function findStudentsByName(name)
{

    results = [];
    for(var id in students)
    {
        if (students[id].name.toLowerCase().includes(name.toLowerCase()) || name == '')
            results.push(students[id]);
    }
    return results;
}
