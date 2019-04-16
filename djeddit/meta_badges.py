from django.dispatch import receiver

try:
    from notifications.signals import notify
except ImportError:
    notify = None

try:
    from badges.utils import MetaBadge
    from badges.signals import badge_awarded
except ImportError:
    badge_awarded = None
    MetaBadge = None

from .models import Post


if MetaBadge:
    class FirstPost(MetaBadge):
        id = "first-post"
        model = Post
        one_time_only = True

        title = "First Post"
        description = "First post in discussion"
        level = "1"
        # ("1", "Bronze"),
        # ("2", "Silver"),
        # ("3", "Gold"),
        # ("4", "Diamond"),

        def check_first_post(self, instance):
            self.instance = instance
            return 1

        def get_user(self, instance):
            return instance.created_by


if notify:
    @receiver(badge_awarded)
    def send_notify(sender, user, badge, **kwargs):
        target = None

        if hasattr(sender, 'instance'):  # djeedit Post
            target = sender.instance.thread

        # Activity Streams Spec
        # user (actor) earned the (verb) badge (action_object) on thread (target)
        notify.send(user, recipient=user,
                    verb='earned the',
                    target=target,
                    action_object=badge)



