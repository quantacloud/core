# Code of conduct

## Standards ([from](http://contributor-covenant.org/version/1/4/))

Examples of behavior that contributes to creating a positive environment include:

    Using welcoming and inclusive language
    Being respectful of differing viewpoints and experiences
    Gracefully accepting constructive criticism
    Focusing on what is best for the community
    Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

    The use of sexualized language or imagery and unwelcome sexual attention or advances
    Trolling, insulting/derogatory comments, and personal or political attacks
    Public or private harassment
    Publishing others' private information, such as a physical or electronic address, without explicit permission
    Other conduct which could reasonably be considered inappropriate in a professional setting

# Our utilization of Git

- If you're coding a new feature, then create a new branch
- When the feature is coded, you can merge and delete the feature branch

## Issue

Please, do not open an issue if it is not relevant. Think about what you want to report, and check if it has been answered.

## Pull requests

Your code must be tested.

We do not care about the number of commits. **So, squashing is not useful.**

If something is wrong, we discuss in the pull request comments.

In fact : a feature <=> a branch

Only the team @muonium/core_commiters  can merge to master.

### master branch

Your code must be tested before to be merged in the master branch.

# Coding style

## Global

- Use indentation
- The syntax must be light, flexible and simple. If someone needs, the code have to be easy to be modified.
- The name of a function/class/variable must be understandable without any comment.
- All functions, classes, variables names must be in English.
- The "echo_h" function can be used everywhere and this is the equivalent of "echo htmlentities("
- Try to limit the SQL queries
- Verify data sent and use prepare statement for queries
- Useful "defines" can be found in index.php
- JSON folder (translations) : public/translations
- CEK and passphrase are base64 encoded in sessionStorage, you have to decode it internally to use them

## More precisely
- cloud.sql is the current database structure
![database structure](https://image.noelshack.com/fichiers/2017/43/4/1509050889-muidb.png)

- For the PHP side, we use a MVC architecture :
    - Controllers (application/controllers) : Filename must be the same as class name inside this file (one class per file).
    - Models (application/models) : Filename must be the same as class name inside this file and the same as table name in db.
        - One model = One table.
    - Views (application/views) : Filename must contains if necessary the name of the controller which will call it.

- MVC details
    - URL structure : http://[...]/[MVC root folder]/[Controller]/[Method]/[Param 1]/[Param 2].../?[query string]
        - Method and params are not necessary
        - If you do not specify a method, the method "DefaultAction" will be called if it exists.
    - Methods with the "Action" suffixe are specific methods which can be called by the URL, for exemple "ConnectionAction" in Login controller will be called with the URL "http://[...]/Login/Connection". Others methods can't be called by the URL.
    - All controllers extends library\MVC\Languages.php class which gets the user's language json and store it in public var "$txt".
        - Languages.php has also magic methods __set and __get, so, it is not necessary to create setters and getters for accessing to attributes.
    - All models extends library\MVC\Model.php class which gets the sql connection in protected var "$_sql".
    - We use namespaces, PHP files must start with <?php namespace [...]; ([...] = path to the file's folder from MVC root folder)
        - For a example, for a controller : <?php namespace application\controllers;
        - Different use directives to create aliases which can be used :
            - use \library\MVC as l;
            - use \application\controllers as c;
            - use \application\models as m;
            - use \application\views as v;
            - use \config as conf;
        - Do not forget to add "\" before other classes like Exception or PDO.
        - Example : Initializing model files and setting id_owner to the user id
        ```php
        $this->_modelFiles = new m\Files();
        $this->_modelFiles->id_owner = $_SESSION['id'];
        ```
        or
        ```php
        $this->_modelFiles = new m\Files($_SESSION['id']);
        ```
    - An example of constructor when the user must be logged :
    ```php
    function __construct() {
        parent::__construct(array(
            'mustBeLogged' => true,
            'mustBeValidated' => true
        ));
    }
    ```

    - **All strings must be in all json files.** By default, you can put english string value for all other json files.
        - Example
        ```php
        echo self::$txt->Global->back;
        ```

- Naming convention
    - ClassName, MethodNameAction (PascalCase)
        - MethodNameAction refers to a specific method (look above "MVC details")
    - methodName, attributeName (camelCase)
    - var_name, database_column, model_attribute (lower_case)
        - It is better if attributes in models which refers to db columns have the same name and same case.
    - in PHP side, models used in controllers are defined for example like this : private $_modelUser;

- JS details
    - JS files are in public/js folder
    - We use vanilla JavaScript and jQuery.
    - For the user interface we use "module pattern" (public/js/Interface/modules folder); Time.js, Encryption.js and Decryption.js, MessageBox.js are a little bit different because they can have multiple instances, we use prototypes for them.
    - When you pass data with Ajax, you must use encodeURIComponent() and in the PHP side urldecode()
    - the file "language.js" is always called.
        - There is a method getJSON() which gets the user's language json and store it in var txt.
    - **All strings must be in all json files.** By default, you can put english string value for all other json files.
        - Example
        ```javascript
        console.log(txt.Global.back);
        ```
    - **Don't use any framework.**

## Comments
Comments must be written in English.
[Please, take this code as a reference](https://github.com/muonium/core/blob/master/application/controllers/Login.php)

# PHP
## Version
We're using PHP version 5.6 and Muonium is compatible to PHP 7.0

# Support
- We do not support IE and Safari.
- We support only the recent web browsers.

# Directories

core/ : web application
nova/ : where the users datum are stored

# Release
Our method is the rolling release.

But if you want to know where we go, check [here](https://muonium.ch/photon/#!/achievement) ! :)

# AUTHORS file

In your pull request, you can add your name to AUTHORS.md.
