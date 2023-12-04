# Happy fox

## Hierarchial representation of data

# Setup

#### Prequisites

1. [Node.js](http://nodejs.org/) installed
2. [Miragejs](https://miragejs.com/) installed

#### Project Setup

```
$ git clone https://github.com/Udaya-Prakash-AU19/Happyfox-project
$ npm install
$ npm start                             # Start up the server
```

#### Steps To Start Application

1. Open terminal and navigate to **happyfoxasg** directory
2. For development build, execute `npm start`.

### Packages

#### For hierarchial view

Used [react-d3-tree](https://www.npmjs.com/package/react-d3-tree) installed

#### For drag and drop

Used [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd) installed

### About

The project has left pane and right content. In the left pane, the list of employees data are shown along with a search bar and a select filter.

On searching using any keyword like name, team or designation, the relevant record will be displayed on the left pane and the right content will also contain only the relevant record in the hierarchial representation.

The app works fine in rendering the left pane and the hierarchial view. At present the user can search and select data. As the library _react-beautiful-dnd_ cannot be used to drag svg elements, drag and drop function cannot be performed currently. So the user can only try dragging the cards for now.

The app would be updated with drag and drop feature in future.

###### The Application is deployed on Netlify
