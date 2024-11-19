import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { FaTimes } from 'react-icons/fa';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import GenreSelect from './GenreSelect';

const EditBookDialog = ({ open, onClose, onSave, product }) => {
  const [title, setTitle] = useState(product.title);
  // const [authorName, setAuthorName] = useState(product.authorName);
  const [authorName, setAuthorName] = useState(product.author_name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [typeBookId, setTypeBookId] = useState(product.typeBookId);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(product.image);
  const [file, setFile] = useState(null); // State cho file doc/pdf
  const [brandId, setBrandId] = useState([]);
  const [ebookFile, setEbookFile] = useState(product.linkEbook);

  useEffect(() => {
    if (open) {
      setTitle(product.title);
      setAuthorName(product.author_name);
      setQuantity(product.quantity);
      setTypeBookId(product.typeBookId);
      setPrice(product.price);
      setDescription(product.description);
      setImage(null);
      setPreviewImage(product.image);
      setFile(null); // Reset file doc/pdf
      setBrandId([]);
      setEbookFile(product.linkEbook);
    }
  }, [open, product]);

  useEffect(() => {
    if (typeBookId === 2) {
      setQuantity(20);
    } else {
      setFile(null);
      setQuantity(0);
    }
  }, [typeBookId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setImage(file);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === "application/pdf" || selectedFile.type === "application/msword" || selectedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setFile(selectedFile);
    }
  };

  const handleGenreIdChange = (updatedGenreId) => {
    setBrandId(updatedGenreId);
  };

  const handleSave = () => {
    if (!title || !authorName || !description) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi lưu!");
      return;
    }

    if (brandId.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 thể loại cho sách trước khi lưu!");
      return;
    }

    if(ebookFile === null && typeBookId === 2){
      toast.error("Vui lòng đăng file book để có thể bán Ebook!");
      return;
    }

    if (typeBookId !== 2 && quantity === 0) {
      toast.error("số lượng của sách loại Nbook phải lớn hơn 0!");
      return;
    }

    onSave({
      title,
      authorName,
      quantity,
      brandId: brandId,
      typeBookId,
      price,
      description,
      image,
      file,
    });

    // toast.success("Sản phẩm đã được lưu thành công!");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Edit Product
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <FaTimes />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <div className='edit-book d-flex justify-content-lg-between' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>

          <div className='col-sm-5 pe-2' style={{ flex: '1 1 45%' }}>
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <img src={previewImage} alt="Product" style={{ width: 300 , height: 400 }} />
            </div>

            <Button variant="contained" component="label" fullWidth>
              Upload Image
              <input type="file" hidden onChange={handleImageChange} accept="image/*" />
            </Button>

            {typeBookId === 2 && (
              <>
                <Button variant="contained" component="label" fullWidth style={{ marginTop: 10 }}>
                  Upload Book (PDF or DOC)
                  <input type="file" hidden onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                </Button>

                {file && (
                  <p className='mt-2'> File's name: {file.name}</p>
                )}
              </>
            )}
          </div>

          <div className='col-sm-7 ps-3' style={{ flex: '1 1 50%' }}>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className={typeBookId === 2 ? 'mb-3' : ''}
            />

            {typeBookId !== 2 && (
              <TextField
                fullWidth
                margin="normal"
                label="Quantity"
                type="number"
                value={quantity}
                className='mb-3'
                onChange={(e) => {
                  const newQuantity = e.target.value === '' ? 0 : Number(e.target.value);
                  setQuantity(newQuantity);
                }}
              />
            )}

            <GenreSelect className='genre-cus' selectedBrandNames={product.brandNames} onGenreIdChange={handleGenreIdChange} />

            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                value={typeBookId}
                onChange={(e) => setTypeBookId(e.target.value)}
                label="Type"
              >
                <MenuItem value={1}>Nbook</MenuItem>
                <MenuItem value={2}>Ebook</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Price (VND)"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
      <ToastContainer />
    </Dialog>
  );
};

export default EditBookDialog;
