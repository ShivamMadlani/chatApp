# Chat Application

Welcome to the Chat Application! This real-time chat application is built using Node.js, Socket.io, Mongoose, and Tailwind CSS.

## Table of Contents

- [Introduction](#introduction)
- [Working of the App](#working-of-the-app)
- [Installation](#installation)
- [Contributing](#contributing)

## Introduction

The Chat Application is a real-time chat platform that allows users to create and join chat rooms, send messages, and engage in conversations with others in real-time. It's built using the following technologies:

- **Node.js:** The server-side JavaScript runtime environment.
- **Socket.io:** A library for real-time, bidirectional communication between web clients and servers.
- **Mongoose:** An elegant MongoDB object modeling tool.
- **Tailwind CSS:** A utility-first CSS framework for building responsive and stylish user interfaces.

## Working of the App

The Chat Application works by establishing a WebSocket connection using Socket.io between the server and the client. Here's how it works:

1. Users can create an account or log in with their credentials.
2. Once logged in, users can create or join chat rooms.
3. In a chat room, users can send and receive real-time messages from other participants.
4. Socket.io ensures instant message delivery to all users in the same chat room.
5. Messages are stored in MongoDB using Mongoose for persistent storage.

## Installation

To run the Chat Application locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/chat-application.git
2. Change to the project directory:

    ```bash
    cd chatApp