import { forwardRef } from "react";

type InputFormProps = {
    name: string;
    title: string;

}
const InputForm = forwardRef<HTMLInputElement, InputFormProps>(({ name, title }, ref) => {
    return (
        <div className="form-group">
      <label>{title}
                <input type="text" className="form-control" name={name} ref={ref} />
      </label>
        </div>

    )
})

export default InputForm