from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/menu/', include('menu.urls')),
    path('api/bookings/', include('bookings.urls')),
    path('api/stock/', include('stock.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/orders/', include('orders.urls')),
    path('api/payments/', include('payments.urls')),
]
