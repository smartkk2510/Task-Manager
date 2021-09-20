var globalTaskData = [];
var taskContents = document.querySelector("#taskContents");
//****function to addCard****
const addCard = () => {
  const newTaskDetails = {
    id : `${Date.now()}`,//y i am using template litral here is
    //i want new id for obj that i am calling every timeso "Date.now() => gives
    // current time that when it get called" and template litral converts it to string
    url : document.querySelector("#imageURL").value,
    title : document.querySelector("#taskTitle").value,
    type : document.querySelector("#taskType").value,
    description : document.querySelector("#taskDescription").value
  };


  taskContents.insertAdjacentHTML('beforeend',generateTaskCard(newTaskDetails));
//  $(taskContents).append(generateTaskCard(newTaskDetails)); <= above line using jQuery
  globalTaskData.push(newTaskDetails);
  saveToLocalStorage();
}

const generateTaskCard = ({id,url,title,type,description}) => { //in object destructuring
  //key orders can change but name should be same as in the object created
  //key attribute makes element more unique it's not compulsory but it's a good practice
  //onClick(functionName(this)) <= this will give only the obj of the element that get clicked
  //onClick(functionName(event)) <= whereas event  will give some extra information of the element that get clicked
return  (` <div class="col-lg-4 col-md-6 mt-3" id= ${id} key=${id}>
        <div class="card">
          <div class="card-header">
            <div class="d-flex justify-content-end">
            <button type="button" name=${id} class="btn btn-outline-info" onclick="editTask(this)">
              <i class="fas fa-pencil-alt"  name=${id}  onclick="editTask(this)"></i></button>
              <button type="button" name=${id} onclick="deleteTask(event)" class="btn btn-outline-danger ms-2">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <img class="card-img-top" src=${url} alt="image">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <span class="badge bg-primary">${type}</span>
          </div>
          <div class="card-footer">
            <button class="btn btn-outline-primary float-end" type="button" name=${id}>Open task</button>
          </div>
        </div>
      </div>`)
      //about instead of templpate literals you can old method also (i.e) "afdda"+id+"cfasf"
      //but as we can see this is more easy and efficient
}
//****button to add new task****
let taskSave = document.querySelector("#taskSave");
taskSave.addEventListener("click",addCard);

let saveToLocalStorage = () => {
  localStorage.setItem("tasks",JSON.stringify({task:globalTaskData}));
}
let reloadTaskCard = () => {
  const localStorageCopy = JSON.parse(localStorage.getItem("tasks"));
  if(localStorageCopy){
    globalTaskData = localStorageCopy.task;
  }
  globalTaskData.map((e) => {
      taskContents.insertAdjacentHTML('beforeend',generateTaskCard(e));
  //  taskContents.insertAdjacentHTML('beforeend',generateTaskCard(newTaskDetails));
  })
}

const deleteTask = (event) => {
//  console.log(event);
  const targetID = event.target.getAttribute("name");//target gives elemnet(tag) objet
//  console.log(targetID)
  globalTaskData = globalTaskData.filter((cardObj) => cardObj.id !==targetID);
  console.log(globalTaskData)
  saveToLocalStorage();
 window.location.reload()//reload the whole page
}

const editTask = (e) => {//*****event.target gives the obj of the element that get clicked****
                                  //  const targetID = event.target.getAttribute("name");
  //  console.log(  event.parentNode.parentNode.parentNode.childNodes[5].childNodes);
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true");  //parentNode represents the element that wraps the element that called the event here
   e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true");   //childNodes represents the child of the parent called here indexing is diff coz all even indices
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true");  //the actual child element and in odd indices text
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].textContent = "Save changes";            //"contenteditable" is an html attribute which allow as to edit textx in browser
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","saveEditTask(this)"); //this directly passes only the object of the clicked element.no need of this.target.                                                                   //  console.log(  event.target.parentNode.parentNode) parentNode.parentNode means parent of parent(grand parent)
//saveToLocalStorage();
  // window.location.reload()
}

const saveEditTask = (e) => {
  const targetID = e.getAttribute("name");
  console.log(targetID);
  let title = e.parentNode.parentNode.childNodes[5].childNodes[1];
   let text = e.parentNode.parentNode.childNodes[5].childNodes[3];
  let badge = e.parentNode.parentNode.childNodes[5].childNodes[5];
globalTaskData.forEach((card) => {
  if(card.id === targetID){
    card.title = title.textContent;
    card.type = badge.textContent;
    card.description = text.textContent;
  }
});
saveToLocalStorage();
window.location.reload();
}
