import React, {useState, useEffect} from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { BaseApi, enumMethods } from '../Api/BaseApi';

/*
//* form Form Component
//* show boolean
//* onHide function
//* onSubmit function
//* title string
*/
export function GenericModal({form, show, onHide, onSubmit, title, submitButtonText, children})
{
    return <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={onSubmit}>
                {form}
                {children}
                <Button variant="primary" type="submit" style={{marginTop:10}}>
                    {submitButtonText}
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
}

/*
//* data {name,type,placeholder,label}
*/
export function GenericAddForm(
    {data,onSubmit, title, submitButtonText, show, handleClose}
)
{
    const [formData, setFormData] = useState({});
    const handleChange = (event)=>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setFormData({...formData, [name]:value});
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        onSubmit(formData);
        handleClose();
    }
    return <>
        <GenericModal
            form={data.map((data, idx)=>{
                if (data.special) return data.special.getComponent(data,handleChange);
                return <Form.Group controlId={data.name} key={idx}>
                    <Form.Label>{data.label}</Form.Label>
                    <Form.Control 
                        name={data.name} 
                        type={data.type} 
                        placeholder={data.placeholder}
                        isInvalid={!data.validate(formData[data.name])}
                        onChange={handleChange}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid state.
                    </Form.Control.Feedback>
                </Form.Group>
            })}
            show={show}
            onHide={handleClose}
            onSubmit={handleSubmit}
            title= {title}
            submitButtonText= {submitButtonText}
        />
    </>
}
/*
//* data {name,type,placeholder,label}
*/
export const GenericUpdateForm = (
    { data, onSubmit, title, submitButtonText, show, handleClose}
    ) => {

    const [dataValues, setDataValues] = useState({});

    useEffect(()=>{
        let values={};
        data.forEach((data)=>{
            values[data.name]=data.value;
        })
        setDataValues(values);
    },[data]);
    
    const handleChange = (event)=>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setDataValues({...dataValues,[name]:value});
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        onSubmit(dataValues);
        handleClose();
    }
    return <>
        <GenericModal
            form={data.map((data)=>{
                if (data.special) return data.special.getComponent(data,handleChange);
                return <Form.Group controlId={data.name}>
                    <Form.Label>{data.label}</Form.Label>
                    <Form.Control 
                            name={data.name} 
                            type={data.type} placeholder={data.placeholder} 
                            value={dataValues[data.name]}
                            isInvalid={!data.validate(dataValues[data.name])}
                           onChange={handleChange}/>
                       <Form.Control.Feedback type="invalid">
                           Please provide a valid state.
                       </Form.Control.Feedback>
                   </Form.Group>
            }
            )}
            show={show}
            onHide={handleClose}
            onSubmit={handleSubmit}
            title= {title}
            submitButtonText= {submitButtonText}
        />
    </>
}
export class Field {
    constructor(key, type, placeholder, label, special = null, defaultValue = null, regex = null) {
        this.key = key;
        this.type = type;
        this.placeholder = placeholder;
        this.label = label;
        this.special = special;
        this.defaultValue = defaultValue;
        this.regex = this.constructRegex(regex);
        this.value = defaultValue;
    }

    getValue = () => {
        return this.defaultValue;
    }

    withRegex = (regex) => {
        this.regex = this.constructRegex(regex);
        return this;
    }
    constructRegex = (regex) => {
        if (regex == null) return null;
        return new RegExp(regex);
    }

    validate = (value) => {
        if (this.regex && value) {
            return this.regex.test(value);
        }
        return true;
    }

    getSpecial = () => {
        return this.special;
    }

    createUpdateData = (value) => {
        return {
            name: this.key,
            value: this.defaultValue ? this.defaultValue : value,
            type: this.type,
            placeholder: this.placeholder,
            label: this.label,
            validate: this.validate
        }
    }

    createAddData = () => {
        return {
            name: this.key,
            type: this.type,
            placeholder: this.placeholder,
            label: this.label,
            validate: this.validate
        }
    }
}

export class EntityDefinition {
    // @param path string
    // @param fields Field[]
    constructor(fields, entityName) {
        this.fields = fields;
        this.entityName = entityName;
        this.entity = null;
    }
    getPath = () => {
        return this.path;
    }
    getFields = () => {
        return this.fields;
    }
    getEntityName = () => {
        return this.entityName;
    }
    setEntity = (entity) => {
        this.entity = entity;
    }
}
/*
//* entityDefinition {path, keys, 
*/
export function GenericTabel({entityDefinition})
{
    const [data, setData] = useState([]);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const handleShowUpdate = () => setShowUpdate(true);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowAdd = () => setShowAdd(true);
    const handleCloseAdd = () => setShowAdd(false);

    const getData =async ()=>{
        const data = await entityDefinition.getData();
        setData(data);
    }

    const updateData = async (data,id)=>{
        const result = entityDefinition.updateData(data,id);
        getData();
    }

    const deleteData =async (id)=>{
        const result = await entityDefinition.deleteData(id);
        getData();
    }

    const addData = async (data)=>{
        const result = await entityDefinition.addData(data);
        getData();
    }

    useEffect(()=>{
        getData();
    },[])

    return <Table striped bordered hover>
        <thead>
        <tr>
          {
            entityDefinition.getFields().map((field)=>{
                return <th>{field.label}</th>
            })
          }
        </tr>
        </thead>
        <tbody>
        {data.map((entity)=>{
                return <tr>
                    {
                        entityDefinition.getFields().map((field)=>{
                            return <td>{entity[field.key]}</td>
                        })
                    }
                    <td>
                        <Button variant="primary" onClick={handleShowUpdate}>
                            Update
                        </Button>
                        { 
                            showUpdate && 
                            <GenericUpdateForm
                                data = { entityDefinition.getFields().map((field)=>{
                                    return field.createUpdateData(entity[field.key]);
                                })}
                                onSubmit = {(data)=>updateData(data, entity.id)}
                                title = {"Update "+ entityDefinition.getEntityName()}
                                submitButtonText = "Update"
                                show = {showUpdate}
                                handleClose = {handleCloseUpdate}
                            />
                        }   
                        <Button variant="danger" onClick={()=>deleteData(entity.id)}>Delete</Button>
                    </td>
                </tr>
            }
        )}
        </tbody>
        <Button variant="primary" onClick={handleShowAdd}>
            Add
        </Button>
        <GenericAddForm
            data={ entityDefinition.getFields().map((field)=>{
                return field.createAddData();
            })}
            onSubmit={(data)=>addData(data)}
            title={"Add "+entityDefinition.getEntityName()}
            submitButtonText="Add"
            show={showAdd}
            handleClose={handleCloseAdd}
        />
    </Table>

}
