import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import { useId } from "react";

function MinusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="M1.5 8h13" />
    </svg>
  );
}

function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="round"
      {...props}
      style={{ display: "block", ...props.style }}
    >
      <path d="M1.5 8h13M8 14.5v-13" />
    </svg>
  );
}

interface NumberFieldProps {
  id?: string;
  min?: number;
  name?: string;
  onValueChange: (value: number) => void;
  step?: number;
  value: number;
}

export function NumberField({
  id: idProp,
  min = 0,
  name,
  onValueChange,
  step = 1,
  value,
}: NumberFieldProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <BaseNumberField.Root
      id={id}
      min={min}
      name={name}
      onValueChange={(next) => {
        onValueChange(next ?? 0);
      }}
      step={step}
      value={value}
    >
      <BaseNumberField.Group className="NumberFieldGroup">
        <BaseNumberField.Decrement className="NumberFieldDecrement">
          <MinusIcon />
        </BaseNumberField.Decrement>
        <BaseNumberField.Input className="NumberFieldInput" />
        <BaseNumberField.Increment className="NumberFieldIncrement">
          <PlusIcon />
        </BaseNumberField.Increment>
      </BaseNumberField.Group>
    </BaseNumberField.Root>
  );
}
