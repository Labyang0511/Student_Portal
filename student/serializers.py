from rest_framework import serializers
from .models import Teacher, Course, Student, Enrollment

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher

        fields = [
            'id', 'first_name', 'last_name', 'gender', 
            'specialization', 'contact_number', 'email', 
            'hire_date', 'department', 'employment_status'
        ]

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course

        fields = [
            'id', 'course_code', 'course_name', 'description', 
            'units', 'schedule', 'room_number', 'teacher', 
            'semester', 'academic_year'
        ]

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment

        fields = [
            'id', 'student', 'course', 'enrollment_date', 
            'status', 'grade', 'remarks'
        ]

class StudentSerializer(serializers.ModelSerializer):

    enrollments = EnrollmentSerializer(many=True, read_only=True, source='enrollment_set')

    class Meta:
        model = Student

        fields = [
            'id', 'first_name', 'last_name', 'gender', 
            'birthdate', 'address', 'contact_number', 
            'email', 'year_level', 'program', 'enrollment_date',
            'enrollments'
        ]