# CURRENCY TRACKER BOT 

A feature-rich bot built with Node.js and TypeScript, designed to handle tasks like notifications, automation, and integrations. This bot is highly customizable and can be easily extended to suit your specific needs.

AT THE MOMENT THE BOT TRACK EVERY CURRENCY TO BRL ( BRAZILIAN REAL )

## Features


## Features

- **Track Currency Goals**: Add, update, or delete currency tracking goals.
- **Notifications**: Get notified when a currency reaches a defined goal.
- **TypeScript Support**: Ensures robust and maintainable code.
- **Database Integration**: Stores user data and tracking configurations.
- **Docker Support**: Easily deploy using Docker and Docker Compose.
- Modular and extensible architecture.
- Easy to set up and deploy.
- Supports various platforms (Telegram, Discord, Slack, etc.).
- Built-in support for environment variables and configuration.

## Requirements

- [Node.js](https://nodejs.org/) (version 16 or later)
- [npm](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/) (installed globally)
- [Docker](https://www.docker.com/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sirap95/currency-tracker-bot.git
   cd currency-tracker-bot
   npm install
   cp .env.example .env
   ```
2. add your telegram bot token into .env

3. Compile the Project using docker:
   ```bash
    docker-compose up --build
    ```
