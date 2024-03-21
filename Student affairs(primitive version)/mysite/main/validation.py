from .models import Student

from datetime import datetime

def validate_student(data):
	errors = []

	# Check if the required fields are present
	required_fields = ['id', 'gpa', 'name', 'email', 'phone', 'date', 'gender', 'level', 'stat', 'dep']
	for field in required_fields:
		if field not in data:
			errors.append(f"{field} is a required field")
	# Check if the id is positive
	if 'id' in data and data['id'] <= 0:
		errors.append("id must be a positive integer")
	if 'id' in data and Student.objects.filter(id=int(data['id'])).exists():
		errors.append("id already exists")
	# Check if the gpa is between 0 and 4
	if 'gpa' in data and (data['gpa'] < 0 or data['gpa'] > 4):
		errors.append("gpa must be between 0 and 4")

	# Check if the email is valid
	if 'email' in data:
		if '@' not in data['email'] or '.' not in data['email']:
			errors.append("email must be a valid email address")

	# Check if the gender is either 'male' or 'female'
	if 'gender' in data and data['gender'].lower() not in ['male', 'female']:
		errors.append("gender must be either 'male' or 'female'")
	# Check if the status is either 'active' or 'inactive'
	if 'status' in data and data['status'] not in ['active', 'inactive']:
		errors.append("status must be either 'active' or 'inactive'")

	return errors

def validate_update_student(data):
	errors = []

	# Check if the id is positive
	if 'id' in data and data['id'] <= 0:
		errors.append("id must be a positive integer")
	# Check if the gpa is between 0 and 4
	if 'gpa' in data and (data['gpa'] < 0 or data['gpa'] > 4):
		errors.append("gpa must be between 0 and 4")

	# Check if the email is valid
	if 'email' in data:
		if '@' not in data['email'] or '.' not in data['email']:
			errors.append("email must be a valid email address")

	# Check if the gender is either 'male' or 'female'
	if 'gender' in data and data['gender'].lower() not in ['male', 'female']:
		errors.append("gender must be either 'male' or 'female'")
	# Check if the status is either 'active' or 'inactive'
	if 'status' in data and data['status'] not in ['active', 'inactive']:
		errors.append("status must be either 'active' or 'inactive'")

	return errors

