from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_swagger.views import get_swagger_view
from django.views.generic import TemplateView


schema_view = get_swagger_view(title='User API')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path(r'api/', include('api_op.urls.v1')),
    path(r'semester/api/', include('semester_track.urls')),
    path(r'semester-api/', include('semester_track.urls')),
    path('', include('frontend.urls')),
    path('s/', schema_view),
    re_path(r'^.*', TemplateView.as_view(template_name='frontend/index.html')),
]
