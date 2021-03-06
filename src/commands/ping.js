const {Command, flags} = require('@oclif/command')
const chalk = require('chalk')
const {cli} = require('cli-ux')
const path = require('path')
const fs = require('fs')
const io = require('socket.io-client')
const inquirer = require('inquirer')
const axios = require('axios')

// config file
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8'));

class PingCommand extends Command {

  async run() {
    const {flags, args} = this.parse(PingCommand)

    const name = args.name || flags.name || null

    if(name){
      this.pingUser(name)
    }
    else{
      // show list of users to ping to except the current user
      this.showUsersList()
    }
  }

  pingUser(name){
    // start the spinner
    cli.action.start(`Sending your ping to ${name}`)
    // connect to socket and emit `pingUser`
    let socket = io(config.appURL, { query: `username=${config.username}` })

    socket.on('connect', () => {
      socket.emit('pingUser', { sender: config.username, receiver: name });
      socket.disconnect()
      cli.action.stop(`✔`)
    });
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
            message: 'Whom do you want to ping ¿',
            type: 'list',
            choices: response.data.users.map((user) => user.name = user.username),
          }])
          .then(answers => {
            // Use user feedback
            self.pingUser(answers.name)
          });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

}

PingCommand.description = `Command is used to pint a particular user of the attentio-cli via the attentio-extension.
...
Command can also be used without an argument or option. If so used, then a list of available users will be provided to choose from, to be pinged via the attentio-extension.
`

PingCommand.flags = {
  name: flags.string({char: 'n', description: 'name of the user to ping'}),
}

PingCommand.args = [
  { name: 'name', required: false, description: 'name of the user to ping' }
]

module.exports = PingCommand
