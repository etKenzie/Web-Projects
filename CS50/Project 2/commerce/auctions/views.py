from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from .models import *
from django import forms


from .models import User


def index(request):
    return render(request, "auctions/index.html", {
        "listings": Listing.objects.all()
    })

def watchlist(request):
    user_profile = Profile.objects.get(user=request.user)
    return render(request, "auctions/index.html", {
        "listings": user_profile.watch_list.all()
    })


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
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


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
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")

class BidForm(forms.Form):
    bid = forms.IntegerField(label='')

class CommentForm(forms.Form):
    content = forms.CharField(
            widget = forms.Textarea(attrs={
                "rows": 1,  # Number of visible rows in the textarea
                "placeholder": "Enter your comment here...",  # Placeholder text
            }),label=""
    )

def listing(request, listing_id):
    listing = Listing.objects.get(id=listing_id)
    bids = listing.bids.all()
    cur_price = 0
    leading = ""
    user_profile = None

    for bid in bids:
        if bid.price > cur_price:
            cur_price = bid.price
            leading = bid.author

    if request.user.is_authenticated:
        user_profile = Profile.objects.get(user=request.user)

    if request.method == "POST":
        if 'add_to_watchlist' in request.POST:
            user_profile.watch_list.add(listing)
        if 'remove_from_watchlist' in request.POST:
            user_profile.watch_list.remove(listing)
        if 'delete_listing' in request.POST:
            listing.delete()
            return HttpResponseRedirect(reverse("index"))
        
        comment = CommentForm(request.POST)
        if comment.is_valid():
            content = comment.cleaned_data['content']
            new_comment = Comment(content=content, author=request.user)
            new_comment.save()
            listing.comments.add(new_comment)

        form = BidForm(request.POST)
        if form.is_valid():
            price = form.cleaned_data['bid']
            if (price > cur_price) and (price >= listing.starting_bid):
                new_bid = Bid(price=price,author = request.user)
                new_bid.save()
                listing.bids.add(new_bid)
                return(HttpResponseRedirect(reverse("listing", kwargs={"listing_id": listing_id})))
            else:
                return render(request, "auctions/listing.html", {
                    "listing": listing,
                    "bid": BidForm(),
                    "price": cur_price,
                    "leading": leading,
                    "error": "Bid too small",
                    "nobids": len(bids),
                    "profile": user_profile,
                    "comments": listing.comments.all()
                })  


    return render(request, "auctions/listing.html", {
        "listing": listing,
        "bid": BidForm(),
        "comment": CommentForm(),
        "price": cur_price,
        "leading": leading,
        "nobids": len(bids),
        "profile": user_profile,
        "comments": listing.comments.all()
    })

class ListingForm(forms.Form):
    item_name = forms.CharField()
    item_description = forms.CharField(
            widget = forms.Textarea(attrs={
                "rows": 8,  # Number of visible rows in the textarea
                "placeholder": "Enter your description here...",  # Placeholder text
            }), required=False
    )
    starting_bid = forms.IntegerField()
    image_url = forms.URLField(required=False)


def create(request):
    if request.method == "POST":
        form = ListingForm(request.POST)
        if form.is_valid():
            item_name = form.cleaned_data['item_name']
            item_description = form.cleaned_data['item_description']
            starting_bid = form.cleaned_data['starting_bid']
            image_url = form.cleaned_data['image_url']
            
            new_listing = Listing(item_name=item_name, 
                                  item_description=item_description,
                                  starting_bid=starting_bid,
                                  image_url=image_url,
                                  author = request.user)
            new_listing.save()

            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/create.html", {
                "form": form,
            })

    return render(request, "auctions/create.html",{
        "form": ListingForm()
    })

def categories(request):
     return render(request, "auctions/categories.html",{
        "categories": Categories.objects.all()
    })

def category(request, category_id):
    category = Categories.objects.get(id=category_id)
    return render(request, "auctions/index.html",{
        "listings": category.listings.all(),
        "category": category
    })
