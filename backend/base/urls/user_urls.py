from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='login'),
    path('register/', views.registerUser, name='register'),
    path('profile/', views.getUserProfile, name='get_user_profile'),
    path('profile/update/', views.updateUserProfile, name='update_user_profile'),
    path('', views.getUsers, name='users'),
    path('<str:pk>/', views.getUserById, name='get_user_by_id'),
    path('update/<str:pk>/', views.updateUserById, name='update_user_by_id'),
    path('delete/<str:pk>/', views.deleteUser, name='delete_user'),

]
