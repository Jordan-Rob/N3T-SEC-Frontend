import React, { Component } from 'react'
import { Form, Button, Input, Row, Col, message } from 'antd';
import PasswordResetService from 'services/PasswordResetService';

export class ChangePassword extends Component {


	changePasswordFormRef = React.createRef();

	onFinish = (values) => {
		const userToken = localStorage.getItem("auth_token")
		PasswordResetService.setToken(userToken)

		PasswordResetService.setPass(values).then( resp => {
			console.log(values)
			console.log(resp)
			message.success({ content: 'Password Changed!', duration: 2 });
			this.onReset()
		}).catch(error => {
			console.log(error)
		})

		
  };

	onReset = () => {
    this.changePasswordFormRef.current.resetFields();
  };

	render() {

		return (
			<>
				<h2 className="mb-4">Change Password</h2>
				<Row >
					<Col xs={24} sm={24} md={24} lg={8}>
						<Form
							name="changePasswordForm"
							layout="vertical"
							ref={this.changePasswordFormRef}
							onFinish={this.onFinish}
						>
							<Form.Item
								label="Current Password"
								name="current_password"
								rules={[
									{ 
										required: true,
										message: 'Please enter your currrent password!' 
									}
							]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item
								label="New Password"
								name="new_password"
								rules={[
									{ 
										required: true,
										message: 'Please enter your new password!' 
									},
									{
										min:8,
										message: "Password should have minimum of 8 characters"
									}
							]}
							>
								<Input.Password />
							</Form.Item>
							<Form.Item
								label="Confirm Password"
								name="re_new_password"
								rules={
									[
										{ 
											required: true,
											message: 'Please confirm your password!' 
										},
										({ getFieldValue }) => ({
											validator(rule, value) {
												if (!value || getFieldValue('new_password') === value) {
													return Promise.resolve();
												}
												return Promise.reject('Password not matched!');
											},
										}),
									]
								}
							>
								<Input.Password />
							</Form.Item>
							<Button type="primary" htmlType="submit">
									Change password
								</Button>
						</Form>
					</Col>
				</Row>
			</>
		)
	}
}

export default ChangePassword
