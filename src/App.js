import React from 'react';
import './static/css/index.css';

function App() {
  return (
    <div className="App">
        <h1 className="header">
            Turing Machine Simulator
        </h1>
        <div className="main-form">
            <div className="main-form_input-group">
                <label for="main-form-input">Input:</label>
                <input type="text" name="main-form-input" id="main-form-input" placeholder="example: 1001010"/>
            </div>

            <div className="main-form_input-group">
                <label for="main-form-initial-state">Initial state:</label>
                <input type="text" name="main-form-initial-state" id="main-form-initial-state" placeholder="example: q1"/>
            </div>

            <div className="main-form_input-group">
                <label for="main-form-final-state">Final state:</label>
                <input type="text" name="main-form-final-state" id="main-form-final-state" placeholder="example: qf"/>
            </div>

            <div className="main-form_input-group">
                <label for="main-form-commands">Commands:</label>

                <textarea id="main-form-commands" name="main-form-commands"
                            rows="5" cols="33" placeholder="example: (q1, 0, q1, 1, >)">
                </textarea>
            </div>

            <div className="submit-button">
                <input type="submit" name="main-form-submit" value="simulate"/>
            </div>
        </div>
    </div>
  );
}

export default App;
