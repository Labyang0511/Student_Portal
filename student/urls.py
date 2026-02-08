from django.urls import path
from . import views

urlpatterns = [
    # Main Pages
    path('', views.enrollment_list, name='home'),
    path('students/', views.student_list, name='student_list'),
    path('teachers/', views.teacher_list, name='teacher_list'),
    path('courses/', views.course_list, name='course_list'),

    # Delete Actions
    path('delete-student/<int:pk>/', views.delete_student, name='delete_student'),
    path('delete-teacher/<int:pk>/', views.delete_teacher, name='delete_teacher'),
    path('delete-course/<int:pk>/', views.delete_course, name='delete_course'),
    path('delete-enrollment/<int:pk>/', views.delete_enrollment, name='delete_enrollment'),
]