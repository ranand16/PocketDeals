import React, { useCallback } from "react"
import { DispatchProps, StateProps } from "../../index"
import { Button as CustomButton } from "../../../../shared/FormElements/Button/Button"
import classnames from "classnames"
import styles from "./CartComp.module.scss"
import vegicon from "../../../../images/veg.png"
import { get } from "lodash"

interface Props extends DispatchProps, StateProps {}

const CartComp: React.FunctionComponent<Props> = ({
    cart,
    addProductToCartRequestAction,
    removeProductToCartRequestAction,
    onCheckout,
    onPayment
}: Props) => {
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

    return <>
        <div className={classnames(styles.cart)}>
                {
                    cart.length > 0 ?
                    <div className={classnames("d-flex","flex-col",styles.cartItems)}>
                        <div className={classnames(styles.cartItemsText)}>Cart</div>
                        <div className={classnames(styles.cartItemsTotal)}>{[...cart].reduce((a, b) => a + (b["count"] || 0), 0)} items</div>
                        <div className={classnames("d-flex", "flex-col",styles.cartItemsList)}>
                            {
                                [...cart].map((product, i)=>{
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
                                    text={onCheckout?"CHECKOUT":"PAYMENT"}
                                    size={"sm"}
                                    onClick={onCheckout?onCheckout:onPayment}
                                />
                            </div>
                        </div>
                    </div>
                :<>Empty cart</>}
            </div>
    </>
}

export default CartComp