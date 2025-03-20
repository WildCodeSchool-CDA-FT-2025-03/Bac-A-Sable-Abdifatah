import { Form } from "react-bootstrap";

type InputFormProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  handleNewRepo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputFormGroup = (({ label, name, type, value, handleNewRepo }: InputFormProps) => {
    return (
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} name={name} value={value} onChange={handleNewRepo} />
      </Form.Group>

    )
})

export default InputFormGroup