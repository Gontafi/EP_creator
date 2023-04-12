from django.contrib import admin

from . import models

admin.site.register(models.Subject)
admin.site.register(models.Module)
admin.site.register(models.Competencies)
admin.site.register(models.CycleComponent)
admin.site.register(models.Department)
admin.site.register(models.SubjectToChoice)