import {
  Input as ChakraInput,
  FormControl,
  FormLabel,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, ...rest },
  ref
) => {
  return (
    <FormControl p={5}>
      {!!label && (
        <FormLabel htmlFor={name}>
          {" "}
          {label}{" "}
        </FormLabel>
      )}

      <ChakraInput
        required
        focusBorderColor="red.500"
        size="lg"
        variant="flushed"
        name={name}
        id={name}
        ref={ref}
        {...rest}
      />
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
