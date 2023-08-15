from django.contrib.auth.models import AbstractUser
from django.db import models
from django.dispatch import receiver #add this
from django.db.models.signals import post_save #add this

class User(AbstractUser):
    # listings = models.ManyToManyField(Listing, blank=True, related_name="listings")
    pass
    

class Bid(models.Model):
    price = models.IntegerField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.author} for {self.price}"

class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, default="")

class Listing(models.Model):
    item_name = models.CharField(max_length=64)
    item_description = models.TextField(blank=True)
    starting_bid = models.IntegerField(default = 0)
    image_url = models.URLField(blank=True, max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    bids = models.ManyToManyField(Bid, blank=True, related_name="biders")
    comments = models.ManyToManyField(Comment, blank=True, related_name="commenters")

    def __str__(self):
        return f"{self.item_name}"
    
class Categories(models.Model):
    name = models.CharField(max_length=64)
    listings = models.ManyToManyField(Listing, blank=True)

    def __str__(self):
        return f"{self.name}"
    

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    watch_list = models.ManyToManyField(Listing, blank=True)

    def __str__(self):
        return f"{self.user}'s profile"


    @receiver(post_save, sender=User) #add this
    def create_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)

    @receiver(post_save, sender=User) #add this
    def save_user_profile(sender, instance, **kwargs):
        instance.profile.save()



    
