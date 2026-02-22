from rest_framework import viewsets
from .models import StockCategory, StockItem
from .serializers import StockCategorySerializer, StockItemSerializer

class StockCategoryViewSet(viewsets.ModelViewSet):
    queryset = StockCategory.objects.all()
    serializer_class = StockCategorySerializer

class StockItemViewSet(viewsets.ModelViewSet):
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer
