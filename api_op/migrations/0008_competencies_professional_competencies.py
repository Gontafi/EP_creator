# Generated by Django 4.1.7 on 2023-04-03 12:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_op', '0007_alter_subject_course_code_en_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='competencies',
            name='professional_competencies',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api_op.competencies'),
        ),
    ]
