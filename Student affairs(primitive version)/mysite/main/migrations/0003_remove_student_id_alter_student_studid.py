# Generated by Django 4.1.7 on 2023-05-23 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_rename_addstud_student'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='id',
        ),
        migrations.AlterField(
            model_name='student',
            name='Studid',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
