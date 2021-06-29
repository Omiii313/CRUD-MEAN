# CRUD-MEAN
social Login , CRUD , image Upload Using Angular 12 and nodeJS

-----------------------------------------------------------
1 . Login with social media and normal
# 1 . Login with social media and normal
     When you directly browse or write "http:localhost:4200" on your browser you can see login page.
     For social media login , Below Login button , find google and facebook icon. 
     If you don't have login creadential then click on register button and create user.
2 . search
# 2 . search
     After login Sucessfully , route on post list screen where find search box left side of "create New Post".
3 . crud operation
# 3 . crud operation
    create post : Postlist screen find a button "create New Post" for create new post.
    read post : Postlist screen find "eye" icon in Action column in table.
    update post : Postlist screen find "pencil" icon in Action column in table.
    delete post : Postlist screen find "trash" icon in Action column in table.
 # 4. sorting
     Postlist table click on table header.it will sort in ascending and descending oreder.
 # 5. image upload
    In Header , Click on "Image Upload" link ,redirect to image upload page.
 # 6. seed file for pre fill data

 # 7. role management
    admin User : User Name : "admin" , password : "admin"
    only admin user have rights to perform crud opertaions any other user don't have rights to perform crud operations.

-----------------------------------------------------------------------
# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


_____________________________________________

# API

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ yarn install

## Configure app

Open `a/nice/path/to/a.file` then edit it with your settings. You will need:

- A setting;
- Another setting;
- One more setting;

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build