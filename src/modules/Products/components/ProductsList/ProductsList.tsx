import React, { useCallback, useEffect, useState } from 'react'
import { DispatchProps, StateProps } from "../../index"
import classnames from 'classnames';
import styles from "./ProductsList.module.scss"
import vegicon from "../../../../images/veg.png"
import cartempty from "../../../../images/emptycart.png"
import { Button } from '@material-ui/core';
import { Button as CustomButton } from "../../../../shared/FormElements/Button/Button"
import { get } from "lodash"
import { useHistory } from 'react-router';

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
            <div className={classnames(styles.cart)}>
                {
                    cart.length > 0 ?
                    <div className={classnames("d-flex","flex-col",styles.cartItems)}>
                        <div className={classnames(styles.cartItemsText)}>Cart</div>
                        <div className={classnames(styles.cartItemsTotal)}>{[...cart].reduce((a, b) => a + (b["count"] || 0), 0)} items</div>
                        <div className={classnames("d-flex", "flex-col",styles.cartItemsList)}>
                            {
                                cart.map((product, i)=>{
                                    console.log(product)
                                    return <div key={i} className={classnames("d-flex","space-between",styles.cartItem)}>
                                        <div className={classnames(styles.productDetails)}>
                                            <div className={classnames("bold",styles.productCompany)}>{get(product, "productDetails.brand", "")}</div>
                                            <div className={classnames("semi-medium",styles.productName)}>
                                                <img style={{ width: "16px" }} src={vegicon} /> {get(product, "productDetails.productname", "")}
                                            </div>
                                            <div className={classnames("light",styles.productPrice)}>
                                                <span className={"rupee"}>{get(product, "productDetails.price", "")}</span>
                                            </div>
                                        </div>
                                        <div className={classnames(styles.productQuantity)}>
                                            <span 
                                                className={classnames("pointer",styles.minus)}
                                                data-key={product.id}
                                                onClick={removeFromCart}
                                            >
                                                -
                                            </span>
                                            <span 
                                                className={classnames(styles.countText)}
                                            >
                                                {product.count}
                                            </span>
                                            <span
                                                className={classnames("pointer",styles.add)}
                                                data-key={product.id}
                                                onClick={addToCart}
                                            >
                                                +
                                            </span>
                                    </div>
                                </div>   
                                })
                            }
                        </div>
                        <div className={classnames(styles.cartItemsCheckout)}>
                            <div className={classnames("d-flex","space-between",styles.cartSum)}>
                                <div>Subtotal</div>
                                <div><span className={"rupee"}>{[...cart].reduce((a, b) => a + get(b,"count",0)*get(b,"productDetails.price",0), 0)}</span></div>
                            </div>
                            <div></div>
                            <div className={classnames(styles.checkoutButton)}>
                                <CustomButton
                                    variant="primary"
                                    type="submit"
                                    text="CHECKOUT"
                                    size={"sm"}
                                    onClick={onCheckout}
                                />
                            </div>
                        </div>
                    </div>:
                    <div className={classnames("d-flex","flex-col",styles.cartEmpty)}>
                        <div className={classnames(styles.cartEmptyText)}>Cart Empty</div>
                        <img src={cartempty} alt={"Empty cart"} />
                    </div>

                }
            </div>
        </div>
    </div>
}

export default ProductsList