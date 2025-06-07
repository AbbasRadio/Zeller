This repository contains a complete full stack project setup with:
- Frontend: React Native application located in the `/App` folder.
- Backend: Node.js mock server located in `/Backend-server/mock-server`.


📁 Project Structure

.
├── App/                         # React Native Frontend
└── Backend-server/
    └── mock-server/
        └── index.js            # Node.js Backend Entry Point


🚀 Getting Started
Follow the steps below to set up and run both the backend and frontend of the project.
🔌 1. Start the Backend Server
The backend is a Node.js-based mock server that serves data to the React Native app.
📍 Location: Backend-server/mock-server/index.js
✅ Steps:
1. Open a terminal and navigate to the server directory:
   cd Backend-server/mock-server

2. Start the server using Node.js:
   node index.js

Note:
- Make sure Node.js is installed on your machine.
- The server will typically run on http://localhost:3000 (adjust if necessary).


📱 2. Start the React Native App
The frontend is a React Native application located in the /App folder.
📍 Location: App/
✅ Steps:
1. Open a new terminal and navigate to the App directory:
   cd App

2. Install dependencies:
   npm install
   # or
   yarn install

3. Start the app:
   For Android:
     npx react-native run-android

   For iOS (macOS only):
     npx react-native run-ios

Note: Ensure an Android/iOS emulator is running or a device is connected.


📦 Prerequisites
Make sure the following tools are installed on your system:
- Node.js (v14 or above)
- npm or yarn
- React Native CLI
- Android Studio / Xcode (depending on platform)
- Java Development Kit (for Android builds)


💡 Tips
- Always run the Node.js server before launching the React Native app to avoid API failures.
- If you make changes in index.js, restart the server.
- Use tools like Postman to test backend APIs separately.
