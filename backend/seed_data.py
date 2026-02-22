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
        {'name': 'Gourmet Burger', 'description': 'Juicy beef patty with fresh vegetables and signature sauce', 'price': 14.99, 'category': 'Burgers', 'available': True},
        {'name': 'Margherita Pizza', 'description': 'Classic tomato and mozzarella with fresh basil', 'price': 12.99, 'category': 'Pizza', 'available': True},
        {'name': 'Caesar Salad', 'description': 'Crisp romaine lettuce with parmesan and croutons', 'price': 9.99, 'category': 'Salads', 'available': True},
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
