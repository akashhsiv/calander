from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  TodoDetailView

router = DefaultRouter()
router.register(r'todo', TodoDetailView)

urlpatterns = [
    path('', include(router.urls)),
]
