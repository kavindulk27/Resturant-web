from django.contrib import admin
from .models import StockCategory, StockItem

@admin.register(StockCategory)
class StockCategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(StockItem)
class StockItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'quantity', 'unit', 'threshold')
    list_filter = ('category',)
    search_fields = ('name',)
