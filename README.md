## Turing Machine Simulator — built with React + Vite

🔗 **Live demo**: https://medeirosvictor.github.io/simple-web-turing-machine/

A web-based Turing Machine simulator. Define input, states, and transition rules, then watch the tape animate step-by-step.

### Example of usage:
**Input**: entry for the machine  
**Initial State**: (q0)  
**Final State**: (qf) — for the simulation to be accepted  
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

## Development

```bash
# Install dependencies
pnpm install

# Start dev server (port 3000)
pnpm dev

# Run tests
pnpm test

# Production build
pnpm build

# Preview production build
pnpm preview
```

## Deployment

Deploys automatically to GitHub Pages via GitHub Actions on push to `master`.

Manual deploy:
```bash
pnpm deploy
```
