import { Avatar, Button, Card, Grid, Input, Loading, Row, Spacer, Text, Textarea } from "@nextui-org/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Helmet from "../../components/Helmet";
import { GlobalStateContext } from "../../GlobalState";
import { getAllCategories } from "../../redux/actions/categoryActions";
import { createProduct, getAllProduct, updateProduct } from "../../redux/actions/productActions";

function CreateProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const state = useContext(GlobalStateContext);
  const initialState = {
    _id: "",
    product_id: "",
    title: "",
    price: 0,
    description: "",
    category: ""
  };
  const dispatch = useDispatch();
  const [product, setProduct] = useState(initialState);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const isAdmin = state.userAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProduct())
  }, [dispatch]);

  const { products } = useSelector(state => state.product)

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setOnEdit(true)
          setProduct(product)
          setImages(product.productImages)
        }
      })
    } else {
      setOnEdit(false)
      setProduct(initialState)
      setImages([])
    }
  }, [params.id, products])

  const { categories } = useSelector((state) => state.category);
  const handleUploadImage = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast.warning("You're not an admin");
      const file = e.target.files[0];
      if (!file) return toast.error("File doesn't exist");
      if (file.size > 1024 * 1024)
        toast.warning("File size is too large");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return toast.warning("File format is incorrect");
      let formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages([...images, res.data]);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleDestroy = async (image_id) => {
    try {
      if (!isAdmin) return toast.warning("You're not an admin");
      await axios.post("/api/destroy", { public_id: image_id },
        {
          headers: { Authorization: token },
        }
      );
      const newImages = images.filter((img) => img.public_id !== image_id)
      setImages(newImages)
    } catch (error) {
      return toast.error(error.response.data.msg);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!images.length) return toast.warning("No images have been uploaded yet")
      if (!product.category) return toast.warning("You must select category")
      if (!isAdmin) return toast.warning("You're not an admin")
      if (onEdit) {
        dispatch(updateProduct({ ...product, productImages: images }, token))
      } else {
        dispatch(createProduct({ ...product, productImages: images }, token))
      }
      setImages([])
      setProduct(initialState)
      navigate("/shop")
    } catch (error) {
      return toast.error(error.message.data.msg)
    }
  }

  return (
    <Helmet title="Create product">
      <div className="create-product">
        <div className="container">
          <Card>
            <Grid.Container gap={2} justify="center">
              <Grid md={6} sm={12}>
                <Row justify="center" align="center" css={{ fd: 'column', border: '1px solid gray', borderRadius: '8px' }}>
                  <div style={{ justifyContent: 'center' }}>
                    {images.length ? (
                      <div style={{ display: 'flex' }}>
                        {images.map((img) => (
                          <div key={img.public_id} style={{ position: 'relative', margin: '0 8px' }}>
                            <Avatar
                              size="lg"
                              src={img.url}
                              alt={img?.url}
                              color="primary"
                              bordered
                            />
                            <span className="create-product__remove__image" onClick={() => handleDestroy(img.public_id)}>x</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <svg
                        style={{ width: "50px" }}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}

                  </div>

                  <div>
                    <label htmlFor="file_upload">
                      <Text color="primary" css={{ cursor: "pointer" }}>Upload a file</Text>
                      <Input
                        type="file"
                        id="file_upload"
                        aria-label="file-upload-input"
                        onChange={handleUploadImage}
                        css={{
                          position: "absolute",
                          width: "1px",
                          height: "1px",
                          padding: "0",
                          margin: "-1px",
                          overflow: "hidden",
                          clip: "rect(0, 0, 0, 0)",
                          border: "0"
                        }}
                      />
                    </label>

                  </div>
                </Row>
              </Grid>

              <Grid md={6} sm={12}>
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                  <Input
                    css={{ w: '100%' }}
                    label="Product id"
                    placeholder="Enter product id..."
                    bordered
                    required
                    name="product_id"
                    value={product.product_id}
                    disabled={onEdit}
                    onChange={handleChangeInput}
                  />
                  <Spacer y={0.5} />
                  <Input
                    css={{ w: '100%' }}
                    label="Title"
                    placeholder="Enter title..."
                    bordered
                    required
                    name="title"
                    value={product.title}
                    onChange={handleChangeInput}
                  />
                  <Spacer y={0.5} />
                  <Input
                    css={{ w: '100%' }}
                    label="Price"
                    placeholder="Enter price..."
                    bordered
                    required
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChangeInput}
                  />
                  <Spacer y={0.5} />
                  <Textarea
                    css={{ w: '100%' }}
                    label="Description"
                    placeholder="Enter description..."
                    bordered
                    required
                    name="description"
                    value={product.description}
                    onChange={handleChangeInput}
                  />
                  <Spacer y={0.5} />
                  <div>
                    <label htmlFor="categories">Categories: </label>
                    <select
                      name="category"
                      value={product.category}
                      onChange={handleChangeInput}
                      className="create-product__select__category"
                    >
                      <option value="">
                        Please select a category
                      </option>
                      {categories?.map((category) => (
                        <option
                          key={category._id}
                          value={category._id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Spacer y={0.5} />
                  <Button
                    type="submit"
                    className="create-product__submit__btn"
                  >{onEdit ? "Update" : "Create"}</Button>
                </form>
              </Grid>
            </Grid.Container>
          </Card>
        </div>
      </div>
      {loading &&
        <div className="loading">
          <Loading />
        </div>
      }
    </Helmet>
  );
}

export default CreateProduct;
