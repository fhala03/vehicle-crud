import { useParams } from "react-router-dom";

const EditVehicleModel = () => {
  const { id } = useParams();

  return <div>EditVehicleModel: {id}</div>;
};

export default EditVehicleModel;
