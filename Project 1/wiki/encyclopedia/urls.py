from django.urls import path
from . import views

# app_name = "encyclopedia"
urlpatterns = [
    path("", views.index, name="index"),
    path("<str:title>", views.wiki, name="wiki"),
    path("random/", views.randomPage, name="random"),
    path("search/", views.search, name="search"),
    path("new/", views.new, name="new"),
    path("error/", views.error, name="error"),
    path("edit/", views.edit, name="edit"),
]
