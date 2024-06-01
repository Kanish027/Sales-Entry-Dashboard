import {
  Box,
  Center,
  Container,
  Flex,
  Input,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  VStack,
  HStack,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import products from "../data/productData";

// Main Component
const AllProducts = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredSkus, setFilteredSkus] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value.trim() !== "") {
      const matchingProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matchingProducts);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (suggestions.length > 0 && activeSuggestionIndex >= 0) {
        const selectedProduct = suggestions[activeSuggestionIndex];
        handleSuggestionClick(selectedProduct.productName);
      } else if (inputValue.trim() !== "") {
        const newTags = [...tags, inputValue.trim()];
        setTags(newTags);
        setInputValue("");
        filterSkus(newTags);
      }
      setSuggestions([]);
    } else if (event.key === "ArrowDown") {
      if (suggestions.length > 0) {
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
      }
    } else if (event.key === "ArrowUp") {
      if (suggestions.length > 0) {
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      }
    }
  };

  const handleTagDelete = (tagToDelete) => {
    const newTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(newTags);
    filterSkus(newTags);
  };

  const filterSkus = (tags) => {
    if (tags.length === 0) {
      setFilteredSkus([]);
      return;
    }

    const keywords = tags.map((tag) => tag.toLowerCase());
    const newFilteredSkus = products.flatMap((product) =>
      product.skus.filter((sku) =>
        keywords.some(
          (keyword) =>
            product.productName.toLowerCase().includes(keyword) ||
            sku.name.toLowerCase().includes(keyword)
        )
      )
    );

    setFilteredSkus(newFilteredSkus);
  };

  const handleSuggestionClick = (productName) => {
    const newTags = [...tags, productName];
    setTags(newTags);
    setInputValue("");
    filterSkus(newTags);
    setSuggestions([]);
  };

  useEffect(() => {
    setActiveSuggestionIndex(0); // Reset active suggestion index when suggestions change
  }, [suggestions]);

  return (
    <Container maxW={"container.sm"} py={"4"}>
      <Center mb={"5"}>
        <Box width="100%">
          <Input
            type="text"
            placeholder="Add search keyword and press Enter"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {suggestions.length > 0 && (
            <List
              mt={2}
              borderWidth="1px"
              borderRadius="md"
              // bg="white"
              shadow="md"
            >
              {suggestions.map((suggestion, index) => (
                <ListItem
                  key={suggestion.id}
                  p={2}
                  color={index === activeSuggestionIndex ? "black" : ""}
                  bg={index === activeSuggestionIndex ? "gray.100" : ""}
                  _hover={{ bg: "gray.100", cursor: "pointer", color: "black" }}
                  onClick={() => handleSuggestionClick(suggestion.productName)}
                >
                  {/* <ListIcon as={CheckCircleIcon} color="green.500" /> */}
                  {suggestion.productName}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Center>
      <HStack spacing={4} mb={5}>
        {tags.map((tag, index) => (
          <Tag
            size="md"
            key={index}
            borderRadius="full"
            variant="solid"
            colorScheme="teal"
          >
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => handleTagDelete(tag)} />
          </Tag>
        ))}
      </HStack>
      <VStack spacing={4}>
        {filteredSkus.length > 0 ? (
          filteredSkus.map((sku) => (
            <Box
              key={sku.id}
              borderWidth={"1px"}
              borderRadius={"lg"}
              p={"3"}
              mb={"3"}
              width="100%"
            >
              <Flex justifyContent={"space-between"} mb={"3"}>
                <Flex>{sku.name}</Flex>
                <Flex>Rate: ₹ {sku.price}</Flex>
              </Flex>
              <hr />
              <Flex gap={"4"} justifyContent={"center"} my="3">
                <div style={{ width: "100%" }}>
                  <Text mb={"2"}>Selling Rate</Text>
                  <div>
                    <Input placeholder="Enter Selling Quantity" size="sm" />
                  </div>
                </div>
                <div style={{ width: "100%" }}>
                  <Text mb={"2"}>Total Items</Text>
                  <div>
                    <Input placeholder="Enter Quantity" size="sm" />
                  </div>
                </div>
              </Flex>
              <Flex justifyContent={"end"}>
                <Text bg={"green"} px={"2"} borderRadius={"lg"}>
                  {sku.stock} Item(s) Remaining
                </Text>
              </Flex>
            </Box>
          ))
        ) : (
          <Text>Enter Product Name</Text>
        )}
      </VStack>
    </Container>
  );
};

export default AllProducts;
