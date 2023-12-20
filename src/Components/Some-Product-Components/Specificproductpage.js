import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, addDoc } from 'firebase/firestore';
import { auth, db } from '../../FirebaseConfigs/firebaseConfig';
import './Specificproductpage.css';
import ProductSlider from './ProductSlider';

const Specificproductpage = () => {
  const { type, id } = useParams();
  const [product, setProduct] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userlogged) => {
      if (userlogged) {
        setLoggedUser(userlogged);
      } else {
        setLoggedUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      let newpath = 'products-BASKETBALLSHOES';

      if (type === 'VINTAGESHOES') {
        newpath = 'products-VINTAGESHOES';
      } else if (type === 'RUNNINGSHOES') {
        newpath = 'products-RUNNINGSHOES';
      } else if (type === 'LIFESTYLESHOES') {
        newpath = 'products-LIFESTYLESHOES';
      }

      const docRef = doc(db, newpath, id);
      const docSnap = await getDoc(docRef);
      setProduct(docSnap.data());
    };

    getProduct();
  }, [type, id]);

  const overalltax = 10 / 100;
  const overcommission = 10 / 100;
  const extratax = 10 / 100;

  const mrp = product ? parseInt(product.price) : 0;
  const totalMrp = mrp + overalltax * mrp + overcommission * mrp + extratax * mrp;

  const saleprice = Math.ceil(totalMrp - extratax * totalMrp);
  const finalprice = Math.ceil(totalMrp - saleprice);

  const addtocart = async () => {
    if (loggedUser) {
      try {
        await addDoc(collection(db, `cart-${loggedUser.uid}`), {
          product,
          quantity: 1,
        });
        setSuccessMsg('Product added to Cart');
      } catch (error) {
        setErrorMsg(error.message);
      }
    } else {
      setErrorMsg('You need to log in first to buy Shoes :) ');
    }
  };

  return (

    <div>
        <Navbar/>
        { product? <div className='myprod-container'>
            <div className='prod-img-cont'>
                <img src={product.productimage} />
            </div> 
            <div className='prod-data'>
                <p className='prod-head'>{product.producttitle}</p>
                <p className='prod-head'>{product.keyspecs}</p>

                <div className='specific-price-container'>
                    <p className='mrp'>MRP:<p className='rate'>${mrp}</p></p>
                    <p className='saleprice'>Discount Price :<p className='rate'>${saleprice}</p></p>
                    <p className='yousave'>You Save:<p className='rate'>${finalprice}</p></p>
                </div>

                <p className='prod-details-head'>Size:</p>
                <p className='prod-description'>{product.description}</p>

                <div className='row-cont'>
                   <div className='warranty-replacement'>
                   <div className='cod'>
                        <div className='img-circle'>
                            
                        </div>
                        <p>Cash on delivery</p>
                    </div>
                    <div className='warranty'>
                        <div className='img-cricle'>
                        
                        </div>
                        <p>{product.warranty} Year Warranty</p>
                    </div>
                    <div className='replacement'>
                        <div className='img-cricle'>
                       
                        </div>
                        <p>10 Days Replacement</p>
                    </div>
                   </div>
                   <div className='buy-cart'>
                        <button className='btn'>Buy Now</button>
                        <button className='btn' onClick={addtocart}>Add to Cart</button>
                   </div>
                </div>
                {successMsg && <>
                    <div className='success-msg'>{successMsg}</div>
                </>}
                {errorMsg && <>
                    <div className='error-msg'>{errorMsg}</div>
                </>}
            

            </div>
        </div> : <div>Loading...</div>
    }
    <p className='prod-details-head2'>Similar items</p>
    <ProductSlider type={type}></ProductSlider>
        </div>
  )
}

export default Specificproductpage
