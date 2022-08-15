import React, { Component } from 'react';
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex'
import UserService from 'services/UserService';

export class EditProfile extends Component {

	avatarEndpoint = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'

	state= {
		name: '',
		email: 'charlie.howard@themenate.com'
	}

	componentDidMount() {
		const userToken = localStorage.getItem("auth_token")
		const userID = localStorage.getItem("userID")
		UserService.setToken(userToken)
	
		UserService.getUser(userID)
		  .then(res =>  {
			  const name = localStorage.getItem("name")
			  const email = localStorage.getItem("email")

			  this.setState({
				name: name,
				email: email
			  });
			  //console.log(this.state.user)
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
				console.log(error)
			}
		  )
	  }

	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	render() {

		const onFinish = values => {
			const key = 'updatable';
			message.loading({ content: 'Updating...', key });
			setTimeout(() => {
				this.setState({
					name: values.name,
					email: values.email
				})
				message.success({ content: 'Done!', key, duration: 2 });
			}, 1000);
		};
	
		const onFinishFailed = errorInfo => {
			console.log('Failed:', errorInfo);
		};

		/*
		const onUploadAavater = info => {
			const key = 'updatable';
			if (info.file.status === 'uploading') {
				message.loading({ content: 'Uploading...', key, duration: 1000 });
				return;
			}
			if (info.file.status === 'done') {
				this.getBase64(info.file.originFileObj, imageUrl =>
					this.setState({
						avatarUrl: imageUrl,
					}),
				);
				message.success({ content: 'Uploaded!', key,  duration: 1.5 });
			}
		};

		const onRemoveAvater = () => {
			this.setState({
				avatarUrl: ''
			})
		}

		*/

		console.log(this.state)

		return (
			<>
				<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
					<Avatar size={90} icon={<UserOutlined />} />
					{
						/*
							<div className="ml-3 mt-md-0 mt-3">
								<Upload onChange={onUploadAavater} showUploadList={false} action={this.avatarEndpoint}>
									<Button type="primary">Change Avatar</Button>
								</Upload>
								<Button className="ml-2" onClick={onRemoveAvater}>Remove</Button>
							</div>
						*/
					}
					
				</Flex>
				<div className="mt-4">
					<Form
						name="basicInformation"
						layout="vertical"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
					>
						<Row>
							<Col xs={24} sm={24} md={24} lg={16}>
								<Row gutter={ROW_GUTTER}>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Name"
											name="name"
											initialValue={localStorage.getItem("name")}
											rules={[
												{
													required: true,
													message: 'Please input your username!'
												},
											]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col xs={24} sm={24} md={12}>
										<Form.Item
											label="Email"
											name="email"
											initialValue={localStorage.getItem("email")}
											rules={[{ 
												required: true,
												type: 'email',
												message: 'Please enter a valid email!' 
											}]}
										>
											<Input />
										</Form.Item>
									</Col>
									
								</Row>
								<Button type="primary" htmlType="submit">
									Save Change
								</Button>
							</Col>
						</Row>
					</Form>
				</div>
			</>
		)
	}
}

export default EditProfile
