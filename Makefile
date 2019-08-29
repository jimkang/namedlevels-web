include config.mk

HOMEDIR = $(shell pwd)
D3SRC = node_modules/d3/src
BROWSERIFY = node_modules/.bin/browserify
UGLIFY = node_modules/.bin/uglifyjs

D3_LIBRARY_FILES = \
	$(D3SRC)/start.js \
	$(D3SRC)/compat/index.js \
	$(D3SRC)/selection/selection.js \
	$(D3SRC)/arrays/range.js \
	$(D3SRC)/transition/index.js \
	$(D3SRC)/event/mouse.js \
	$(D3SRC)/end.js

smash: $(D3_LIBRARY_FILES)
	node_modules/.bin/smash $(D3_LIBRARY_FILES) | \
	node_modules/.bin/uglifyjs - -c -m -o lib/d3-small.js

smash-debug: $(D3_LIBRARY_FILES)
	node_modules/.bin/smash $(D3_LIBRARY_FILES) > lib/d3-small.js

run:
	wzrd app.js:index.js -- \
		-d

build: smash
	$(BROWSERIFY) app.js | $(UGLIFY) -c -m -o index.js

test:
	node tests/profile-to-rows-tests.js
	node tests/sanitize-segment-tests.js
	node tests/get-xp-brackets-tests.js

run-production-style: build
	python -m SimpleHTTPServer

pushall: build sync
	git push origin master

sync:
	rsync -a $(HOMEDIR)/ $(USER)@$(SERVER):$(APPDIR) --exclude node_modules/ \
		--omit-dir-times --no-perms

prettier:
	prettier --single-quote --write "**/*.js"

