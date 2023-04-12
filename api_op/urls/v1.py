from django.urls import include, path
from rest_framework.routers import DefaultRouter

from api_op import views


router = DefaultRouter()

router.register(r'subject', views.SubjectViewSet)
router.register(r'subject-all', views.SubjectAllViewSet)
router.register(r'module', views.ModuleViewSet)
router.register(r'module-all', views.ModuleAllViewSet)
router.register(r'department', views.DepartmentViewSet)
router.register(r'competencies', views.CompetenciesViewSet)
router.register(r'cycle-component', views.CycleComponentViewSet)
router.register(r'subject-to-choice', views.SubjectToChoiceViewSet)

urlpatterns = [
     path(r'', include(router.urls)),
]
