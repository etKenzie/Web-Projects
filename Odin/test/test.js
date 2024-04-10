const container = document.querySelector("#container");

const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious tent!";

container.appendChild(content);

const paragraph = document.createElement("p");

paragraph.textContent = "Hey I'm red!";
paragraph.style.color = "red";
container.appendChild(paragraph);

const header = document.createElement("h3");

header.textContent = "I'm a blue h3";
header.style.color = "blue";
container.appendChild(header);

const newDiv = document.createElement("div");
const newHeader = document.createElement("h1");

newDiv.style.border = "1px solid black";
newHeader.textContent = "I'm in a Div too";
paragraph.textContent = "Me too!";

newDiv.appendChild(newHeader);
newDiv.appendChild(paragraph);

container.appendChild(newDiv);

const button = document.querySelector("button");

button.addEventListener("click", function (e) {
    console.log(e.target);
});