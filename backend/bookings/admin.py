from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('customer_name', 'date', 'time', 'guests', 'status')
    list_filter = ('date', 'status')
    search_fields = ('customer_name', 'email', 'phone')
    ordering = ('-date', '-time')
