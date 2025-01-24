/*
  This component is a View that allows the user to select a back end server
  from a list of servers.
*/

// Global npm libraries
import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'

function ServerSelectView (props) {
  const { appData } = props
  const selectedServer = appData.serverUrl // Selected server
  const servers = appData.servers // List of servers

  // Update location ref after server url changes
  const handleReloadServer = (event) => {
    const target = event.target.id
    console.log('server target: ', target)

    window.location.href = `/?restURL=${target}`
  }

  return (
    <>
      <Container>
        <Row>
          <Col style={{ textAlign: 'center' }}>
            <h2>
              Select Alternative Server
            </h2>
            <p>
              Select an alternative server below. The app will reload and use
              the selected server.
            </p>
          </Col>
        </Row>
        <br />

        {
          /** Map all server data and render a row for each server */
          servers.map((server, i) => {
            // Background color for each row
            const isEven = i % 2
            const backgroundColor = isEven ? '#eee' : '#fff'

            return (
              <div key={`server-${i}`}>
                <Row
                  style={{
                    padding: '25px',
                    backgroundColor
                  }}
                >
                  <Col xs={4}>
                    <Button
                      style={{ minWidth: 120 }}
                      id={server.value}
                      onClick={handleReloadServer}
                    >
                      {selectedServer === server.value ? 'Current' : 'Select'}
                    </Button>
                  </Col>

                  <Col xs={8}>
                    {server.label}
                  </Col>
                </Row>
              </div>
            )
          })
        }
      </Container>
    </>
  )
}

export default ServerSelectView
