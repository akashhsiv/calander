from django.urls import path
from .views import UserRegisterView
from rest_framework_simplejwt.views import  TokenObtainPairView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

]
