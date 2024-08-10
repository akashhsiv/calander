from django.contrib import admin
from django.urls import path, include
from .views import home

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/', include('calendar_app.urls')),
    path('', home),  # Add this line to handle the root URL
]
