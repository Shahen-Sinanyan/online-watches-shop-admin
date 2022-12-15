import React, { useState, useEffect } from "react";
//import {addProduct} from '../../adminAPI/adminAPI'
import {useDispatch, useSelector} from 'react-redux';
import  {getProducts, forceRerender} from '../../adminSlice/adminSlice';

import {collection, addDoc} from "firebase/firestore";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

function AddProducts() {
  const dispatch = useDispatch();
  const rerender = useSelector(state => state.admin.rerender);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [gender, setGender] = useState("Gender");
  const [category, setCategory] = useState("Category");
  const [completedProduct, setCompletedProduct] = useState({
    name: '',
    brand: '',
    gender: '',
    category: '',
    color: '',
    price: '',
    quantity: '',
    imgUrl:'',
    views: 0,
  })

  const [btnDisabled, setBtnDisabled] = useState(true);

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    checkAllFeatures()
  },[image, name, brand, gender, color, price, quantity, category]);

  const checkAllFeatures = () => {
    const empty = ''
    switch (empty) {
      case (image.trim()): {
        setBtnDisabled(true);
        break;
      }
      case (name.trim()): {
        setBtnDisabled(true);
        break;
      }
      case (brand.trim()): {
        setBtnDisabled(true);
        break;
      }
      case (color.trim()): {
        setBtnDisabled(true);
        break;
      }
      case (price.trim()): {
        setBtnDisabled(true);
        break;
      }
      case (quantity.trim()): {
        setBtnDisabled(true);
        break;
      }
      case (category.trim()):{
        setBtnDisabled(true);
        break;
      }
      case (gender.trim()): {
        setBtnDisabled(true);
        break;
      }
      default: setBtnDisabled(false)
    }
  };

  const addProduct = () => {
    setCompletedProduct(prev => {
      prev.name = name;
      prev.brand = brand;
      prev.gender = gender;
      prev.category = category.toLowerCase();
      prev.color = color;
      prev.price  = price;
      prev.quantity = quantity;
      prev.imgUrl = image;
      prev.views  = 0;
      return prev;
    });
    addDoc(collection(db, `/${completedProduct.category}`), completedProduct, {merge:true})
    setName('');
    setBrand('');
    setGender('');
    setCategory('');
    setColor('');
    setPrice('');
    setQuantity('');
    setImage('');
    dispatch(getProducts());
    dispatch(forceRerender());
  }

  const handleInputNumber = (e) => {
    if (+e.target.value === +e.target.value && typeof(+e.target.value) === 'number') {
      return e.target.value;
    } else {
      return ''
    }
  }
  return (
    <div className="Add_Products_Field">
      <h3>Add products</h3>
      <div>
        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="demo-customized-select-native">
            Category*
          </InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="" />
            <option value="Watches">Watches</option>
            <option value="Jewelleries">Jewelleries</option>
            <option value="Accessories">Accessories</option>
          </NativeSelect>
        </FormControl>

        <FormControl sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="demo-customized-select-native">
            gender*
          </InputLabel>
          <NativeSelect
            id="demo-customized-select-native"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="" />
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </NativeSelect>
        </FormControl>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField size='small' value={name}  onChange={(e) => setName(e.target.value)} id="outlined-basic" label="Name" variant="outlined" />
          <TextField size='small' value={brand} onChange={(e) => setBrand(e.target.value)} id="outlined-basic" label="Brand" variant="outlined" />
          <TextField size='small' value={color} onChange={(e) => setColor(e.target.value)} id="outlined-basic" label="Color" variant="outlined" />
          <TextField size='small' value={price} onChange={(e) => setPrice(handleInputNumber(e))} id="outlined-basic" label="Price" variant="outlined" />
          <TextField size='small' value={quantity} onChange={(e) => setQuantity(handleInputNumber(e))} id="outlined-basic" label="Quantity" variant="outlined" />
          <TextField size='small' value={image} onChange={(e) => setImage(e.target.value)} id="outlined-basic" label="Image URL" variant="outlined" />
        </Box>
      </div>
      <div className="add_button_div">

        <Button
          onClick={addProduct}
          variant="contained"
          color="success"
          disabled={btnDisabled}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default AddProducts;
