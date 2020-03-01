import React, { Component } from 'react'
import Tape from './Tape'

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "1001010",
            initialQ: "q0",
            finalQ: "qf",
            commands: [],
            tapeBlockList: [],
            width: window.innerWidth,
            height: window.innerHeight,
            blockSize: 60,
            isRunning: false,
            header: 0,
            currentState: "q0",
            currentRead: "",
            nextState: "",
            currentWrite: "",
            nextDirection: ""
        }
    }

    componentWillMount = () => {
        const minimumBlockAmount = this.state.width / 60 + 3
        let tapeBlockList = this.state.tapeBlockList
        for (let i = 0; i < minimumBlockAmount; i++) {
            tapeBlockList.push({value: "_", headerStatus:"notIt"})
        }
        this.setState({tapeBlockList})
    }

    handleChange = (e) => {
        if (e.target.name === 'main-form-input') {
            this.setState({input: e.target.value})
        } else {
            this.setState({[e.target.id]: e.target.value})
        }
    }

    handleCancel = (e) => {
        window.location.reload()
    }

    handleCommandSequence = (commandsValues) => {
        commandsValues = commandsValues.split('\n')
        for (let i = 0; i < commandsValues.length; i++) {
            commandsValues[i] = commandsValues[i].replace(/([( )])/g, "")
        }
        this.setState({commands: commandsValues})
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.handleCommandSequence(this.state.commands)

        let inputValues = this.state.input.split("")
        let updatedTapeBlockList= this.state.tapeBlockList
        let header

        for (let i = 0;  i < this.state.input.length; i ++) {
            let updatedTapeBlockListValue = inputValues[i]
            let currentInsertSpot = Math.floor(this.state.input.length / 2 + i)
            if(i === 0) {
                updatedTapeBlockList.splice(currentInsertSpot, 0, {value: updatedTapeBlockListValue, headerStatus: "onIt"})
                header =  currentInsertSpot
            } else {
                updatedTapeBlockList.splice(currentInsertSpot, 0, {value: updatedTapeBlockListValue, headerStatus: "notIt"})
            }
        }

        let currentBlockIndex = header
        let currentBlock = updatedTapeBlockList[currentBlockIndex]
        let currentState = this.state.currentState
        let currentRead = currentBlock.value

        this.setState({
            isRunning: true,
            tapeBlockList: updatedTapeBlockList,
            header,
            currentState,
            currentRead,
            nextState: currentState
        }, this.runSimulation)
    }

    acceptEnd = () => {
        alert('estado final aceito')
    }

    runSimulation = () => {
        if (this.state.currentState === this.state.finalQ) {
            this.acceptEnd()
        } else {
            setTimeout(() => {
                //Search for rule for current read
                let currentBlockIndex = this.state.header
                let tapeBlockList = this.state.tapeBlockList
                let currentBlock = tapeBlockList[currentBlockIndex]
                let currentState = this.state.currentState
                let currentRead = currentBlock.value
                let ruleWrite
                let ruleDirection
                let nextHeaderPosition
    
                let rules = this.state.commands
                for (let i = 0; i < rules.length; i++) {
                    let ruleComponents = rules[i].split(",")
                    let ruleState = ruleComponents[0]
                    let ruleRead = ruleComponents[1]
                    let ruleNextState = ruleComponents[2]
                    ruleWrite = ruleComponents[3]
                    ruleDirection = ruleComponents[4]
                    nextHeaderPosition = ruleDirection === '>' ? currentBlockIndex+1 : currentBlockIndex-1
    
                    let validRuleRead = ruleRead === currentRead || ruleRead === "*"
    
                    if (ruleState === currentState && validRuleRead) {
                        console.log(ruleComponents)
    
                        //apply rule
                        currentState = ruleNextState
                        if (ruleRead !== "*") {
                            tapeBlockList[currentBlockIndex].value = ruleWrite
                        }
    
                        if (ruleDirection === '>') {
                            tapeBlockList[currentBlockIndex].headerStatus = "notIt"
                            tapeBlockList[currentBlockIndex+1].headerStatus = "onIt"
                        } else if (ruleDirection === '<') {
                            tapeBlockList[currentBlockIndex].headerStatus = "notIt"
                            tapeBlockList[currentBlockIndex-1].headerStatus = "onIt"
                        }
    
                        break
                    }
                }
    
                this.setState({
                    header: nextHeaderPosition,
                    tapeBlockList,
                    currentState,
                    currentRead,
                    nextState: currentState,
                    currentWrite: ruleWrite,
                    nextDirection: ruleDirection
                }, this.runSimulation)
            }, 1000)
        }
    }

    render () {
        return (
            <div>
                <div className="main-form">
                    <div className="main-form_input-group">
                        <label htmlFor="main-form-input">Input:</label>
                        <input type="text" name="main-form-input" id="main-form-input" placeholder="example: 1001010" onChange={this.handleChange} disabled={this.state.isRunning}/>
                    </div>

                    <div className="main-form_input-group">
                        <label htmlFor="initialQ">Initial state:</label>
                        <input type="text" name="initialQ" id="initialQ" placeholder="example: q0" value="q0" onChange={this.handleChange} disabled={this.state.isRunning}/>
                    </div>

                    <div className="main-form_input-group">
                        <label htmlFor="finalQ">Final state:</label>
                        <input type="text" name="finalQ" id="finalQ" placeholder="example: qf" value="qf" onChange={this.handleChange} disabled={this.state.isRunning}/>
                    </div>

                    <div className="main-form_input-group">
                        <label htmlFor="commands">Commands:</label>

                        <textarea 
                            id="commands" name="commands"
                            rows="10" cols="40" placeholder="example: (q1, 0, q1, 1, >)" onChange={this.handleChange} disabled={this.state.isRunning}>
                        </textarea>
                    </div>

                    <button className="submit-button" onClick={this.handleFormSubmit} disabled={this.state.isRunning}>
                        SIMULATE
                    </button>

                    <button className={this.state.isRunning ? `cancel-button`:`cancel-button not-visible`} value="CANCEL"onClick={this.handleCancel} disabled={!this.state.isRunning}>
                        CANCEL
                    </button>
                </div>
                <Tape tapeList={this.state.tapeBlockList}/>

                <div className={this.state.isRunning ? `simulation-info`:`simulation-info not-visible`}>
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