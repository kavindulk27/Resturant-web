from rest_framework import serializers
from .models import StockCategory, StockItem

class StockCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StockCategory
        fields = '__all__'

class StockItemSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')

    class Meta:
        model = StockItem
        fields = '__all__'
