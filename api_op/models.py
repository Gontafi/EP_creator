from django.db import models

from . import choices


class Subject(models.Model):
    department = models.ForeignKey(to='Department', on_delete=models.CASCADE, blank=True, null=True)
    module = models.ForeignKey(to='Module', on_delete=models.CASCADE)
    prerequisite = models.ManyToManyField(to='Subject', blank=True)
    competencies = models.ManyToManyField(to='Competencies', blank=True)
    name_kz = models.CharField(max_length=255)
    name_ru = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255)
    control_form_kz = models.CharField(max_length=255)
    control_form_ru = models.CharField(max_length=255)
    control_form_en = models.CharField(max_length=255)
    course_code_kz = models.CharField(max_length=255, blank=True, null=True)
    course_code_ru = models.CharField(max_length=255, blank=True, null=True)
    course_code_en = models.CharField(max_length=255, blank=True, null=True)
    cycle_component = models.ForeignKey(to='CycleComponent', on_delete=models.CASCADE, default=1)
    credits = models.IntegerField()

    def __str__(self):
        return f'{self.course_code_en} name:{self.name_en}'


class Module(models.Model):
    module_code = models.CharField(max_length=255, default='null')
    module_name_kz = models.CharField(max_length=255)
    module_name_ru = models.CharField(max_length=255)
    module_name_en = models.CharField(max_length=255)

    def __str__(self):
        return self.module_name_en


class Department(models.Model):
    dep_name_kz = models.CharField(max_length=255)
    dep_name_ru = models.CharField(max_length=255)
    dep_name_en = models.CharField(max_length=255)

    def __str__(self):
        return self.dep_name_en


class CycleComponent(models.Model):
    is_practice = models.BooleanField(default=False)
    cycle_kz = models.CharField(max_length=255,
                                choices=choices.CycleChoicesKZ.choices,
                                blank=True,
                                default='')
    cycle_ru = models.CharField(max_length=255,
                                choices=choices.CycleChoicesRU.choices,
                                blank=True,
                                default='')
    cycle_en = models.CharField(max_length=255,
                                choices=choices.CycleChoicesEN.choices,
                                blank=True,
                                default='')
    component_kz = models.CharField(max_length=255,
                                    choices=choices.ComponentChoicesKZ.choices,
                                    blank=True,
                                    default='')
    component_ru = models.CharField(max_length=255,
                                    choices=choices.ComponentChoicesRU.choices,
                                    blank=True,
                                    default='')
    component_en = models.CharField(max_length=255,
                                    choices=choices.ComponentChoicesEN.choices,
                                    blank=True,
                                    default='')

    def __str__(self):
        return f'{self.cycle_en} {self.component_en}'


class Competencies(models.Model):
    name_kz = models.CharField(max_length=255)
    name_ru = models.CharField(max_length=255)
    name_en = models.CharField(max_length=255)
    text_kz = models.TextField()
    text_ru = models.TextField()
    text_en = models.TextField()
    type = models.CharField(max_length=255,
                            choices=choices.ProfessionalCompetenciesTypeChoices.choices,
                            default='General')
    professional_competencies = models.ForeignKey(
        to='self',
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    def __str__(self):
        return f'{self.name_en}'


class SubjectToChoice(models.Model):
    subject = models.ManyToManyField(to='Subject')