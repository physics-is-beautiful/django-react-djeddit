from django.conf import settings

from rest_framework import routers

from .apis import ThreadViewSet, PostViewSet


router = routers.DefaultRouter()
router.register(r'threads', ThreadViewSet, base_name='threads')
router.register(r'posts', PostViewSet, base_name='posts')

if settings.DJEDDIT_USE_INTERNAL_USER:
    from .apis import UserViewSet
    router.register(r'users', UserViewSet, base_name='users')

# todo import users api if embed

urlpatterns = router.urls

