from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import  TaskDetailView



router = DefaultRouter()
router.register(r'tasks', TaskDetailView)

urlpatterns = [
    path('', include(router.urls)),
]
