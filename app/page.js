import {ContactUs} from "@/components/ContactUs";
import NavComponent from "@/components/nav";

function Homepage() {
  return (
    <div>
      <div>
        <NavComponent />
      </div>

      <div className="">
        <ContactUs />
      </div>
    </div>
  );
}

export default Homepage;
