import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import {useHistory} from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyWord] = useState('')
    let history = useHistory();
    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <div>
            <Form onSubmit={submitHandler} inline>
                <Form.Control
                    type={'text'}
                    name={'q'}
                    onChange={(e) => setKeyWord(e.target.value)}
                    className={'mr-sm-2 ml-sm-5'}
                >
                </Form.Control>
                <Button
                    type={'submit'}
                    variant={'outline-success'}
                    className={'p-2'}
                >Search</Button>
            </Form>
        </div>
    )
}

export default SearchBox