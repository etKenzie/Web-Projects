from django.contrib import admin
from .models import *

# Register your models here.
class ListingAdmin(admin.ModelAdmin):
    list_display = ("id","item_name", "starting_bid", "author")

class BidAdmin(admin.ModelAdmin):
    list_display = ("id","price", "author")

class ProfileAdmin(admin.ModelAdmin):
    filter_horizontal = ("watch_list",)

class CategoryAdmin(admin.ModelAdmin):
    filter_horizontal = ("listings",)



admin.site.register(User)
admin.site.register(Categories, CategoryAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(Listing, ListingAdmin)
admin.site.register(Bid, BidAdmin)
