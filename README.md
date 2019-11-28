# Node Typescript starter

## Setup

### Development environment

1. Install Docker
2. Install the dependencies with `docker-compose run app npm i`
3. Copy `.env` to `.env.dist` and fill in the credentials
4. You can run the stack by running `docker-compose up -d`
5. To check the logs you can either attach your shell to the process with `docker attach app` or use VS Code Debugger
6. Stop containers with `docker-compose down`

### Useful commands

- `docker-compose up -d` Runs containers
- `docker-compose down` Shuts down containers
- `docker-compose run app <command>` Runs a command in the node container (app)
