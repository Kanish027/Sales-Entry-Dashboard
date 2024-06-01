import {
  Button,
  Container,
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
import { useSelector } from "react-redux";

const CompletedOrders = () => {
  const [editOrderId, setEditOrderId] = useState(null);
  const [editCustomerName, setEditCustomerName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { completedOrders } = useSelector((state) => state.sales);

  const initialRef = useRef(null);
  const finalRef = useRef(null);

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

  return (
    <Container maxW="7xl" py={5}>
      <TableContainer>
        <Table size="lg">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Customer Name</Th>
              <Th>Price</Th>
              <Th>Completed Date</Th>
              <Th minWidth="50px" maxWidth="50px">
                View
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {completedOrders.map((row) => (
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
                        <ModalHeader>View Sale Order</ModalHeader>
                        <ModalCloseButton />
                        <form>
                          <ModalBody pb={6}>
                            <FormControl>
                              <FormLabel>Customer Name</FormLabel>
                              <Input
                                ref={initialRef}
                                type="text"
                                value={editCustomerName}
                                isReadOnly
                              />
                            </FormControl>

                            <FormControl mt={4}>
                              <FormLabel>Price</FormLabel>
                              <Input
                                type="number"
                                value={editPrice}
                                isReadOnly
                              />
                            </FormControl>
                            <FormControl mt={7}>
                              <Select value={editStatus} isDisabled>
                                <option value="completed">
                                  Complete Sale Order
                                </option>
                              </Select>
                            </FormControl>
                          </ModalBody>

                          <ModalFooter>
                            <Button onClick={onClose}>Close</Button>
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

export default CompletedOrders;
