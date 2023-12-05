import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import VehicleMakesPage from "./pages/vehicleMake";
import VehicleModelsPage from "./pages/vehicleModel";
import SharedLayout from "./components/sharedLayout";
import EditVehicleMake from "./pages/editVehicleMake/[id]";
import EditVehicleModel from "./pages/editVehicleModel/[id]";

function App() {
  return (
    <Routes>
      <Route element={<SharedLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vehicle-makes" element={<VehicleMakesPage />} />
        <Route path="/vehicle-models" element={<VehicleModelsPage />} />
        <Route path="/:id/editMake" element={<EditVehicleMake />} />
        <Route path="/:id/editModel" element={<EditVehicleModel />} />
        <Route path="*" element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
