import { SmallAddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addOrders } from "../features/sales/salesSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const [customerName, setCustomerName] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const {
    isOpen: isSaleModalOpen,
    onOpen: onSaleModalOpen,
    onClose: onSaleModalClose,
  } = useDisclosure();

  const {
    isOpen: isSearchModalOpen,
    onOpen: onSearchModalOpen,
    onClose: onSearchModalClose,
  } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleAddSale = (e) => {
    e.preventDefault();
    dispatch(
      addOrders({
        customerName,
        salePrice,
        time: Date.now(),
        active: "active",
      })
    );
    onSaleModalClose();
    toast({
      title: "Sale entry added.",
      description: "The sale has been added successfully.",
      status: "success",
      duration: "9000",
      isClosable: true,
    });
    setCustomerName("");
    setSalePrice("");
  };

  const handleLogout = async () => {
    await localStorage.removeItem("authenticated");
    navigate("/login");
    toast({
      title: "Logged out",
      description: "You have successfully logged out.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <Flex mx={10} my={7} justifyContent={"space-between"}>
      <Flex gap={5}>
        <Link to={"/"}>
          <Button colorScheme="red">Active Sale Orders</Button>
        </Link>
        <Link to={"/completed"}>
          <Button colorScheme="green">Completed Sale Orders</Button>
        </Link>
        <Link to={"/allproducts"}>
          <Button colorScheme="pink">All Products</Button>
        </Link>
      </Flex>
      <Flex gap={5}>
        {/* <Button onClick={onSearchModalOpen}>
          <SearchIcon />
        </Button> */}
        <Button colorScheme="blue" onClick={onSaleModalOpen}>
          <SmallAddIcon /> Sale Order
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isSaleModalOpen}
          onClose={onSaleModalClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Sale Entry</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleAddSale}>
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Customer Name</FormLabel>
                  <Input
                    type="text"
                    ref={initialRef}
                    placeholder="Customer Name"
                    onChange={(e) => setCustomerName(e.target.value)}
                    value={customerName}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    type="number"
                    placeholder="Price"
                    onChange={(e) => setSalePrice(e.target.value)}
                    value={salePrice}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Add
                </Button>
                <Button onClick={onSaleModalClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isSearchModalOpen}
          onClose={onSearchModalClose}
        >
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Search</ModalHeader> */}
            {/* <ModalCloseButton /> */}
            {/* <form> */}
            <ModalBody py={"6"}>
              <FormControl>
                {/* <FormLabel>Search Query</FormLabel> */}
                <Flex justifyContent={""} alignItems={"center"} gap={"3"}>
                  <SearchIcon boxSize={"5"} />
                  <div style={{ width: "100%" }}>
                    <Input
                      type="text"
                      ref={initialRef}
                      placeholder="Search..."
                      onChange={(e) => setSearchQuery(e.target.value)}
                      value={searchQuery}
                      border={"none"}
                    />
                  </div>
                </Flex>
              </FormControl>
            </ModalBody>

            {/* <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Search
                </Button>
                <Button onClick={onSearchModalClose}>Cancel</Button>
              </ModalFooter> */}
            {/* </form> */}
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  );
};

export default Header;
