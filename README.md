# React Typescript

## Tech Stack

Here's a curated list of packages that you should be at least familiar with before starting your project. However, the best way to see a complete list of the dependencies is to check `package.json`.

### Core

- [ ] [React](https://facebook.github.io/react/)
- [ ] [React Router](https://github.com/ReactTraining/react-router)
- [ ] [Connected React Router](https://github.com/supasate/connected-react-router)
- [ ] [Redux](http://redux.js.org/)
- [ ] [Redux Saga](https://redux-saga.github.io/redux-saga/)
- [ ] [Styled Components](https://github.com/styled-components/styled-components)
- [ ] [Ant Design framework](https://ant.design)

### Testing

- [ ] [Cypress](http://cypress.io)
- [ ] [Storybooks](https://storybook.js.org)

### Linting

- [ ] [ESLint](http://eslint.org/)
- [ ] [Prettier](https://prettier.io/)

### Project Scaffolding

- [ ] [Create React App](https://github.com/facebook/create-react-app)

### Resources

- [ ] [Resources (Curated list of resource for React/Redux/ES6and more)](https://github.com/markerikson/react-redux-links)
- [ ] [Reactiflux](https://www.reactiflux.com)
- [ ] [Hero35 React Hub](https://hero35.com/topic/react)
- [ ] [React Talks](https://github.com/tiaanduplessis/awesome-react-talks)



## Project Structure
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Let's start with understanding why we have chosen our particular structure. It has been an [evolving discussion](https://github.com/react-boilerplate/react-boilerplate/issues/27), and if you have an afternoon or two we recommend you read the full thread.

In any case, here's the TL;DR:

- You will write your app in the `src` folder. This is the folder you will spend most, if not all, of your time in.

### `src/`

We use the [container/component architecture](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4rmjqneiw). `containers/` contains React components which are connected to the redux store. `components/` contains dumb React components which depend on containers for data. **Container components care about how things work, while components care about how things look.**

We've found that for many applications treating single pages (e.g. the LoginPage, the HomePage, etc.) as containers and their small parts (e.g. the Login form, the Navigation bar) as components works well, but there are no rigid rules. **Bend the architecture to the needs of your app, nothing is set in stone!**


### Redux

Redux is going to play a huge role in your application. If you're new to Redux, we'd strongly suggest you to complete this checklist and then come back:

- [ ] Understand the motivation behind Redux
- [ ] Understand the three principles of Redux
- [ ] Implement Redux in a small React app of yours

The Redux `store` is the heart of your application. Check out [`configureStore.ts`](src/configureStore.ts) to see how we have configured the store.

The store is created with the `createStore()` factory, which accepts three parameters.

1.  **Root reducer:** A master reducer combining all your reducers.
2.  **Initial state:** The initial state of your app as determined by your reducers.
3.  **Middleware/enhancers:** Middlewares are third party libraries which intercept each redux action dispatched to the redux store and then... do stuff. For example, if you install the [`redux-logger`](https://github.com/evgenyrodionov/redux-logger) middleware, it will listen to all the actions being dispatched to the store and print previous and next state in the browser console. It's helpful to track what happens in your app.

In our application we are using two such middleware.

1.  **Router middleware:** Keeps your routes in sync with the redux `store`.
2.  **Redux saga:** Used for managing _side-effects_ such as dispatching actions asynchronously or accessing browser data.

### Redux Saga

If your application is going to interact with some back-end application for data, we recommend using redux saga for side effect management. Too much jargon? Let's simplify.

Imagine that your application is fetching data in json format from a back-end. For every API call, ideally you should define at least three kinds of [action creators](http://redux.js.org/docs/basics/Actions.html):

1.  `API_REQUEST`: Upon dispatching this, your application should show a spinner to let the user know that something's happening.
2.  `API_SUCCESS`: Upon dispatching this, your application should show the data to the user.
3.  `API_FAILURE`: Upon dispatching this, your application should show an error message to the user.

And this is only for **_one_** API call. In a real-world scenario, one page of your application could be making tens of API calls. How do we manage all of them effectively? This essentially boils down to controlling the flow of your application. What if there was a background process that handles multiple actions simultaneously, communicates with the Redux store and react containers at the same time? This is where redux-saga comes into the picture.

The mental model is that a saga is like a separate thread in your application that's solely responsible for side effects. `redux-saga` is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.

## Available Scripts

In the project directory, you can run:

### `yarn`

Install all dependency in package.json before you should install yarn in your system

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
