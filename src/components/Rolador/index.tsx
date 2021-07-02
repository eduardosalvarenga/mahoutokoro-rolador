import {
  Flex,
  SimpleGrid,
  Box,
  VStack,
  Checkbox,
  CheckboxGroup,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Input } from "./Input/index";
import { useState } from 'react';
import { RollsList } from "./Rolls";
import { Pagination } from "../Pagination";

export function Rolador() {
  const [advantage, setVantagem] = useState(false);
  const [disadvantage, setDesvantagem] = useState(false);
  const [roll, setRoll] = useState([0])
  const { register, handleSubmit } = useForm();

  const createRoll = async (data: any) => {
    const { name, action, difficulty, advantage, disadvantage, roll } = data;
    try {
      await fetch('/api/createRoll', {
        method: 'POST',
        body: JSON.stringify({name, action, difficulty, advantage, disadvantage, roll}),
        headers: {
          'Content-Type': 'application/json'
        },
      })
    } catch (err) {
      console.error(err);
    }
  }

  const rollDice = async () => {
    if(advantage || disadvantage != false) {
      const roll1 = Math.floor(Math.random() * 20 + 1);
      const roll2 = Math.floor(Math.random() * 20 + 1)
      setRoll([roll1, roll2]);
    } else {
      const roll3 = Math.floor(Math.random() * 20 + 1)
      setRoll([roll3]);
    }
 };

  return (
    <Flex
      as="form"
      w="100%"
      maxWidth={1480}
      mx="auto"
      mt="4"
      px="6"
      onSubmit={handleSubmit((data) => createRoll({ ... data, advantage, disadvantage, roll, }))}
    >
      <Box flex="1" borderRadius={8} bg="gray.800" p="8">
        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing="8" width="100%">
            <Input label="Nome" {...register("name")} />
            <Input label="Ação" {...register("action")} />
          </SimpleGrid>
          <SimpleGrid spacing="8" width="100%" columns={3}>
            <Input
              width={800}
              label="Dificuldade"
              {...register("difficulty")}
            />
            <CheckboxGroup colorScheme="green">
              <Checkbox
                ml={500}
                mt={12}
                fontWeight="semibold"
                value="Vantagem"
                onChange={(e: any) => setVantagem(e.target.checked)}
              >
                {" "}
                Vantagem{" "}
              </Checkbox>
              <Checkbox
                ml={250}
                mt={12}
                fontWeight="semibold"
                value="Desvantagem"
                onChange={(e: any) => setDesvantagem(e.target.checked)}
              >
                {" "}
                Desvantagem{" "}
              </Checkbox>
            </CheckboxGroup>
          </SimpleGrid>
        </VStack>
        <Button
          bgColor="red.500"
          variant="solid"
          type="submit"
          mt="10"
          ml={1200}
          width={200}
          size="md"
          onClick={() => rollDice()}
        >
          Rolar
        </Button>

        <RollsList />
        <Pagination />
      </Box>
    </Flex>
  );
}
