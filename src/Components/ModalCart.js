import {Row,Col,Modal,Button,Table,Spinner} from 'react-bootstrap';
import { TransactionContext } from '../Transanctions/TransactionProvider';
import { useState,useEffect } from 'react';
import { useContext } from "react";
import * as Icons from 'react-bootstrap-icons';
import { shopAddress } from '../utils/consts';
import { useSelector,useDispatch } from 'react-redux';
import { success, error } from '../notify';
export default function ModalCart({modalShow,setModalShow}){
    const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

    const products= useSelector(state=> state.bookings)
    const user = useSelector(state => state.user)
    const dispatch=useDispatch();

    const buy=async ()=>{
        let price= [...products].reduce((prevValue, currentValue)=>{
            return prevValue+currentValue.price
        },0)
        console.log(price, user)
        let name=user.email

        let formData={
            amount:price.toString(),
            addressTo:shopAddress,
            keyword:name,
            message:name
        }
        try{
            await sendTransaction(formData);
            success("Transaction is a succes")
            
            setModalShow(false);
        }
        catch(err){
            error("Error in transaction")
            console.log(err);
        }
    }

    const removeProduct = (booking) => 
    {
        dispatch({type:"REMOVE_BOOKING", payload: booking})
    }

    const modalBody=()=>{
        if(!currentAccount){
            return <Button style={{margin:10}} onClick={()=>{
                connectWallet();
            }}>
                Connect your wallet first
            </Button>
        }
        else{
            return <Table striped bordered hover>
            <thead>
                <tr>
                <th>Index</th>
                <th>Booking start date</th>
                <th>Booking end date</th>
                <th>Price</th>
                <th>Remove</th>
                </tr>
            </thead>
            <tbody>
            {products.map((product,idx)=>{
                    return <tr key={idx}>
                        <td>{idx+1}.</td>
                        <td>{product.booking_start_date}</td>
                        <td>{product.booking_end_date}</td>
                        <td>
                            {product.price}
                            <Icons.Coin size={24}></Icons.Coin>
                        </td>
                        <td>
                            <Button onClick={()=>removeProduct(product)}>
                                <Icons.Trash size={24}></Icons.Trash>
                            </Button>
                        </td>
                    </tr>
                }
            )}
            </tbody>
        </Table>
        }
    }

    return <>
        <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign:'center'}}>
                {modalBody()}
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
                Close
            </Button>
            {isLoading? <Spinner animation="border" variant="primary" />:
                        <Button onClick={()=>{
                            buy();
                        }}>Buy</Button>
                        }
            </Modal.Footer>
        </Modal>
    </>
}