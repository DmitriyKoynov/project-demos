import * as taskManager from './taskManager.js';
import swal from './sweetalert2.all.min.js';

const highPriorityTasksWrapper = document.querySelector('.high-priority-tasks');
const lowPriorityTasksWrapper = document.querySelector('.low-priority-tasks');
const tasksWrappers = document.body.querySelectorAll('.tasks-wrapper');
const tasksForms = document.body.querySelectorAll('.tasks-form');
attachEventListeners(tasksWrappers, 'click', [addTask, removeTask, changeTaskStatus]);
attachEventListeners(tasksForms, 'submit', [addTask]);

function attachEventListeners(elementsArray, eventType, eventHandlers) {
    elementsArray.forEach(element => {
        eventHandlers.forEach(eventHandler => {
            element.addEventListener(eventType, eventHandler());
        });
    });
}

function clearTaskList() {
    let tasksLists = document.body.querySelectorAll('.tasks-list');
    tasksLists.forEach(element => {
        element.textContent = '';
    });
}

function updateTaskListFromBase() {
    clearTaskList();
    for (const task of taskManager.taskList) {
        let isTaskPriorityLow = task.priority === taskManager.permittedPriorities['LOW'];
        let taskWrapper = isTaskPriorityLow ? lowPriorityTasksWrapper : highPriorityTasksWrapper;
        addTaskIntoHtml(taskWrapper, task.name, task.status);
    }
}

function addTask() {
    return event => {
        if (event.target.classList.contains('add-button') || event.type === 'submit') {
            event.preventDefault();
            const isHighPriority = event.target.classList.contains('high-priority');
            const taskInput = event.target.querySelector('.create-task-input')
                ? event.target.querySelector('.create-task-input')
                : event.target.previousElementSibling;

            let taskPriority = isHighPriority
                ? taskManager.permittedPriorities.HIGH
                : taskManager.permittedPriorities.LOW;
            try {
                taskManager.addTask(taskInput.value.trim(), taskManager.permittedStatuses.TODO, taskPriority);
            } catch (error) {
                showError(error);
            }
            updateTaskListFromBase();
            taskInput.value = '';
        }
    };
}

function removeTask() {
    return event => {
        if (event.target.classList.contains('delete-button')) {
            let taskText = event.target.previousElementSibling.textContent.trim();
            try {
                taskManager.deleteTask(taskText);
            } catch (error) {
                showError(error);
            }
            updateTaskListFromBase();
        }
    };
}

function changeTaskStatus() {
    return event => {
        let element = event.target;
        if (element.classList.contains('task-checkbox')) {
            const taskText = element.nextElementSibling.textContent.trim();
            const taskNewStatus = element.checked
                ? taskManager.permittedStatuses.DONE
                : taskManager.permittedStatuses.TODO;
            try {
                taskManager.changeTaskStatus(taskText, taskNewStatus);
            } catch (error) {
                showError(error);
            }
            updateTaskListFromBase();
        }
    };
}

function addTaskIntoHtml(tasksWrapper, text, taskStatus) {
    let tasksList = tasksWrapper.querySelector('.tasks-list');
    let isTaskDone = taskStatus === taskManager.permittedStatuses.DONE;
    let checkboxStatus = isTaskDone ? 'checked' : '';
    let controlBackgroundColor = isTaskDone ? 'control--green' : 'control--white';
    tasksList.insertAdjacentHTML(
        'beforeend',
        `<div class="control task task ${controlBackgroundColor}">
                    <input class="checkbox task-checkbox" name="checkbox" id="checkbox" type="checkbox" ${checkboxStatus}/>
                    <p class="task-text checkbox-text">
                        ${text}
                    </p>
                    <button class="delete-button" type="button"></button>
                </div>`
    );
}

function showError(error) {
    console.error(error.message);
    swal.fire({
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Понятно'
    });
}

// Делаем начальный update
taskManager.createInitialTasks();
updateTaskListFromBase();
