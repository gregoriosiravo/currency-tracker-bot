# CURRENCY TRACKER BOT 

A feature-rich bot built with Node.js and TypeScript, designed to handle tasks like notifications, automation, and integrations. This bot is highly customizable and can be easily extended to suit your specific needs.

Currently, the bot tracks a list of currencies against the BRL (Brazilian Real) and checks their values every 10 minutes, sending a notification if the exchange rate reaches the goal you set.

## Features

- **Track Currency Goals**: Add, update, show list, delete currency tracking goals.
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
   git clone https://github.com/gregoriosiravo/currency-tracker-bot.git
   cd currency-tracker-bot
   npm install
   cp .env.example .env
   ```
2. add your telegram bot token into .env

3. Compile the Project using docker:
   ```bash
    docker-compose up --build
    ```
## Deploy 
1. Clone the repository to your server:
   ```bash
   git clone https://github.com/gregoriosiravo/currency-tracker-bot.git
   ```
2. use Dockerfile.prod:
   ```bash
   rm -r Dockerfile
   cp Dockerfile.prod Dockerfile
   ```
3. add .env and bot infos:
   ```bash
   cp .env.example .env
   ```
4. run docker:
   ```bash
   docker-compose up --build
   ```
