import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Card, Row, Col } from "antd";
import { useSelector } from 'react-redux';
import { AUTH_PREFIX_PATH } from 'configs/AppConfig';

const backgroundStyle = {
	backgroundImage: 'url(/img/Wave.svg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const LoginOne = props => {
	const theme = useSelector(state => state.theme.currentTheme)
	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={7}>
						<Card>
							<div className="my-4">
								<div className="text-center">
									{/*<img className="img-fluid" style={{ height:120 }} src={`/img/${theme === 'light' ? 'case-medinsurance.png': 'case-medinsurance.png'}`} alt="" />*/}
									<h1>N3T SEC</h1>
									<p>Don't have an account yet? <a href={`${AUTH_PREFIX_PATH}/register-1`}>Sign Up</a></p>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<LoginForm {...props} />
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

export default LoginOne
