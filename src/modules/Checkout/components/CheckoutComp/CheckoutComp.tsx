import classnames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./CheckoutComp.module.scss";
import { DispatchProps, StateProps } from "../../index";
import CartComp from "../../../Cart/components/CartComp/CartComp";
import { CHECKOUTSTATES } from "../../constants";
import { Button as CustomButton } from "../../../../shared/FormElements/Button/Button"
import { useHistory } from "react-router";
import { TextInput } from "../../../../shared/FormElements";

interface Props extends DispatchProps, StateProps {}

const CheckoutComp: React.FC<Props> = ({
    cart,
    userDetails,
    addProductToCartRequestAction,
    removeProductToCartRequestAction,
    setAuthStateRequest
}: Props) => {
    const [step, setStep] = useState<string | undefined>(undefined);
    const history = useHistory();

    useEffect(()=> {
        if(!(userDetails && cart.length>0)) setStep(CHECKOUTSTATES[0])
    }, [])

    const onPayment = () => {

    }

    const initiateLogin = () => {
        setAuthStateRequest(true)
    }

    const seeProducts = useCallback(() => {
        history.push("/products")
    },[history])

    return <div className={classnames("d-flex",styles.checkoutCompContainer)}>
        <div className={classnames("d-flex","flex-col","jusitfy-left",styles.checkoutSteps)}>
            {
                step === CHECKOUTSTATES[0] ?
                <div className={classnames("d-flex","flex-col","jusitfy-left", styles.checkoutStep)}>
                    { 
                        !userDetails && 
                        <CustomButton
                            variant="primary"
                            type="submit"
                            text={"LOGIN"}
                            size={"sm"}
                            onClick={initiateLogin}
                        />
                    }
                    <br/><br/>
                    { 
                        cart.length<=0 && 
                        <CustomButton
                            variant="primary"
                            type="submit"
                            text={"SEE ALL PRODUCTS"}
                            size={"sm"}
                            onClick={seeProducts}
                        />
                    }
                </div> :
                <></>
            }
            <br/>
            {
                step === CHECKOUTSTATES[1]? 
                <div className={classnames("d-flex","flex-col","jusitfy-left", styles.checkoutStep, styles.addressList)}>
                    {

                    }
                </div>
                :
                "SELECT ADDRESS"
            }
        </div>
        <CartComp 
            cart={cart}
            addProductToCartRequestAction={addProductToCartRequestAction}
            removeProductToCartRequestAction={removeProductToCartRequestAction}
            onCheckout={null}
            onPayment={onPayment}
        />
    </div>
}

export default CheckoutComp;