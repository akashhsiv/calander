# Generated by Django 5.0.7 on 2024-08-28 15:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='is_done',
            new_name='completed',
        ),
    ]
