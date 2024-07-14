/*
  Component for looking up the balance of a BCH address.
*/

// Global npm libraries
import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'

function GetBalance (props) {
  const { wallet } = props

  // State
  const [balance, setBalance] = useState('')
  const [textInput, setTextInput] = useState('')

  // Button click handler
  const handleGetBalance = async (event) => {
    try {
      // Exit on invalid input
      if (!textInput) return
      if (!textInput.includes('bitcoincash:')) return

      setBalance(<span>Retrieving balance... <Spinner animation='border' /></span>)

      const balance = await wallet.getBalance({ bchAddress: textInput })
      console.log('balance: ', balance)

      const bchBalance = wallet.bchjs.BitcoinCash.toBitcoinCash(balance)

      setBalance(`Balance: ${balance} sats, ${bchBalance} BCH`)
    } catch (err) {
      setBalance(<p><b>Error</b>: {`${err.message}`}</p>)
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Col className='text-break' style={{ textAlign: 'center' }}>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Enter a BCH address to check the balance.</Form.Label>
                <Form.Control type='text' placeholder='bitcoincash:qqlrzp23w08434twmvr4fxw672whkjy0py26r63g3d' onChange={e => setTextInput(e.target.value)} />
              </Form.Group>

              <Button variant='primary' onClick={handleGetBalance}>
                Check Balance
              </Button>
            </Form>
          </Col>
        </Row>
        <br />
        <Row>
          <Col style={{ textAlign: 'center' }}>
            {balance}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default GetBalance
