# task_manager (backend side)

it makes with:
## **NODEJS & EXPRESS & MONGODB**


## database structure:
USER:
```json
{
    "email": "{ type: String, required: true, unique: true }",
    "name": "{ type: String, required: true }",
    "password": "{ type: String, required: true }",
    "is_admin": "{ type: Boolean, default: false }",
    "login_expireAt": "Date",
    "image_url": "String",
    "tasks": "{ type: [mongoose.Schema.Types.ObjectId], ref: 'Task' }"
}
```

TASK:
```json
{
    "name": "{ type: String, required: true }",
    "creator": "{ type: mongoose.Schema.Types.ObjectId, required: true }",
    "priority": "{ type: String, enum: taskPriorityEnum, required: true }",
    "images_urls": "[String]",
    "description": "String"
}
```


*compare ip & port with your connection*
## functionality of app and routes

> ### 1. login 
##### route: *--http://localhost:5000/api/auth/login*
##### method: *post*
functionality:  send this json in your requset body
```json
{
    "email": "[String & emailFormat](necessary)",
    "password": "[String](necessary)"
}
```
**after login in app. get jsonwebtoken & send it back everytime you send request**
**jsonwebtoken is expire after 3 hours. you need to login again**

----------

> ### 2. user tasks
##### route: *--http://localhost:5000/api/user/all-tasks*
##### method: *get*
functionality:  get all your task (needs login)

----------

> ### 3. user task
##### route: *--http://localhost:5000/api/user/task?select-task=[task-id]*
##### method: *get*
functionality:  get one of your tasks with task-id (needs login)

----------

> ### 4. create task
##### route: *--http://localhost:5000/api/user/task*
##### method: *post*
functionality:  create a task. send this json in your requset body(needs login)
```json
{
    "name": "[String](necessary)",
    "priority": "[String[high, medium, low]](necessary)",
    "description": "[String]"
}
```

----------

> ### 5. edit task
##### route: *--http://localhost:5000/api/user/task?select-task=[task-id]*
##### method: *put*
functionality:  edit one of your tasks with task-id. send this json in your requset body to set your jsan as change fields. if you dont need change one of fileds. just copy previus value (needs login)*
```json
{
    "name": "[String](necessary)",
    "priority": "[String[high, medium, low]](necessary)",
    "description": "[String]"
}
```

----------

> ### 6. upload photos & files on task
##### route: *--http://localhost:5000/api/user/task/upload-task-photo?select-task=[task-id]*
##### method: *put*
functionality:  add alot photos or files on your task with task-id. just set "Content-Type" as "multipart/form-data" on your request header. then send a file[picture,zip,pdf]. you can upload more than one file (needs login)*

----------

> ### 7. delete photos & files of task
##### route: *--http://localhost:5000/api/user/task/delete-task-photo?select-task=[task-id]*
##### method: *delete*
functionality:  delete photos or files of your task with task-id. (needs login)

----------

> ### 8. delete a task
##### route: *--http://localhost:5000/api/user/task?select-task=[task-id]*
##### method: *delete*
functionality:  delete photo or file of your task with task-id. (needs login)

----------

> ### 9. get all users
##### route: *--http://localhost:5000/api/admin/users*
##### method: *get*
functionality:  admin can get all of users data. also password is encrypted. (needs login, needs admin)

----------

> ### 10. create(add) a user
##### route: *--http://localhost:5000/api/admin/users*
##### method: *post*
functionality:  create a user as an admin. send this json. (needs login, needs admin)
```json
{
    "email": "[String & emailFormat](necessary)",
    "name": "[String & emailFormat](necessary)",
    "password": "[String](necessary)"
}
```

----------

> ### 11. edit a user
##### route: *--http://localhost:5000/api/admin/users/:email*
##### method: *put*
functionality:  edit a user as an admin. send "user email"[:email] as params. send this json in your requset body to set your jsan as change fields. if you dont need change one of fileds. just copy previus value (needs login, needs admin)
```json
{
    "new_email": "[String & emailFormat](necessary)",
    "new_name": "[String & emailFormat](necessary)",
    "new_password": "[String](necessary)",
    "new_is_admin": "[Boolean]",
    "new_tasks": "[TaskObjectID]"
}
```

----------

> ### 12. upload a user profile photo
##### route: *--http://localhost:5000/api/admin/users/upload-profile-photo/:email*
##### method: *put*
functionality:  add users photo as an admin. send "user email"[:email] as params. just set "Content-Type" as "multipart/form-data" on your request header. then send a file[picture] (needs login, needs admin)

----------

> ### 13. delte a user profile photo
##### route: *--http://localhost:5000/api/admin/users/delete-profile-photo/:email*
##### method: *put*
functionality:  delete users photo as an admin. just send "user email"[:email] as params. (needs login, needs admin)

----------

> ### 14. delete a user
##### route: *--http://localhost:5000/api/admin/users/delete-profile-photo/:email*
##### method: *put*
functionality:  delete users photo as an admin. just send "user email"[:email] as params.(needs login, needs admin)

----------

#### there it is. that's a task manager project.
#### enjoy coding
