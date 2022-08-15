import React, { useState } from 'react'
import { Card, Row, Col, Form, Input, Button, message } from "antd";
import { LockOutlined } from '@ant-design/icons';
import PasswordResetService from 'services/PasswordResetService';
import { Redirect } from 'react-router-dom';
import { AUTH_PREFIX_PATH } from 'configs/AppConfig';

const backgroundStyle = {
	backgroundImage: 'url(/img/Wave.svg)',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}


const ResetPassword = () => {
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false)
    const [uid, setUid] = useState()
    const [tok, setTok] = useState()

    
    var pathArray = window.location.pathname.split('/');
    console.log(pathArray)

    

	const onSend = values => {
		console.log(values)
        setUid(pathArray[3])
        setTok(pathArray[4])
        values['uid'] = pathArray[3]
        values['token'] = pathArray[4]
        console.log(values)
		setLoading(true)
		PasswordResetService.confirmResetPass(values).then(resp => {
			console.log(resp)
			setLoading(false)
            setSubmitted(true)
			message.success('New password has been set, Login!');
		}).catch(error => {
			console.log(error)
			message.warning('That email does not exist!');
		})
		
  };




    if(submitted){
        return (
            <Redirect to={{
            pathname:`${AUTH_PREFIX_PATH}/login`
            }} />
        )
    }



	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={9}>
						<Card>
							<div className="my-2">
								<div className="text-center">
									<img className="img-fluid" style={{ height:120 }} src="/img/case-medinsurance.png" alt="CaseMed Insurance Logo" />
									<h3 className="mt-3 font-weight-bold">Reset Password</h3>
									<p className="mb-4">Enter your new password</p>
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
										<Form form={form} layout="vertical" name="forget-password" onFinish={onSend}>
											<Form.Item 
												name="new_password" 
                                                rules={[
                                                    {
                                                        min:8,
                                                        message: "minimum of 8 characters needed"
                                                    }
                                                ]}
												>
												<Input placeholder="Password" prefix={<LockOutlined className="text-primary" />}/>
											</Form.Item>
											<Form.Item 
												name="re_new_password" 
                                                rules={[
                                                    {
                                                        min: 8,
                                                        message: "minimum of 8 characters needed"
                                                    }
                                                ]}
                                            >
												<Input placeholder="Confirm Password" prefix={<LockOutlined className="text-primary" />}/>
											</Form.Item>
											<Form.Item>
												<Button loading={loading} type="primary" htmlType="submit" block>{loading? 'Sending' : 'Send'}</Button>
											</Form.Item>
										</Form>
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

export default ResetPassword

