from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime

# See: 
#    - https://books.agiliq.com/projects/django-orm-cookbook/en/
#              latest/many_to_many.html
#    - https://simpleisbetterthancomplex.com/tutorial/2016/07/22/
#               how-to-extend-django-user-model.html#abstractuser 
#    - https://learndjango.com/tutorials/django-custom-user-model 
class User(AbstractUser):
    pass
    following = models.ManyToManyField('User', related_name='Followers', blank=True)
    

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name="Posts")
    content = models.TextField()
    crt_dt = models.DateTimeField(auto_now_add=True)

    def num_likes(self):
        return self.Likes.count()

    def serialize(self):
        return {
            'id': self.id,
            'author': self.author.username,
            'content': self.content,
            'likes': self.Likes.count(),
            'crt_dt': self.crt_dt.strftime('%m/%d/%Y')
        }

    def __str__(self):
        return f"id: {self.id} | user: {self.author} | content: {self.content}"


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                                related_name="Likes")
    liked_post =  models.ForeignKey(Post, on_delete=models.CASCADE,
                                related_name="Likes") 
    crt_dt = models.DateTimeField(auto_now_add=True)
  
    def __str__(self):
        return f"id: {self.id} | user: {self.user} "
