# AlphiJS

Hybrid petite-vue framework for visual website builders.

AlphiJS allows you to decouple your JavaScript logic from your frontend page builder to build scalable and maintainable low-code projects.

AlphiJS was inspired by [![javascript logo](https://api.iconify.design/logos:nuxt.svg)](https://v3.nuxtjs.org/) 😍

[![Edit alphi-js](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/LOCOWD/alphi-js/tree/main/?fontsize=14&hidenavigation=1&theme=dark)

## Table of contents

- [⚡️ Included Tools](#%EF%B8%8F-included-tools)
- [🛠 Setup](#-setup)
- [🎮 Quick start](#-quick-start)
- [🏗 Build](#-build)

  - [Development](#development)
  - [Production](#production)

- [![javascript logo](https://api.iconify.design/logos:javascript.svg) Serve JavaScript files](#-serve-javascript-files)
  - [Localhost](#localhost)
  - [CodeSandbox](#codesandbox)
- [🏝 Index.html](#-indexhtml)
- [💝 Special Thanks](#-special-thanks)

## ⚡️ Included Tools

- ![vue logo](https://api.iconify.design/logos:vue.svg) [**petite-vue**](https://github.com/vuejs/petite-vue): An alternative distribution of Vue optimized for progressive enhancements.

- ![vite logo](https://api.iconify.design/logos:vitejs.svg) [**Vite**](https://github.com/vitejs/vite): Is a new breed of frontend build tooling that significantly improves the frontend development experience.

- 😱 [**ohmyfetch**](https://github.com/unjs/ohmyfetch): "A better Fetch API"

- [![tailwindcss logo](https://api.iconify.design/logos:tailwindcss-icon.svg) **TailwindCSS**](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom user interfaces.

- 🌼 [**daisyUI**](https://daisyui.com/): The most popular, free, open-source Tailwind CSS component library.

## 🛠 Setup

The fastest way to set up an environment is to open the template in CodeSandbox.

[![Edit alphi-js](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/LOCOWD/alphi-js/tree/main/?fontsize=14&hidenavigation=1&theme=dark)

Alternatively, you can clone the repository.

After cloning the repository, open it in your terminal and install the packages by running:

```bash
$ npm install

#or
$ yarn install
```

## 🎮 Quick start

The AlphiJS **/src** directory includes two directories:

- **Components**: Create reusable logic which can be scoped to UI elements. [View example](https://github.com/vuejs/petite-vue#components)

- **Pages**: Organise your JavaScript logic by page.

Explore the Todo List demo **/src/pages/index.js** to learn more.

## 🏗 Build

### Development

Start's the ![vite logo](https://api.iconify.design/logos:vitejs.svg) Vite development server.

```bash
$ npm run dev

#or
$ yarn run dev
```

### Production

Build each file in the **/pages** directory and produce a bundle for each.

```bash
$ npm run build

#or
$ yarn run build
```

## ![javascript logo](https://api.iconify.design/logos:javascript.svg) Serve JavaScript files

### Localhost

```html
<script type="module">
  import { app } from "http://localhost:3000/src/pages/{FILE_PATH}.js";
  app.mount("#app");
</script>
```

### CodeSandbox

```html
<script type="module">
  import { app } from "https://{YOUT_PROJECT}.sse.codesandbox.io/src/pages/{FILE_PATH}.js";
  app.mount("#app");
</script>
```

## 🏝 Index.html

The index.html acts as a sandbox where you can experiment with components. Here you can make use of the daisyUI component framework.

## 💝 Special Thanks

The **Todo Demo** was built with:

- [JSON Placeholder](https://jsonplaceholder.typicode.com/) Free fake API for testing and prototyping.
