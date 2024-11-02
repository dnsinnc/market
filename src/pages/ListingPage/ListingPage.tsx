import { Link, useLocation, useNavigate } from "react-router-dom";
import { DiscountCard, Loader } from "../../shared";
import ErrorMessage from "../../shared/UI/ErrorMessage";
import { IOffer } from "../../store/reducer/models";
import { useGetAllOffersQuery } from "../../store/services/OffersService";
import AboutUs from "../../widgets/Footer/AboutUs";
import Footer from "../../widgets/Footer/Footer";
import Header from "../../widgets/Header/Header";
import { useState, useEffect, FC, SetStateAction } from "react";
import ReactSlider from 'react-slider';
import { RxCross2 } from "react-icons/rx";
import { GoChevronRight } from "react-icons/go";
import CustomSelect from "../../shared/CustomSelect/CustomSelect";



const ListingPage: FC = () => {
   const { data: offers, isLoading, error } = useGetAllOffersQuery({ category: '', limit: 999 });
   const nav = useNavigate();

   const [minPrice, setMinPrice] = useState<number>(0);
   const [maxPrice, setMaxPrice] = useState<number>(1000);
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const [showSelect, setsShowSelect] = useState<boolean>(false);
   const [selectedOpt, setSelectedOpt] = useState<string>(' ');
   const [searchValue, setSearchValue] = useState(sessionStorage.getItem('search'));


   const onShowSelect = () => {
      setsShowSelect(!showSelect)
   }
   const onSelectOption = (op: SetStateAction<string>) => {
      setSelectedOpt(op)
      setsShowSelect(false)
   }

   useEffect(() => {
     
         setSearchValue(sessionStorage.getItem('search'))
         console.log(searchValue)
    
     

   }, [sessionStorage.getItem('search')])


   const handleCategoryChange = (category: string) => {
      setSelectedCategories((prev) => {
         if (prev.includes(category)) {
            return prev.filter((cat) => cat !== category);
         } else {
            return [...prev, category];
         }
      });
   };

   useEffect(() => {
      if (offers && offers.length > 0) {
         const maxOfferPrice = Math.max(...offers.map((offer) => offer.price));
         setMaxPrice(maxOfferPrice);
      }
   }, [offers]);


   const filteredOffers = offers?.filter((o: IOffer) => {
         const inPriceRange = o.price >= minPrice && o.price <= maxPrice;
         const inSelectedCategories = selectedCategories.length === 0 || selectedCategories.includes(o.category);
      if (searchValue) {
         const matchesSearchTerm = !searchValue || o.title.toLowerCase().includes(searchValue.toLowerCase());
         return inPriceRange && inSelectedCategories && matchesSearchTerm;
      } else {
         return inPriceRange && inSelectedCategories
      }
      
      }) || [];


   if (selectedOpt === 'Price (High to Low)') {
      filteredOffers.sort((a, b) => b.price - a.price);
   } 
   if (selectedOpt === 'Price (Low to High)') {
      filteredOffers.sort((a, b) => a.price - b.price);
   }
   if (selectedOpt === 'Best Rated') {
      filteredOffers.sort((a, b) => parseFloat(b.rating.rate) - parseFloat(a.rating.rate));
   }

   const categories = ["men's clothing", "women's clothing", "jewelery", "electronics"]
   const options = ['Price (Low to High)', 'Price (High to Low)', 'Best Rated']

   return (
      <div className="page">
         <div>
            <DiscountCard />
            <Header autoFocus={true} />
            <div className="text-[clamp(8px,3.5vw,16px)] bg-[#f6f6f6] flex gap-3 items-center">
               <div className="container cursor-pointer flex h-[64px] items-center gap-2"><span className="opacity-[0.8] "><Link to={'/market'}>Ecommerce</Link> </span><GoChevronRight color="" />Search</div>
            </div>
         </div>

         <section className="container pt-9 ">
            <div className="md:flex-nowrap flex gap-[20px] justify-evenly flex-wrap">
               <div className="md:min-w-[400px] min-w-full gap-[20px] h-[550px] rounded-[6px] flex flex-col border-solid border-2 border-[#f6f6f6] px-[40px] py-[24px]">
                  <p>Categories</p>
                  {categories.map(categ => (
                     <>
                        <div className="flex pt-[10px] capitalize text-[grey] gap-[10px]">
                           <label className="custom-checkbox">
                              <input type="checkbox" value="value-1"
                                 checked={selectedCategories.includes(categ)}
                                 onChange={() => handleCategoryChange(categ)} />
                              <span>{categ}</span>

                           </label>

                        </div>
                        <hr />
                     </>

                  ))}


                  <div className="w-full flex flex-col gap-[30px] pt-[30px]">
                     <h2>Price</h2>
                     <ReactSlider
                        min={0}
                        max={1000}
                        value={[minPrice, maxPrice]}
                        onChange={(values) => {
                           setMinPrice(values[0]);
                           setMaxPrice(values[1]);
                        }}
                        className="slider"
                        thumbClassName="thumb"
                        trackClassName="track"
                        renderThumb={(props, state) => (
                           <div  {...props}>
                              <div className="tooltip">${state.valueNow}</div>
                           </div>
                        )}
                     />

                  </div>
               </div>
          
               <div className="w-[60%] relative flex flex-col gap-4">
                  <p>Applied Filters:</p>
                  <div className="flex gap-3 flex-wrap">
                     {selectedCategories.map(category => (
                        <div
                           key={category}
                           className="px-4 hover:bg-[#b8b8b8] cursor-pointer transition-all 
                           duration-[.6s] py-2 text-[14px] flex gap-2 items-center border-solid border-2 
                           border-[#f6f6f6] rounded-[30px] capitalize"
                        >
                           {category}
                           <span
                              onClick={() => handleCategoryChange(category)}
                              className="hover:scale-125 cursor-pointer  transition-all duration-[.4s]"><RxCross2 size={'20px'} />
                           </span>
                        </div>
                     ))}
                  </div>
                  <div className="w-full z-[100] flex text-[14px] justify-between opacity-[0.7]">
                     <p > {filteredOffers.length} Results</p>
                     <div className="w-[150px]">
                        <CustomSelect onSelectOption={(op: SetStateAction<string>) => onSelectOption(op)} options={options}
                           label={`SORT BY: `} onClick={onShowSelect} state={showSelect} selectOption={selectedOpt} />
                     </div>
                  </div>

                  <div className="offers-list justify-start">
                     {isLoading && <Loader />}
                     {error && <ErrorMessage>Try again later, please...</ErrorMessage>}
                     {offers && filteredOffers.map((o: IOffer) => (
                        <div onClick={() => nav(`/market/product/${o.id}`)} key={o.id} className="item">
                           <div className="item__image">
                              <img src={o.image} alt={o.title} />
                           </div>
                           <div className="item__info">
                              <p className="item__title">{o.title}</p>
                              <div className="item__price">
                                 <span className="in-stock">IN STOCK</span>
                                 <p>${o.price}</p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         <div>
            <Footer />
            <AboutUs />
         </div>
      </div>
   );
}

export default ListingPage;
