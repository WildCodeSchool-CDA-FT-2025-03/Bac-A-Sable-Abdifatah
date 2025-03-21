import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
type ModalProps = {
    show: boolean;
  handleClose: () => void;
  confirmAction: ()=> void
}
function ModalRepo({ confirmAction, handleClose, show} : ModalProps) {

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Vous voulez bien supprimer cette repo ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="btn btn-danger" onClick={confirmAction}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalRepo;