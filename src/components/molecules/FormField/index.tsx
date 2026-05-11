import { Input } from "@/components/atoms/Input";

import { Label, Wrapper } from "./styles";

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: FormFieldProps) {
  return (
    <Wrapper>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </Wrapper>
  );
}
