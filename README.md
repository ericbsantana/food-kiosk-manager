# Kiosk management

The project contains two packages: `backend` and `frontend`. The `backend` is a Node project and the `frontend` is a React project.

The `backend` is an Express application developed with TDD and. The `frontend` is a React application created with TailwindCSS and React Router. These are the main dependencies of these projects.

Took me **26 hours to finish this project**, accordingly to [git-hours](https://github.com/kimmobrunfeldt/git-hours).

## How to install

To install both of its dependencies, run the following command in the root directory:

```sh
npm install
```

## How to run this project locally

To run both packages, simply run on the root of this repository:

```sh
lerna run start
```

This will start the backend project on the port 3001 and the frontend on the port 3000. You may notice that the project is revealing its credentials on `development.json`. This is intentional and its fine.

## Things to be improved on this project:

- Add tests to the frontend. I've never used jest on the frontend, so it would be nice to do a TDD with components :)
- Dockerize the entire project (at least to run mongo locally)
- The frontend design (sorry for this!)
- The components should be more flexible. Buttons, for instance, should be able to receive `disabled` prop and change its style with dynamic classNames such as `${buttonProps.className} {buttonProps.disabled ? 'css-to-override-and-disabled-button' : '' }`
- The edit form should not be able to submit if there were no changes on the initial state data
- Create even more components (for the table rows, columns and cells, for instance)
- Move the Form to a component;
- Move the inputs to custom components with its classNames (using `forwardRef`)
