# Generated by Django 4.1.7 on 2023-04-02 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_op', '0005_remove_competencies_professional_competency_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competencies',
            name='type',
            field=models.CharField(choices=[('General', 'Общий'), ('Professional', 'Профессиональный'), ('None', 'Простой')], default='General', max_length=255),
        ),
    ]
