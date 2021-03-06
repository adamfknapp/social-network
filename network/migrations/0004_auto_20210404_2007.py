# Generated by Django 3.1.6 on 2021-04-04 20:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_auto_20210404_2005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='like',
            name='liked_post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Likes', to='network.post'),
        ),
        migrations.AlterField(
            model_name='like',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Likes', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='post',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Posts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='user',
            name='following',
            field=models.ManyToManyField(related_name='Followers', to=settings.AUTH_USER_MODEL),
        ),
    ]
