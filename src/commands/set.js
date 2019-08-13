const {Command, flags} = require('@oclif/command')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const inquirer = require('inquirer')
const axios = require('axios')
const {cli} = require('cli-ux')

// config file
let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8'));

class SetCommand extends Command {
  async run() {
    const {flags} = this.parse(SetCommand)
    const {args} = this.parse(SetCommand)

    const name = args.name || flags.name || null

    if(name){
      this.setUsername(name)
    }
    else{
      // this.log(chalk `{red.bold Error: } Please provide {bold.red --name} flag with a value to change the current user`)
      this.showUsersList()
    }
  }

  // set the current username in the config.json file
  setUsername(name){
    config.username = name
    // write new config data
    fs.writeFileSync(path.join(__dirname, '../config.json'), JSON.stringify(config), 'utf8')
    this.log(chalk `Current user has been changed to : {bold.green.underline ${config.username}}`)
  }

  // show list of available users to pick from the remote /users endpoint
  showUsersList(){
    let self = this
    // start the spinner
    cli.action.start(`Fetching users list`)
    axios.get(`${config.appURL}/users`)
      .then(function (response) {
        cli.action.stop(`✔`)
        inquirer
          .prompt([{
            name: 'name',
            message: 'Whom do you want as current user ¿',
            type: 'list',
            choices: response.data.users.map((user) => user.name = user.username),
          }])
          .then(answers => {
            // Use user feedback
            self.setUsername(answers.name)
          });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
}

SetCommand.description = `Command is used to set current user of the attentio-cli.
...
Command can also be used without an argument or option. If so used, then a list of available users will be provided to choose from, to be selected as the current user.
`

SetCommand.flags = {
  name: flags.string({char: 'n', description: 'name to set as current user'}),
}

SetCommand.args = [
  { name: 'name', required: false, description: 'name to set as current user' }
]

module.exports = SetCommand
