# totdolistapp

Backend Files and Setup
todo-list-app/
└── backend/
    ├── node_modules/        (created when npm install is run)
    ├── server.js            (Express server)
    ├── package.json         (backend dependencies and scripts)
    └── package-lock.json    (lock file for npm dependencies)

cd backend
npm init -y

npm install express pg body-parser cors

Frontend Files and Setup (React)
todo-list-app/
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── TaskList.js       (Component to display tasks)
    │   │   └── Task.js           (Component for individual task item)
    │   ├── App.css               (CSS styles)
    │   ├── App.js                (Main component)
    │   ├── index.css
    │   └── index.js
    ├── .env.local                (Optional: for environment variables)
    ├── package.json              (frontend dependencies and scripts)
    └── README.md                 (Project documentation)
