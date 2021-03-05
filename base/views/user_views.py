from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from ..serializers import UserSerializer, UserSerializerWithToken
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        message = {'detail': 'user with this email already exists'}
        return Response(message, status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def getUserProfile(request):
    # this is token data not authenticated user object
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def updateUserProfile(request):
    # this is token data not authenticated user object
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    user.first_name = data['name']
    user.email = data['email']
    user.username = data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def getUsers(request):
    # this is token data not authenticated user object
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([permissions.IsAdminUser])
def deleteUser(request, pk):
    # this is token data not authenticated user object
    userToDelete = User.objects.get(id=pk)
    userToDelete.delete()
    return Response('User Deleted')


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def getUserById(request, pk):
    # this is token data not authenticated user object
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def updateUserById(request, pk):
    print('---update by id----')
    # this is token data not authenticated user object
    user = User.objects.get(id=pk)

    data = request.data

    user.first_name = data['name']
    user.email = data['email']
    user.username = data['email']
    user.is_staff = data['isAdmin']

    user.save()

    serializer = UserSerializer(user, many=False)
    print("----Serialized---")
    return Response(serializer.data)
