from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateField()
    finish_date = models.DateField()
    is_finished = models.BooleanField(default=False)


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    date_added = models.DateField(auto_now_add=True)


class Reminder(models.Model):
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    date = models.DateField()
    time = models.TimeField()


class ToDo(models.Model):
    task = models.CharField(max_length=100)
    creation_date = models.DateField(auto_now_add=True)
    is_complete = models.BooleanField(default=False)
