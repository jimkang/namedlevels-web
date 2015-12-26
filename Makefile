D3SRC = node_modules/d3/src
MYTH = node_modules/.bin/myth
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

run: css
	wzrd app.js:index.js -- \
		-d

build: smash
	$(BROWSERIFY) app.js | $(UGLIFY) -c -m -o index.js

css:
	$(MYTH) namedlevels_src.css namedlevels.css

test:
	node tests/profile-to-rows-tests.js
	node tests/sanitize-segment-tests.js
	node tests/get-xp-brackets-tests.js

run-production-style: build
	python -m SimpleHTTPServer

deploy-to-production-repo: css build
	cp index.js ../namedlevels && \
	cp namedlevels.css ../namedlevels && \
	cp lib/seedrandom.min.js ../namedlevels/lib && \
	cp lib/d3-small.js ../namedlevels/lib && \
	cp index.html ../namedlevels
