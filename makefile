.PHONY: build run test

default:
	@echo "Be specific!"

build:
	@bun run build

run:
	@bun run start

test:
	@bun run test