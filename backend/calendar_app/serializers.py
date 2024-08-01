from rest_framework import serializers
from .models import Task, Note


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'user', 'title', 'description',
                  'completed', 'proof_of_completion','start_date','end_date')


class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'user', 'title', 'content','created_at')
