from django.db import models
from django.conf import settings


class Task(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    is_finished = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'tasks'
