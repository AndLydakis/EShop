from django.shortcuts import render

from ..models import Product, Order, OrderItem, ShippingAddress
from ..serializers import ProductSerializer, OrderSerializer

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response


@api_view(['POST'])
@permission_classes(['IsAuthenticated'])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']
    if orderItems and (len(orderItems) == 0):
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)

    # Create Order
    order = Order.objects.create(
        user=user,
        paymentMethod=data['paymentMethod'],
        taxPrice=data['taxPrice'],
        shippingPrice=data['shippingPrice'],
        totalPrice=data['totalPrice'],
    )
    # Create Shipping Address
    shippingAddress = ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        postalCode=data['shippingAddress']['postalCode'],
        country=data['shippingAddress']['country']
    )
    # Loop through order items
    for i in order.items:
        product = Product.objects.get(_id=i['product'])
        item = OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            qty=i['qty'],
            price=i['price'],
            image=product.image.url
        )
        # Adjust stock
        product.countInStock -= item.qty
        product.save()
    serializer = OrderSerializer(order, many=True)
    return Response(serializer.data)
