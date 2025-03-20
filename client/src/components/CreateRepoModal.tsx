import { Button, Modal } from 'react-bootstrap';
import InputForm from './forms/InputForm';
import SelectLanguage from './forms/SelectLanguage';
type CreateRepoModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSubmitRepo: () => void;
}
export default function CreateRepoModal({ show, handleClose, handleSubmitRepo }: CreateRepoModalProps) {
  console.log(show)

  return (
    <>
      <form onSubmit={handleSubmitRepo}>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <InputForm
              name='name'
              title='Repo Name'
            />
            <InputForm
              name='url'
              title='Repo URL'
            />
            <SelectLanguage
              name='languages'
              title='Repo Languages'
            />
            <label htmlFor="">
              Repo isPrivate
              <input type="checkbox"  name='isPrivate' />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="btn btn-success" type='submit' >
              Créer
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}
