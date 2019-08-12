from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions, mixins
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied

from django_filters import rest_framework as filters

from .permissions import EditDeleteByOwnerOrStaff
from .models import Thread, Post, Topic, UserPostVote
from .serializers import ThreadSerializer, PostSerializer, UserSerializer, TopicsSerializer

try:
    from notifications.signals import notify
except ImportError:
    notify = None


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10  # TODO get it from the project settings


class TopicsViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = TopicsSerializer
    queryset = Topic.objects.all()
    pagination_class = StandardResultsSetPagination
    lookup_field = 'slug'


class ThreadViewSet(ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = ThreadSerializer
    queryset = Thread.objects.all()
    pagination_class = StandardResultsSetPagination
    lookup_field = 'id'
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_fields = ('topic__slug',)


class ThreadCommentsFilter(filters.FilterSet):
    thread_id = filters.NumberFilter(
        field_name='thread_id',
        method='thread_filter',
    )

    def thread_filter(self, queryset, name, value):
        try:
            thread = Thread.objects.get(id=value)
        except Thread.DoesNotExist:
            raise NotFound('Thread not found')

        return thread.op.get_descendants(include_self=True).select_related('created_by')

    class Meta:
        model = Post
        fields = ['thread_id', ]


class UserViewSet(ModelViewSet):
    # TODO add permissions
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = UserSerializer
    queryset = get_user_model().objects.all()
    pagination_class = StandardResultsSetPagination
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
                  mixins.ListModelMixin,
                  mixins.DestroyModelMixin,
                  GenericViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, EditDeleteByOwnerOrStaff)
    serializer_class = PostSerializer
    # queryset = Post.objects.select_related('created_by__profile').all()
    queryset = Post.objects.all()
    pagination_class = StandardResultsSetPagination
    lookup_field = 'uid'
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ThreadCommentsFilter
    # filterset_fields = ('thread',)

    def perform_create(self, serializer):
        post = serializer.save(created_by=self.request.user)
        if notify and post.parent and post.parent.level > 0:
            if self.request.user != post.parent.created_by:
                notify.send(self.request.user, recipient=post.parent.created_by,
                            verb='replied to your comment in thread',
                            target=post.parent.thread, action_object=post)

    @action(methods=['POST'],
            detail=True, )
    def vote(self, request, *args, **kwargs):
        if request.user.is_anonymous():
            raise PermissionDenied

        try:
            vote = request.data['vote']
        except KeyError:
            raise ValidationError

        if vote not in (1, -1):
            raise ValidationError

        post = self.get_object()

        try:
            user_post_vote = UserPostVote.objects.get(user=request.user, post=post)
            user_post_vote.val = max(min(int(vote), 1), -1)
            user_post_vote.save()
        except UserPostVote.DoesNotExist:
            UserPostVote.objects.create(user=request.user, post=post, val=max(min(int(vote), 1), -1))

        # recalculate post votes
        post.upvotes = UserPostVote.objects.filter(post=post, val=1).count()
        post.downvotes = UserPostVote.objects.filter(post=post, val=-1).count()
        post.save(update_fields=['_upvotes', '_downvotes'])
        post.refresh_from_db()  # fix for reload modified_on date

        # return new post instance
        serializer = self.get_serializer(post)
        return Response(serializer.data)




