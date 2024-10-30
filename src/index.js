import "./styles.css";
import { displayProjects, displayNotes } from "./display";

class Note{
    constructor(title = "", description = "", dueDate = new Date(), priority = "Medium"){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = false;
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
        this.noteList.push(note);
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
        displayNotes(ProjectList.list[ProjectList.selected]);
    }
    else if(e.srcElement.dataset.checkbox == "note"){

    }
}

ProjectList.add();
ProjectList.add();
ProjectList.list[0].add(new Note("I'm a Note! Click me to see the details!", "This is a todo note", new Date(), "Medium"));
