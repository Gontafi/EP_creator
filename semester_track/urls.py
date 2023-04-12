from django.urls import include, path
from rest_framework.routers import DefaultRouter

from semester_track import views


router = DefaultRouter()

router.register(r'educational-program', views.EducationalProgramViewSet)
router.register(r'semester', views.SemesterViewSet)

urlpatterns = [
     path(r'', include(router.urls)),
]


