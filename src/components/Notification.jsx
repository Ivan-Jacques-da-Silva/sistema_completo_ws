import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

const Notification = ({ show, onHide, type, title, message, onConfirm, confirmText = "OK" }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>;
      case 'error':
        return <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '3rem' }}></i>;
      case 'warning':
        return <i className="bi bi-exclamation-triangle-fill text-warning" style={{ fontSize: '3rem' }}></i>;
      case 'info':
        return <i className="bi bi-info-circle-fill text-info" style={{ fontSize: '3rem' }}></i>;
      default:
        return <i className="bi bi-info-circle-fill text-primary" style={{ fontSize: '3rem' }}></i>;
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'success': return 'success';
      case 'error': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'primary';
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered
      backdrop="static"
      keyboard={false}
      size="sm"
    >
      <Modal.Body className="text-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {getIcon()}
        </motion.div>

        <h5 className="mt-3 mb-2">{title}</h5>
        <p className="text-muted mb-4">{message}</p>

        <Button 
          variant={getVariant()}
          onClick={onConfirm || onHide}
          className="px-4"
          style={{ minWidth: '100px' }}
        >
          {confirmText}
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default Notification;