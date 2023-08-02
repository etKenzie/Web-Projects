from django.shortcuts import render
from . import util
import markdown2
import random
from django import forms
from django.http import HttpResponseRedirect
from django.urls import reverse
import os


class CreateForm(forms.Form):
    title = forms.CharField()
    content = forms.CharField(
            widget = forms.Textarea(attrs={
                "rows": 8,  # Number of visible rows in the textarea
                "placeholder": "Enter your MarkDown here...",  # Placeholder text
            })
    )


def getContent(title):
    content = util.get_entry(title)
    return markdown2.markdown(content)

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })

def wiki(request, title):
    if "edit" not in request.session:
        request.session["edit"] = ""

    request.session["edit"] = title
    return render(request, "encyclopedia/page.html", {
        "title": title,
        "entry": getContent(title)
    })

def randomPage(request):
    pages = util.list_entries()
    page = random.choice(pages)
    return render(request, "encyclopedia/page.html", {
        "title": page,
        "entry": getContent(page)
    })


def search(request):
    title = request.GET.get("q")
    
    pages = util.list_entries()
    lower_pages = [item.lower() for item in pages]


    if title.lower() in lower_pages:
        return render(request, "encyclopedia/page.html", {
            "title": title,
            "entry": getContent(title)
        })
    else: 
        substrings = [s for s in lower_pages if title.lower() in s]
        print(substrings)
        return render(request, "encyclopedia/search.html", {
        "entries": substrings
    })


def new(request):
    if request.method == "POST":
        form = CreateForm(request.POST)
        if form.is_valid():
            title = form.cleaned_data['title']

            pages = util.list_entries()
            lower_pages = [item.lower() for item in pages]
            if title.lower() in lower_pages:
                return HttpResponseRedirect(reverse("error"))
            else:
                dir = os.getcwd() + f"/entries/{title}.md"
                content = form.cleaned_data['content']

                md = f"#{title}#\n\n" + content

                with open(dir, 'w', encoding='utf-8') as file:
                    file.write(md)
                return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "encyclopedia/new.html", {
                "form": form,
            })
    return render(request, "encyclopedia/new.html", {
        "form": CreateForm(),
    })

def error(request):
    return render(request, "encyclopedia/error.html")

def edit(request):
    title = request.session["edit"]
    md = util.get_entry(title)
    lines = md.splitlines()

    if len(lines) > 2:
        content = '\n'.join(lines[2:])

    initial_data = {
        "title": title,
        "content": content,
    }

    
    
    if request.method == "POST":
        form = CreateForm(request.POST)
        if form.is_valid():
            old_dir = os.getcwd() + f"/entries/{title}.md"
            os.remove(old_dir)

            new_title = form.cleaned_data['title']
            dir = os.getcwd() + f"/entries/{new_title}.md"
            content = form.cleaned_data['content']

            print(new_title)
            print(content)

            md = f"#{new_title}#\n\n" + content

            with open(dir, 'w', encoding='utf-8') as file:
                file.write(md)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "encyclopedia/edit.html", {
                "form": form,
            })
        
    return render(request, "encyclopedia/edit.html", {
        "form": CreateForm(initial=initial_data),
    })
    
# def add(request):
#     if request.method == "POST":
#         form = NewTaskForm(request.POST)
#         if form.is_valid():
#             task = form.cleaned_data["task"]
#             request.session["tasks"] += [task]
#             return HttpResponseRedirect(reverse("tasks:index"))
#         else:
#             return render(request, "tasks/add.html", {
#                 "form": form,
#             })
#     return render(request, "tasks/add.html", {
#         "form": NewTaskForm(),
#     })


