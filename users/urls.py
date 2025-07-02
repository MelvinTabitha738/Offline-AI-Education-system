from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from django.urls import path 
from .views import RegisterView, LoginView,StudentView,TeacherView,AdminView

urlpatterns = [
   
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),

    #JWT token routes
    path('token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
    path('student/dashboard/',StudentView.as_view(),name='student_dashboard'),
    path('teacher/dashboard/',TeacherView.as_view(),name='teacher_dashboard'),
    path('admin/dashboard/',AdminView.as_view(),name='admin_dashboard'),
    
]
