import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createExpense,
  editExpense,
  closeEdit,
} from "../features/expense/expenseSlice";

const incomeOptions = [
  {
    id: 1,
    text: "Business",
  },
  {
    id: 2,
    text: "Investment",
  },
  {
    id: 3,
    text: "Deposits",
  },
  {
    id: 4,
    text: "Salary",
  },
  {
    id: 5,
    text: "Savings",
  },
];

const expenseOptions = [
  {
    id: 1,
    text: "Bills",
  },
  {
    id: 2,
    text: "Travels",
  },
  {
    id: 3,
    text: "Grocery",
  },
  {
    id: 4,
    text: "Rent",
  },
];

const ExpenseForm = ({ initialRef, finalRef, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const format = (val) => `₱` + val;
  // eslint-disable-next-line
  const parse = (val) => val.replace(/^\₱/, "");

  const [formData, setFormData] = useState({
    name: "",
    amount: "0.00",
    category: "",
    type: "",
  });

  const { name, amount, category, type } = formData;

  const { isSuccess, isError, isEdit, expense, message } = useSelector(
    (state) => state.expense
  );

  //Create expense
  const handleAddExpense = () => {
    if (!name || !amount || !category || !type) {
      toast({
        title: "Error",
        description: "Please add a text fields",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      dispatch(createExpense({ name, amount: Number(amount), category, type }));

      if (isError) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } else if (isSuccess) {
        onClose();
        toast({
          title: "Success",
          description: "Expense successfuly created",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      }
    }
  };

  //Edit expense
  const handleEditExpense = () => {
    if (!name || !amount || !category || !type) {
      toast({
        title: "Error",
        description: "Please add a text fields",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } else {
      dispatch(
        editExpense({
          _id: expense._id,
          name,
          amount: Number(amount),
          category,
          type,
        })
      );

      if (isError) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } else if (isSuccess) {
        dispatch(closeEdit());
        onClose();
        toast({
          title: "Success",
          description: "Edit success",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
      }
    }
  };

  //Close modal and edit
  const closeForm = () => {
    dispatch(closeEdit());
    onClose();
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  let categoryOptions =
    type === "income"
      ? incomeOptions
      : type === "expense"
      ? expenseOptions
      : "";

  useEffect(() => {
    if (isEdit && expense) {
      setFormData({
        name: expense.name,
        amount: expense.amount.toFixed(2),
        category: expense.category,
        type: expense.type,
      });
    }

    if (!isEdit) {
      setFormData({ name: "", amount: "0.00", category: "", type: "" });
    }
  }, [isEdit, dispatch, expense]);

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={closeForm}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? "Edit" : "Add"} Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Expense Name</FormLabel>
            <Input
              ref={initialRef}
              placeholder="Expense Name"
              id="name"
              name="name"
              value={name || ""}
              onChange={onChange}
            />
          </FormControl>

          <FormControl mt={4}>
            <NumberInput
              id="amount"
              name="amount"
              onChange={(valueString) =>
                setFormData((prevState) => ({
                  ...prevState,
                  amount: parse(valueString),
                }))
              }
              value={format(amount) || "0.00"}
              precision={2}
              step={0.2}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl mt={4}>
            <Select
              id="type"
              placeholder="Type"
              name="type"
              value={type || ""}
              onChange={onChange}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <Select
              id="category"
              placeholder="Category"
              name="category"
              value={category || ""}
              onChange={onChange}
            >
              {categoryOptions &&
                categoryOptions.map((category) => (
                  <option key={category.id} value={category.text}>
                    {category.text}
                  </option>
                ))}
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          {isEdit ? (
            <Button colorScheme="blue" mr={3} onClick={handleEditExpense}>
              Update
            </Button>
          ) : (
            <Button colorScheme="blue" mr={3} onClick={handleAddExpense}>
              Add
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExpenseForm;
