import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import design_verifications from "../images/design_verifications.jpg";
import fpga_design_services from "../images/fpga_design_services.jpg";
import HeaderComponent from "./HeadComponent";
import FooterComponent from "./FooterComponent";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";

class HomeComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
    this.loadProducts = this.loadProducts.bind(this);
    this.handleViewProduct = this.handleViewProduct.bind(this);
  }
  componentDidMount() {
    this.loadProducts();
  }
  handleViewProduct = (p) => {
    this.props.navigate("/view", { state: { product: p } });
  };
  loadProducts = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          products: (response && response.products) || [],
        });
      });
  };

  render() {
    console.log(this.state.products);
    let carouselItems = [];
    if (this.state.products && this.state.products.length > 0) {
      for (let itr = 0; itr < this.state.products.length; itr += 3) {
        let itr2 = itr;
        let itemsPerView = [];
        while (itr2 < itr + 3 && itr2 < this.state.products.length) {
          let p = this.state.products[itr2];
          itemsPerView.push(
            <div className="flex-item" key={p.id}>
              <img
                className="d-block w-100"
                src={p.thumbnail}
                alt="Slide"
                onClick={() => this.handleViewProduct(p)}
              />
            </div>
          );
          itr2++;
        }
        carouselItems.push(
          <Carousel.Item key={itr}>
            <div className="d-flex centered">{itemsPerView}</div>
          </Carousel.Item>
        );
      }
    }
    return (
      <Container>
        <div className="container-fluid">
          <div className="body-container">
            <HeaderComponent />
            <div className="img1-container">
              <Link to="/list">
                <img
                  src={design_verifications}
                  className="Main1-Banner"
                  alt="Main1-Banner"
                />
              </Link>
            </div>
            <div className="text-container">
              <p>
                To link a local image in React, import the image at the top of
                the file and assign it to the src prop of an img element. This
                approach works when using a Webpack-based tool like Create React
                App. Note that the image file must be within the project
                directory to be imported successfully.
              </p>
            </div>
            <div className="m-25p">
              <Link to="/list" className="sbc">
                <h3>Shop Now</h3>
              </Link>
              <Carousel data-bs-theme="dark" indicators={false}>
                {carouselItems}
              </Carousel>
            </div>
            <div className="img2-container">
              <img
                src={fpga_design_services}
                className="Main1-Banner"
                alt="Main2-Banner"
              />
            </div>
            <FooterComponent />
          </div>
        </div>
      </Container>
    );
  }
}

const HomePageWithRouter = () => {
  const navigate = useNavigate();
  return <HomeComponent navigate={navigate} />;
};
export default HomePageWithRouter;
