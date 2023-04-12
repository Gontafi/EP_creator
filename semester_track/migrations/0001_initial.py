# Generated by Django 4.1.7 on 2023-04-02 13:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api_op', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='EducationalProgram',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=255)),
                ('level', models.CharField(blank=True, default='', max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Semester',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('semester_number', models.IntegerField()),
                ('edu_program', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='semester_track.educationalprogram')),
                ('subject', models.ManyToManyField(blank=True, to='api_op.subject')),
                ('subject_to_choice', models.ManyToManyField(blank=True, to='api_op.subjecttochoice')),
            ],
        ),
    ]