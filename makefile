BUILD_TARGET := build

.PHONY: clean
clean:
	@echo CLEAN $(BUILD_TARGET)
	@rm -f $(BUILD_TARGET)

.PHONY: test
test:
	@echo hugo server
	@cd hugo; hugo server

.PHONY: build
build:
	@echo BUILD $(BUILD_TARGET)
	@mkdir -p $(BUILD_TARGET)

.PHONY: deploy
deploy:
	@echo DEPLOY to powdrsoft.com
	git push

