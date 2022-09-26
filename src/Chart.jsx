// Chakra imports
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "./components/Card.js";
import CardHeader from "./components/CardHeader.js";
import LineChart from "./LineChart.jsx";
import React from "react";


const Chart = () => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card p='28px 10px 16px 0px' mb={{ sm: "26px", lg: "0px" }}>
      <CardHeader mb='20px' pl='22px'>
        <Flex direction='column' alignSelf='flex-start'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' mb='6px'>
            {'Hello'}
          </Text>
          <Text fontSize='md' fontWeight='medium' color='gray.400'>
            <Text
              as='span'
              color={5 > 0 ? "green.400" : "red.400"}
              fontWeight='bold'>
              {`${5}%`} more
            </Text>{" "}
            in 2021
          </Text>
        </Flex>
      </CardHeader>
      <Box w='100%' h={{ sm: "300px" }} ps='8px'>
        <LineChart />
      </Box>
    </Card>
  );
};

export default Chart;
