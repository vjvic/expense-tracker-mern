import { Box } from "@chakra-ui/react";
import { Header, PrivateRoute } from "./components";
import { Home, SignIn, Signup } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Box>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Box>
  );
}

export default App;
