import { Link, useNavigate } from "react-router-dom";
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
import { VscSettings } from "react-icons/vsc";
import { motion } from "framer-motion";
import { animLeftText, downAnimText } from "../../app/MAnimations/animations";




const ListingPage: FC = () => {
   const { data: offers, isLoading, error } = useGetAllOffersQuery({ category: '', limit: 999 });
   const nav = useNavigate();

   const [minPrice, setMinPrice] = useState<number>(0);
   const [maxPrice, setMaxPrice] = useState<number>(1000);
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   const [showSelect, setsShowSelect] = useState<boolean>(false);
   const [selectedOpt, setSelectedOpt] = useState<string>(' ');
   const [searchValue, setSearchValue] = useState(sessionStorage.getItem('search'));
   const [showSortSetting, setShowSortSetting] = useState<boolean>(false);


   const onShowSelect = () => {
      setsShowSelect(!showSelect)
   }
   const onSelectOption = (op: SetStateAction<string>) => {
      setSelectedOpt(op)
      setsShowSelect(false)
   }

   
   useEffect(() => {

      setSearchValue(sessionStorage.getItem('search'))


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
      <motion.div
         initial="hidden"
         animate="visible"
         className="page">
         <div>
            <DiscountCard />
            <Header serching autoFocus={true} />
            <div className="text-[clamp(8px,3.5vw,16px)] bg-[#f6f6f6] flex gap-3 items-center">
               <div className="container cursor-pointer flex h-[64px] items-center gap-2"><span className="opacity-[0.8] "><Link to={'/market'}>Ecommerce</Link> </span><GoChevronRight color="" />Search</div>
            </div>
         </div>

         <section
              className="container pt-9 ">
            <div className="md:hidden flex justify-start py-[20px]">
               <div className="hover:scale-125 cursor-pointer duration-200">
                  <VscSettings onClick={() => setShowSortSetting(!showSortSetting)} size={"30px"} /></div></div>
            <div className="md:flex-nowrap flex gap-[20px] justify-evenly flex-wrap">
               <div  className={`md:min-w-[300px] overflow-hidden md:hidden flex 
                  ${!showSortSetting ? 'hideSettingAnim' : 'showSettingAnim'} min-w-full gap-[20px] 
                  rounded-[6px]  flex-col border-solid border-2 border-[#f6f6f6] `}>
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

                  <motion.div custom={1.5} variants={animLeftText} className="md:min-w-[350px] overflow-hidden md:flex hidden 
                   min-w-full gap-[20px] p-[30px] h-[550px] rounded-[6px]  flex-col border-solid border-2 border-[#f6f6f6] ">
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
                  </motion.div>

            

               <motion.div custom={1.5} variants={downAnimText} className="w-full relative flex flex-col gap-4">
                  <p>Applied Filters:</p>
                  <div className="flex gap-3 flex-wrap">
                     {selectedCategories.map(category => (
                        <div onClick = { () => handleCategoryChange(category) }
                           key={category}
                           className="px-4 hover:bg-[#a67d7d] cursor-pointer transition-all 
                           duration-[.3s] py-2 text-[14px] flex gap-2 items-center border-solid border-2 
                           border-[#f6f6f6] rounded-[30px] capitalize"
                        >
                           {category}
                           <span
                              
                              className="hover:scale-125 cursor-pointer  transition-all duration-[.4s]"><RxCross2 size={'20px'} />
                           </span>
                        </div>
                     ))}
                  </div>
                  <div className="flex-wrap gap-4 z-[100] flex  text-[14px] justify-between opacity-[0.7]">
                     <p > {filteredOffers.length} Results</p>
                     <div className="min-w-[200px] ">
                        <CustomSelect onSelectOption={(op: SetStateAction<string>) => onSelectOption(op)} options={options}
                           label={`SORT BY: `} onClick={onShowSelect} state={showSelect} selectOption={selectedOpt} />
                     </div>
                  </div>
                  {!isLoading && !error &&
                     filteredOffers.length === 0 ? <p className='text-[20px] pt-[80px] text-center opacity-[0.6] '>Product not found :(</p> : ""
                  }


                  <div  className="offers-list justify-between">
                     {isLoading && <Loader />}
                     {error && <ErrorMessage>Try again later, please...</ErrorMessage>}
                     {offers && filteredOffers.map((o: IOffer) => (
                        <div  key={o.id} className="item">
                           <div onClick={() => nav(`/market/product/${o.id}`)} className="item__image">
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
               </motion.div>
            </div>
         </section>

         <div className="overflow-hidden">
            <Footer />
            <AboutUs />
         </div>
      </motion.div>
   );
}

export default ListingPage;
