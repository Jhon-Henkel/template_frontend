cf-bash:
	@echo "Starting sh..."
	docker compose start && docker exec -it cf_frontend sh

PHONY: cf-bash
