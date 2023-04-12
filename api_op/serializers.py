from rest_framework import serializers

from . import models


class ModuleSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Module
        fields = '__all__'


class ModuleAllSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Module
        fields = '__all__'
        depth = 1


class SubjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Subject
        fields = '__all__'


class SubjectAllSerializer(serializers.ModelSerializer):
    module = ModuleAllSerializer()

    class Meta:
        model = models.Subject
        fields = '__all__'
        depth = 1


class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Department
        fields = '__all__'


class CycleComponentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CycleComponent
        fields = '__all__'


class CompetenciesSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Competencies
        fields = '__all__'


class SubjectToChoiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.SubjectToChoice
        fields = '__all__'

