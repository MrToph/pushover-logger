const querystring = require(`querystring`)
const https = require(`https`)

class PushoverLogger {
  constructor() {
    const token = process.env.PUSHOVER_TOKEN
    const user = process.env.PUSHOVER_USER_KEY
    if (!token || !user) {
      throw new Error(
        `Must have "PUSHOVER_TOKEN" and "PUSHOVER_USER_KEY" set as environment variables.`
      )
    }
    this.generalPostData = {
      token,
      user,
      sound: `intermission`,
    }
    this.debug = false
  }

  setTitle(appTitle) {
    this.generalPostData.title = appTitle
  }

  enableDebug() {
    this.debug = true
  }

  getPostOptions = stringifiedPostData => {
    return {
      hostname: `api.pushover.net`,
      port: 443,
      path: `/1/messages.json`,
      method: `POST`,
      headers: {
        'Content-Type': `application/x-www-form-urlencoded`,
        'Content-Length': stringifiedPostData.length,
      },
    }
  }

  log = logOptions => {
    let message = ``
    let otherLogOptions = {}
    if (typeof logOptions === `string`) {
      message = logOptions
    } else if (typeof logOptions === `object` && logOptions !== null) {
      ({ message, ...otherLogOptions } = logOptions)
    } else {
      throw new Error(
        `Must pass an object or string as the only argument to log. Got "${logOptions}"`
      )
    }

    if(this.debug) {
      console.log(message)
      return
    }

    const stringifiedPostData = querystring.stringify(
      Object.assign({ message }, otherLogOptions, this.generalPostData)
    )
    const httpOptions = this.getPostOptions(stringifiedPostData)
    const req = https.request(httpOptions, function(res) {
      let result = ``
      res.on(`data`, function(chunk) {
        result += chunk
      })
      res.on(`end`, function() {
        console.log(result)
      })
      res.on(`error`, function(err) {
        console.log(err)
      })
    })

    // req error
    req.on(`error`, function(err) {
      console.log(err)
    })

    //send request with the postData form
    req.write(stringifiedPostData)
    req.end()
  }
}

const logger = new PushoverLogger()
export default logger
