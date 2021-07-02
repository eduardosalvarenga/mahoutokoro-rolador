import useSWR from "swr";
import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Text,
} from "@chakra-ui/react";

export function RollsList() {
  const { data: rolls, mutate } = useSWR("/api/rolls", { refreshInterval: 5000 }); 

    console.log(rolls)

  return (
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Rolagens
            </Heading>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Ação</Th>
                <Th>Dificuldade</Th>
                <Th>Rolagem</Th>
                <Th>Resultado</Th>
              </Tr>
            </Thead>

            {rolls &&
              rolls.map((roll: any) => (
                <Tbody key={roll.id}>
                  <Tr>
                    <Td>{roll.data.name}</Td>
                    <Td>
                      <Box>
                        <Text>{roll.data.action}</Text>
                        <Text fontSize="sm" color="gray.300">
                          {roll.data.advantage != false ? 'Vantagem' : roll.data.disadvantage != false ? 'Desvantagem' : ''}
                        </Text>
                      </Box>
                    </Td>
                    <Td>{roll.data.difficulty}</Td>
                    <Td>{roll.data.roll.toString()}</Td>
                    <Td>
                    {((roll.data.advantage && roll.data.disadvantage) === false && roll.data.roll >= Number.parseInt(roll.data.difficulty)) ? 'Sucesso'
                    : (roll.data.advantage != false && Math.max.apply(null, roll.data.roll) >= Number.parseInt(roll.data.difficulty)) ? 'Sucesso'
                    : (roll.data.disadvantage != false && Math.min.apply(null, roll.data.roll) >= Number.parseInt(roll.data.difficulty)) ? 'Sucesso'
                    : 'Falhou'
                    }
                    </Td>
                  </Tr>
                </Tbody>
              ))}
          </Table>
        </Box>
  );
}
