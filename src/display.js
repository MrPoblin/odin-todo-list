import trashImage from "./icons/trash-can-outline.svg";
import { checkCheckbox, onProjectClicked, onDelProjectClicked, addProject, projectNameChanged, projectDescChanged, addNote, inputTitle, displaySelectedNotes, inputDescription, inputDate, inputPriority, getSelectedNoteValues } from ".";

export function displayProjects(list, selected){
    const projectList = document.querySelector(".project-list");
    removeChildren(projectList);
    for(let i = 0; i < list.length; i++){
        const projectArea = document.createElement("div");
        projectArea.setAttribute("class", "project-area");
        projectArea.addEventListener("mouseenter", ()=>{
            delButton.style.visibility = "visible";
        })
        projectArea.addEventListener("mouseleave", ()=>{
            delButton.style.visibility = "hidden";
        })
        
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
        button.addEventListener("click", ()=>{
            onProjectClicked(i);
            setProjectBackground(i);
        });

        const delButton = document.createElement("img");
        delButton.style.visibility = "hidden";
        delButton.setAttribute("data-index", i);
        delButton.src = trashImage;
        delButton.addEventListener("click", onDelProjectClicked);

        projectArea.appendChild(checkBox);
        projectArea.appendChild(button);
        projectArea.appendChild(delButton);

        projectList.appendChild(projectArea);
    }
    setProjectBackground(selected);
}

export function setProjectBackground(index){
    const projects = document.querySelectorAll(".project-area");
    for(let i = 0; i < projects.length; i++){
        if(i == index){
            projects[i].setAttribute("class", "project-area selected-project");
        }
        else{
            projects[i].setAttribute("class", "project-area");
        }
    }
}

export function displayNotes(project){
    const projectTitle = document.querySelector(".current-project-title");
    const projectDescriptionDiv = document.querySelector(".current-project-description");
    const noteList = document.querySelector(".note-list");

    removeChildren(projectTitle);
    removeChildren(projectDescriptionDiv);
    removeChildren(noteList);
    
    const newNoteButton = document.querySelector(".new-note");
    if(project){
        newNoteButton.style.visibility = "visible";
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
        projectTitleInput.setAttribute("data-index", project.id);
        projectTitleInput.addEventListener("blur", projectNameChanged);

        projectTitle.appendChild(projectCheckBox);
        projectTitle.appendChild(projectTitleInput);

        const projectDescription = document.createElement("input");
        projectDescription.setAttribute("class", "project-description");
        projectDescription.setAttribute("type", "text");
        projectDescription.value = project.description;
        projectDescription.setAttribute("data-index", project.id);
        projectDescription.addEventListener("blur", projectDescChanged);

        projectDescriptionDiv.appendChild(projectDescription);

        project.noteList.forEach(element => {
            const note = document.createElement("div");
            note.setAttribute("class", "note-small");
            const noteCheckBox = document.createElement("input");
            noteCheckBox.checked = element.done;
            noteCheckBox.setAttribute("type", "checkbox");
            noteCheckBox.setAttribute("class", "note-checkbox");
            noteCheckBox.setAttribute("data-checkbox", "note");
            noteCheckBox.setAttribute("data-index", element.id);
            noteCheckBox.addEventListener("click", checkCheckbox);

            const noteTitle = document.createElement("button");
            noteTitle.textContent = element.title;
            noteTitle.setAttribute("class", "note-title");
            noteTitle.setAttribute("data-index", element.id);
            noteTitle.addEventListener("click", showEdit);

            const noteDate = document.createElement("div");

            if(element.dueDate){
                const date = new Date(element.dueDate);
                noteDate.textContent = date.toLocaleDateString();
            }
            
            noteDate.setAttribute("class", "note-date");
            noteDate.setAttribute("data-index", element.id);
            

            note.append(noteCheckBox);
            note.append(noteTitle);
            note.append(noteDate);

            noteList.append(note);
        });
    }
    else{
        newNoteButton.style.visibility = "hidden";
    }

}

function removeChildren(parent){
    while(parent.hasChildNodes()){
        parent.removeChild(parent.firstChild);
    }
}

(function () {
    const newProjectButton = document.querySelector(".new-project");
    newProjectButton.addEventListener("click", addProject);
    const newNoteButton = document.querySelector(".new-note");
    newNoteButton.addEventListener("click", addNewNote);
})();
  
function addNewNote(){
    addNote();
    showEdit();
}

function showEdit(e = null){
    const EditWindow = document.createElement("div");
    EditWindow.setAttribute("class", "edit-window");
    EditWindow.setAttribute("tabindex", "0");

    const TitleInput = document.createElement("input");
    TitleInput.placeholder = "Title";

    const DescriptionInput = document.createElement("input");
    DescriptionInput.placeholder = "Description";

    const ExtraInput = document.createElement("div");

    const DateInput = document.createElement("input");
    DateInput.setAttribute("type", "date");

    const PriorityInput = document.createElement("input");
    PriorityInput.placeholder = "Priority";

    ExtraInput.appendChild(DateInput);
    ExtraInput.appendChild(PriorityInput);

    EditWindow.appendChild(TitleInput);
    EditWindow.appendChild(DescriptionInput);
    EditWindow.appendChild(ExtraInput);

    TitleInput.addEventListener("input", inputTitle);
    DescriptionInput.addEventListener("input", inputDescription);
    DateInput.addEventListener("input", inputDate);
    PriorityInput.addEventListener("input", inputPriority);


    const nodes = document.querySelectorAll(".note-small");
    if(e){
        nodes[e.srcElement.dataset.index].parentNode.insertBefore(EditWindow, nodes[e.srcElement.dataset.index].nextSibling);
        TitleInput.setAttribute("data-index", e.srcElement.dataset.index);
        DescriptionInput.setAttribute("data-index", e.srcElement.dataset.index);
        DateInput.setAttribute("data-index", e.srcElement.dataset.index);
        PriorityInput.setAttribute("data-index", e.srcElement.dataset.index);
        const noteValues = getSelectedNoteValues(e.srcElement.dataset.index);
        TitleInput.value = noteValues[0];
        DescriptionInput.value = noteValues[1];
        DateInput.value = noteValues[2];
        PriorityInput.value = noteValues[3];

    }
    else{
        nodes[nodes.length-1].parentNode.insertBefore(EditWindow, nodes[nodes.length-1].nextSibling);
        TitleInput.setAttribute("data-index", nodes.length-1);
        DescriptionInput.setAttribute("data-index", nodes.length-1);
        DateInput.setAttribute("data-index", nodes.length-1);
        PriorityInput.setAttribute("data-index", nodes.length-1);
    }
    EditWindow.focus();
    EditWindow.addEventListener("focusout", (event) => {
        if (!EditWindow.contains(event.relatedTarget)) {
            EditWindow.remove();
            displaySelectedNotes();
        }
    });
}