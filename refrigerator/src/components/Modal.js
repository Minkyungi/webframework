import React, { useState } from 'react';
import Modal from 'react-modal';

const MenuModal = (isOpen, children, closeModal) => {
    return (
        <div>
          <Modal>
          <div style={{ display: isOpen ? "block" : "none" }}>
          <button onClick={closeModal}>X</button>
            {children}
          </div>
          </Modal>
        </div>
      );
    };

export default MenuModal;