import React from 'react';

function Modal(props) {
  if(!props.isVisible) return null;

  return (
    <div className='overlay'>
      <div className='modal-container'>
        <div className='close-container'>
          <div className='close-modal' onClick={() => props.onClose()}></div>
        </div>
        <h3 className={'header'}>Do you want to play again?</h3>            
        <div className='content'>
          <button className='reset' onClick={() => props.resetGame()}>RESET</button>
        </div> 
      </div>
    </div>
  );
}

export default Modal;