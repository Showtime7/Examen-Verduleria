from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import LoginForm, RegisterForm
from .models import UserProfile, Producto

def index(request):
    return render(request, 'index.html')

def contacto(request):
    return render(request, 'contacto.html')

def conocenos(request):
    return render(request, 'conocenos.html')

def zonadespacho(request):
    return render(request, 'zonadespacho.html')

def pedidos(request):
    return render(request, 'pedidos.html')

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('index')

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password1'])
            user.save()
            birth_date = form.cleaned_data['birth_date']
            phone_number = form.cleaned_data['phone_number']
            UserProfile.objects.create(user=user, birth_date=birth_date, phone_number=phone_number)
            messages.success(request, 'Registro realizado con éxito.')
            login(request, user)
            return redirect('index')
        else:
            messages.error(request, 'Faltó rellenar uno o más campos.')
    else:
        form = RegisterForm()
    return render(request, 'register.html', {'form': form})

def lista_productos(request):
    productos_predefinidos = [
        {
            'nombre': 'ZANAHORÍA',
            'descripcion': 'Zanahoria bolsa 1 kg Código: 1473035',
            'precio': '1190',
            'imagen': 'Assets/Productos/zanahoria.jpg',
        },
        {
            'nombre': 'TOMATE LIMACHE',
            'descripcion': 'Tomate Limachino (2 un. aprox) Código: 261275',
            'precio': '990',
            'imagen': 'Assets/Productos/tomate.jpg',
        },
        {
            'nombre': 'MALLA DE PAPAS',
            'descripcion': 'Papa malla 2 kg Código: 261044',
            'precio': '3000',
            'imagen': 'Assets/Productos/papas.jpg',
        },
        {
            'nombre': 'NARANJAS',
            'descripcion': 'Naranja (3 un. aprox) Código: 260990',
            'precio': '1500',
            'imagen': 'Assets/Productos/naranja.jpg',
        },
        {
            'nombre': 'LECHUGA COSTINA',
            'descripcion': 'Lechuga costina un. Código: 260783',
            'precio': '1100',
            'imagen': 'Assets/Productos/LechugaCostina.jpg',
        },
        {
            'nombre': 'CEBOLLA',
            'descripcion': 'Cebolla malla 3 un. Código: 260574',
            'precio': '1600',
            'imagen': 'Assets/Productos/cebolla.jpg',
        },
    ]

    productos_db = Producto.objects.all()
    return render(request, 'producto.html', {'productos_predefinidos': productos_predefinidos, 'productos_db': productos_db})
