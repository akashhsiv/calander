# calendar_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('notes/', views.NoteListCreateView.as_view(), name='notes'),
    path('notes/<int:id>/', views.NoteDetailView.as_view(), name='note-detail'),
    path('tasks/', views.TaskListCreateView.as_view(), name='tasks'),
    path('tasks/<int:id>/', views.TaskDetailView.as_view(), name='task-detail'),
]
