## Turing Machine Simulator - built with ReactJS

### https://quiet-citadel-97839.herokuapp.com/

### Example of usage:
**Input**: entry for the machine
**Initial State**: (q0)
**Final State**: (qf) - for the simulation to be accepted
**Instructions**: 
- (currentState, currentRead, nextState, currentWrite, direction) = (q0, 0, q1, 1, >)
- directions accepted:
  - \> (to go right)
  - < (to go left)
  - | (to halt)

_Example Instructions for common problems_:
- **Duplicate String**
```
q0,0, qc0,o,>
q0,1, qc1,i,>
q0,o, q0,o,>
q0,i, q0,i,>
q0,_, qrev,_, <
qc0,_,qL, o, <
qc0, 0,qc0, 0, >
qc0, 1, qc0, 1, >
qc0, i, qc0, i, >
qc0, o, qc0, o, >
qc1,_,qL, i,<
qc1, 0,qc1,0,>
qc1, 1,qc1,1,>
qc1, i,qc1,i,>
qc1, o,qc1,o,>
qL, 1, qL, 1, <
qL, 0, qL, 0, <
qL, i, qL, i, <
qL, o, qL, o, <
qL, _, q0, _, >
qrev, i,qrev, 1, <
qrev, o,qrev, 0, <
qrev, _,qf, _, |
```

- **Binary Increment**
```  
q0, 1, q0, 1,>
q0, 0, q0, 0, >
q0, _, qI, _, <
qI, 1, qI, 0, <
qI, 0, qf, 1, |
qI, _, qf, 1, |
```
## Available Scripts

In the project directory, you can run:

### `yarn start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

### `gulp watch`
Starts compiling process for the styles in SASS
