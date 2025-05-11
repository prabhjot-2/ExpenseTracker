import React from 'react'

const Modal = ({children,isOpen,onClose,title}) => {
  return <div>
    <div className=''>
        {/*Modal content*/}
        <div className=''>
            {/* modal header */}
            <div className=''>
                <h3 className=''>
                    {title}
                </h3>

                <button type='button' className='' onClick={onClose}>
                    X
                </button>
            </div>
            {/* modal body */}
            <div className=''>
                {children}
            </div>
        </div>
    </div>
  </div>
}

export default Modal
