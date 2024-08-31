from django.db import models
from django.conf import settings


class Todo(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    date = models.DateField()
    content = models.TextField()
    is_done = models.BooleanField(default=False)
