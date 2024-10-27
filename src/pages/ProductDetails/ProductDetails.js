import { Breadcrumbs } from '@mui/material';
import React from 'react';
import { FaHome } from "react-icons/fa";
import { MdDelete, MdDescription } from "react-icons/md";
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Slider from "react-slick";
import { FaUserPen, FaPencil, FaBox } from "react-icons/fa6";
import { IoTrashBin } from "react-icons/io5";
import Button from '@mui/material/Button';
import Description from './components/Description';
import { BiSolidCategory } from "react-icons/bi";
import { IoPricetagsSharp } from "react-icons/io5";

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
  // Dữ liệu JSON được định nghĩa trong component
  const data = {
    bookId: 19,
    title: "Harry Potter",
    price: 110,
    quantity: 100,
    typeBookId: 3,
    image: "https://cdn0.fahasa.com/media/catalog/product/h/a/harry_potter_and_the_philosophers_stone_1_2018_11_20_07_17_17.jpg?_gl=1*18dm32t*_gcl_aw*R0NMLjE3MjU3OTA4NTQuQ2owS0NRandsdlcyQmhEeUFSSXNBRG5JZS1JN0FnZDFOMHZhZkpEWlhLeUhsRnd2aXdEd0R0T0ZReWZvOWFIbHozZmsyOHB6UTVmT3F3WWFBaWxjRUFMd193Y0I.*_gcl_au*MTcwNTIzOTU3Ny4xNzI1NzkwODQ4*_ga*MTYwMDc1MzIzOS4xNzI1NzkwODQ4*_ga_460L9JMC2G*MTczMDAxNzI4NC42LjEuMTczMDAxNzMwMy40MS4wLjE5NjM0NzgwMDI.",
    description: `"Mật Mã Da Vinci" là một tiểu thuyết trinh thám hấp dẫn kể về cuộc phiêu lưu đầy kịch tính của giáo sư Robert Langdon trong thành phố Paris hoa lệ. Khi một vụ án mạng bí ẩn xảy ra tại bảo tàng Louvre, Langdon bị cuốn vào một cuộc đua căng thẳng nhằm giải mã các bí ẩn cổ xưa và nguy hiểm. Với những manh mối từ các tác phẩm nghệ thuật nổi tiếng, ông phải tìm ra chìa khóa trước khi bí mật bị chôn vùi mãi mãi.
    Trong hành trình của mình, Langdon không chỉ đối diện với những hiểm nguy từ các thế lực đối nghịch, mà còn khám phá ra những sự thật gây chấn động về lịch sử và tôn giáo. "Mật Mã Da Vinci" là một cuộc hành trình trí tuệ và căng thẳng, kết hợp giữa yếu tố bí ẩn và ly kỳ, chắc chắn sẽ cuốn hút độc giả từ trang đầu tiên đến trang cuối cùng.`,
    authorName: "Rowling",
    brandNames: ["Biography and Memoir", "Urban Fantasy"]
  };

  const productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
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
          <div className='row w-100 m-0'>
            {/* Slide product img */}
            <div className='leftcontent col-md-5'>
              <div className='sliderWrapper pt-3 pb-3 ps-4 pe-4'>
                <h6 className='mb-4'>Product Gallery</h6>
                {/* main img  */}
                <Slider {...productSliderOptions} className='sliderBig mb-2'>
                  <div className='slide-item'>
                    <img src={data.image} alt='product item'></img>
                  </div>
                </Slider>
                {/* support img  */}
                <Slider {...productSliderSmlOptions} className='sliderSml'>
                  <div className='slide-item'>
                    <img src={data.image} className='w-100' alt='product item'></img>
                  </div>
                  <div className='slide-item'>
                    <img src={data.image} className='w-100' alt='product item'></img>
                  </div>
                  <div className='slide-item'>
                    <img src={data.image} className='w-100' alt='product item'></img>
                  </div>
                  <div className='slide-item'>
                    <img src={data.image} className='w-100' alt='product item'></img>
                  </div>
                </Slider>
              </div>
            </div>

            {/* product details */}
            <div className='rightcontent col-md-6'>
              <div className='pt-3 pb-3 pe-4'>
                <h6 className='mb-4'>Product Details</h6>
                <h4>{data.title}</h4>

                <div className='productInfo mt-3'>
                  {/* Author */}
                  <div className='row pb-3'>

                    <div className='name-detail col-sm-5 d-flex align-items-center'>
                      <FaUserPen className='icon' />
                      <span className='name fw-bold'>Author</span>
                    </div>

                    <div className='col-sm-7'>
                      <span className='name'>{data.authorName}</span>
                    </div>

                  </div>

                  {/* Quantity */}
                  <div className='row pb-3'>

                    <div className='name-detail col-sm-5 d-flex align-items-center'>
                      <FaBox className='icon' />
                      <span className='name fw-bold'>Quantity</span>
                    </div>

                    <div className='col-sm-7'>
                      <span className='name'>{data.quantity}</span>
                    </div>

                  </div>

                  {/* Brand Names */}
                  <div className='row pb-3'>

                    <div className='name-detail col-sm-5 d-flex align-items-center'>
                      <BiSolidCategory className='icon' />
                      <span className='name fw-bold'>Brand</span>
                    </div>

                    <div className='col-sm-7'>
                      <span className='name'>{data.brandNames.join(", ")}</span>
                    </div>

                  </div>

                  {/* Price */}
                  <div className='row pb-3'>

                    <div className='name-detail col-sm-5 d-flex align-items-center'>
                      <IoPricetagsSharp className='icon' />
                      <span className='name fw-bold'>Price</span>
                    </div>

                    <div className='col-sm-7'>
                      <span className='name'>{data.price} VND</span>
                    </div>

                  </div>

                  {/* Description */}
                  <div className='row pb-3'>
                    <div className='name-detail col-sm-5 d-flex align-items-center'>
                      <MdDescription className='icon' />
                      <span className='name fw-bold'>Description</span>
                    </div>
                    <Description text={data.description} charLimit={250} />
                  </div>
                </div>
              </div>
            </div>

            {/* Modify Button  */}
            <div className='lastcontent col-md-1'>
              <div className='buttonWrapper pt-3 pb-3'>
                <Button className="success" color="success"><FaPencil /></Button>
                <Button className="error" color="error"><IoTrashBin /></Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
