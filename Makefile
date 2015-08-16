lib/main.coffee:
	mkdir -p lib
	coffee -o lib -c src

doc/index.html:
	biscotto
