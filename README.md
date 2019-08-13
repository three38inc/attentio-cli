attentio-cli
============

CLI tool for Attentio Extension

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/attentio-cli.svg)](https://npmjs.org/package/attentio-cli)
[![Downloads/week](https://img.shields.io/npm/dw/attentio-cli.svg)](https://npmjs.org/package/attentio-cli)
[![License](https://img.shields.io/npm/l/attentio-cli.svg)](https://github.com/jobith93/attentio-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g attentio-cli
$ attentio COMMAND
running command...
$ attentio (-v|--version|version)
attentio-cli/0.1.1 darwin-x64 node-v12.4.0
$ attentio --help [COMMAND]
USAGE
  $ attentio COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->
* [`attentio help [COMMAND]`](#attentio-help-command)
* [`attentio ping [NAME]`](#attentio-ping-name)
* [`attentio set [NAME]`](#attentio-set-name)
* [`attentio who`](#attentio-who)

## `attentio help [COMMAND]`

display help for attentio

```
USAGE
  $ attentio help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

## `attentio ping [NAME]`

Command is used to pint a particular user of the attentio-cli via the attentio-extension.

```
USAGE
  $ attentio ping [NAME]

ARGUMENTS
  NAME  name of the user to ping

OPTIONS
  -n, --name=name  name of the user to ping

DESCRIPTION
  ...
  Command can also be used without an argument or option. If so used, then a list of available users will be provided to 
  choose from, to be pinged via the attentio-extension.
```

_See code: [src/commands/ping.js](https://github.com/jobith93/attentio-cli/blob/v0.1.1/src/commands/ping.js)_

## `attentio set [NAME]`

Command is used to set current user of the attentio-cli.

```
USAGE
  $ attentio set [NAME]

ARGUMENTS
  NAME  name to set as current user

OPTIONS
  -n, --name=name  name to set as current user

DESCRIPTION
  ...
  Command can also be used without an argument or option. If so used, then a list of available users will be provided to 
  choose from, to be selected as the current user.
```

_See code: [src/commands/set.js](https://github.com/jobith93/attentio-cli/blob/v0.1.1/src/commands/set.js)_

## `attentio who`

Command is used to know who is the present current user.

```
USAGE
  $ attentio who
```

_See code: [src/commands/who.js](https://github.com/jobith93/attentio-cli/blob/v0.1.1/src/commands/who.js)_
<!-- commandsstop -->
