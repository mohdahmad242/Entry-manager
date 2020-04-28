# Entry Management Software
>A minimum viable product

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) ![dip](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen)

***
## Content 
- [Tech Stack](https://github.com/ahmadkhan242/SummerGeeks-2020#tech-stack)
- [General Approach](https://github.com/ahmadkhan242/SummerGeeks-2020#general-approach)
- [Technical Approach](https://github.com/ahmadkhan242/SummerGeeks-2020#technical-approach)
- [Installation](https://github.com/ahmadkhan242/SummerGeeks-2020#installation)
- [Folder Structure](https://github.com/ahmadkhan242/SummerGeeks-2020#folder-structure)
- [Sample Screenshot](https://github.com/ahmadkhan242/SummerGeeks-2020#sample-screenshot)
- [Future Features](https://github.com/ahmadkhan242/SummerGeeks-2020#future-features)
- [Resume](https://github.com/ahmadkhan242/SummerGeeks-2020#resume-click-here)
***
## Tech Stack
- ![nodeV](https://img.shields.io/badge/Node%20Js-v12.13.1-blue)
- ![reactV](https://img.shields.io/badge/React%20Js-v16.12.0-blue)
- ![PostgresV](https://img.shields.io/badge/Postgres%20SQL-v11-blue) ![sequelizeV](https://img.shields.io/badge/Sequelize%20ORM-v5.21.2-green)
- ![sendgridV](https://img.shields.io/badge/Sendgrid%20js-v5.2.3-blue)
- ![TwilioV](https://img.shields.io/badge/Twilio%20js-v3.37.1-blue)
***
## General Approach

- The home page contains a dashboard along with 4 buttons- Check-In, Check-Out, Register a host and View details of past visitors.
- Visitors seeking appointment by contacting administrator go for the Check-In feature.
- Once the form is filled, the data will be saved on database then e-mail and SMS will be sent to the host containing visitor's details.
- After submitting form the visitor will be Checked in and the check-in time will be recorded.
- When meeting is over visitor will press check-out button and enter email address to check out. Check out time will be recorded and Details of the meeting will be sent to visitor. And the details of the visitor will now be pushed to another page and removed from dashboard.
```
Security and Caution
1. Once a visitor has checked in, he cannot use the feature again unless he checks out.
2. Prevention of duplicate information of existing host.
3. Visitor needs to be physically present for verification, otherwise form can be misused.
4. All necessary cases of error are covered, like if someone try to check out again even after checking out 
    earlier he will be asked to check in again, etc.
5. Flash messages are added for errors and success response.

Features
1. Dashboard contains data of live visitors(Checked in but not checked out yet) only, making it easier to focus 
    on data that needs immediate attention of the administrator.
2. After a completed visit(after check out), data will be pushed(filtered out) to another page.
3. Details of past visits can be accessed on other page after clicking button on dashboard.
4. Visitors and host can be filtered and searched on the basis of name and mobile number.
5. Host details can be seen by hovering on their name.
6. Existing Host details will be present on check in form page in scrollable structure, one can search their host 
    from given search bar.
7. If host is `Inactive`( If he is with any Visitor), `Radio button` will be disabled and appear in `Red` color.
```

## Technical Approach
- Visitor details on dashboard are fetched from backend by hitting `{baseURL}/visitor` GET API.
- Host registration form is submitted on hitting `{baseURL}/host` POST API and based on response `flash message` will appear.
- Check In details will be posted using `{baseURL}/checkIn` API then `mail and sms` will be sent through `Sendgrid` and `Twilio` services.
- When Check Out button is pressed, a modal will appear visitor need to fill `Email Address`, check out time will updated on database by hitting `{baseURL}/checkOut` API and mail Service will be triggerd to send meeting details to visitor.
- On past visitor details page we are fetching all visitors details from `{baseURL}/visitor` API.
- Search bar implemented on frontend by filtering from the visitors and host data.
>baseURL => http://localhost:4000

***
## Installation
- Clone the repository using `git clone` and then change the directory to root of the project
``` 
    git clone https://github.com/ahmadkhan242/Entry-manager.git
    cd Entry-manager
```
- Use npm to install dependencies for the project.
```
> npm i  #For Backend dependencies

> npm run fn-install  #For Frontend dependencies 
```
- Set up your database using pg admin.
- Create .env file in root folder and add necessary credentials with varibles given below.
> IS_DEV is true, so that server should run on development which allow to resync the database again and again after some changes on backend in `development`.
```bash
  DATABASE_NAME = 'database name'
  DB_USER = 'user name'
  PASSWORD = 'user password'
  
  IS_DEV='true' 
  
  SENDGRIDAPIKEY = 'sendgrid api key'

  ACCOUNT_SID ='twilio accout sid'
  AUTH_TOKEN = 'twilio auth token'
  twilioNumber = 'Number provided by twilio'
```
- Run the program by npm using
```
> npm run dev
```
- Above command will start both frontend and backend server.
> Frontend => http://localhost:3000

> Backend => http://localhost:4000
***
## Folder Structure
> FLOW - routes -> controller -> validations -> controller -> services -> dao 
- `config` - All configuration files like twilio, sendgrid and general config file.
- `controller` - It has files which are responsible for payload(like validating payload) and response.
- `dao` - Data Access  Object, here we define all function which take care of data access, update etc from database, if we want to change database we need change this file only.
- `helper` - It has files which helps in certain services like uuid generation, email templates.
- `models` - It has files which define database structure of specific table.
- `routes` - Here all files refers to specific routes, here only we define GET, POST or PUT request.
- `services` - Here all files refers to logics behind specific api, mailServices and smsServices can be used in any other api services by just passing payload to these services.
- `validations` - here each file refer to specific routes, and use for payload validations.
> In above folders One `index.js` file is common to dao, models, routes and services. This file helps to import all files from folder by just importing that folder. Here I used glob package for this.
```bash
─── Entry-manager
    ├── src
    │   ├── backEnd
        │    ├── config
        │    ├── controller
        │    ├── dao
        │    ├── helper
        │    ├── models
        │    ├── routes
        │    ├── services
        │    └── validations
        ├── frontEnd
        │    ├── public
        │    └── src
        │        └── components
        │    
        ├── .env {file}
        ├── app.js {file}
        └── package.json {file}
```
***
## Future Features
>As `Professor Yann LeCun` says `"Our intelligence is what makes us human, and AI is an extension of that quality."` So here we can extend the quality this software using Facial recognition.
- We can use ml5.js (a high level implementation of tf.js) or we can make separate `micro service` using pyhton.
- It reduce user interaction and save time. It is a key feature for every tech giant to do work in minimal time and less user interaction.
- It will be very easy for Second time visitor, he/she has to choose host only and check in. And face recognition to check out (`Simple`).
***
## Sample Screenshot
> All Screenshots [Click Here](https://drive.google.com/open?id=1sFy_wx7CQI99mlkvQyXcZu5pDbjMGVmO)

|Screenshot|
|-|
| Main Page (Dashboard and Host details can be seen by hovering over host name) |
| ![new](https://drive.google.com/uc?export=view&id=1jL_3Ef1M1-wtgoemJ3WvAJ43kDyF48-d) |
| Host Registration Form |
| ![](https://drive.google.com/uc?export=view&id=1zptJPoMUruEqpbfPT_gw4n7VMvnt8_q2) | 
| Check In Form (Details of ACTIVE(in green) and INACTIVE(in red) Host are available in scrollable, click to select Host) |
| ![](https://drive.google.com/uc?export=view&id=1wTz9QeRDi32rpSUJcjZfHJWwQXxb6U_o) | 
| Check Out Form |
| ![](https://drive.google.com/uc?export=view&id=1NZigYlJT2j7Q_DKo0Y2_l6NlFAAS-29a) | 
| All Entries Page (Host details can be seen by hovering over host name) |
| ![](https://drive.google.com/uc?export=view&id=1OIuNQG42FtB2fbRSwNdv91ssEqfBNFMn) | 
***
### Thanks and Regards
#### Mohammad Ahmad 
### Resume [Click Here](https://drive.google.com/file/d/1oDcaV35hWI7WxfKGTljNDbU0KZ6qp8in/view?usp=sharing)
