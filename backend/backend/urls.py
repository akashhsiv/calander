from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user.views import UserViewSet
from notes.views import NoteViewSet
from todo.views import TodoViewSet
from reminder.views import ReminderViewSet
from tasks.views import TaskViewSet

router = DefaultRouter()
router.register(r'notes', NoteViewSet)
router.register(r'todos', TodoViewSet)
router.register(r'reminders', ReminderViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
