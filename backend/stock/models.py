from django.db import models

class StockCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class StockItem(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=50)
    threshold = models.IntegerField()
    category = models.ForeignKey(StockCategory, on_delete=models.CASCADE, related_name='items')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
