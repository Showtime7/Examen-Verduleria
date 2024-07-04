from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import LoginForm, RegisterForm
from .models import UserProfile

def index(request):
    return render(request, 'index.html')

def producto(request):
    return render(request, 'producto.html')

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
            password = form.cleaned_data.get('password')
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
