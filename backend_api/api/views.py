from django.shortcuts import render
from django.http import JsonResponse
from api.models import User, Profile
from .serializer import UserSerializer, ProfileSerializer
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer
from .models import Profile
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
import logging

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulations {request.user}, your API just responded to a GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulations, your API just responded to a POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

logger = logging.getLogger(__name__)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    profile = user.profile

    if request.method == 'PUT':
        logger.debug(f"Updating profile for user: {user.username}")
        profile_serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if profile_serializer.is_valid():
            profile_serializer.save()
            user_serializer = UserSerializer(user, context={'request': request}, partial=True)
            logger.debug(f"Updated profile data: {user_serializer.data}")
            return Response(user_serializer.data)
        logger.error(f"Profile update failed with errors: {profile_serializer.errors}")
        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
