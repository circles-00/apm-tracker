#!/usr/bin/env node

import { spawn } from 'child_process'
import { join } from 'path'

interface IAction {
  content: string
  timestamp: number
}

const registerProcesses = (mouseFileId: string, keyboardFileId: string) => {
  const mouseEventProcess = spawn(
    join(__dirname, '../', 'lib', './detect-mouse-events'),
    [mouseFileId],
    { stdio: 'pipe' },
  )

  const keyboardEventsProcess = spawn(
    join(__dirname, '../', 'lib', './detect-keyboard-events'),
    [keyboardFileId],
    { stdio: 'pipe' },
  )

  return { mouseEventProcess, keyboardEventsProcess }
}

const calculateAverageActionsPerMinute = (
  mouseFileId: string,
  keyboardFileId: string,
  isVerbatim: boolean,
) => {
  let rawActions: IAction[] = []
  const actions: IAction[] = []
  let elapsedIntervals = 0

  const { keyboardEventsProcess, mouseEventProcess } = registerProcesses(
    mouseFileId,
    keyboardFileId,
  )

  const addEvent = (event: string) => {
    rawActions.push({
      content: event,
      timestamp: Date.now(),
    })
  }

  const generateStatistics = () => {
    const totalAverageActionsPerMinute = actions.length / elapsedIntervals

    const actionsForLastMinute = actions.filter(
      (action) => action.timestamp > Date.now() - 60000,
    )?.length

    const averageActionsPerMinuteForLastTenMinutes =
      actions.filter((action) => action.timestamp > Date.now() - 10 * 60000)
        ?.length / 10
    if (isVerbatim) {
      console.log(
        `Actions for last minute: ${actionsForLastMinute} | Total average actions per minute: ${totalAverageActionsPerMinute} | Average actions per minute for last 10 minutes: ${averageActionsPerMinuteForLastTenMinutes}`,
      )
    } else {
      console.log(`APM: ${actionsForLastMinute} `)
    }
  }

  mouseEventProcess.stdout.on('data', (data) => {
    addEvent(data.toString().trim())
  })

  keyboardEventsProcess.stdout.on('data', (data) => {
    addEvent(data.toString().trim())
  })

  mouseEventProcess.on('close', (code) => {
    console.log(`Mouse child process exited with code ${code}`)
    process.exit(0)
  })

  keyboardEventsProcess.on('close', (code) => {
    console.log(`Keyboard child process exited with code ${code}`)
    process.exit(0)
  })

  generateStatistics()
  setInterval(() => {
    actions.push(...rawActions)
    elapsedIntervals++
    generateStatistics()
    rawActions = []
  }, 60000)
}

const [mouseFileId, keyboardFileId, isVerbatim] = process.argv.slice(2)

if (!mouseFileId || !keyboardFileId) {
  throw new Error('Please provide mouse and keyboard file ids')
}

calculateAverageActionsPerMinute(mouseFileId, keyboardFileId, !!isVerbatim)
