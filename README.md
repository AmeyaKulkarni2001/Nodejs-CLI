# Nodejs-CLI

## Introduction

We use CLI's in a lot of places like when using git, npm, firebase. heroku etc

For example

```git
git init
```

There are mainly 3 parts to a CLI

1. Keyword
  
2. Command / Input
  
3. Flag 
  

#### Keyword

Keyword means the activation sequence to a script

For example

```
git add -> here git is the keyword
npm init -> here npm is the keyword
firebase deploy -> here firebase is the keyword 
```

#### Input

The words following the keyword without the ` - ` are called input, they give direction to the process started by the Keyword

For example

If we type ` git add . ` the ` add ` part tells `git` to add the following file to the repo

#### Flags

Flags provide additional input to the command and they also help in passing data

For example

```
gcc input.c -o output
```

In the above example `-o` is the flag which tells the C compiler that the output file should be named output

Now that we know the basics we can move towards the setup

## Setup / Installation

Go to the place where you want to setup the coding environment, in my case it will be

```bash
$HOME/Coding/cli
```

```js
npx create-node-cli intro
```

The above command will setup a basic backbone to develop a cli

After running this command, it will give use several options

```
CLI name? ‣   (kebab-case only)
CLI command? ‣   (optional: if different from CLI name)
CLI description? · 
CLI version? ‣ 0.0.1
CLI license? ‣ UNLICENSED
CLI author name? ‣ 
CLI author email? ‣ 
CLI author URL? ‣ 
```

In our case it will be

```
CLI name? ‣   intro
CLI command? ‣   
CLI description? · Gives a introduction
CLI version? ‣ 0.0.1
CLI license? ‣ UNLICENSED
CLI author name? ‣ 
CLI author email? ‣ 
CLI author URL? ‣ 
```

Now to start working go into the inrto directory and open your favourite editor

``` cd intro ```

## Explaining the directory structure and features

```
.
├── index.js
├── package.json
├── package-lock.json
└── utils
    ├── cli.js
    ├── init.js
    └── log.js

1 directory, 6 files
```

We will start with `index.js`

```javascript
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);
})();
```

So, we see that we are requiring various files such as init, cli and log we will see whats in them and there use later

We can also see that the code already has input and flags defined

Now the first line we see is the `init({clear})` to find what this does we can go to the `init.js` file and see that it is the part we see every time theintroduce keyword is run

In the async part of the code we can also see a statement ``` input.includes('help') && cli.showHelp```

This means that we are checking if the input has help as a parameter and if it has it then we are running showHelp from cli

So, if we run ``` node index.js help ``` it will show us the help part, lets run this part and see what happens

```
   USAGE  

  $ intro <command> [option]

   COMMANDS  

  help  Print help info    

   OPTIONS  

  -c, --clear    Clear the console Default: true         
  --noClear      Don't clear the console Default: false  
  -d, --debug    Print debug info Default: false         
  -v, --version  Print CLI version Default: false  
```

So, it gives us a help text, now if we go into the `cli.js` we can also see these options defined there

```javascript
const commands = {
	help: { desc: `Print help info` }
};
```

```javascript
const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};
```

So, now we know what is the function of `cli.js` it shows us the help options, we also define our flags there and in the future when we add new inputs and flags, we have to add them here so, it can be used as documentation.

## Making a Intoduction CLI

Now lets start with our main work

We want the user to enter their name, and then, we can introduce them using our CLI

So, we need to take a input from the user, and we know that for taking input we can use flags. Lets name the Command/Input as hello

```javascript

//cli.js
version: {
	type: `boolean`,
	alias: `v`,
	desc: `Print CLI version`
},
user: {
	type: 'string',
	alias: 'u',
	desc: 'takes the name of user'
}

//index.js
if(input.includes("hello")){
		console.log(`hello ${flags.user}`);
}
```

For the flag, we add a user flag in the `cli.js` which is of a type string, and can be used as `-user` or `-u` because of the alias

Then, in the `index.js` we check if the command includes hello and then log the name of the user.

Lets check if it works

```bash
node index.js hello -u {your name}
```

and hopefully it works

## Final step

Now to put everything together we need to run `npm link` this tells the OS to accept our new cli whose keyword will be intro.

If you have forgotten or want to rename the Keyword, we can go to `package.json` to review everything

```javascript
"name": "intro",
"description": "Introduces the person",
"version": "0.0.1",
"license": "UNLICENSED",
"bin": {
	"intro": "index.js"
},
"keywords": [
	"intro"
],
```

Here we can change the keyword to be what ever you want.

After running `npm link` lets check our program

```
intro hello -u {your name}
```

and voila you made your first cli which should hopefully be working

#### If you had any problems following along [here is the github repo link](https://github.com/AmeyaKulkarni2001/Nodejs-CLI)  
