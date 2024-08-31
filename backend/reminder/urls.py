from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import  ReminderDetailView



router = DefaultRouter()
router.register(r'reminders',  ReminderDetailView)

urlpatterns = [
    path('', include(router.urls)),
]
