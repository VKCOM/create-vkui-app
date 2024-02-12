# Deprecated

> **Warning**
>
> Please use https://github.com/VKCOM/create-vk-mini-app.

# Create VKUI App

## How to use

### With NPX

```bash
npx create-vkui-app <project-directory>
```

[NPX](https://github.com/npm/npx) allows you to always use the **latest** version of the package without a global installation.

### With installing the package globally

Install the package globally via yarn

```bash
yarn global add create-vkui-app
```

and use as follows

```bash
create-vkui-app <project-directory>
```

This way is less recommended because you will have to update the package yourself.

#### `--help` or `-h`

Prints the synopsis and a list of options

## Scripts

Inside the newly created project, you can run some built-in commands:

#### `yarn start`

Runs the app in development mode. Open http://localhost:8080 to view it in the browser.

The page will automatically reload if you make changes to the code. You will see the build errors and lint warnings in the console.

#### `yarn run build`

Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed.
