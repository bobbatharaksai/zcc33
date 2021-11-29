# zcc33

App Layout =>

![image](https://user-images.githubusercontent.com/75378638/143871819-5ae67110-87ed-4387-b0d3-1dcdb05b6ba5.png)

![image](https://user-images.githubusercontent.com/75378638/143871920-ca175c21-475d-4201-9993-f8ca032b4d94.png)

Technical Stack => Javascript, ReactJS (Frontend) and Express (Backend)

### Steps to run the application:

Requirements - Node and create-react-app preinstalled on the machine

Follow the links provided to install these dependencies, https://nodejs.org/en/download/

    // Enter the application directory
    cd zcc-tickets

    // This installs all the dependencies, which have been mentioned in package.json
    npm install
    
    // We are using a single command to run both the express server and reactjs server,
    // Express server is configured to listen on port 3001, while reactjs server is configured on 3000
    // Try to find and kill existing processes running on ports 3000 and 3001 using,
    kill -9 $(lsof -ti:3000, 3001)
    
    // Use the following command to run both frontend and backend servers at one click,
    npm start
    
    
