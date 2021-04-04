from django.contrib.auth.models import AbstractUser
from django.db import models

# See: https://books.agiliq.com/projects/django-orm-cookbook/en/
#              latest/many_to_many.html
class User(AbstractUser):
    #post = models.ManyToManyField('User', blank=True)
    following = models.ManyToManyField('User', related_name='Followers', blank=True)
    pass


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name="Posts")
    body = models.TextField()
    crt_dt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"user: {self.author} | body: {self.body}"


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name="Likes")
    liked_post =  models.ForeignKey(Post, on_delete=models.CASCADE,
                                related_name="Likes") 
    crt_dt = models.DateTimeField(auto_now_add=True)
  
    def __str__(self):
        return f"user: {self.user} | liked_post: {self.liked_post}"
