import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import { Filter } from "../components/home/Filter";
import NavBar from "./NavBar";

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
