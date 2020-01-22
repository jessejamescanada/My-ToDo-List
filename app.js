const form = document.querySelector('#add-task');
const taskListUl = document.querySelector('.collection');
const clearBTN = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const modal = document.querySelector('.modal');
const yesBTN = document.querySelector('#yesBTN')
const noBTN = document.querySelector('#noBTN')
const modal2 = document.querySelector('.modal2')


loadEventListeners();

function loadEventListeners(){
document.addEventListener('DOMContentLoaded', getTasks)
form.addEventListener('click', addTask);
taskListUl.addEventListener('click', removeTask);
clearBTN.addEventListener('click', clearTasks);
filter.addEventListener('keyup', filterTasks);
window.addEventListener('click', clearModal);
yesBTN.addEventListener('click', yesModal) /* delete these if modal 2 is no good */
noBTN.addEventListener('click', noModal)
}

// /////////////// modals to ask user to confirm clear tasks
function yesModal(){
  taskListUl.innerHTML = '';
  clearTasksfromLS();
  modal2.style.display = 'none'
}
function noModal(){
  modal2.style.display = 'none';
}
// /////////////////

function addTask(e){
  // modal pops up if empty input submitted
  if(taskInput.value === ''){
    modal.style.display = 'block'
    return false;
  }
  // create list elements
  const li = document.createElement('li');
  li.className = 'li-item';
  li.appendChild(document.createTextNode(taskInput.value));
  // create link 'X'
  const link = document.createElement('a');
  link.className = 'delete secondary-content';
  link.innerHTML = `<i class="fa fa-remove"></i>`
  li.appendChild(link);
  taskListUl.appendChild(li);
  // toggles tasks when clicked to change color
  li.addEventListener('click', function(){
    this.classList.toggle('done');
  })

  storeTasksLS(taskInput.value, li)

  taskInput.value = '';
  e.preventDefault();  
}


function removeTask(e){
  if(e.target.parentElement.classList.contains('delete')){
    e.target.parentElement.parentElement.remove();
  }
  removeTasksfromLS(e.target.parentElement.parentElement);
}

function clearTasks(){
  modal2.style.display = 'block'
// taskListUl.innerHTML = '';
// clearTasksfromLS();
}

function filterTasks(e){
  // gets typed text value by each letter
  const text = e.target.value.toLowerCase();
  // selects each list item and iterates over each
  document.querySelectorAll('.li-item').forEach(function(iterator){
    // selects the text content
    const item = iterator.firstChild.textContent;
    // searches text content of each item
    if(item.toLowerCase().indexOf(text) != -1){
      iterator.style.display = 'flex';
  }else{
    iterator.style.display = 'none';
  }
  })
}

function storeTasksLS(task){
  let taskList;
  if(localStorage.getItem('taskList') === null){
    taskList = [];
  }else{
    taskList = JSON.parse(localStorage.getItem('taskList'));
  }
  taskList.push(task);
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

function getTasks(){
  let taskList;
  if(localStorage.getItem('taskList') === null){
    taskList = [];
  }else{
    taskList = JSON.parse(localStorage.getItem('taskList'));
  }
  taskList.forEach(function(iterator){
    const li = document.createElement('li');
    li.className = 'li-item';
    li.appendChild(document.createTextNode(iterator));
    const link = document.createElement('a');

    link.className = 'delete secondary-content';
    link.innerHTML = `<i class="fa fa-remove"></i>`
    li.appendChild(link);
    taskListUl.appendChild(li);
    li.addEventListener('click', function(){
      li.classList.toggle('done');
    })
  })
}

function removeTasksfromLS(taskItem){
  let taskList;
  if(localStorage.getItem('taskList') === null){
    taskList = [];
  }else{
    taskList = JSON.parse(localStorage.getItem('taskList'))
  }
  taskList.forEach(function(iterator, index){
    if(taskItem.textContent === iterator){
      taskList.splice(index, 1)
    }
  })
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

function clearTasksfromLS(){
  localStorage.clear();
}

function clearModal(e){
  if(e.target == modal){
    modal.style.display = 'none'
  }
}

const getDate = new Date();
const month = getDate.toLocaleString('default', {month: 'short'});
const year = getDate.getFullYear();
const day = getDate.getDate();
const date = document.getElementById('date').innerHTML = `Date: ${month}/${day}/${year}`;



