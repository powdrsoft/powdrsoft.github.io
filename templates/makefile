BUILD_TARGET := build

.PHONY: clean
clean:
	@echo CLEAN $(BUILD_TARGET)
	@rm -f $(BUILD_TARGET)

.PHONY: build
build:
	@echo BUILD $(BUILD_TARGET)
	@mkdir -p $(BUILD_TARGET)

.PHONY: deploy
deploy:
	@echo BUILD $(BUILD_TARGET)
	@mkdir -p $(BUILD_TARGET)

.PHONY: all
all: clean build deploy

