# Chat App Frontend (Next.js)

This is the frontend of the real-time chat app, built with **Next.js**. It provides user authentication, friend management, and live messaging with WebSocket integration.

---

## Features

- Responsive UI with modern design
- JWT-based login and signup flow
- Real-time chat interface using Socket.IO
- Friends with search, request, approval, and rejection
- Delivery notifications for sent messages

---

## Tech Stack

- **Framework**: Next.js (TypeScript)
- **State Management**: Context API and useState
- **Real-Time**: Socket.IO Client
- **Styling**: Bootstrap 5.3
- **Notifications**:
  - [`react-hot-toast`](https://github.com/timolins/react-hot-toast)
  - [`react-toastify`](https://github.com/fkhadra/react-toastify)
- **Auth**: JWT stored via localStorage
- **Deployment**: AWS EC2 (Node.js environment)
- **CI/CD**: AWS CodePipeline + CodeBuild + GitHub

---

## Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/AnverDole/chat-app-fe.git
   cd chat-app-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**  
   Create a `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://<your-backend-url> 
   ```

4. **Run the app**
   ```bash
   npm run dev
   ```

---

## Deployment

- Frontend is deployed to **AWS EC2** instance with Elastic Beanstalk.
- CI/CD pipeline is managed via **AWS CodePipeline**.
- Production build via:
  ```bash
  npm run build && npm run start
  ```

> Make sure to export `$PORT` variable to the shell before running in production.

---

## Extra Features

- Friend search and request management (approve/reject)
- Delivery notifications for messages
- CI/CD integrated with GitHub via CodeCommit and AWS services

---

## Assumptions and Limitations

- No user presence or typing indicators yet
- Messages are not paginated
- Signup email verification feature is omitted for ease of testing.

