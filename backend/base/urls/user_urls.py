from django.urls import path
from ..views import user_views as views


urlpatterns = [
    path('login', views.MyTokenObtainPairView.as_view(), name='login'),
    path('register', views.registerUser, name='register'),
    path('profile', views.getUserProfile, name='get_user_profile'),
    path('', views.getUsers, name='users'),
]
