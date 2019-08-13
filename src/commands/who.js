const {Command, flags} = require('@oclif/command')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

// config file
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8'));


class WhoCommand extends Command {
  async run() {
    this.log(chalk `Current user is : {bold.green.underline ${config.username}}`)
    this.log(chalk `if you want to change the user, use the set command : {bold.blue attentio set} --name {bold.blue <username>}`)
  }
}

WhoCommand.description = `Describe the command here
...
Extra documentation goes here
`

module.exports = WhoCommand
