import Expeditions from "@/sections/tours/Expeditions/Expeditions";
import Tours from "@/sections/tours/Tours/Tours";
import ToursHero from "@/sections/tours/ToursHero/ToursHero";
import Facts from "@/sections/tours/Facts/Facts";

const BespokeTours = () => {
  return (
    <div>
      <ToursHero/>
      <Tours/>
      <Expeditions/>
      <Facts/>
    </div>
  )
}
export default BespokeTours