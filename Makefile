dc = docker-compose
dc_run_web = $(dc) run web

# This just sets up the project, you never need this, only in a new project.
initial-setup:
	export UID=${UID}
	export GID=${GID}
	$(dc_run_web) npm init -y && npm install ronin-server ronin-mocks && touch server.js

bash:
	export UID=${UID}
	export GID=${GID}
	$(dc_run_web) bash

build:
	export UID=${UID}
	export GID=${GID}
	$(dc) build --no-cache

up:
	$(dc) up