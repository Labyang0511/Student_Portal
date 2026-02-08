from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Student, Teacher, Course, Enrollment

# --- ENROLLMENT (DASHBOARD) ---
def enrollment_list(request):
    if request.method == "POST":
        # 1. EDIT LOGIC
        if 'edit_enrollment' in request.POST:
            e = get_object_or_404(Enrollment, id=request.POST.get('enrollment_id'))
            
            # Cleaning the grade input for the update
            grade_value = request.POST.get('grade')
            e.grade = grade_value if grade_value else None
            
            e.status = request.POST.get('status')
            e.remarks = request.POST.get('remarks')
            e.save()
            messages.success(request, "Enrollment updated successfully!")
            return redirect('home')

        # 2. CREATE LOGIC
        else:
            student_id = request.POST.get('student')
            course_id = request.POST.get('course')
            
            # Validation: Prevent duplicate enrollment
            if Enrollment.objects.filter(student_id=student_id, course_id=course_id).exists():
                messages.error(request, "This student is already enrolled in this course!")
            else:
                grade_value = request.POST.get('grade')
                grade_value = grade_value if grade_value else None

                Enrollment.objects.create(
                    student_id=student_id,
                    course_id=course_id,
                    status=request.POST.get('status'),
                    grade=grade_value,
                    remarks=request.POST.get('remarks')
                )
                messages.success(request, "Student enrolled successfully!")
            return redirect('home')

    context = {
        'enrollments': Enrollment.objects.all(),
        'students': Student.objects.all(),
        'courses': Course.objects.all(),
    }
    return render(request, 'student/enrollment_list.html', context)

    context = {
        'enrollments': Enrollment.objects.all(),
        'students': Student.objects.all(),
        'courses': Course.objects.all(),
    }
    return render(request, 'student/enrollment_list.html', context)

# --- STUDENT CRUD ---
def student_list(request):
    if request.method == "POST":
        if 'edit_student' in request.POST:
            s = get_object_or_404(Student, id=request.POST.get('student_id'))
            s.program = request.POST.get('edit_program')
            s.year_level = request.POST.get('edit_year_level')
            s.address = request.POST.get('edit_address')
            s.save()
            messages.success(request, f"Student {s.last_name} updated!")
        else:
            Student.objects.create(
                first_name=request.POST.get('first_name'),
                last_name=request.POST.get('last_name'),
                email=request.POST.get('email'),
                program=request.POST.get('program'),
                year_level=request.POST.get('year_level'),
                birthdate=request.POST.get('birthdate')
            )
            messages.success(request, "New student added!")
        return redirect('student_list')
    
    return render(request, 'student/student_list.html', {'students': Student.objects.all()})

# --- TEACHER CRUD ---
def teacher_list(request):
    if request.method == "POST":
        if 'edit_teacher' in request.POST:
            t = get_object_or_404(Teacher, id=request.POST.get('teacher_id'))
            t.specialization = request.POST.get('specialization')
            t.department = request.POST.get('department')
            t.employment_status = request.POST.get('status')
            t.save()
            messages.success(request, "Teacher record updated!")
        else:
            Teacher.objects.create(
                first_name=request.POST.get('first_name'),
                last_name=request.POST.get('last_name'),
                email=request.POST.get('email'),
                specialization=request.POST.get('specialization'),
                employment_status=request.POST.get('status'),
                hire_date=request.POST.get('hire_date')
            )
            messages.success(request, "Teacher record created!")
        return redirect('teacher_list')
    
    return render(request, 'student/teacher_list.html', {'teachers': Teacher.objects.all()})

# --- COURSE CRUD ---
def course_list(request):
    if request.method == "POST":
        if 'edit_course' in request.POST:
            c = get_object_or_404(Course, id=request.POST.get('course_id'))
            c.course_name = request.POST.get('name')
            c.schedule = request.POST.get('schedule')
            c.room_number = request.POST.get('room')
            c.save()
            messages.success(request, "Course updated!")
        else:
            Course.objects.create(
                course_code=request.POST.get('code'),
                course_name=request.POST.get('name'),
                units=request.POST.get('units'),
                teacher_id=request.POST.get('teacher')
            )
            messages.success(request, "Course created!")
        return redirect('course_list')
    
    context = {'courses': Course.objects.all(), 'teachers': Teacher.objects.all()}
    return render(request, 'student/course_list.html', context)

# --- DELETE LOGIC ---
def delete_student(request, pk):
    get_object_or_404(Student, pk=pk).delete()
    messages.warning(request, "Student record deleted.")
    return redirect('student_list')

def delete_teacher(request, pk):
    get_object_or_404(Teacher, pk=pk).delete()
    messages.warning(request, "Teacher record deleted.")
    return redirect('teacher_list')

def delete_course(request, pk):
    get_object_or_404(Course, pk=pk).delete()
    messages.warning(request, "Course record deleted.")
    return redirect('course_list')

def delete_enrollment(request, pk):
    get_object_or_404(Enrollment, pk=pk).delete()
    messages.warning(request, "Enrollment record deleted.")
    return redirect('home')