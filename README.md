# vue-task-management-cms
A single page application to interact with [Laravel Task Management API](https://github.com/markmarilag27/laravel-task-management-api)

### Libraries
- [Vuex](https://vuex.vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vue Draggable](https://github.com/SortableJS/Vue.Draggable)

### Expectation 
 - Basic user authentication
 - User can create/edit/soft-delete a task
 - List of tasks can be reordered by the user
 - Task should have the option to have sub-tasks (sub-tasks can have sub-task up to infinity)
 - Task can be marked as complete/pending/cancelled/(custom)
 - Tasks should only be accessible to owner
 - Ability to download all the tasks in Excel/CSV/JSON format
 - Ability to restore soft deleted tasks
 - Soft deleted tasks should be forced delete after 30 days
 - Chart to see users completed tasks

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
