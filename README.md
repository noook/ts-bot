# MBTI Discord bot

## Setup

### Development environment

1. Install Docker
2. Install the dependencies with `docker-compose run bot npm i`
3. Copy `.env` to `.env.dist` and fill in the credentials
4. Execute migrations with `docker-compose run bot npm run typeorm migration:run`
5. You can run the stack by running `docker-compose up -d`
6. To check the logs you can either attach your shell to the process with `docker attach bot` or use VS Code Debugger
7. Load questions in the database with `docker-compose run bot npm run bin questions:load`
8. Stop containers with `docker-compose down`

### Useful commands

- `docker-compose up -d` Runs containers
- `docker-compose down` Shuts down containers
- `docker-compose run bot <command>` Runs a command in the node container (bot)
- `docker-compose run bot npm run bin questions:load` Run the command located in `src/bin` folder
- `docker-compose run bot npm run typeorm migration:run` Runs the migrations
- `docker-compose run bot npm run typeorm migration:generate -- -n <migration name>` Generates a migration file
