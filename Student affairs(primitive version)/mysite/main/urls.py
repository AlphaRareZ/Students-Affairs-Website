from django.urls import path
from . import views

urlpatterns = [
    path("", views.HomePage, name="HomePage"),
    path("home",views.index, name="Index"),
    path("Search", views.search, name="Search"),
    path("AddStudent",views.addStudent, name="AddStudent"),
    path("UpdateInformation",views.updateInformation, name="UpdateInformation"),
    path("AssignDepartment",views.assignDepartment, name="AssignDepartment"),
    path("AboutUs",views.aboutUs, name="AboutUs"),
    path("Homepage",views.index, name="Homepage"),
    path("Top10",views.top10, name="Top10"),
    path("ActiveStudents",views.activeStudents, name="ActiveStudents"),
    path("ContactUs",views.contactUs, name="ContactUs"),
    path("students/",views.students, name="students"),
    path("students/<int:id>",views.student_detail, name="student_detail"),
    path("students/<int:id>/assignDepartment",views.assign_student_department, name="student_detail"),
]