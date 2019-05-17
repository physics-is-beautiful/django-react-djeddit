from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions, mixins
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound

from .permissions import EditDeleteByOwnerOrStaff
from .models import Thread, Post, Topic
from .serializers import ThreadSerializer, PostSerializer, UserSerializer, TopicsSerializer

try:
    from notifications.signals import notify
except ImportError:
    notify = None


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  # TODO get it from the project settings


class ThreadViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    lookup_field = 'id'


class TopicsViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = TopicsSerializer
    queryset = Topic.objects.all()
    lookup_field = 'id'


class UserViewSet(ModelViewSet):
    # TODO add permissions
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()
    lookup_field = 'id'

    @action(methods=['GET'],
            detail=False, )
    def me(self, request, *args, **kwargs):
        if request.user.is_anonymous():
            raise NotFound
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class PostViewSet(mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  GenericViewSet):
    permission_classes = (permissions.IsAuthenticated, EditDeleteByOwnerOrStaff)
    serializer_class = PostSerializer
    queryset = Post.objects.select_related('created_by__profile').all()
    lookup_field = 'uid'

    def perform_create(self, serializer):
        post = serializer.save(created_by=self.request.user)
        if notify and post.parent and post.parent.level > 0:
            if self.request.user != post.parent.created_by:
                notify.send(self.request.user, recipient=post.parent.created_by,
                            verb='replied to your comment in thread',
                            target=post.parent.thread, action_object=post)




