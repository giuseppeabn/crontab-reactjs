# reactjs-crontab

The reactjs-crontab module is very light-weight task scheduler in reactjs based on linux crontab. This module allows you to schedule task in reactjs.

[![NPM](https://img.shields.io/npm/v/reactjs-crontab.svg)](https://www.npmjs.com/package/reactjs-crontab) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**Crontab Syntax Guide** at [https://d180vcwahe2y6s.cloudfront.net/build/index.html](https://d180vcwahe2y6s.cloudfront.net/index.html)

![Crontab Guide Demo](https://raw.githubusercontent.com/shawnscoding/reactjs-crontab/HEAD/assets/cronGuide.png)

## Getting Started

```bash
npm install --save reactjs-crontab
```

## Usage 1

This is useful when you need to render component
at particular time

```jsx
import React from 'react'
import Crontab from 'reactjs-crontab'
import 'reactjs-crontab/dist/index.css'

const styles = {
  text: {
    margin: '70px',
    color: 'skyblue'
  }
}

const MorningMsg = () => {
  return <h1 style={styles.text}>Good Morning !</h1>
}

const App = () => {
  const [open, setOpen] = React.useState(null)

  const sayGoodMorning = () => {
    setOpen(true)
  }
  // this is the function which will run according to your settings

  const tasks = [
    {
      fn: sayGoodMorning,
      id: '1',
      config: '*-*-*-*-*',
      // this runs every minutes
      name: '',
      description: ''
    }
  ]

  return (
    <div>
      <Crontab
        tasks={tasks}
        timeZone='local'
        // timezone is PC local timezone.
        dashboard={{
          hidden: false
          // if true, dashboard is hidden
        }}
      />
      {open && <MorningMsg />}
    </div>
  )
}

export default App
```

Copying and pasting above code will render '<MorningMsg />' if it's 08:00 like the screenshot below

![usage 2 demo](https://raw.githubusercontent.com/shawnscoding/reactjs-crontab/HEAD/assets/usage_2_demo.png)

## Usage 2

This is useful when you need to implement some function like api call at particular time.

```jsx
import React from 'react'
import Crontab from 'reactjs-crontab'
import 'reactjs-crontab/dist/index.css'

const sayHello = () => {
  console.log('Hello')
}

const RequestSomething = () => {
  console.log('Api request has been sent')
}

// these are the functions which will run according to the config

const tasks = [
  {
    fn: sayHello,
    id: '1',
    config: '*-*-*-*-*',
    // Execute every minutes
    name: 'Say Hello',
    description: 'Say Hello on console'
  },
  {
    fn: RequestSomething,
    id: '3',
    config: '*-15,19-*-11,12-*',
    // Execute In November, December At 3PM and 7PM every minute
    name: 'Request Something',
    description: 'Send API'
  }
]

const App = () => {
  return (
    <Crontab
      tasks={tasks}
      timeZone='UTC'
      // timezone is UTC timezone.
      dashboard={{
        hidden: false
        // if true, dashboard is hidden
      }}
    />
  )
}
export default App
```

Copying and pasting above code will result something like this below

![Dashboard Demo](https://raw.githubusercontent.com/shawnscoding/reactjs-crontab/HEAD/assets/dashboard.png)

This will do what it says at the requested time(s).

## Inspired by

- [Linux Crontab](https://www.geeksforgeeks.org/crontab-in-linux-with-examples)

## Features

- **Supports All Timezones**
- **Supports All modern browsers**
- **No extra dependencies** except React
- **No style library** is used to style the components. **vanilla css** is used.
- Provide **specific error message**, you will find it so easy to debug.
- Provide **Dashboard** which enables easy monitoring of your crontab
- Provide Demo website which helps you to easily set up your crontab

## Cron Syntax

```
 # ┌──────────── minute
 # │ ┌────────── hour
 # │ │ ┌──────── day of month
 # │ │ │ ┌────── month
 # │ │ │ │ ┌──── day of week
 # │ │ │ │ │
 # *-*-*-*-*
```

```
MIN-HOUR-DOM-MON-DOW
```

OR

Can be multiple values like this

```
 # ┌──────────── minute
 # │   ┌────────── hour
 # │   │   ┌──────── day of month
 # │   │   │ ┌────── month
 # │   │   │ │ ┌──── day of week
 # │   │   │ │ │
 # 1,2-6,7-*-*-*
```

```
MIN,MIN-HOUR,HOUR-DOM,DOM-MON,MON-DOW,DOW
```

### Allowed values

| field        | value             |
| ------------ | ----------------- |
| minute       | 0-59              |
| hour         | 0-23              |
| day of month | 1-31              |
| month        | 1-12              |
| day of week  | 1-7 (7 is sunday) |

## API

```
Crontab Props {
  tasks: [
    {
      fn: yourFn,
      id: '1',
      config: '*-11-18-10,13-*',
      name: 'logUserOut',
      description: 'Send API'
    }
  ],
  timeZone: "UTC", "local" or "YOUR PREFERRED TIMEZONE",
  // supported timezone list here
  // https://github.com/shawnscoding/reactjs-crontab/blob/master/TIMEZONES.md
  dashboard: {
    hidden: false
    // if true, dashboard is hidden
  }
}

Crontab.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      fn: PropTypes.func.isRequired,
      id: PropTypes.string.isRequired,
      config: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string
    })
  ),
  dashboard: PropTypes.shape({
    hidden: PropTypes.bool.isRequired
  }),
  timeZone: PropTypes.string.isRequired
}

Crontab.defaultProps = {
  tasks: [],
  dashboard: {
    hidden: false
  },
  timeZone: 'UTC'
}

```

## Important note

- Note that Crontab is triggered only once per minute. The seconds that is triggered is different everytime you run your reactjs app. It varies from 0s to 59s. This is because we don't configure seconds. Thus, don't be surprised if it doesn't run as soon as the time condition met.

## Breaking Changes in 3.0.0

- Named import as `<BasicCron />` is deprecated.
  use default import as `<Crontab />` to use crontab

## tutorial

- [Brief project based tutorial](https://shawnscoding.medium.com/the-easiest-way-to-automate-or-schedule-component-rendering-in-react-app-f4df7784e1ea)
- [간단한 프로젝트 베이스 튜토리얼](https://shawnscoding.medium.com/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A0%8C%EB%8D%94%EB%A7%81-%EC%9E%90%EB%8F%99%ED%99%94-%EC%8A%A4%EC%BC%80%EC%A4%84%EB%A7%81-e8c7c9198132)

## Supported browsers

We use [browserslist](https://github.com/browserslist/browserslist) config to state the browser support for this lib, so check it out on [browserslist.dev](https://browserslist.dev/?q=ZGVmYXVsdHM%3D).

## Supported Timezones

supported timezone list [here](https://github.com/shawnscoding/reactjs-crontab/blob/master/TIMEZONES.md)

## Note

- feel free to open issue. [Reactjs-crontab Github repo](https://github.com/shawnscoding/reactjs-crontab). Any idea that could improve this package or bug report will be highly appreciated.
- We'll highly appreciate it if you promote this package to other devs in any way. We believe the appropriate usage of this package will save loads of thier time.

## License

MIT © [shawnscoding](https://github.com/shawnscoding/reactjs-crontab/blob/master/LICENSE)
