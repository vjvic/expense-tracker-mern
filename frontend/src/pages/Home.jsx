import React, { useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  GridItem,
  Text,
  Button,
  useDisclosure,
  useColorModeValue,
  Spinner,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { PieChart, ExpenseForm, ExpenseItem } from "../components";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpense, reset } from "../features/expense/expenseSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { expenseList, isLoading } = useSelector((state) => state.expense);

  const backround = useColorModeValue("gray.50", "gray.800");

  //Sort expense by date
  const sortExpense = (expense) => {
    const expenseForSort = [...expense];
    return expenseForSort.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  //Return the total for each category
  const filterCategory = (expense, type, category) => {
    return expense
      .filter((item) => item.type === type)
      .filter((item) => item.category === category).length;
  };

  //Get the total income
  const totalIncome = expenseList
    .filter((item) => item.type === "income")
    .reduce((acc, item) => acc + item.amount, 0);

  //Get the total Expense
  const totalExpense = expenseList
    .filter((item) => item.type === "expense")
    .reduce((acc, item) => acc + item.amount, 0);

  //Get the total balance

  const totalBalance = totalIncome - totalExpense;

  //Income background color
  const incomeBgColor = ["#069C24", "#045C15", "#09DB33", "#09E836", "#08C22D"];
  //Income label
  const incomeLabel = [
    "Business",
    "Investment",
    "Deposits",
    "Salary",
    "Savings",
  ];
  //Income data
  const incomeData = incomeLabel.map((label) =>
    filterCategory(expenseList, "income", label)
  );

  //Expense background color
  const expenseBgColor = [
    "#9C3930",
    "#5C221C",
    "#DB5144",
    "#E85548",
    "#C2473C",
  ];
  //Expense label
  const expenseLabel = ["Bills", "Travels", "Grocery", "Rent"];
  //Income data
  const expenseData = expenseLabel.map((label) =>
    filterCategory(expenseList, "expense", label)
  );

  useEffect(() => {
    dispatch(getAllExpense());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH={"calc(100vh - 60px)"}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );

  return (
    <Box bg={backround} minH={"calc(100vh - 60px)"}>
      <ExpenseForm isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

      <Container maxW="container.lg" py={"60px"}>
        <Grid templateColumns="repeat(2, 1fr)" gap="6" mb="40px">
          <GridItem>
            <PieChart
              text={"Income"}
              totalAmount={totalIncome}
              bgColor={incomeBgColor}
              label={incomeLabel}
              data={incomeData}
            />
          </GridItem>

          <GridItem>
            <PieChart
              text={"Expense"}
              totalAmount={totalExpense}
              bgColor={expenseBgColor}
              label={expenseLabel}
              data={expenseData}
            />
          </GridItem>
        </Grid>

        <Box
          boxShadow="base"
          p="1rem"
          borderRadius="10px"
          backgroundColor={"#fff"}
        >
          <Box
            mb="5"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="xl" fontWeight="bold">
              Total Balance{" "}
              <Box as="span" color={totalBalance <= 0 ? "red" : "green"}>
                &#8369;{totalBalance.toFixed(2)}
              </Box>
            </Text>

            <Button leftIcon={<FaPlus />} onClick={onOpen}>
              Add Expense
            </Button>
          </Box>
          <Box h="250px" overflowY="auto">
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              align="stretch"
              as="ul"
            >
              {expenseList.length <= 0 ? (
                <Text textAlign={"center"}>No expense item</Text>
              ) : (
                sortExpense(expenseList).map((item) => (
                  <ExpenseItem key={item._id} item={item} open={onOpen} />
                ))
              )}
            </VStack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
