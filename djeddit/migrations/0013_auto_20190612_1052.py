# -*- coding: utf-8 -*-
# Generated by Django 1.11.20 on 2019-06-12 07:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('djeddit', '0012_auto_20190217_1010'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='level',
            field=models.PositiveIntegerField(editable=False),
        ),
        migrations.AlterField(
            model_name='post',
            name='lft',
            field=models.PositiveIntegerField(editable=False),
        ),
        migrations.AlterField(
            model_name='post',
            name='rght',
            field=models.PositiveIntegerField(editable=False),
        ),
    ]