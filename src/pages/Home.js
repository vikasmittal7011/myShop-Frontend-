import Header from "../components/common/Header";
import { Filter } from "../components/home/Filter";
import NavBar from "./NavBar";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
    <>
      <NavBar>
        <Header heading="Products" />
        <Filter />
        <Footer />
      </NavBar>
    </>
  );
};

export default Home;
