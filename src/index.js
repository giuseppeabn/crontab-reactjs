import React from 'react'
import PropTypes from 'prop-types'
import { validateValueTypes } from './common/utils/errHandler'
import { repeatExecute, runFn } from './common/utils/main'
import { convertConfigToObj } from './common/utils/utils'

const comparisonFn = function (prevProps, nextProps) {
  return true
}

const Crontab = React.memo(({ timeZone, tasks, dashboard }) => {
  const [_tasks, setTasks] = React.useState(null)
  React.useEffect(() => {
    if (tasks.length) {
      tasks = tasks.map((item, i) =>
        item.id === undefined ? { ...item, id: (i + 1).toString() } : item
      )

      const validatedTasks = []
      for (const item of tasks) {
        const task = validateValueTypes(item)

        validatedTasks.push(task)
      }
      // console.log('validatedTasks ::', validatedTasks)
      const executableTasks = []
      for (const item of validatedTasks) {
        if (item.valid) {
          item.splittedConf = item.config.split(' ')

          item.objOfConf = item.splittedConf.map((item) =>
            convertConfigToObj(item)
          )
          const runned = runFn(item, timeZone)
          if (runned) executableTasks.push(item)
          else executableTasks.push({ ...item, valid: false })
        } else executableTasks.push(item)
      }

      // console.log('executableTasks ::', executableTasks)

      repeatExecute(executableTasks, timeZone)
      setTasks(executableTasks)
    }
  }, [tasks])

  return <React.Fragment />
}, comparisonFn)

Crontab.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      fn: PropTypes.func.isRequired,
      id: PropTypes.string.isRequired,
      config: PropTypes.string.isRequired,
      name: PropTypes.string
    })
  ),
  timeZone: PropTypes.string.isRequired
}

Crontab.defaultProps = {
  tasks: [],
  timeZone: 'UTC'
}

export default Crontab
