import { Breadcrumbs } from '@mui/material';
import React from 'react';
import { FaHome } from "react-icons/fa";
import { MdDelete, MdDescription } from "react-icons/md";
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Slider from "react-slick";
import { FaUserPen, FaPencil, FaBox } from "react-icons/fa6";
// import { IoTrashBin } from "react-icons/io5";
import Button from '@mui/material/Button';
import Description from './components/Description';
import { BiSolidCategory } from "react-icons/bi";
import { IoPricetagsSharp } from "react-icons/io5";
import { MdClass } from "react-icons/md";
import { getProductById } from '../../services/ProductService';
import { useParams  } from "react-router-dom";
// import { useNavigate  } from "react-router-dom";
import { useEffect, useCallback } from "react";
import DeleteDialog from './components/DeleteDialog';
import { BsFillBookmarkStarFill } from "react-icons/bs";
import EditBookDialog from './components/EditBookDialog';
import { updateProduct,unSaleProduct, saleProduct } from '../../services/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const ProductDetails = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const [productsData, setProductsData] = React.useState(null);
  const [open, setOpen] = React.useState(false); // Open delete dialog
  const [openEdit, setOpenEdit] = React.useState(false); // Open edit dialog

  const getProductDetails = useCallback(async () => {
    const res = await getProductById(id);
    if (res && res.data) {
      setProductsData(res.data);
    }
  }, [id]);

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  const productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const bookType = (typeBookId) => {
    switch (typeBookId) {
      case 1:
        return "Nbook";
      case 2:
        return "Ebook";
      // case 3:
      //   return "Nbook and Ebook";
      default:
        return "Unknown";
    }
  };

  if (!productsData) {
    return <div>Loading...</div>;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleDelete = () => {
  //   // Logic để xóa sản phẩm
  //   console.log("Sản phẩm đã được xóa");
  //   setOpen(false);
  //   navigate('/Products');
  // };

  const handleEditOpen = () => {
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleSaveChanges = async (updatedData) => {
    // Cập nhật productsData hoặc gọi API lưu thay đổi
    console.log("Updated product data:", updatedData);
    const data = new FormData();
    if(updatedData.image !== null)
      data.append('ImageFile', updatedData.image);
    if (updatedData.file !== null) 
      data.append('EbookFile', updatedData.file);
    data.append('Title', updatedData.title);
    updatedData.brandId.forEach((id, index) => {
      data.append(`brandId[${index}]`, id);
    });
    data.append('Price', updatedData.price);
    data.append('Quantity', updatedData.quantity);
    data.append('Description', updatedData.description);
    data.append('TypeBookId', updatedData.typeBookId);
    data.append('AuthorName', updatedData.authorName);

    try {
      let res = await updateProduct(productsData.bookId,data);
      // setResetGenres(true);
      if (res) {
        // toast.success("Product modified successfully!");
        // toast.success("Sản phẩm đã được lưu thành công!", { autoClose: 5000 }); // autoClose sau 5 giây

        // resetForm();
        setOpenEdit(false);
      } else {
        toast.error("Gặp lỗi khi chỉnh sửa!");
      }
    } catch (error) {
      toast.error("Gặp lỗi khi chỉnh sửa!");
    } finally {
      // window.location.reload();
      getProductDetails();
    }
    // setOpenEdit(false);
  };

  

  const handleDelete = async () => {
    try {
      let res = await unSaleProduct(productsData.bookId);
      if(res){
        setOpen(false);
        toast.success("Sản phẩm đã được ngưng bán!");
      }
      // console.log("Sản phẩm đã được xóa");
      // navigate('/Products');  // Chuyển hướng đến trang /Products
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
    finally {
      getProductDetails();
    }
  };

  const handleUnDelete = async () => {
    try {
      let res = await saleProduct(productsData.bookId);
      if(res){
        setOpen(false);
        toast.success("Sản phẩm đã được mở bán lại!");
      }
      // console.log("Sản phẩm đã được xóa");
      // navigate('/Products');  // Chuyển hướng đến trang /Products
    } catch (error) {
      console.error("Lỗi khi mở bán sản phẩm:", error);
    }
    finally {
      getProductDetails();
    }
  };

  return (
    <div>
      <div className='right-content w-100'>
        <div className='card shadow border-0 w-100 flex-row p-4'>
          <h5 className='mb-0'>Product View</h5>
          <Breadcrumbs aria-label='breadcrumb' className='ms-auto breadcrumb_'>
            <StyledBreadcrumb component='a' href='#' label='Dashboard' icon={<FaHome fontSize='small' />} />
            <StyledBreadcrumb component='a' href='#' label='Product' deleteIcon={<MdDelete />} />
            <StyledBreadcrumb label='Details' />
          </Breadcrumbs>
        </div>

        <div className='card productDetailsSection'>
          <div className='row w-100 m-0 d-flex justify-content-between'>
            {/* Slide product img */}
            <div className='leftcontent col-md-5'>
              <div className='sliderWrapper pt-3 pb-3 ps-4'>
                <h6 className='mb-4'>Product Gallery</h6>
                <Slider {...productSliderOptions} className='sliderBig mb-2'>
                  <div className='slide-item'>
                    <img src={productsData.image} alt='product item'></img>
                  </div>
                </Slider>
              </div>
            </div>

            {/* product details */}
            <div className='rightcontent col-md-6'>
              <div className='pt-3 pb-3 pe-4'>
                <h6 className='mb-4'>Product Details</h6>
                {/* <h4>{productsData.title}</h4> */}
                <h4>
                  {productsData.title}{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color: productsData.isSale ? "green" : "red"
                    }}
                  >
                    ({productsData.isSale ? "Đang bán" : "Ngưng bán"})
                  </span>
                </h4>

                <div className='productInfo mt-3'>
                  {/* Author */}
                  <div className='row pb-3'>
                    <div className='name-detail col-sm-5 d-flex align-items-center'>
                      <FaUserPen className='icon' />
                      <span className='name fw-bold'>Author</span>
                    </div>
                    <div className='col-sm-7'>
                      <span className='name'>{productsData.authorName}</span>
                      {/* <span className='name'>{productsData.author_name}</span> */}
                    </div>
                  </div>

                  {/* Quantity */}
                  {productsData.typeBookId !== 2 && (
                    <div className='row pb-3'>
                      <div className='name-detail col-sm-5 d-flex align-items-center'>
                        <FaBox className='icon' />
                        <span className='name fw-bold'>Quantity</span>
                      </div>
                      <div className='col-sm-7'>
                        <span className='name'>{productsData.quantity}</span>
                      </div>
                    </div>
                  )}

                  {/* Brand Names */}
                  <div className='row pb-3'>
                    <div className='name-detail col-sm-5 d-flex align-items-center'>
                      <BiSolidCategory className='icon' />
                      <span className='name fw-bold'>Brand</span>
                    </div>
                    <div className='col-sm-7'>
                      <span className='name'>{productsData.brandNames.join(", ")}</span>
                    </div>
                  </div>

                  {/* Book type  */}
                  <div className='row pb-3'>
                    <div className='name-detail col-sm-5 d-flex align-items-center'>
                      <MdClass className='icon' />
                      <span className='name fw-bold'>Type</span>
                    </div>
                    <div className='col-sm-7'>
                      <span className='name'>{bookType(productsData.typeBookId)}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className='row pb-3'>
                    <div className='name-detail col-sm-5 d-flex align-items-center'>
                      <IoPricetagsSharp className='icon' />
                      <span className='name fw-bold'>Price</span>
                    </div>
                    <div className='col-sm-7'>
                      <span className='name'>{productsData.price.toLocaleString('vi-VN')} VND</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className='row pb-3'>
                    <div className='name-detail col-sm-5 d-flex align-items-center'>
                      <BsFillBookmarkStarFill className='icon' />
                      <span className='name fw-bold'>Rating</span>
                    </div>
                    <div className='col-sm-7'>
                      <span className='name'>{(productsData.rating ?? 5)} ★</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className='row'>
                    <div className='name-detail col-sm-5 d-flex align-items-center'>
                      <MdDescription className='icon' />
                      <span className='name fw-bold'>Description</span>
                    </div>
                    <Description text={productsData.description} charLimit={250} />
                  </div>
                </div>
              </div>
            </div>

            {/* Modify Button  */}
            <div className='lastcontent col-md-1'>
              <div className='buttonWrapper pt-3 pb-3'>
                {/* edit  */}
                <Button className="success" color="success" onClick={handleEditOpen}><FaPencil /></Button>
                {/* delete  */}
                {/* <Button className="error" color="error"><IoTrashBin /></Button> */}
                {/* Render nút khóa hoặc mở khóa dựa vào isSale */}
                {productsData.isSale === 1 ? (
                  <Button className="error" color="error" onClick={handleClickOpen}>
                    <FaLock />
                  </Button>
                ) : (
                  // <Button className="error" color="warning" onClick={handleClickOpen}>
                  <Button className="warning" color="warning" onClick={handleClickOpen}>
                    <FaLockOpen />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteDialog
          open={open}
          onClose={handleClose}
          handleDelete={productsData.isSale ? handleDelete : handleUnDelete}
          isSale={productsData.isSale}
        />
      <EditBookDialog
        open={openEdit}
        onClose={handleEditClose}
        onSave={handleSaveChanges}
        product={productsData}
      />
      <ToastContainer autoClose={5000}/>
    </div>
  );
}

export default ProductDetails;
