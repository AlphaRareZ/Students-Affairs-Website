from django.db import models
from django import forms

# Create your models here.

class Student(models.Model):
    id = models.IntegerField(primary_key=True)
    gpa = models.FloatField(null=True)
    name = models.CharField(max_length=50, null=True)
    email = models.CharField(max_length=50, null= True)
    phoneNo = models.IntegerField(null=True)
    date = models.DateField(null=True)
    # male = models.BooleanField()
    # female = models.BooleanField()
    # radio_choice = models.CharField(max_length=200)
    gender = models.CharField(max_length=20, null=True)
    level = models.CharField(max_length=50, null=True)
    status = models.CharField(max_length=20, null=True)
    department = models.CharField(max_length=15, null=True) 
    
# class RadioDataForm(forms.ModelForm):
#     class Meta:
#         model = AddStud
#         fields = [
#             'male',
#             'female'
#         ]
#         widgets = {
#             'male' : forms.RadioSelect(),
#             'female' : forms.RadioSelect(),
#         }
        