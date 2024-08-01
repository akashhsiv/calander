from django.db import models
from django.conf import settings


class Task(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    # Stores proof like a file or document
    proof_of_completion = models.FileField(
        upload_to='proofs/', blank=True, null=True)
    start_date = models.DateField(
        blank=True, null=True)  # Start date of the task
    finish_date = models.DateField(
        blank=True, null=True)  # Finish date of the task

    def __str__(self):
        return self.title


class Note(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    # Date when the note was created
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
