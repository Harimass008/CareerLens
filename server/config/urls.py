from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from tracker.views import RegisterView, ProfileView, DashboardView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/register/", RegisterView.as_view(), name="register"),
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/auth/profile/", ProfileView.as_view(), name="profile"),
    path("api/dashboard/", DashboardView.as_view(), name="dashboard"),
    path("api/applications/", include("tracker.urls")),
]
