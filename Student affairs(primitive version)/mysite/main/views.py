from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpRequest
from django.http import JsonResponse
from django.http import HttpResponseBadRequest
import json
from .models import Student
from .validation import validate_student, validate_update_student
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


def index(request):
    return render(request, "main/Index.html");

def HomePage(request):
    return render(request, "main/homepage.html")

def search(request):
    return render(request, "main/Search.html");

def addStudent(request):
    return render(request, "main/AddStudent.html");

def updateInformation(request):
    return render(request, "main/UpdateInformation.html");

def assignDepartment(request):
    return render(request, "main/AssignDepartment.html");

def contactUs(request):
    return render(request, "main/ContactUs.html")

def aboutUs(reqeust):
    return render(reqeust, "main/AboutUs.html")

def top10(request):
    data = Student.objects.all().order_by('-gpa').values()[:10]
    context = {
        'stud' : data
    }
    return render(request, "main/Top10.html", context)

def activeStudents(request):
    data = Student.objects.all().order_by('-status').values()[:10]
    context = {
        'stud' : data
    }
    return render(request, "main/ActiveStudents.html", context)

@csrf_exempt
def students_list(request: HttpRequest):
    students = []
    name = request.GET.get('name')
    id = request.GET.get("id")
    print("Name : ", name)
    print("id : ", id)
    if name != None:
        if name == '':
            students = Student.objects.all()
        else:
            students = Student.objects.filter(name__icontains=name)
    elif id != None:
        students = Student.objects.filter(id=id)
    else:
        students = Student.objects.all()
    students_list = []
    for student in students:
        students_list.append({
            'id': student.id,
            'gpa': student.gpa,
            'name': student.name,
            'email': student.email,
            'phone': student.phoneNo,
            'date': student.date,
            'gender': student.gender,
            'level': student.level,
            'stat': student.status,
            'dep': student.department,
        })
    return JsonResponse({'students': students_list})


def add_student(request):
    print(request.body)
    data = json.loads(request.body)
    errors  = validate_student(data)
    print(data)
    if len(errors) == 0:
        data = Student(id = data['id'],
                gpa = data['gpa'],
                name = data['name'],
                email = data['email'],
                phoneNo = data['phone'],
                date = data['date'],
                gender = data['gender'],
                level = data['level'],
                status = data['stat'],
                department = data['dep'])
        data.save()
        return JsonResponse({'message': 'added student successfully'}, status=201)
    else:
        return JsonResponse({'errors': errors}, status=400)
@csrf_exempt
def students(request):
    # Handle GET request
    if request.method == 'GET':
        return students_list(request)
    # Handle POST request
    elif request.method == 'POST':
        return add_student(request)

@csrf_exempt
def student_detail(request, id):
    try:
        student = Student.objects.get(pk=id)
    except Student.DoesNotExist:
        return JsonResponse({'error': 'Student not found'}, status=404)
    # Handle GET request
    if request.method == 'GET':
        student_data = {
            'id': student.id,
            'gpa': student.gpa,
            'name': student.name,
            'email': student.email,
            'phone': student.phoneNo,
            'date': student.date,
            'gender': student.gender,
            'level': student.level,
            'stat': student.status,
            'dep': student.department,
            # Add any other fields you want to include in the response
        }
        return JsonResponse(student_data)

    # Handle PUT request
    elif request.method == 'PUT':
        data = json.loads(request.body)
        errors = validate_update_student(data)
        if len(errors) == 0:
            student.name = data.get('name', student.name)
            student.gpa = data.get('gpa', student.gpa)
            student.email = data.get('email', student.email)
            student.phone = data.get('phone', student.phoneNo)
            student.date = data.get('date', student.date)
            student.gender = data.get('gender', student.gender)
            student.level = data.get('level', student.level)
            student.status = data.get('stat', student.status)
            student.department = data.get('dep', student.department)
            # Update any other fields you want to include in the request body
            student.save()
            return JsonResponse({
                'message': "successfully update student"
            }, status=201)
        else:
            return JsonResponse({ 'errors': errors
            }, status=401)
    # Handle DELETE request
    elif request.method == 'DELETE':
        student.delete()
        return JsonResponse({'message': 'Student deleted successfully'}, status=200)
    else:
        return HttpResponseBadRequest()
    
@csrf_exempt
def assign_student_department(request: HttpRequest, id):
    if request.method == 'PUT':
        try:
            student = Student.objects.get(pk=id)
        except Student.DoesNotExist:
            return JsonResponse({'error': 'Student not found'}, status=404)
        
        data = json.loads(request.body)
        if int(student.level) < 3 and data['dep'] != 'general':
            return JsonResponse({
                        'message': "student has to be at least level 3"
                        }, status=400)
        student.department = data['dep']
        student.save()
        return JsonResponse({
            'message': "successfully assigned department"
        }, status=201)
    else:
        HttpResponseBadRequest()
        