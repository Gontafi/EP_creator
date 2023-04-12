from rest_framework import serializers
from . import models


class SemesterSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Semester
        fields = '__all__'


class EducationalProgramSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.EducationalProgram
        fields = '__all__'
