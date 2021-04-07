import React, { useCallback, useEffect, useState } from 'react'
import { DispatchProps, StateProps } from "../../index"
import classnames from 'classnames';
import styles from "./ProductsList.module.scss"
import vegicon from "../../../../images/veg.png"
import cartempty from "../../../../images/emptycart.png"
import { Button, responsiveFontSizes } from '@material-ui/core';
import { Button as CustomButton } from "../../../../shared/FormElements/Button/Button"
import { get } from "lodash"
import { useHistory } from 'react-router';
import axios, { AxiosRequestConfig } from 'axios';
import { stringifyValue } from '../../../../shared/Utils/Stringify';
import CartComp from '../../../Cart/components/CartComp/CartComp';

interface Props extends DispatchProps, StateProps {}

const ProductsList: React.FC<Props> = ({
    list,
    listLoading,
    cart,
    fetchProductsRequestAction,
    addProductToCartRequestAction,
    removeProductToCartRequestAction
}: Props) => {
    const history = useHistory();
    const [visibleProducts, setvisibleProducts] = useState(10);
    useEffect(()=> {
        if(list.length>0) return 
        fetchProductsRequestAction()
    }, [])

    /**
     * Load more products
     */
    const loadMoreProducts = () => {
        setvisibleProducts(visibleProducts+20)
    }

    /**
     * Add this product to cart
     */
    const addToCart = useCallback((e)=>{
        const productId = e.currentTarget.getAttribute("data-key")
        addProductToCartRequestAction(productId)
    },[])

    /**
     * Remove this product from cart
     */
    const removeFromCart = useCallback((e)=>{
        e.stopPropagation();
        const productId = e.target.getAttribute("data-key")
        removeProductToCartRequestAction(productId)
    },[])

    /**
     * On checkout button
     */
    const onCheckout = useCallback(() => {
        history.push("/cart")
    },[history])

    /**
     * On payment button
     */
    const onPayment = useCallback(() => {

    },[])

    const payment = async () => {
        console.log("Payment start")
        try{
            const amount = "100.00";
            const phone_number = "+919111233100";
            const email = "100.00";
            const orderId = "order_id"+(new Date().getTime());
            const params = {
                amount,
                phone_number,
                email,
                orderId
            }   
            const url = "http://localhost:8081/payment"
            const req: AxiosRequestConfig = {
                url: url,
                params: params,
                method: 'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            }
            const response:any = await axios(req);
            const processParams = await response.data;
            console.log(processParams)
            const details = {
                action: "https://securegw-stage.paytm.in/order/process",
                params: processParams
            }
            console.log(details)
            post(details);
        } catch (error) {
            console.log(error)
        }
    }
  
    // const buildForm = ({ action, target, params }) => {
    const buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)
        // form.setAttribute('target', target)
    
        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', stringifyValue(params[key]))
            form.appendChild(input)
        })
        return form
    }
    
    const post = (details) => {
        const form = buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    return <div className={classnames(styles.productListContainer)}>
        {listLoading}
        <div className={classnames("d-flex")}>
            <div className={classnames(styles.productTypes)}>

            </div>
            <div className={classnames("d-flex","flex-col",styles.cardsContainer)}>
                {
                    list.slice(0, visibleProducts).map((product, index)=>{
                        const isPresentInCart = cart.filter((prod)=> prod.id === product.id)
                        return <div className={classnames(styles.card)} key={index}>
                            <div>
                                <div className={classnames("d-flex", "align-center", "space-between")}>
                                    <div className={classnames(styles.productImage, "d-flex", "align-center")}>
                                        <img src={product.imagelinks} />
                                        <div className={classnames(styles.productDetails)}>
                                            <div className={classnames("bold",styles.productCompany)}>{product.brand}</div>
                                            <div className={classnames("semi-medium",styles.productName)}>
                                                <img style={{ width: "16px" }} src={vegicon} /> {product.productname}
                                            </div>
                                            <div className={classnames("light",styles.productPrice)}>
                                                <span className={"rupee"}>{product.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classnames(styles.productQuantity)}>
                                        {
                                            isPresentInCart.length>0?
                                            <div
                                                className={classnames("semi-bold", styles.cartManipulate)} 
                                            >
                                                <span 
                                                    className={classnames(styles.minus)}
                                                    data-key={product.id}
                                                    onClick={removeFromCart}
                                                >
                                                    -
                                                </span>
                                                <span 
                                                    className={classnames(styles.countText)}
                                                >
                                                    {isPresentInCart[0].count}
                                                </span>
                                                <span
                                                    className={classnames(styles.add)}
                                                    data-key={product.id}
                                                    onClick={addToCart}
                                                >
                                                    +
                                                </span>
                                            </div>
                                            :<div 
                                                className={classnames("semi-bold", styles.addButton)} 
                                                data-key={product.id}
                                                onClick={addToCart}
                                            >
                                                <span className={classnames(styles.addText)}>ADD</span>
                                                <span className={classnames(styles.add)}>+</span>

                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={classnames(styles.horizontalRule)}></div>
                        </div>
                    })
                }
                <div className={classnames(styles.loadMore)} onClick={loadMoreProducts}>
                    {/* Load more products */}
                    <Button color="primary">Load more products</Button>
                </div>
            </div>
            <CartComp 
                cart={cart}
                addProductToCartRequestAction={addProductToCartRequestAction}
                removeProductToCartRequestAction={removeProductToCartRequestAction}
                onCheckout={onCheckout}
                onPayment={null}
            />
        </div>
    </div>
}

export default ProductsList