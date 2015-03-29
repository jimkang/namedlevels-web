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
	wzrd index.js -- \
		-d \
		-x idmaker \
		-x lodash \
		-x basic-browser-request

pch: smash # smash-debug
	node_modules/.bin/browserify \
		lib/d3-small.js \
		-r idmaker \
		-r lodash \
		-r basic-browser-request \
		-o pch.js

build: smash
	$(BROWSERIFY) index.js | $(UGLIFY) -c -m -o namedlevels.js

css:
	$(MYTH) namedlevels_src.css namedlevels.css

DEVTAGS = <script\ src="pch.js"><\/script><script\ src="index.js"><\/script>
PRODUCTIONTAGS = <script\ src="namedlevels.js"><\/script>

switch-index-to-dev:
	sed 's/$(PRODUCTIONTAGS)/$(DEVTAGS)/' index.html | tee index.html

switch-index-to-production:
	sed 's/$(DEVTAGS)/$(PRODUCTIONTAGS)/' index.html | tee index.html

test:
	node tests/profile-to-rows-tests.js
