# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2018-12-18 11:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djeddit', '0009_auto_20181210_1810'),
    ]

    operations = [
        migrations.AlterField(
            model_name='thread',
            name='title',
            field=models.CharField(max_length=200),
        ),
    ]
