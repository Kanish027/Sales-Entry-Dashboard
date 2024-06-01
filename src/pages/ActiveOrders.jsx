import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editOrders } from "../features/sales/salesSlice";

const ActiveOrders = () => {
  const [editOrderId, setEditOrderId] = useState(null);
  const [editCustomerName, setEditCustomerName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { activeOrders } = useSelector((state) => state.sales);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase();
    return `${formattedDate} (${formattedTime})`;
  };

  const handleOpenEditModal = (order) => {
    setEditOrderId(order.id);
    setEditCustomerName(order.customerName);
    setEditPrice(order.salePrice);
    setEditStatus(order.active);
    onOpen();
  };

  const handleEditSaleOrder = (e) => {
    e.preventDefault();
    dispatch(
      editOrders({
        id: editOrderId,
        customerName: editCustomerName,
        salePrice: editPrice,
        time: Date.now(),
        active: editStatus,
      })
    );
    onClose();
  };

  return (
    <Container maxW="7xl" py={5}>
      <TableContainer>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Customer Name</Th>
              <Th>Price</Th>
              <Th>Last Modified</Th>
              <Th minWidth="50px" maxWidth="50px">
                Edit
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {activeOrders.map((row) => (
              <Tr key={row.id}>
                <Td>{row.id}</Td>
                <Td>{row.customerName}</Td>
                <Td>{row.salePrice}</Td>
                <Td>{formatDateTime(row.time)}</Td>
                <Td minWidth="50px" maxWidth="50px">
                  <>
                    <div
                      style={{ cursor: "pointer" }}
                      background={"none"}
                      _hover={"none"}
                      onClick={() => handleOpenEditModal(row)}
                    >
                      ...
                    </div>

                    <Modal
                      initialFocusRef={initialRef}
                      finalFocusRef={finalRef}
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit Sale Order</ModalHeader>
                        <ModalCloseButton />
                        <form onSubmit={handleEditSaleOrder}>
                          <ModalBody pb={6}>
                            <FormControl>
                              <FormLabel>Customer Name</FormLabel>
                              <Input
                                ref={initialRef}
                                type="text"
                                placeholder="Customer Name"
                                onChange={(e) =>
                                  setEditCustomerName(e.target.value)
                                }
                                value={editCustomerName}
                              />
                            </FormControl>

                            <FormControl mt={4}>
                              <FormLabel>Price</FormLabel>
                              <Input
                                type="number"
                                placeholder="Price"
                                onChange={(e) => setEditPrice(e.target.value)}
                                value={editPrice}
                              />
                            </FormControl>
                            <FormControl mt={7}>
                              <Select
                                placeholder="Select option"
                                onChange={(e) => setEditStatus(e.target.value)}
                                value={editStatus}
                              >
                                <option value="active">Active</option>
                                <option value="completed">
                                  Complete Sale Order
                                </option>
                              </Select>
                            </FormControl>
                          </ModalBody>

                          <ModalFooter>
                            <Button type="submit" colorScheme="blue" mr={3}>
                              Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                          </ModalFooter>
                        </form>
                      </ModalContent>
                    </Modal>
                  </>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ActiveOrders;
