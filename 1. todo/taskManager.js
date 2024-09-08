import initialTasks from "./initialTasks.json" with {type: "json"};

// Константы для статусов
export const permittedStatuses = {
    TODO: 'To do',
    DONE: 'Done'
};

// Константы для приоритета
export const permittedPriorities = {
    LOW: 'Low',
    HIGH: 'High'
};

// Константы для ошибок
const errorMessages = {
    ERROR_INVALID_TASK_NAME: `Задача может быть только непустой строкой.`,
    ERROR_INVALID_STATUS: `Указан неверный статус. Задача может иметь статусы 'To do' или 'Done'.`,
    ERROR_INVALID_PRIORITY: `Указан неверный приоритет. Задача может иметь приоритеты 'Low' или 'High'.`,
    ERROR_TASK_EXISTS: `Такая задача уже есть в списке.`,
    ERROR_TASK_NOT_FOUND: 'Задача не найдена в списке.'
};

export let taskList = [];

// Функции-проверки
const checkTaskName = name => {
    if (typeof name === 'string' && name.trim()) {
        return;
    }
    throw new Error(errorMessages.ERROR_INVALID_TASK_NAME);
};

const checkStatus = status => {
    if (Object.values(permittedStatuses).includes(status)) {
        return;
    }
    throw new Error(errorMessages.ERROR_INVALID_STATUS);
};

const checkPriority = priority => {
    if (Object.values(permittedPriorities).includes(priority)) {
        return;
    }
    throw new Error(errorMessages.ERROR_INVALID_PRIORITY);
};
const checkTaskExists = name => {
    if (taskList.some(task => task.name === name)) {
        return;
    }
    throw new Error(errorMessages.ERROR_TASK_NOT_FOUND);
};

const checkTaskNotExists = name => {
    if (taskList.some(task => task.name === name)) {
        throw new Error(errorMessages.ERROR_TASK_EXISTS);
    }
};

function getTaskIndex(name) {
    return taskList.findIndex(task => task.name === name);
}

export const addTask = (name, status = permittedStatuses.TODO, priority = permittedPriorities.LOW) => {
    checkTaskName(name);
    checkStatus(status);
    checkPriority(priority);
    checkTaskNotExists(name);
    let newTask = { name, status, priority };
    taskList.push(newTask);
    console.log(`Добавлена новая задача '${name}'`);
};

export const changeTaskStatus = (name, newStatus) => {
    checkTaskName(name);
    checkStatus(newStatus);
    checkTaskExists(name);
    let taskIndex = getTaskIndex(name);
    taskList[taskIndex].status = newStatus;
    console.log(`Статус задачи '${name}' изменён на '${newStatus}'`);
};

export const deleteTask = name => {
    checkTaskName(name);
    checkTaskExists(name);
    let taskIndex = getTaskIndex(name);
    taskList.splice(taskIndex, 1);
    console.log(`Удалена задача '${name}'`);
};

export const createInitialTasks = () => {
    taskList = initialTasks;
};
