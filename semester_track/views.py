from rest_framework import viewsets
from . import models
from . import serializers


class EducationalProgramViewSet(viewsets.ModelViewSet):
    queryset = models.EducationalProgram.objects.all()
    serializer_class = serializers.EducationalProgramSerializer


class SemesterViewSet(viewsets.ModelViewSet):
    queryset = models.Semester.objects.all()
    serializer_class = serializers.SemesterSerializer