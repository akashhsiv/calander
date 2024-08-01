from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


class CustomUser(AbstractUser):
    # Add any custom fields for your user model here

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_groups',  # Change this to a unique related name
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_permissions',  # Change this to a unique related name
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )

    # Add any additional methods or properties if needed
