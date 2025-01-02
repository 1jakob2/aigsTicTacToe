# Starting the Application

Follow these steps to start the TicTacToe application locally:

## 1. Clone the Repositories
- Clone the **Frontend repository** using an IDE like WebStorm or VS Code:
  ```bash
  git clone https://github.com/1jakob2/aigsTicTacToe
  ```
- Clone the **Backend repository** using an IDE like IntelliJ:
  ```bash
  git clone https://github.com/1jakob2/aigsTicTacToeBackend
  ```

## 2. Ensure Required Tools Are Installed
- **Node.js and npm**: If not already installed, download and install Node.js from [nodejs.org](https://nodejs.org) or use the following command:
  ```bash
  # For macOS or Linux (using Homebrew):
  brew install node

  # For Windows: Download the installer from the Node.js website.
  ```
- Verify the installation:
  ```bash
  node -v
  npm -v
  ```

## 3. Start the Frontend
- Navigate to the frontend directory:
  ```bash
  cd aigsTicTacToe
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the application:
  ```bash
  npm run dev
  ```

## 4. Start the Backend
- Open the backend project in IntelliJ or another Java IDE.
- Run the `main` method to start the backend service.

## 5. Access the Application
- Open the frontend in your browser at `http://localhost:5173/` (default for WebStorm's dev server).
- Ensure the backend service is running at `http://localhost:50005/`.
- Register a new user or log in with the test-user (username "Brad", password "woof")

With these steps completed, the TicTacToe application should be fully functional locally.
