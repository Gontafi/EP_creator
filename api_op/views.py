from rest_framework import viewsets

from . import models
from . import serializers


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = models.Subject.objects.all()
    serializer_class = serializers.SubjectSerializer


class SubjectAllViewSet(viewsets.ModelViewSet):
    queryset = models.Subject.objects.prefetch_related()
    serializer_class = serializers.SubjectAllSerializer


class ModuleViewSet(viewsets.ModelViewSet):
    queryset = models.Module.objects.all()
    serializer_class = serializers.ModuleSerializer


class ModuleAllViewSet(viewsets.ModelViewSet):
    queryset = models.Module.objects.all()
    serializer_class = serializers.ModuleAllSerializer


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = models.Department.objects.all()
    serializer_class = serializers.DepartmentSerializer


class CycleComponentViewSet(viewsets.ModelViewSet):
    queryset = models.CycleComponent.objects.all()
    serializer_class = serializers.CycleComponentSerializer


class CompetenciesViewSet(viewsets.ModelViewSet):
    queryset = models.Competencies.objects.all()
    serializer_class = serializers.CompetenciesSerializer


class SubjectToChoiceViewSet(viewsets.ModelViewSet):
    queryset = models.SubjectToChoice.objects.all()
    serializer_class = serializers.SubjectToChoiceSerializer
