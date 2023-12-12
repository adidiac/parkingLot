import {Row,Col,Modal,Button,Container,Spinner} from 'react-bootstrap';
import { TransactionContext } from '../Transanctions/TransactionProvider';
import { useState,useEffect } from 'react';
import { useContext } from "react";
import * as Icons from 'react-bootstrap-icons';
import { shopAddress } from '../utils/consts';
import { useSelector,useDispatch } from 'react-redux';
export default function ModalCart({modalShow,setModalShow}){
    const { currentAccount, connectWallet, handleChange, sendTransaction, formData,isLoading } = useContext(TransactionContext);

    const products=[]
    const dispatch=useDispatch();

    const buy=()=>{
        let price=0;
        let name='';

        let formData={
            amount:price.toString(),
            addressTo:shopAddress,
            keyword:name,
            message:name
        }
        sendTransaction(formData);
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
            return <Container>
            {
                products?.map((product,idx)=>{
                    return <Row key={product.id}>
                        <Col>
                            <img src={product.picture} style={{width:80,height:80,margin:5,border:'1px solid black',borderRadius:"50%"}}/>
                        </Col>
                        <Col style={{margin:10,fontSize:10}}>
                            <h4>{product.name}</h4>
                            <Row>
                            <Col>
                            <Row>
                            <h5>{product.price}</h5>
                            </Row>
                            </Col>
                            <Col>
                            <Icons.Coin size={25}></Icons.Coin>
                            </Col>
                            </Row>
                        </Col>
                    </Row>
                }
                )
            }
            </Container>
        }
    }

    return <>
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
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
                            setModalShow(false);
                        }}>Buy</Button>
                        }
            </Modal.Footer>
        </Modal>
    </>
}