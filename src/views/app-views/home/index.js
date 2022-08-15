import React from 'react'
import { useState } from 'react'
import { Row, Col, Card, Badge, Button } from 'antd'
import ChartWidget from 'components/shared-components/ChartWidget'
import StatisticWidget from 'components/shared-components/StatisticWidget'
import securityService from 'services/SecurityService'
import { Link } from 'react-router-dom'
import { APP_PREFIX_PATH } from 'configs/AppConfig'



const Home = () => {

	const [alerts, setAlerts] = useState([])
	const [ping, setPing] = useState([])
	const [ftp, setFTP] = useState([])
	const user = localStorage.getItem("name")

	const visitorChartData = {
		series: [
			  {
				  name: "FTP Attacks",
				  data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, ftp.length]
			  },
			  {
				  name: "DDOS Attacks",
				  data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, ping.length]
			  },
			  {
				  name: "SMB Attacks",
				  data: [15, 32, 8, 54, 5, 5, 20, 65, 28, 70, 30, 19]
			  }
		  ],
		  categories:[
			  '01 Aug', 
			  '02 Aug', 
			  '03 Aug', 
			  '04 Aug', 
			  '05 Aug', 
			  '06 Aug', 
			  '07 Aug', 
			  '08 Aug', 
			  '09 Aug',
			  '10 Aug', 
			  '11 Aug', 
			  '12 Aug'
		  ]
	  }

	  	const startProtection = () => {
			const token = localStorage.getItem("auth_token")
			console.log(token)
			securityService.setToken(token)

			securityService.netSecProtect().then(resp => {console.log(resp)}).catch(error => {
                console.log(error)
            })
		}

		const getAlerts = () => {
			const token = localStorage.getItem("auth_token")
			securityService.setToken(token)

			securityService.netSecAlerts().then(resp => {
				const cleaned = resp.alerts.filter( a => a.includes("ECHO REPLY") === false )
				const nu = cleaned.map( a => Object(a.split("\n", 3)))
				const nuObj = nu.map(a => ({ alertType:a[0], priority:a[1], dateAndIP:a[2] }))
				const pingAlerts = nuObj.filter(a => a.alertType.includes("ICMP Ping") === true)
				const ftpAlerts = nuObj.filter(a => a.alertType.includes("FTP Authentication") === true)
				console.log(nuObj)
				console.log(pingAlerts)
				console.log(ftpAlerts)
				setAlerts(nuObj)
				setPing(pingAlerts)
				setFTP(ftpAlerts)
			}).catch(error => {
                console.log(error)
            })
		}
	
		return (
			<div>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24} lg={24} xl={12} span={4}>
						<Card title={`Welcome ${user}`}>
							Start network protections by clicking the button below<br/>
							<Button style={{ marginTop:"20px"}} type='primary' onClick={() => startProtection()}>Run</Button>
						</Card>
					</Col>
					<Col xs={24} sm={24} md={24} lg={24} xl={12} span={4}>
						<Card title={`Retrieve Alerts`}>
							Refresh current alerts data shown in in Dashboard<br/>
							<Button style={{ marginTop:"20px"}} type='primary' onClick={() => getAlerts()}> Alerts</Button>
						</Card>
					</Col>
				</Row>
				{
					alerts.length > 0?
					<Row gutter={16}>
						<Col xs={24} sm={24} md={24} lg={24} xl={24} span={4}>
						<Card>
							<Row gutter={16}>
							<Col xs={24} sm={24} md={24} lg={24} xl={12} span={4}>
								<StatisticWidget
									title="DOS Alerts"
									value={`${ping.length}`}
									status="-12"
								/>
							</Col>
							<Col xs={24} sm={24} md={24} lg={24} xl={12} span={4}>
								<StatisticWidget
									title="FTP attack Alerts"
									value={` ${ftp.length} `}
									status="-12"
								/>
							</Col>
							</Row>
							<Link to={`${APP_PREFIX_PATH}/alerts`}>
								<Button type="primary">View Alert Details</Button>
							</Link>
							</Card>
							</Col>
					</Row> :
					<></>
				}

				
				<Row>
					<Col xs={24} sm={24} md={24} lg={24} xl={24}>
						<ChartWidget 
							title="Network Attack Alerts" 
							series={visitorChartData.series} 
							xAxis={visitorChartData.categories} 
							height={400}
						/>
					</Col>
				</Row>
				
				
			</div>
		)
	}


export default Home
