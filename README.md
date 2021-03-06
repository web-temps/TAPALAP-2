# Wiki Review Bot

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
    - [Prerequisites](#pres)
    - [😀 Installing Node.js And sqlite on a Raspberry Pi](#rpi)
    - [Setting Up Your Script App](#script_app)
    - [Environment Variables](#env_var)
    - [Preparing the Bot and Initializing Your Wiki Pages](#prepare)
- [Usage](#usage)
    - [Mac And Linux](#linux)
    - [Windows](#windows)
- [Backing Up Your Data](#backup)
    - [Wiki Revitalizer](#revitalizer)`(UPDATE 10-17-20)`
- [Wiki Pages Examples](#example) 
    - [Index Example](#wiki.index)
    - [Categorized User Tables Example](#wiki.users) `(UPDATE 10-17-20)`

## About <a name = "about"></a>

This Reddit bot will generate a __userdirectory__ wiki for your subreddit. It will follow a defined command thread which allows users to rate one another based upon interactions they've had while trading on your sub.
- Use the command `!rate u/bwz3r 5 stars` to give [u/bwz3r](https://www.reddit.com/u/bwz3r) a 5 star rating!

Further instructions on how to format commands will be auto-generated in your wiki.\
An example of the wiki is displayed at the end of this readme.

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites <a name = "pres"></a>

The first step if you have not done so yet is to enable the wiki for your subreddit.\
To enable the wiki system, navigate to 'community settings' (https://reddit.com/r/SUB/about/edit/) and select the 'wiki' heading.\
Click the dropdown and select 'mods only' to allow mods to edit the pages.\
Once your bot account is configred, you'll have to give it mod access to edit these pages.\
It will also need mod access to set the selected sort of a command thread to new.\
Be sure that Karma and Age of Reddit account fields are also set to 0.


Next, install the correct version of NodeJS for your system. You can find the official downloads here: https://nodejs.org/en/download/


Also install sqlite as this bot requires a database to function. https://www.tutorialspoint.com/sqlite/sqlite_installation.htm

### Installing Node.js And sqlite On A Pi <a name = "rpi"></a>

To install sqlite on your pi first, update your package manager:
```
sudo apt-get update
sudo apt-get upgrade
```

Now install sqlite:
```
sudo apt-get install sqlite3
```

Now install Node:
```
sudo apt install nodejs
```

### Setting Up Your Script App <a name = "script_app"></a>

You'll have to create a new account for your bot before you move any further.\
And you'll have to grant the account permissions on your subreddit.\
Once the account is created, log in, go to [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) to fill out the form to create a new script app.



<img src='https://i.imgur.com/yq8akJ7.png'>

## Environment Variables <a name = "env_var"></a>
Now that you've set up your bot account, granted it permissions on your subreddit, and created a script app, it's time to download the source code and paste in your environment variables.

Download the .zip file containing the source code on this page. Unzip it and save it to your computer somewhere. Now open up the pw.envEXAMPLE file.\
Also have open reddit.com/prefs/apps as you'll need to copy/paste the items you'll find there.\
<strong>USER_AGENT</strong> is just a name that the server will identify your bot by. It can be whatever you want.\
<strong>CLIENT_ID</strong> and <strong>CLIENT_SECRET</strong> are fround in prefs/apps.\
<strong>REDDIT_USER</strong> is your bots username.\
<strong>REDDIT_PASS</strong> is its password.\
<strong>MASTER_SUB</strong> is the subreddit it will work on.\
<strong>LIMIT</strong> will cause the bot to check this many items per sweep. It takes a bit longer to start up, but can accomodate for more requests the higher you set it with a maximum of 25. Setting this value higher will ensure that when stopping and restarting the bot, no requests are forgotten.\
<strong>DEBUG_CODE</strong> and <strong>DEBUG_NETWORK</strong> should be set to false unless any problems arise.\
<strong>WIKI_WELCOME_MESSAGE</strong> will be displayed in the top of your generated wiki index page.\
<strong>THREAD_ID</strong> You will have to go into your subreddit and create a new thread. I suggest pinning it so that users can see it and easily use it. Once it is created you'll have to copy and paste the id from the url bar into this field. The bot works by latching onto this thread and setting suggested sort to new, then continously streaming in the latest requests and handling them in a queue. This field is definately required before starting your bot. It may be changed at any time if you decide to start a new command thread.\
See the below example of a url. The id will be used in the pw.envEXAMPLE file as a reference. Copy the id from the thread you create just like this one:
```
https://www.reddit.com/r/Bwz3rBot/comments/ja6v32/bot_command_thread/
```





    USER_AGENT=''
    CLIENT_ID=''
    CLIENT_SECRET=''
    REDDIT_USER=''
    REDDIT_PASS=''
    MASTER_SUB=''
    LIMIT='9'
    DEBUG_CODE="false"
    DEBUG_NETWORK="true"
    WIKI_WELCOME_MESSAGE="🌿Welcome to The Greenhouse"
    THREAD_ID="ja6v32"
    


Once these fields are completely filled out, remove <i>EXAMPLE</i> from the end of the filename.

> pw.envEXAMPLE = pw.env

## Preparing the Bot and Initializing Your Wiki Pages <a name = "prepare"></a>

Once you've got your pw.env file correctly filled out and renamed, you may create a directory for your database, install dependencies with npm, then run the WikiPagesInstaller script.\
Before running installers, be sure your bot account is granted admin rights on your subreddit.\
Also be sure the wiki is enabled for your subreddit and admins have write access.\
And finally, be absoultely sure that you have created a thread for your bot to latch onto and set it correctly to THREAD_ID in pw.env\
To fully install the bot, use these commands from within the root folder:
```
$ mkdir ./database
$ npm i
```
Now run the wikiInit script to initialize your wiki pages.
```
$  node src/install/WikiPagesInstaller.js
```
This script will generate an index page at /r/YourSub/wiki/userdirectory/\
It will run until its created all pages for the directory, A-Z and an etc for users with - or _ in their names.\
If anything goes wrong during the installation or you wish to start fresh, you may run it again. All data will be wiped clean from the wiki. You will be left with a fresh index page and generated wiki pages A-Z & etc.

## Usage <a name = "usage"></a>


 Be sure that you've set up your pw.env file correctly and have run the installer and wikiInit scripts before running the bot.\
 Also before using the run script you must use the mongo script to run your mongo server in the correct location.

-----
 ## Mac And Linux <a name="linux"></a>
 The first time you use the script you must make it executable:
 ```
 $ sudo chmod +x mongo.sh
 ```
 Also while you're here you should make the run script executable as well:
 ```
 $ sudo chmod +x run.sh
 ```
Now that these two files have been given execute permissions on your device, they can be run.

Always have mongo running before starting run script. To run mongo, run this command from within the root folder:
```
$ ./mongo.sh
```

To start the bot, use the run script from within the root folder:
```
$ ./run.sh
```
-----
## Windows <a name="windows"></a>

Windows users may simply click mongo.bat to run mongo, then click run.bat to run the bot.

-----

It will watch the thread you set in THREAD_ID for commands as explained in the generated wiki.

## Backing Up Your Data <a name = "backup"></a>

It's strongly recommended that you back up your database! That is where all your user data is stored and if anything happens to it, its not going to be a good time for your subreddit. Luckily it's very easy to just copy the database directory from the folder and keep it somewhere safe. If anything happens to your bot's database, just delete the corrupt one and paste in the backup. It should all work out just fine. <strong>You should also note that you should never attempt this while the database is running. The files will not be correctly copied and will possibly destroy your data.</strong>


## Wiki Revitalizer <a name ="revitalizer"></a> `(UPDATE 10-17-20)`

I have also included a script which will allow you to refresh the data in your __userdirectory__ wiki. Simply run this command to refresh the wiki with the users in your database:
```
$ node src/install/WikiRevitalizer.js true
```
This command will refresh the __index__ page of your wiki. Setting the `fullRefreshFlag` to _true_  will tell the bot to go through your entire database and update every page with the users it finds. Simply leaving the flag empty or setting it to `false` will generate the __index__ page only.

## Here's an example of how your Wiki should look: <a name = "example"></a>
<br>

# Index Example: <a name = "wiki.index"></a>

-----


<h1>🌿Welcome to The Greenhouse</h1>

<h1>User Directory</h1>

Here is a directory of all users who have traded on r/Bwz3rBot along with links to the trade discussion threads.

All users are stored alphabetically. Usernames beginning with special characters can be found within the ___etc___ section.



[A](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/a) |
 [B](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/b) |
 [C](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/c) |
 [D](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/d) |
 [E](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/e) |
 [F](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/f) |
 [G](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/g) |
 [H](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/h) |
 [I](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/i) |
 [J](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/j) |
 [K](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/k) |
 [L](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/l) |
 [M](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/m) |
 [N](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/n) |
 [O](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/o) |
 [P](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/p) |
 [Q](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/q) |
 [R](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/r) |
 [S](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/s) |
 [T](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/t) |
 [U](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/u) |
 [V](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/v) |
 [W](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/w) |
 [X](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/x) |
 [Y](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/y) |
 [Z](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/z) |
 [etc](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/etc)

-----

<h1>How to use this bot?</h1>

Users may submit reviews to this [bot command thread](/r/Bwz3rBot/comments/jaha01).

Commands must be formated with a directive of `!rate`. The first command argument must be the name of the user to be updated. The second argument must be a rating number between 1 and 5 followed by the word stars. The next arg must be the type of interaction. Was it either (a. sale, b. trade, c. giveaway)? If no type is specified, it defaults to a sale. All arguments following interaction type will be converted to a string, and will go into the comments section of the review. Command MUST contain an interaction type of you wish to include a comment.

`!rate u/Bwz3r 5 stars sale We had a great interaction! I'm rating u/Bwz3r 5 stars!`

This command will be processed by the bot and will find u/Bwz3r within the database. If the user does not exist within the database, the user will be added to the list of reviewed users and will retain the rating given along with any comments, and a link to the command comment. Any future ratings received by this user will be added to their file and any changes made will be instantly updated in the user directory under their alphabetized page. Users scores will be averaged according to number of reviews / scores rounded down. Stars will be awarded each user according to their calculated average rating. Any questions or errors found while using the bot can be submitted to u/Bwz3r. Thank you for reading!

-----

<br><br><br>

# Categorized User Tables Example: <a name = "wiki.users"></a> `(UPDATE 10-17-20)`
[A](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/a) |
 [B](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/b) |
 [C](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/c) |
 [D](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/d) |
 [E](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/e) |
 [F](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/f) |
 [G](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/g) |
 [H](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/h) |
 [I](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/i) |
 [J](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/j) |
 [K](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/k) |
 [L](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/l) |
 [M](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/m) |
 [N](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/n) |
 [O](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/o) |
 [P](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/p) |
 [Q](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/q) |
 [R](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/r) |
 [__S__](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/s) |
 [T](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/t) |
 [U](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/u) |
 [V](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/v) |
 [W](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/w) |
 [X](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/x) |
 [Y](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/y) |
 [Z](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/z) |
 [etc](https://www.reddit.com/r/Bwz3rBot/wiki/userdirectory/etc)

-----

## SnootyScraper

★★★★☆(average score:4, total reviews:2)

|Rating|Type|Comments|Permalink|
|:-:|:-:|:-:|:-|
|4|sale|pretty good sale!|/r/Bwz3rBot/comments/jaha01/new_follow_thread/g95r9yj/|
|5|trade|What a great Trade!|/r/Bwz3rBot/comments/jaha01/new_follow_thread/g95r5wu/|


## stickRollBot

★★☆☆☆(average score:2, total reviews:2)

|Rating|Type|Comments|Permalink|
|:-:|:-:|:-:|:-|
|1|sale|horrible sale!|/r/Bwz3rBot/comments/jaha01/new_follow_thread/g95r79a/|
|4|sale|alright sale!|/r/Bwz3rBot/comments/jaha01/new_follow_thread/g95r8ln/|