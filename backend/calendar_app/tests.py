# calendar_app/tests.py
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Task


class TaskTests(APITestCase):
    def test_create_task(self):
        url = '/api/tasks/'
        data = {'title': 'New Task', 'description': 'Task description'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
