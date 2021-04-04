from django.contrib.auth.models import AbstractUser
from django.db import models

# See: https://books.agiliq.com/projects/django-orm-cookbook/en/
#              latest/many_to_many.html
class User(AbstractUser):
    #post = models.ManyToManyField('User', blank=True)
    following = models.ManyToManyField('User', related_name='followers')
    pass


class post(models.Model):
    author = models.IntegerField()
    body = models.TextField()
    crt_dt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"user: {self.author} | post: {self.post}"


class likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name="likes")
    liked_post =  models.ForeignKey(post, on_delete=models.CASCADE,
                                related_name="likes") 
    crt_dt = models.DateTimeField(auto_now_add=True)
  
    def __str__(self):
        return f"user: {self.user} | liked_post: {self.liked_post}"
