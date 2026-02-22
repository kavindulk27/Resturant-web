import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from menu.models import MenuItem

items = MenuItem.objects.all()
print(f"Total Menu Items in Database: {items.count()}")
for item in items:
    print(f"- {item.name}: {item.image}")
