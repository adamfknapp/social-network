import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator

from .models import User, Post, Like


def index(request):

    # Authenticated users view their inbox
    if request.user.is_authenticated:
        return render(request, "network/index.html")

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


def following(request):

    # Authenticated users view the following page
    if request.user.is_authenticated:
        return render(request, "network/following.html")

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

@csrf_exempt
@login_required
def newPost(request):
    
    # Compose must be a post message
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    data = json.loads(request.body)
    post = Post(
        author = request.user,
        content = data.get("content", "")
        )
    post.save()
    return JsonResponse({"message": "Post successfull."}, status=201)


@login_required
def getPosts(request, filter):
    """
    return requiered Posts based on filter. 
    Three filter options are availible
    all_posts, user_only, following_only

    must paginate in groups of 10
    """

    items_per_page = 10

    if filter == 'all_posts':
        posts = Like.objects.select_related(
        )
        #likes = Like.objects.all()
        #print(likes)
    elif filter =='user_only':
        posts = Post.objects.filter(
            author=request.user
        )
    # elif filter =='following_only':
    #     # revise to:
    #     # 1- determine who the current user is following
    #     # 2- filter by those users 
    #     posts = Post.objects.filter(
    #         author=request.user
    #     )  
    else:
        return JsonResponse({"error": "Invalid filter."}, status=400)      

    
    #paginate results

    # Return emails in reverse chronologial order
    #emails = emails.order_by("-timestamp").all()
    #return JsonResponse([email.serialize() for email in emails], safe=False)
    #page_data = 
    #user=request.user, recipients=request.user, archived=False
    print(posts)
    return JsonResponse(list(posts.values()), safe=False)