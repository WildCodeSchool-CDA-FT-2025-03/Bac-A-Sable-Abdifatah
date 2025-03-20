import { forwardRef } from "react";
import { Form } from "react-bootstrap";

type InputFormProps = {
  label: string;
  name: string;
  type: string;

}
const InputFormGroup = forwardRef<HTMLInputElement, InputFormProps>(({ label, name, type }  , ref) => {
    return (
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} name={name} ref={ref} />
      </Form.Group>

    )
})

export default InputFormGroup