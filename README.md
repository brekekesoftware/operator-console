# Brekeke Operator Console

## Get started

```bash
npm install
npm run build:dev             # build for development
npm run build:dev -- --watch  # build for development with auto rebuilding
npm run build:prd             # build for production
```

After building, you can use some static HTTP server to host `dist` directory.
For example:
```bash
cd dist
python3 -m http.server 8080
```

Then open http://localhost:8080/operator-console.html in your browser.
To edit layouts, please login as an admin user.

## Project strcture

```
src
├── callPanel.jsx  # the LCD display component
├── callPanel.scss #
├── i18n.js        # internalization library
├── icons.js       # some SVG icons from webphone
├── index.jsx      # entry component
├── index.scss     #
├── login.jsx      # login component
├── login.scss     #
└── logo.svg       # brekeke logo on the top-left
```

## Edit translations

* Engish: dist/locales/en.json
* Japanese: dist/locales/ja.json

