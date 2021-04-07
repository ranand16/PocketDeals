import React from 'react'
import { DispatchProps, StateProps } from "../../index"

interface Props extends DispatchProps, StateProps {}

const Home: React.FC<Props> = ({

}: Props) => {
    return <>This is home</>
}

export default Home