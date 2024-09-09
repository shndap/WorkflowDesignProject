# Web-Based Project Management Software

This is a web-based application designed to help companies manage projects, control their employees, and add tasks. It includes a Dashboard component, Kanban board with drag-and-drop functionality, and integration with Camunda.

## Features

- **Header**: Includes a logo, search bar, user profile, notifications, and settings icons.
- **Sidebar**: Provides links to Dashboard, Projects, Tasks, Employers, Reports, and Camunda Integration. Collapsible with dynamic styling.
- **Dashboard**: Displays widgets for project/task statistics and a Kanban board with drag-and-drop functionality.
- **Home Page**: A welcoming page with a stylish design.
- **Not Implemented Yet Page**: A placeholder for future functionality.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine. You can download Node.js from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install dependencies:**

    Run the following command to install the project dependencies:

    ```bash
    npm install
    ```

### Running the Application

1. **Start the development server:**

    Run the following command:

    ```bash
    npm start
    ```

    This will start the development server and open the application in your default web browser. The server will watch for changes and automatically reload the page.

2. **Open the application:**

    By default, the application will be available at `http://localhost:3000`. You can navigate to different routes using the sidebar.

### File Structure
```
src/
│
├── assets/
│   ├── logo.png
|
├── components/
│   ├── Header/
│   │   ├── Header.js
│   │   └── Header.css
│   │
│   ├── Sidebar/
│   │   ├── Sidebar.js
│   │   ├── Sidebar.css
│   │   └── sidebar-logo.svg
│   │
│   ├── Dashboard/
│   │   ├── Dashboard.js
│   │   └── Dashboard.css
│   │
│   ├── Home/
│   │   ├── Home.js
│   │   └── Home.css
│   │
│   └── NotImplementedYet/
│       ├── NotImplementedYet.js
│       └── NotImplementedYet.css
│
├── App.js
├── App.css
└── index.js

public/
│
├── index.html

package.json
README.md

```
- `src/`
  - `components/`
    - `Header/`: Header component files.
    - `Sidebar/`: Sidebar component files.
    - `Dashboard/`: Dashboard component files including Kanban board.
    - `Home/`: Home component files.
    - `NotImplementedYet/`: Component files for the "Not Implemented Yet" page.
  - `App.js`: Main application file with routing configuration.
  - `App.css`: General styling for the application.
  - `index.js`: Entry point for the React application.
- `public/`
  - `index.html`: Main HTML file.
- `package.json`: Project metadata and dependencies.
- `README.md`: This file.

### Available Scripts

- `npm start`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm test`: Runs the test suite.
- `npm run eject`: Removes the single build dependency from your project (not recommended unless necessary).

### Troubleshooting

- **Icons Not Displaying**: Ensure that FontAwesome icons are correctly installed and imported.
- **Header or Sidebar Overlapping Content**: Verify CSS properties and ensure that `z-index` values are set correctly.
