type InputFormProps = {
    value: string;
    name: string;
    title: string;
    handleNewRepo: (e: React.ChangeEvent<HTMLInputElement>)=> void

}
export default function InputForm({ value, name, title, handleNewRepo }: InputFormProps)  {
  return (
      <label>{title}
          <input type="text" name={name} value={value} onChange={handleNewRepo} />
      </label>
  )
}
