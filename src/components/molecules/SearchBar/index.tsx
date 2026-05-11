import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";

import { Wrapper } from "./styles";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
};

export function SearchBar({ value, onChange, onSearch }: SearchBarProps) {
  return (
    <Wrapper>
      <Input
        placeholder="Search proposals"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <Button type="button" onClick={onSearch}>
        Search
      </Button>
    </Wrapper>
  );
}
