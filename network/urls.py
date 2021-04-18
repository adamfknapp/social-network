
from django.urls import include, path, re_path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("following", views.following, name="following"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    # API Routes
    path("Post", views.newPost, name="newPost"),
    path("Posts", views.getPosts, name="getPosts")
    #re_path(r'^Posts$', views.getPosts, name="getPosts")
]
