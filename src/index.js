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
        ProjectList.list.splice(id, 1);
        for(let i = id; i < ProjectList.list.length; i++){
            ProjectList.list[i].id--;
        }
        if(ProjectList.selected >= id){
            ProjectList.selected--;
            ProjectList.selected = Math.max(0, ProjectList.selected);
        }
    }
    let selected = 0;
    return {add, remove, list, selected};
})();

export function checkCheckbox(e){
    if(e.srcElement.dataset.checkbox == "project"){
        ProjectList.list[e.srcElement.dataset.index].done = !ProjectList.list[e.srcElement.dataset.index].done
        displayProjectList()
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

export function onDelProjectClicked(e){
    ProjectList.remove(e.srcElement.dataset.index);
    displayProjectList();
    displaySelectedNotes();
    setProjectBackground(ProjectList.selected);
}

function displaySelectedNotes(){
    displayNotes(ProjectList.list[ProjectList.selected]);
}

function displayProjectList(){
    displayProjects(ProjectList.list);
}

ProjectList.add();
ProjectList.add();
ProjectList.add();
ProjectList.add();
ProjectList.add();

ProjectList.list[0].title = "Project 1";
ProjectList.list[1].title = "Project 2";
ProjectList.list[2].title = "Project 3";
ProjectList.list[3].title = "Project 4";
ProjectList.list[4].title = "Project 5";
displayProjectList()

ProjectList.list[0].add(new Note("I'm a Note! Click me to see the details!", "This is a todo note", new Date(), "Medium"));
setProjectBackground(ProjectList.selected);