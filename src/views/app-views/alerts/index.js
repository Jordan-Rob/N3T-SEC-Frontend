import React from 'react';
import { Table, Input, Descriptions, Button, Space, Tooltip, Card, Modal } from 'antd';
import SecurityService from 'services/SecurityService';
import Flex from 'components/shared-components/Flex'
import Highlighter from 'react-highlight-words';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';




class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      searchText: '',
      searchedColumn: '',
      alerts: [],
      ping: [],
      ftp: [],
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      editCustomer: null,
      active:null
    };
  }

  componentDidMount() {
    const userToken = localStorage.getItem("auth_token")
    SecurityService.setToken(userToken)

    SecurityService.netSecAlerts()
      .then(resp =>  {
          const cleaned = resp.alerts.filter( a => a.includes("ECHO REPLY") === false )
          const nu = cleaned.map( a => Object(a.split("\n", 3)))
          const nuObj = nu.map(a => ({ alertType:a[0], priority:a[1], dateAndIP:a[2] }))
		  const pingAlerts = nuObj.filter(a => a.alertType.includes("ICMP Ping") === true)
		  const ftpAlerts = nuObj.filter(a => a.alertType.includes("FTP Authentication") === true)
          console.log(nuObj)
          console.log(pingAlerts)
          console.log(ftpAlerts)
          this.setState({
            isLoaded: true,
            alerts: nuObj,
            ping: pingAlerts,
            ftp: ftpAlerts
          });
          console.log(this.state.alerts)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };


  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false
    });
  };

  viewTableItem = (item) => {
    Modal.info({
      title:`${item.name} details`,
      content:
      <Descriptions title="Plan Info" bordered>
        <Descriptions.Item span={3} label="Name">Alert type</Descriptions.Item>
        <Descriptions.Item span={3} label="Name">Aler priority</Descriptions.Item>
        <Descriptions.Item span={3} label="address">Date & Ips</Descriptions.Item>
        <Descriptions.Item span={3} label="Max Dependants"></Descriptions.Item>
      </Descriptions>,
      onCancel:() => this.handleCancel()
    })
  }


  render() {
    const { error, isLoaded, customers, visible, detailVisible, confirmLoading, ModalText } = this.state
    const columns = [
      {
        title: 'Alert Type',
        dataIndex: 'alertType',
        key: 'alertType',
        width: '30%',
        ...this.getColumnSearchProps('alertType'),
      },
      {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
        ...this.getColumnSearchProps('priority'),
        /*
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend']
        */
      },
      {
        title: 'Date & IPs',
        dataIndex: 'dateAndIP',
        key: 'dateAndIP',
        ...this.getColumnSearchProps('dateAndIP'),
        /*
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend']
        */
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, elm) => (
          <div className="text-right d-flex justify-content-end">
            <Tooltip title="View">
              <Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => this.viewTableItem(elm)} size="small"/>
            </Tooltip>
          </div>
		)
      }
    ];
    return (
      <>
        
        <Card>
          <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
            <div className="mr-md-3 mb-3">
              
            </div>
          </Flex>
          <div className="table-responsive">
            <Table columns={columns} dataSource={this.state.alerts} />
          </div>
        </Card>
      </>
    
    );
  }
}

export default Alerts



