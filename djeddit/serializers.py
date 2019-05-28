from django.contrib.auth import get_user_model
from django.conf import settings

from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from rest_framework.validators import UniqueValidator

from .models import Thread, Post, Topic

# import markdown_deux


class UserSerializer(serializers.ModelSerializer):
    # def create(self, validated_data):
    #     user = get_user_model().objects.create_user(**validated_data)
    #     return user

    # TODO set REQUIRED_FIELDS

    class Meta:
        model = get_user_model()
        fields = tuple(
            ['id', get_user_model().USERNAME_FIELD, get_user_model().get_email_field_name(), 'password']
            + settings.DJEDDIT_USER_FIELDS if settings.DJEDDIT_USER_FIELDS else [])
        extra_kwargs = {'password': {'write_only': True},
                        get_user_model().get_email_field_name(): {'write_only': True}
                        }


class PostSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)

    class Meta:
        fields = ['uid', 'content', 'created_by', 'created_on', 'parent', 'modified_on', 'level', 'score']
        read_only_fields = ('level')
        model = Post


class ThreadSerializer(serializers.ModelSerializer):
    # posts_in_tree_order = serializers.SerializerMethodField()
    # first post data
    content = serializers.CharField(write_only=True)
    topic_slug = serializers.CharField(write_only=True)
    op = PostSerializer(required=False)

    # def get_posts_in_tree_order(self, obj):
    #     posts_list = obj.op.get_descendants(include_self=True).select_related('created_by')
    #     # djeddit have one root post due 'op = models.ForeignKey('Post')' field
    #     serializer = PostSerializer(posts_list, many=True)
    #     return serializer.data

    def create(self, validated_data):
        # GET Topic
        topic_slug = validated_data.pop('topic_slug', None)
        try:
            topic = Topic.objects.get(slug=topic_slug)
        except Topic.DoesNotExist:
            raise ValidationError('Topic not found')

        content = validated_data.pop('content', None)

        # CREATE Post
        post_serializer = PostSerializer(data={'content': content, 'created_by': self.context['request'].user.id})

        if post_serializer.is_valid(raise_exception=True):
            post = post_serializer.save()

        validated_data['op'] = post
        validated_data['topic'] = topic

        # CREATE Thread
        thread = super().create(validated_data)

        return thread

    class Meta:
        model = Thread
        # fields = ['title', 'id','slug', 'views', 'posts_in_tree_order', 'content', 'topic_slug', 'op']
        fields = ['title', 'id', 'slug', 'views', 'content', 'topic_slug', 'op']
        read_only_fields = ('slug', 'posts_in_tree_order', 'views', 'id')


class TopicsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = ['title', 'slug', 'description']



