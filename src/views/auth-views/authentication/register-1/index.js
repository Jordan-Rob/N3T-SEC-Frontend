import React from 'react'
import RegisterForm from '../../components/RegisterForm'
import { Card, Row, Col } from "antd";
import { useSelector } from 'react-redux'
import { AUTH_PREFIX_PATH } from 'configs/AppConfig';

const backgroundStyle = {
	backgroundImage: 'url(/img/Wave.svg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const RegisterOne = props => {
	const theme = useSelector(state => state.theme.currentTheme)
	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={7}>
						<Card>
							<div className="my-2">
								<div className="text-center">
								<img className="img-fluid" style={{ height:120 }} src={`/img/${theme === 'light' ? 'case-medinsurance.png': 'case-medinsurance.png'}`} alt="" />
									<p>Already have an account? <a href={`${AUTH_PREFIX_PATH}/login-1`}>Log In</a></p>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<RegisterForm {...props}/>
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default RegisterOne
