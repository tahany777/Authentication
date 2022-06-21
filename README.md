# Authentication and Authorization

| Authentication     | Authorization |
| ----------- | ----------- |
| Determines whether users are who they claim to be     | Determines what users can and cannot access       |
| Challenges the user to validate credentials (for example, through passwords, answers to security questions, or facial recognition)  | Verifies whether access is allowed through policies and rules        |
| Usually done before authorization	   | Usually done after successful authentication        |
| Employees in a company are required to authenticate through the network before accessing their company email  | After an employee successfully authenticates, the system determines what information the employees are allowed to access        |


## Install dependencies: 

`` npm i base-64 bcrypt nodemon ``