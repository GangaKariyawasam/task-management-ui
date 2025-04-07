# Task Management UI - Frontend

This is the frontend service for the Task Management System, built using React. It provides an interface for task management with user authentication and authorization via JWT.

## Features

- **User authentication with JWT.**
- **Task management UI (CRUD operations).**
- **Integrates with the backend API for task data.**
- **Uses Ant Design components for UI elements.**

## Built With

- **React**
- **Vite** (for fast development build)
- **Ant Design** (for UI components)
- **JWT** (for user authentication)
- **Axios** (for HTTP requests)

## Getting Started

These instructions will help you set up a local copy of this project for running and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 14.x or higher)
- **pnpm** (for package management)

### Running the Project

1. Clone the Repository

    ```bash
    $ git clone https://github.com/your-repo/task-management-ui.git
    $ cd task-management-ui
    ```

2. Install Dependencies

    ```bash
    $ pnpm install
    ```

3. Start the Development Server

    ```bash
    $ pnpm dev
    ```

4. Access the UI

    The frontend will be available at:

    ```
    http://localhost:5173
    ```

### Building the Project for Production

To build the production version of the project:

```bash
$ pnpm build
