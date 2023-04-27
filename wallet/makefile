.PHONY: all clean

SRC=wallet.js @certhis/certhis-wallet/lib/*.js webpack.config.js
TARGET=wallet_bundle.js

all: $(TARGET)

clean:
	rm -f $(TARGET)  

$(TARGET): $(SRC)
	npm run build

