from django.shortcuts import render
from rest_framework import generics
from . models import CustomUser
from . serializers import RegisterSerializers
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset=CustomUser.objects.all()
    permission_classes=[AllowAny]
    serializer_class=RegisterSerializers

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        return token

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer