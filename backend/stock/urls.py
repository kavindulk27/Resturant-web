from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StockCategoryViewSet, StockItemViewSet

router = DefaultRouter()
router.register(r'categories', StockCategoryViewSet)
router.register(r'items', StockItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
