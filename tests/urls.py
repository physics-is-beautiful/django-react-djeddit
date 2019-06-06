# -*- coding: utf-8
from __future__ import unicode_literals, absolute_import

from django.conf.urls import url, include
from django.conf import settings

from djeddit.urls import urlpatterns as djeddit_urls
from djeddit.urls_api import urlpatterns as djeddit_urls_api

from django.contrib.sitemaps.views import sitemap
from django.contrib.staticfiles.views import serve

from django.views.decorators.csrf import ensure_csrf_cookie

from django.views.generic.base import RedirectView

from djeddit.sitemaps import ThreadSitemap

sitemaps = {
    'djeddit': ThreadSitemap
}

# from django.views.generic.base import TemplateView

urlpatterns = [
    # url(r'^', include(djeddit_urls)),
    url(r'^api/v1/', include(djeddit_urls_api)),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    url(r'^$', serve, {
        'path': 'index.html',
    }),
    # exclude url with dot (files extension)
    url(r'^[^.]*$', ensure_csrf_cookie(serve), {
         'path': 'index.html',
     }),
    url(r'^(?P<path>.*)$', serve,  {}),
]
