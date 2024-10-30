import "./styles.css";
import { displayProjects, displayNotes, setProjectBackground } from "./display";

class Note{
    constructor(title = "", description = "", dueDate = "", priority = "Medium"){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.done = false;
        this.id;
    }
    getValues(){
        return [this.title, this.description, this.dueDate, this.priority];
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
        for(let i = index; i < this.noteList.length; i++){
            this.noteList[i].id--;
        }
        displayNotes(this);
    }
}

let ProjectList = (function () {
    let list = [];
    const add = ()=>{
        const newProject = new Project(list.length);
        list.push(newProject);
        displayProjects(list, ProjectList.selected);
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
    commitToStorage()
}

export function onProjectClicked(projectIndex){
    ProjectList.selected = projectIndex;
    displaySelectedNotes();
    commitToStorage()
}

export function onDelProjectClicked(e){
    ProjectList.remove(e.srcElement.dataset.index);
    displayProjectList();
    displaySelectedNotes();
    commitToStorage()
}

export function displaySelectedNotes(){
    displayNotes(ProjectList.list[ProjectList.selected]);
    commitToStorage()
}

export function displayProjectList(){
    displayProjects(ProjectList.list, ProjectList.selected);
    commitToStorage()
}

export function addProject(){
    ProjectList.add();
    ProjectList.selected = ProjectList.list.length - 1;
    setProjectBackground(ProjectList.selected);
    displaySelectedNotes();
    commitToStorage()
}

export function addNote(){

    ProjectList.list[ProjectList.selected].add(new Note());
    commitToStorage()
}

export function projectNameChanged(e){
    ProjectList.list[e.srcElement.dataset.index].title = e.srcElement.value;
    displayProjectList()
    displaySelectedNotes();
    commitToStorage()
}

export function projectDescChanged(e){
    ProjectList.list[e.srcElement.dataset.index].description = e.srcElement.value;
    displaySelectedNotes();
    commitToStorage()
}

export function inputTitle(e){
    ProjectList.list[ProjectList.selected].noteList[e.srcElement.dataset.index].title = e.srcElement.value;
    commitToStorage()
}

export function inputDescription(e){
    ProjectList.list[ProjectList.selected].noteList[e.srcElement.dataset.index].description = e.srcElement.value;
    commitToStorage()
}

export function inputDate(e){
    ProjectList.list[ProjectList.selected].noteList[e.srcElement.dataset.index].dueDate = e.srcElement.value;
    commitToStorage()
}

export function inputPriority(e){
    ProjectList.list[ProjectList.selected].noteList[e.srcElement.dataset.index].priority = e.srcElement.value;
    commitToStorage()
}

export function getSelectedNoteValues(index){
    return ProjectList.list[ProjectList.selected].noteList[index].getValues();
}

function commitToStorage(){
    const ProjectListSerialized = JSON.stringify(ProjectList);
    localStorage.setItem("ProjectList", ProjectListSerialized);
}

const localStorageData = localStorage.getItem("ProjectList");

if(false){//localStorageData
    ProjectList = JSON.parse(localStorageData);
}
else{
    addProject();
    ProjectList.list[0].title = "Project 1";
    displayProjectList()
    displaySelectedNotes();
    ProjectList.list[0].add(new Note("I'm a Note! Click me to see the details!", "This is a todo note", "", "Medium"));
}