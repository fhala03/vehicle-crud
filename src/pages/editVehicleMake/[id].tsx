import { useParams } from "react-router-dom";

const EditVehicleMake = () => {
  const { id } = useParams();

  return <div>EditVehicleMake: {id}</div>;
};

export default EditVehicleMake;
