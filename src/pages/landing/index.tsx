import { useEffect } from "react";
import { observer } from "mobx-react";
import { useRootStore } from "@/stores/rootStore";

const LandingPage = observer(() => {
  const { vehicleMakeStore } = useRootStore();

  useEffect(() => {
    vehicleMakeStore.fetchMakes();
  }, [vehicleMakeStore]);

  return (
    <div>
      <h1>Vehicle Makes</h1>
      {vehicleMakeStore.makes.map((make) => (
        <div key={make.id}>{make.name}</div>
      ))}
    </div>
  );
});

export default LandingPage;
