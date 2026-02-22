import React from 'react'

const Tape = ({ tapeList }) => {
  return (
    <div className="tape">
      <div className="tape__track">
        {tapeList.map((tapeBlock, index) => (
          <div
            className={`tape__cell${tapeBlock.headerStatus === 'onIt' ? ' tape__cell--active' : ''}`}
            key={index}
          >
            <span className="tape__cell-value">{tapeBlock.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tape
