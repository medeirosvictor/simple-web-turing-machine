import React from 'react'

const Tape = ({ tapeList }) => {
  const tapeBlockList = tapeList.map((tapeBlock, index) => (
    <div
      className={tapeBlock.headerStatus === 'onIt' ? 'tm-tape-block header-on' : 'tm-tape-block'}
      key={index}
    >
      {tapeBlock.value}
    </div>
  ))

  return (
    <div className="tm-tape-wrapper">
      {tapeBlockList}
    </div>
  )
}

export default Tape
