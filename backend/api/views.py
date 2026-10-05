from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view;
from rest_framework.response import Response;

@api_view(['GET'])
def greet (request):
    name = request.query_params.get('name', '').strip()
    if not name:
        name = 'World'
    return Response({'message': f'Hello, {name}'})
