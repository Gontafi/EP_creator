# Generated by Django 4.1.7 on 2023-04-02 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_op', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='module',
            name='module_code',
            field=models.CharField(default='null', max_length=255),
        ),
    ]
