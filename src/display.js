import trashImage from "./icons/trash-can-outline.svg";
import { checkCheckbox } from ".";

export function displayProjects(list){
    const projectList = document.querySelector(".project-list");
    removeChildren(projectList);
    for(let i = 0; i < list.length; i++){
        const projectArea = document.createElement("div");
        projectArea.setAttribute("class", "project-area");
        
        const checkBox = document.createElement("input");
        checkBox.checked = list[i].done;
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("data-checkbox", "project");
        checkBox.setAttribute("data-index", i);
        checkBox.addEventListener("click", checkCheckbox);

        const button = document.createElement("button");
        button.textContent = list[i].title;
        button.setAttribute("data-index", i);
        button.setAttribute("class", "project-button");
 
        
        const delButton = document.createElement("img");
        delButton.src = trashImage;

        projectArea.appendChild(checkBox);
        projectArea.appendChild(button);
        projectArea.appendChild(delButton);

        projectList.appendChild(projectArea);
    }
}

export function displayNotes(project){
    const projectTitle = document.querySelector(".current-project-title");
    const projectDescriptionDiv = document.querySelector(".current-project-description");
    const noteList = document.querySelector(".note-list");

    removeChildren(projectTitle);
    removeChildren(projectDescriptionDiv);
    removeChildren(noteList);
    
    const projectCheckBox = document.createElement("input");
    projectCheckBox.setAttribute("type", "checkbox");
    projectCheckBox.checked = project.done;
    projectCheckBox.setAttribute("class", "project-checkbox");
    projectCheckBox.setAttribute("data-checkbox", "project");
    projectCheckBox.setAttribute("data-index", project.id);
    projectCheckBox.addEventListener("click", checkCheckbox);
    
    const projectTitleInput = document.createElement("input");
    projectTitleInput.setAttribute("type", "text");
    projectTitleInput.value = project.title;
    projectTitleInput.setAttribute("class", "project-title");

    projectTitle.appendChild(projectCheckBox);
    projectTitle.appendChild(projectTitleInput);

    const projectDescription = document.createElement("input");
    projectDescription.setAttribute("class", "project-description");
    projectDescription.setAttribute("type", "text");
    projectDescription.value = project.description;

    projectDescriptionDiv.appendChild(projectDescription);

    project.noteList.forEach(element => {
        const note = document.createElement("div");
        note.setAttribute("class", "note-small");

        const noteCheckBox = document.createElement("input");
        noteCheckBox.value = element.done;
        noteCheckBox.setAttribute("type", "checkbox");
        noteCheckBox.setAttribute("class", "note-checkbox");

        const noteTitle = document.createElement("button");
        noteTitle.textContent = element.title;
        noteTitle.setAttribute("class", "note-title");

        note.append(noteCheckBox);
        note.append(noteTitle);

        noteList.append(note);
    });


}

function removeChildren(parent){
    while(parent.hasChildNodes()){
        parent.removeChild(parent.firstChild);
    }
}