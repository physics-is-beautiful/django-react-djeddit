from rest_framework import permissions


class EditDeleteByOwnerOrStaff(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user.is_staff or request.user.is_superuser:
            return True

        if request.method in ['PATCH', 'DELETE', 'PUT']:
            if request.user == obj.created_by:
                return True
            return False
        else:
            return True
