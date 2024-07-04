from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('producto/', views.producto, name='producto'),
    path('contacto/', views.contacto, name='contacto'),
    path('conocenos/', views.conocenos, name='conocenos'),
    path('zonadespacho/', views.zonadespacho, name='zonadespacho'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('register/', views.register_view, name='register'),
    path('pedidos/', views.pedidos, name='pedidos'),
]
