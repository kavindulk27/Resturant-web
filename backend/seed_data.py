import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from menu.models import MenuItem
from stock.models import StockCategory, StockItem
from bookings.models import Booking
from orders.models import Order, OrderItem
from datetime import date, time

def seed_data():
    # Seed Menu
    menu_items = [
        {
            'name': 'Black Truffle Burger',
            'description': 'Aged wagyu beef, black truffle aioli, gruyère cheese, and caramelized onions on a brioche bun.',
            'price': 24.99,
            'category': 'Burgers',
            'image': 'https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'available': True
        },
        {
            'name': 'Lobster Thermidor Pizza',
            'description': 'Creamy thermidor sauce, fresh lobster chunks, tarragon, and melted provolone.',
            'price': 32.50,
            'category': 'Pizza',
            'image': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'available': True
        },
        {
            'name': 'Saffron Seafood Risotto',
            'description': 'Arborio rice infused with premium saffron, tiger prawns, scallops, and blue mussels.',
            'price': 28.99,
            'category': 'Main Course',
            'image': 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'available': True
        },
        {
            'name': 'Golden Tomahawk Steak',
            'description': 'Dry-aged 45 days, 40oz tomahawk steak, served with bone marrow butter.',
            'price': 85.00,
            'category': 'Steaks',
            'image': 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'available': True
        },
        {
            'name': 'Burrata & Heirloom Salad',
            'description': 'Creamy burrata, colorful heirloom tomatoes, aged balsamic, and pine nut pesto.',
            'price': 18.99,
            'category': 'Salads',
            'image': 'https://images.unsplash.com/photo-1608897013039-887f3975302d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'available': True
        },
        {
            'name': 'Matcha Lava Cake',
            'description': 'Warm ceremonial grade matcha centers, white chocolate, and black sesame gelato.',
            'price': 12.99,
            'category': 'Desserts',
            'image': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'available': True
        },
    ]
    for item in menu_items:
        MenuItem.objects.get_or_create(**item)

    # Seed Stock
    bakery, _ = StockCategory.objects.get_or_create(name='Bakery')
    meat, _ = StockCategory.objects.get_or_create(name='Meat')
    
    StockItem.objects.get_or_create(name='Burger Buns', quantity=150, unit='pcs', threshold=50, category=bakery)
    StockItem.objects.get_or_create(name='Beef Patties', quantity=80, unit='pcs', threshold=40, category=meat)

    # Seed Bookings
    Booking.objects.get_or_create(
        customer_name='John Doe',
        phone='1234567890',
        email='john@example.com',
        date=date(2026, 3, 1),
        time=time(18, 0),
        guests=2,
        status='confirmed'
    )

    # Seed Orders
    order, _ = Order.objects.get_or_create(
        customer_name='Jane Smith',
        phone='0987654321',
        address='123 Main St',
        delivery_method='delivery',
        payment_method='card',
        subtotal=27.98,
        delivery_fee=5.00,
        total=32.98,
        status='pending'
    )
    OrderItem.objects.get_or_create(order=order, name='Margherita Pizza', price=12.99, quantity=2)

    print("Data seeded successfully!")

if __name__ == '__main__':
    seed_data()
