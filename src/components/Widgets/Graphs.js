import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../Graph.css'
import ReactSpeedometer from 'react-d3-speedometer'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'

const Graphs = () => {
  const [data, setdata] = useState({
    SP02: 85,
    HeartBeat: 60,
    Temperature: 27.5,
    PI: 0,
  })

  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 1200)
  })

  console.log(data)

  const getData = async () => {
    fetch('http://192.168.43.89/project/uploads/', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Hello', responseJson)
        let i = responseJson
        if (i[0][0].slice(5, 9) == 'Lo' || i[0][0].slice(5, 9) == 'Hi') {
          i[0][0] = 'Temp:27.5'
        }
        setdata({
          SP02: i[1][0],
          HeartBeat: i[1][1],
          Temperature: i[0][0].slice(5, 9),
          PI: i[1][2],
        })
      })
      .catch((error) => {
        console.error('Hello', error)
        setdata({
          SP02: 85,
          HeartBeat: 60,
          Temperature: 27.5,
          PI: 0,
        })
      })
  }
  return (
    <div>
      <Container className="main-cont">
        <Row className="justify-content-around">
          <Col className="Sub-Cont ">
            <ReactSpeedometer
              className="speedom"
              value={parseFloat(data.Temperature)}
              needleColor="steelblue"
              currentValueText={'Temperature: ${value} C'}
              segmentColors={['#8AC926', '#8AC926', '#8AC926', '#FFBF00', '#D2222D']}
              needleTransitionDuration={4000}
              needleTransition="easeElastic"
              minValue={27.5}
              maxValue={40}
            />
          </Col>
          <Col className="Sub-Cont ">
            <ReactSpeedometer
              className="speedom"
              value={parseInt(data.HeartBeat)}
              needleColor="steelblue"
              currentValueText={'Heart Beat: ${value}'}
              segmentColors={['#8AC926', '#8AC926', '#8AC926', '#FFBF00', '#D2222D']}
              needleTransitionDuration={4000}
              needleTransition="easeElastic"
              minValue={60}
              maxValue={120}
            />
          </Col>
          <Col className="Sub-Cont ">
            <ReactSpeedometer
              className="speedom"
              value={parseInt(data.SP02)}
              needleColor="steelblue"
              currentValueText={'SPO2: ${value}'}
              segmentColors={['#8AC926', '#8AC926', '#8AC926', '#FFBF00', '#D2222D']}
              needleTransitionDuration={4000}
              needleTransition="easeElastic"
              minValue={85}
              maxValue={100}
            />
          </Col>
          <Col className="Sub-Cont ">
            <ReactSpeedometer
              className="speedom"
              value={parseFloat(data.PI)}
              needleColor="steelblue"
              currentValueText={'PI: ${value} %'}
              segmentColors={['#8AC926']}
              needleTransitionDuration={4000}
              needleTransition="easeElastic"
              minValue={0}
              maxValue={20}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Graphs
