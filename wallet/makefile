.PHONY: all clean

SRC=wallet.js
TARGET=wallet.bundle.js

all: $(TARGET)

clean:
	rm -f $(TARGET)  

$(TARGET): $(SRC)
	npm run build

