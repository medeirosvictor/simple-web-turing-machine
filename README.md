# ⚙ Turing Machine Simulator

🔗 **Live demo**: [medeirosvictor.github.io/simple-web-turing-machine](https://medeirosvictor.github.io/simple-web-turing-machine/)

## What is a Turing Machine?

A **Turing Machine** is a mathematical model of computation introduced by Alan Turing in 1936. Despite its simplicity, it can simulate any algorithm — making it the theoretical foundation of every modern computer.

A Turing Machine consists of:

- **A tape** — an infinite strip of cells, each holding a symbol (like `0`, `1`, or `_` for blank)
- **A head** — reads and writes one cell at a time, and can move left or right
- **A state register** — tracks what the machine is currently "thinking" (e.g. `q0`, `q1`, `qf`)
- **A transition table** — a set of rules that say: *"If I'm in state X and I read symbol Y, then write symbol Z, move the head in direction D, and switch to state W"*

The machine starts in an **initial state**, follows its rules step by step, and halts when it reaches a **final (accepting) state** — or runs forever if no rule matches or the problem has no solution.

That's it. With just a tape, a head, and a list of rules, you can express any computation that any programming language can. This is the core idea behind the **Church-Turing thesis**.

## What this project does

This is an interactive web simulator that lets you **build and run your own Turing Machine** in the browser. You provide:

1. **Input** — the initial symbols written on the tape (e.g. `1001010`)
2. **Initial state** — where the machine starts (e.g. `q0`)
3. **Final state** — the accepting/halt state (e.g. `qf`)
4. **Transition rules** — the program that drives the machine

Hit **Simulate** and watch the tape animate step-by-step: the head moves, symbols get written, and states change in real time. A live panel shows exactly what the machine is doing at each step.

## Transition rule format

Each rule is one line with 5 comma-separated values:

```
currentState, currentRead, nextState, writeSymbol, direction
```

| Field | Meaning |
|---|---|
| `currentState` | The state the machine must be in for this rule to apply |
| `currentRead` | The symbol the head must be reading (`*` matches any symbol) |
| `nextState` | The state to transition to |
| `writeSymbol` | The symbol to write on the current cell |
| `direction` | `>` move right, `<` move left, `\|` halt |

**Example** — a single rule: `q0, 1, q1, 0, >` means *"In state q0, if you read a 1, write a 0, move right, and go to state q1."*

## Example programs

### Binary Increment

Adds 1 to a binary number. Moves right to find the end, then carries back left.

```
q0, 1, q0, 1, >
q0, 0, q0, 0, >
q0, _, qI, _, <
qI, 1, qI, 0, <
qI, 0, qf, 1, |
qI, _, qf, 1, |
```

**Try it**: input `1011` → result `1100`

### String Duplication

Copies a binary string. Replaces each bit with a marker, appends a copy at the end, then restores the markers.

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

**Try it**: input `101` → result `101101`

## Tech Stack

- **React 18** + **Vite 6**
- **SCSS** (dart-sass)
- **Vitest** for testing
- **pnpm** for package management
- **GitHub Actions** → **GitHub Pages** for CI/CD

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
