import React, { Component } from 'react'
import Tape from './Tape'

class Form extends Component {
  constructor(props) {
    super(props)

    const width = window.innerWidth
    const minimumBlockAmount = Math.floor(width / 60) + 3
    const tapeBlockList = []
    for (let i = 0; i < minimumBlockAmount; i++) {
      tapeBlockList.push({ value: '_', headerStatus: 'notIt' })
    }

    this.state = {
      input: '1001010',
      initialQ: 'q0',
      finalQ: 'qf',
      commands: '',
      tapeBlockList,
      width,
      height: window.innerHeight,
      blockSize: 40,
      isRunning: false,
      header: 0,
      currentState: 'q0',
      currentRead: '',
      nextState: '',
      currentWrite: '',
      nextDirection: '',
      simulationSpeed: 1000
    }
  }

  handleChange = (e) => {
    if (e.target.name === 'main-form-input') {
      this.setState({ input: e.target.value })
    } else {
      this.setState({ [e.target.id]: e.target.value })
    }
  }

  handleCancel = () => {
    window.location.reload()
  }

  parseCommands = (rawCommands) => {
    return rawCommands
      .split('\n')
      .map((line) => line.replace(/([( )])/g, ''))
      .filter((line) => line.trim().length > 0)
  }

  handleFormSubmit = (e) => {
    e.preventDefault()

    const commands = this.parseCommands(this.state.commands)

    const inputValues = this.state.input.split('')
    const updatedTapeBlockList = [...this.state.tapeBlockList]
    let header

    for (let i = 0; i < this.state.input.length; i++) {
      const updatedTapeBlockListValue = inputValues[i]
      const currentInsertSpot = Math.floor(this.state.input.length / 2 + i)
      if (i === 0) {
        updatedTapeBlockList.splice(currentInsertSpot, 0, {
          value: updatedTapeBlockListValue,
          headerStatus: 'onIt'
        })
        header = currentInsertSpot
      } else {
        updatedTapeBlockList.splice(currentInsertSpot, 0, {
          value: updatedTapeBlockListValue,
          headerStatus: 'notIt'
        })
      }
    }

    const currentBlock = updatedTapeBlockList[header]
    const currentState = this.state.currentState
    const currentRead = currentBlock.value

    this.setState(
      {
        isRunning: true,
        tapeBlockList: updatedTapeBlockList,
        header,
        currentState,
        currentRead,
        nextState: currentState,
        parsedCommands: commands
      },
      this.runSimulation
    )
  }

  runSimulation = () => {
    this.simulationInterval = setInterval(() => {
      const currentBlockIndex = this.state.header
      const tapeBlockList = [...this.state.tapeBlockList]
      const currentBlock = tapeBlockList[currentBlockIndex]
      const currentState = this.state.currentState
      const currentRead = currentBlock.value
      let ruleWrite
      let ruleDirection
      let nextHeaderPosition = currentBlockIndex

      const rules = this.state.parsedCommands
      let matched = false

      for (let i = 0; i < rules.length; i++) {
        const ruleComponents = rules[i].split(',')
        const ruleState = ruleComponents[0]
        const ruleRead = ruleComponents[1]
        const ruleNextState = ruleComponents[2]
        ruleWrite = ruleComponents[3]
        ruleDirection = ruleComponents[4]

        const validRuleRead = ruleRead === currentRead || ruleRead === '*'

        if (ruleState === currentState && validRuleRead) {
          matched = true

          // Apply rule
          const newState = ruleNextState
          if (ruleRead !== '*') {
            tapeBlockList[currentBlockIndex] = {
              ...tapeBlockList[currentBlockIndex],
              value: ruleWrite
            }
          }

          if (ruleDirection === '>') {
            nextHeaderPosition = currentBlockIndex + 1
            tapeBlockList[currentBlockIndex] = {
              ...tapeBlockList[currentBlockIndex],
              headerStatus: 'notIt'
            }
            tapeBlockList[currentBlockIndex + 1] = {
              ...tapeBlockList[currentBlockIndex + 1],
              headerStatus: 'onIt'
            }
          } else if (ruleDirection === '<') {
            nextHeaderPosition = currentBlockIndex - 1
            tapeBlockList[currentBlockIndex] = {
              ...tapeBlockList[currentBlockIndex],
              headerStatus: 'notIt'
            }
            tapeBlockList[currentBlockIndex - 1] = {
              ...tapeBlockList[currentBlockIndex - 1],
              headerStatus: 'onIt'
            }
          } else if (ruleDirection === '|') {
            // halt
          }

          this.setState({
            header: nextHeaderPosition,
            tapeBlockList,
            currentState: newState,
            currentRead,
            nextState: newState,
            currentWrite: ruleWrite,
            nextDirection: ruleDirection
          })

          if (newState === this.state.finalQ) {
            clearInterval(this.simulationInterval)
            setTimeout(() => alert('Final state accepted'), 100)
          }

          break
        }
      }

      if (!matched) {
        clearInterval(this.simulationInterval)
        setTimeout(() => alert('No matching rule found — simulation halted.'), 100)
      }
    }, this.state.simulationSpeed)
  }

  componentWillUnmount() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval)
    }
  }

  render() {
    return (
      <div>
        <div className="main-form">
          <div className="main-form_input-group">
            <label htmlFor="main-form-input">Input:</label>
            <input
              type="text"
              name="main-form-input"
              id="main-form-input"
              placeholder="example: 1001010"
              onChange={this.handleChange}
              disabled={this.state.isRunning}
            />
          </div>

          <div className="main-form_input-group">
            <label htmlFor="initialQ">Initial state:</label>
            <input
              type="text"
              name="initialQ"
              id="initialQ"
              placeholder="example: q0"
              onChange={this.handleChange}
              disabled={this.state.isRunning}
            />
          </div>

          <div className="main-form_input-group">
            <label htmlFor="finalQ">Final state:</label>
            <input
              type="text"
              name="finalQ"
              id="finalQ"
              placeholder="example: qf"
              onChange={this.handleChange}
              disabled={this.state.isRunning}
            />
          </div>

          <div className="main-form_input-group">
            <label htmlFor="commands">Instructions:</label>
            <textarea
              id="commands"
              name="commands"
              rows="10"
              cols="40"
              placeholder="example: q1, 0, q1, 1, >"
              onChange={this.handleChange}
              disabled={this.state.isRunning}
            />
          </div>

          <button
            className="submit-button"
            onClick={this.handleFormSubmit}
            disabled={this.state.isRunning}
          >
            SIMULATE
          </button>

          <button
            className={this.state.isRunning ? 'cancel-button' : 'cancel-button not-visible'}
            value="RELOAD"
            onClick={this.handleCancel}
            disabled={!this.state.isRunning}
          >
            CANCEL
          </button>
        </div>

        <Tape tapeList={this.state.tapeBlockList} />

        <div className={this.state.isRunning ? 'simulation-info' : 'simulation-info not-visible'}>
          <div><span className="bold">Current State</span>: {this.state.currentState}</div>
          <div><span className="bold">Reading</span>: {this.state.currentRead}</div>
          <div><span className="bold">Next State</span>: {this.state.nextState}</div>
          <div><span className="bold">Writing</span>: {this.state.currentWrite}</div>
          <div><span className="bold">Direction</span>: {this.state.nextDirection}</div>
        </div>
      </div>
    )
  }
}

export default Form
