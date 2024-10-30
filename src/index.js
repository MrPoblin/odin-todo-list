import "./styles.css";
import { displayProjects, displayNotes, setProjectBackground } from "./display";

class Note{
    constructor(title = "", description = "", dueDate = new Date(), priority = "Medium"){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = false;
        this.id;
    }
}

class Project{
    constructor(id, title = "Project", description = "Project Description"){
        this.title = title;
        this.description = description;
        this.noteList = [];
        this.done = false;
        this.id = id;
    }
    add = (note)=>{
        note.id = this.noteList.length;
        this.noteList.push(note);
        displayNotes(this);
    }
    remove = (index)=>{
        this.noteList.splice(index, 1);
        displayNotes(this);
    }
}

let ProjectList = (function () {
    let list = [];
    const add = ()=>{
        const newProject = new Project(list.length);
        list.push(newProject);
        displayProjects(list);
    };
    const remove = (id)=>{
        list.splice(id, 1);
        displayProjects(list);
    }
    let selected = 0;
    return {add, remove, list, selected};
})();

export function checkCheckbox(e){
    if(e.srcElement.dataset.checkbox == "project"){
        ProjectList.list[e.srcElement.dataset.index].done = !ProjectList.list[e.srcElement.dataset.index].done
        displayProjects(ProjectList.list);
        displaySelectedNotes();
    }
    else if(e.srcElement.dataset.checkbox == "note"){
        ProjectList.list[ProjectList.selected].noteList[e.srcElement.dataset.index].done = !ProjectList.list[ProjectList.selected].noteList[e.srcElement.dataset.index].done
        displaySelectedNotes();
    }
}

export function onProjectClicked(projectIndex){
    ProjectList.selected = projectIndex;
    displaySelectedNotes();
}

function displaySelectedNotes(){
    displayNotes(ProjectList.list[ProjectList.selected]);
}

ProjectList.add();
ProjectList.add();
ProjectList.list[0].add(new Note("I'm a Note! Click me to see the details!", "This is a todo note", new Date(), "Medium"));
setProjectBackground(ProjectList.selected);