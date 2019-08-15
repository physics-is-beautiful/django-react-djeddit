from django.contrib.auth import get_user_model
from django.conf import settings

from rest_framework import serializers
from rest_framework.exceptions import ValidationError
# from rest_framework.validators import UniqueValidator

from .models import Thread, Post, Topic

# import markdown_deux


class UserSerializer(serializers.ModelSerializer):
    # def create(self, validated_data):
    #     user = get_user_model().objects.create_user(**validated_data)
    #     return user

    # TODO set REQUIRED_FIELDS

    class Meta:
        model = get_user_model()
        base_fields = ['id',
                       get_user_model().USERNAME_FIELD, get_user_model().get_email_field_name(),
                       'password',
                       'is_staff']
        fields = tuple(
            settings.DJEDDIT_USER_FIELDS + base_fields
            if hasattr(settings, 'DJEDDIT_USER_FIELDS')
            else base_fields
        )
        extra_kwargs = {'password': {'write_only': True},
                        get_user_model().get_email_field_name(): {'write_only': True}
                        }


class PostSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    # user_post_vote = serializers.IntegerField(read_only=True)
    user_vote = serializers.SerializerMethodField()
    user_can_edit = serializers.SerializerMethodField()
    user_can_delete = serializers.SerializerMethodField()

    def validate(self, data):
        if not self.instance and 'parent' in data and data['parent'] and data['parent'].deleted_on:
            raise serializers.ValidationError("Can't reply to the removed post")

        if self.instance and self.instance.deleted_on:
            if 'request' in self.context and \
                (self.context['request'].user.is_staff or self.context['request'].user.is_superuser):
                pass
            else:
                raise serializers.ValidationError("Can't edit removed post")

        return data

    def to_representation(self, obj):
        ret = super(PostSerializer, self).to_representation(obj)

        if ret['deleted_on']:
            # hide deleted content
            ret['content'] = '\\[deleted\\]'
            ret['created_by']['id'] = 0
            ret['created_by'][getattr(settings, 'DJEDDIT_DISPLAY_USERNAME_FIELD', 'username')] = '[deleted]'

        return ret

    def get_user_vote(self, obj):
        return obj.user_vote if hasattr(obj, 'user_vote') and obj.user_vote else 0

    def get_user_can_edit(self, obj):
        if 'request' in self.context:
            if self.context['request'].user.is_staff or self.context['request'].user.is_superuser:
                return True

            if self.context['request'].user == obj.created_by:
                return True

        return False

    def get_user_can_delete(self, obj):
        if 'request' in self.context:
            if self.context['request'].user.is_staff or self.context['request'].user.is_superuser:
                return True

            if self.context['request'].user == obj.created_by:
                return True

        return False

    class Meta:
        fields = ['uid', 'content', 'created_by', 'created_on', 'parent', 'modified_on', 'level', 'score',
                  'user_vote', 'user_can_edit', 'user_can_delete', 'deleted_on']
        read_only_fields = ('level', )
        model = Post


class ThreadSerializer(serializers.ModelSerializer):
    # TODO remove in the future!
    posts_in_tree_order = serializers.SerializerMethodField()
    # first post data
    content = serializers.CharField(write_only=True)
    topic_slug = serializers.CharField(write_only=True)
    posts_counter = serializers.SerializerMethodField(read_only=True)
    op = PostSerializer(required=False)

    def get_posts_counter(self, obj):
        return obj.op.get_descendant_count()

    # TODO remove in the future!
    def get_posts_in_tree_order(self, obj):
        posts_list = obj.op.get_descendants(include_self=True).select_related('created_by')
        # djeddit have one root post due 'op = models.ForeignKey('Post')' field
        serializer = PostSerializer(posts_list, many=True)
        return serializer.data

    def create(self, validated_data):
        # GET Topic
        topic_slug = validated_data.pop('topic_slug', None)
        try:
            topic = Topic.objects.get(slug=topic_slug)
        except Topic.DoesNotExist:
            raise ValidationError('Topic not found')

        content = validated_data.pop('content', None)

        # CREATE Post
        post_serializer = PostSerializer(data={'content': content})

        if post_serializer.is_valid(raise_exception=True):
            post = post_serializer.save(created_by=self.context['request'].user)

        validated_data['op'] = post
        validated_data['topic'] = topic

        # CREATE Thread
        thread = super().create(validated_data)

        return thread

    class Meta:
        model = Thread
        # fields = ['title', 'id','slug', 'views', 'posts_in_tree_order', 'content', 'topic_slug', 'op']
        fields = ['title', 'posts_counter', 'id', 'slug', 'views', 'content', 'topic_slug', 'op', 'posts_in_tree_order']
        read_only_fields = ('slug', 'posts_in_tree_order', 'views', 'id')


class TopicsSerializer(serializers.ModelSerializer):
    threads_counter = serializers.SerializerMethodField(read_only=True)

    def get_threads_counter(self, obj):
        return obj.thread.count()

    class Meta:
        model = Topic
        fields = ['title', 'slug', 'description', 'threads_counter']



