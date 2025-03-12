import { forwardRef } from "react";

type InputFormProps = {
    name: string;
    title: string;

}
const InputForm = forwardRef<HTMLInputElement, InputFormProps>(({ name, title }, ref) => {
  return (
      <label>{title}
          <input type="text" name={name} ref={ref} />
      </label>
  )
})

export default InputForm