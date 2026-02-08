from django.contrib import admin
from .models import Enrollment, Student, Teacher, Course

admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Course)
admin.site.register(Enrollment)