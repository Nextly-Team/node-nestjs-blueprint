# Description

Management of developers allocation in projects
# Framework

[NestJs](https://github.com/nestjs/nest) framework TypeScript.

# Install packages

```bash
$ npm install
```

# Run Local Mongo Database

```bash
$ docker-compose up -d
```

# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Swagger

```
http://[HOST]:[PORT]/api/docs
```

# API

- [Users](#users)
- [Auth](#auth)
- [Projects](#projects)
- [Appointement](#appointment)

## Users

- [Create User](#create-user)
- [Delete User](#delete-user)
- [Update User](#update-user)
- [Find All Users](#find-all-users)
- [Find By User Id](#find-by-user-id)

[Back to API](#api)

### Create User

> ***POST***  `v1/users`

Body Request:
```json
{
    "name": "string",
    "email": "string",
    "availability": "Full"
}
```

Body Response:
```json
{
    "name": "string",
    "email": "string",
    "availability": "Full"
}
```

- ***availability*** is a Enum option could be `Full, PartTime, SixHour, Other`

[Back to User](#user)

### Delete User

> ***DELETE*** `v1/users/{id}`

[Back to User](#user)

### Update User

> ***PATCH*** `v1/users/{id}`

Body Request:
```json
{
    "name": "string",
    "availability": "Full"
}
```

Body Response:
```json
{
    "_id": "string",
    "name": "string",
    "email": "string",
    "availability": "Full"
}
```

[Back to User](#user)

### Find All Users

> ***GET***  `v1/users`

Body Response:
```json
[
    {
        "_id": "string",
        "name": "string",
        "email": "string",
        "availability": "Full"
    }
]
```

[Back to User](#user)

### Find By User Id

> ***GET***  `v1/users/{id}`

Body Response:
```json
{
    "_id": "string",
    "name": "string",
    "email": "string",
    "availability": "Full"
}
```

[Back to User](#user)

## Auth

- [Login](#login)
- [Profile](#profile)

[Back to API](#api)

### Login

> ***POST** `auth/login`

Body Request:
```json
{
    "email": "string",
    "password": "string"
}
```

Body Response:
```json
{
    "access_token": "string"
}
```

[Back to Auth](#auth)

### Profile

Return the user profile data logged in

> ***POST** `auth/profile`

Body Response:
```json
{
    "sub": "string",
    "username": "string",
    "iat": "timestamp",
    "exp": "timestamp"
}
```

[Back to Auth](#auth)

## Projects

- [Create Project](#create-project)
- [Delete Project](#delete-project)
- [Update Project](#update-project)
- [Find All Projects](#find-all-projects)
- [Find By Project Id](#find-by-project-id)

[Back to API](#api)

### Create Project

> ***POST*** `v1/projects`

Body Request:
```json
{
    "name": "string",
    "tag": "string"
}
```

Body Response:
```json
{
    "_id": "string",
    "name": "string",
    "tag": "string"
}
```

[Back to Project](#project)

### Delete Project

> ***DELETE***  `v1/projects/{id}`

[Back to Project](#project)

### Update Project

> ***PATCH*** `v1/projects/{id}`

Body Request:
```json
{
    "name": "string",
    "tag": "string"
}
```

Body Response:
```json
{
    "_id": "string",
    "name": "string",
    "tag": "string"
}
```

[Back to Project](#project)

### Find All Projects

> ***GET***  `v1/projects`

Body Response:
```json
[
    {
        "_id": "string",
        "name": "string",
        "tag": "string"
    }
]
```

[Back to Project](#project)

### Find By Project Id

> ***GET***  `v1/projects`

Body Response:
```json
{
    "_id": "string",
    "name": "string",
    "tag": "string"
}
```

[Back to Project](#project)

## Appointment

- [Create Appointment](#create-appointment)
- [Delete Appointment](#delete-appointment)
- [Update Appointment](#update-appointment)
- [Find By Appointement Id](#find-by-appointement-id)
- [Search Appointment](#search-appointment)

[Back to API](#api)

### Create Appointment

> ***POST*** `v1/appointments`

Body Request:
```json
{
    "weekOfYear": "integer",
    "year": "integet",
    "user": {
        "name": "string",
        "email": "string",
        "availability": "Full"
    },
    "project": {
        "name": "string",
        "tag": "string"
    },
    "status": "Allocated",
    "availability": "Full",
    "otherAvailability": "string"
}
```

Body Response:
```json
{
    "_id": "string",
    "weekOfYear": "integer",
    "year": "integet",
    "user": {
        "name": "string",
        "email": "string",
        "availability": "Full"
    },
    "project": {
        "name": "string",
        "tag": "string"
    },
    "status": "Allocated",
    "availability": "Full",
    "otherAvailability": "string"
}
```

[Back to Appointment](#appointment)

### Delete Appointment

> ***DELETE***  `v1/appointments/{id}`

[Back to Appointment](#appointment)

### Update Appointment

> ***PATCH*** `v1/appointments/{id}`

Body Request:
```json
{
    "weekOfYear": "integer",
    "year": "integer",
    "status": "Allocated",
    "availability": "Full",
    "otherAvailability": "string"
}
```

Body Response:
```json
{
    "_id": "string",
    "weekOfYear": "integer",
    "year": "integet",
    "user": {
        "name": "string",
        "email": "string",
        "availability": "Full"
    },
    "project": {
        "name": "string",
        "tag": "string"
    },
    "status": "Allocated",
    "availability": "Full",
    "otherAvailability": "string"
}
```

[Back to Appointment](#appointment)

### Find All Appointements

> ***GET***  `v1/appointments`

Body Response:
```json
[
    {
        "_id": "string",
        "weekOfYear": "integer",
        "year": "integet",
        "user": {
            "name": "string",
            "email": "string",
            "availability": "Full"
        },
        "project": {
            "name": "string",
            "tag": "string"
        },
        "status": "Allocated",
        "availability": "Full",
        "otherAvailability": "string"
    }
]
```

[Back to Project](#project)

### Find By Appointement Id

> ***GET***  `v1/appointments/{id}`

Body Response:
```json
{
    "_id": "string",
    "weekOfYear": "integer",
    "year": "integet",
    "user": {
        "name": "string",
        "email": "string",
        "availability": "Full"
    },
    "project": {
        "name": "string",
        "tag": "string"
    },
    "status": "Allocated",
    "availability": "Full",
    "otherAvailability": "string"
}
```

[Back to Appointment](#appointment)

### Search Appointment

> ***POST***`v1/appointments/search`

Body Request:
```json
{
    "startWeekOfYear": "integer",
    "endWeekOfYear": "integer",
    "year": "integer",
    "filterBy": {
        "user": {
            "name": "string",
            "email": "string",
            "availability": {
            "type": "string",
            "enum": "Full"
            }
        },
        "project": {
            "name": "string",
            "tag": "string"
        },
        "status": "Allocated",
        "availability": "Full",
        "otherAvailability": "string"
    }
}
```

Body Response:
```json
[
    {
        "_id": "string",
        "weekOfYear": "integer",
        "year": "integet",
        "user": {
            "name": "string",
            "email": "string",
            "availability": "Full"
        },
        "project": {
            "name": "string",
            "tag": "string"
        },
        "status": "Allocated",
        "availability": "Full",
        "otherAvailability": "string"
    }
]
```

[Back to Appointment](#appointment)