.PHONY: dep

dep: package.json
	rm -fr node_modules
	npm install -d
	patch -p0 < webshot.patch


