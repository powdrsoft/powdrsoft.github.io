BUILD_TARGET := docs

.PHONY: clean
clean:
	@echo CLEAN $(BUILD_TARGET)
	@rm -rf $(BUILD_TARGET)

.PHONY: test
test:
	@echo hugo server
	@cd hugo; hugo server

.PHONY: deploy
test-target:
	@echo DEPLOY to powdrsoft.com
	@cd $(BUILD_TARGET); python -m SimpleHTTPServer

.PHONY: build
build:
	@echo BUILD $(BUILD_TARGET)
	@mkdir -p $(BUILD_TARGET)
	@cd hugo; hugo --gc --minify

.PHONY: deploy
deploy:
	@echo DEPLOY to powdrsoft.com
	git push

