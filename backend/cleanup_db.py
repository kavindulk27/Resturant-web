import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from menu.models import MenuItem

# Mapping of names/categories to images if they are null
IMAGE_MAP = {
    'Burgers': 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Pizza': 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Salads': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
}

# Delete "kottu" as it looks like trash data
MenuItem.objects.filter(name='kottu').delete()

items = MenuItem.objects.filter(image__isnull=True) | MenuItem.objects.filter(image='')
for item in items:
    new_image = IMAGE_MAP.get(item.category, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')
    item.image = new_image
    item.save()
    print(f"Updated image for: {item.name}")

print("Database cleanup complete.")
