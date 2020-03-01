import React from 'react'

const Tape = ({tapeList}) => {
    const tapeBlockList = tapeList.map(tapeBlock => {
        return (<div className={tapeBlock.headerStatus === 'onIt' ? `tm-tape-block header-on` : `tm-tape-block` } key={Math.random()}>
                    {tapeBlock.value}
                </div>
        )
    })

    return (
        <div className="tm-tape-wrapper">
            {tapeBlockList}
        </div>
    )
}

export default Tape