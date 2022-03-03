import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../contexts/ProudctsContext";
import {
  ImageWithZoom,
  Slider,
  CarouselProvider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./ProductCard.css";
import axios from "axios";
import {JSON_API} from '../../helpers/constants'
import { PROFILE_API } from "../../helpers/constants";
import './ProductDetail.css'
const ProductDetail = (props) => {
  const {
    getProductsDetails,
    productDetails,
    addAndDeleteProductInCart,
    checkProductInCard,
    addNewComments
  } = useContext(productsContext);

  const [comments, setComments] = useState({})
  const [name, setName] = useState('')

  async function getName(){
    const { data } = await axios(`${PROFILE_API}`)
    setName(data.name)
  }
  

  useEffect(() => {
    getProductsDetails(props.match.params.id);  
    getName()
  }, []);

  async function handleClick(){
    let obj = {...productDetails}
    obj.comments.push(comments)
    addNewComments(obj)
    setComments(obj)
    // await axios.patch(`${JSON_API}/products/${arr.id}`, arr)
}

  function handleComments(e){
    let newComment = {
      name: name,
      comment: e.target.value
    }
    setComments(newComment)
  }


  return (
    <div>
      {productDetails ? (
        <div className="d-flex row">
          <div className="col-md-5 col-sm-6" style={{ padding: "0", margin: "0" }}>
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={125}
              totalSlides={3}
            >
              <Slider >
                <Slide index={0}>
                  <ImageWithZoom src={productDetails.img} />
                </Slide>
                <Slide index={1}>
                  <ImageWithZoom src={productDetails.img} />
                </Slide>
                <Slide index={2}>
                  <ImageWithZoom src={productDetails.img} />
                </Slide>
              </Slider>
              {/* <ButtonBack>Back</ButtonBack>
              <ButtonNext>Next</ButtonNext> */}
            </CarouselProvider>
          </div>
          <div className="col-md-7 col-sm-5">
            <table>
              <tbody>
                <tr style={{ fontSize: "50px", fontWeight: "700" }}>
                  <td>{productDetails.title}</td>
                </tr>
                <tr>
                  <td style={{ fontSize: "50px", fontWeight: "700" }}>
                    {productDetails.price} сом
                  </td>
                </tr>
                <tr>
                  {checkProductInCard(productDetails.id) ? (
                    <button
                      onClick={() => addAndDeleteProductInCart(productDetails)}
                      className="btn btn1"
                      style={{
                        width: "305px",
                        height: "60px",
                        backgroundColor: "#f72585",
                        color: "white",
                        marginTop: "0",
                        marginTop: "50px",
                        marginBottom: "50px",
                      }}
                    >
                      В Корзине
                    </button>
                  ) : (
                    <button
                      onClick={() => addAndDeleteProductInCart(productDetails)}
                      className="btn btn"
                      style={{
                        width: "305px",
                        height: "60px",
                        backgroundColor: "#791188",
                        color: "white",
                        marginTop: "50px",
                        marginBottom: "50px",
                      }}
                    >
                      Добавить в Корзину
                    </button>
                  )}
                </tr>
                <tr>
                  <th style={{ fontSize: "20px" }}>Описание: </th>
                </tr>
                <tr>
                  <td style={{ fontSize: "20px" }}>
                    {productDetails.description}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

         <div className="d-flex row col-md-12">
         <div className=" ml-5">
            <input
              type="text"
              className="form-control"
              placeholder="Comment"
              style={{width: "300px"}}
              onChange={(e) =>handleComments(e)}
            />
              <button onClick={handleClick} type="submit" className="btn" style={{marginTop: "20px", backgroundColor: "#791188", color: "white"}}>
            Submit
          </button>
          </div>
          <div className="">
              {
                productDetails.comments.map(item =>(
                  <ul style={{color: "black"}}>
                  <li style={{color: "black"}}>{item.name}:</li>
                  <li style={{color: "black"}}>{item.comment}</li>
                  </ul>
                ))
              }
          </div>
         </div>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

export default ProductDetail;
