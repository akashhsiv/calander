from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, NoteViewSet, ReminderViewSet, ToDoViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'notes', NoteViewSet)
router.register(r'reminders', ReminderViewSet)
router.register(r'todos', ToDoViewSet)

urlpatterns = router.urls
