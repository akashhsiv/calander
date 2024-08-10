# backend/middleware.py

from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse
from rest_framework.views import exception_handler


class CustomExceptionMiddleware(MiddlewareMixin):
    def process_exception(self, request, exception):
        response = exception_handler(exception, None)
        if response is None:
            return JsonResponse({'detail': str(exception)}, status=500)
        return response
