# pushover-logger
Uses [pushover](https://pushover.net) to log errors directly to your phone (or any other connected device) as notifications.

## Setup
Needs the following environment variables:

```
PUSHOVER_USER_KEY=a...
PUSHOVER_TOKEN=b...
```

## API
```js
import logger from 'pushover-logger'
logger.setTitle('App Name')

// will not use pushover, but `console.log` instead
logger.enableDebug()

// write log
logger.log('message')
logger.log({
    message: 'message',
    sound: 'intermission',
    // any other option mentioned in PUSHOVER
})
```
