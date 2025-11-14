// import React from "react";
// import "./App.css";
// import RunChart from "./components/RunChart";
// import RunStats from "./components/RunStats";

// function App() {
//   return (
//     <div className="app">
//       <header>
//         <h1>My Run Tracker</h1>
//       </header>
//       <main>
//         <RunStats />
//         <RunChart />
//       </main>
//     </div>
//   );
// }

// export default App;

import React from "react";
import RunChart from "./components/RunChart";
import RunStats from "./components/RunStats";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
} from "@mui/material";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Run Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mt: 4 }}>
        <RunStats />
        <Box sx={{ mt: 4 }}>
          <RunChart />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
