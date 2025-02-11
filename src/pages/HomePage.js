import React, { useState, useEffect } from 'react';
import { Form, Modal, Input, Select, message, Table, DatePicker } from 'antd';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment';
import Analytics from '../components/Analytics';
import Image from '../pages/collage.jpg'; // First image
import Image2 from '../pages/images.jpeg'; // Second image
import Image3 from '../pages/image3.jpg';
import './homepage.css'; // Importing the custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelecteddate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [editable, setEditable] = useState(null);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Actions',
      render: (_text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        const res = await axios.post('/transections/get-transection', {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransection(res.data);
      } catch (error) {
        console.error(error);
        message.error('Fetch Issue With Transactions');
      } finally {
        setLoading(false);
      }
    };

    getAllTransactions();
  }, [frequency, selectedDate, type]);

  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post('/transections/delete-transection', { transactionId: record._id });
      message.success('Transaction Deleted');
    } catch (error) {
      console.error(error);
      message.error('Unable to delete');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);
      if (editable) {
        await axios.post('/transections/edit-transection', {
          payload: { ...values, userid: user._id },
          transactionId: editable._id,
        });
        message.success('Transaction Updated Successfully');
      } else {
        await axios.post('/transections/add-transection', { ...values, userid: user._id });
        message.success('Transaction Added Successfully');
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      console.error(error);
      message.error('Failed to add transaction');
    } finally {
      setLoading(false);
    }
  };

  const getRowClassName = (record) => {
    return record.type === 'income' ? 'income-row' : 'expense-row';
  };

  return (
    <Layout>
      {loading && <Spinner />}

      <div className="page-container">
        {/* Sidebar Container */}
        <div className="sidebar">
          <div className="welcome-title">
            Welcome to <strong>Smart Savings</strong>: Your Personal Finance Manager! 💰
          </div>
          <div className="left-image-container">
            <img src={Image} alt="Left Image" className="left-image" />
          </div>
          <div className="left-image-container">
            <img src={Image2} alt="Second Image" className="left-image" /> {/* New image below */}
          </div>
          <div className="left-image-container">
            <img src={Image3} alt="Second Image" className="left-image" /> {/* New image below */}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="filters">
            <div>
              <h6>Select Frequency</h6>
              <Select value={frequency} onChange={(values) => setFrequency(values)}>
                <Select.Option value="7">LAST 1 Week</Select.Option>
                <Select.Option value="30">LAST 1 Month</Select.Option>
                <Select.Option value="365">LAST 1 Year</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>
              {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelecteddate(values)} />}
            </div>

            <div>
              <h6>Select Type</h6>
              <Select value={type} onChange={(values) => setType(values)}>
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </div>
            <div className="switch-icons">
              <UnorderedListOutlined
                className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
                onClick={() => setViewData('table')}
              />
              <AreaChartOutlined
                className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
                onClick={() => setViewData('analytics')}
              />
            </div>
            <div>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Add New
              </button>
            </div>
          </div>

          <div className="content">
            {viewData === 'table' ? (
              <Table
                columns={columns}
                dataSource={allTransection}
                bordered
                rowClassName={getRowClassName} // Dynamically set row class based on transaction type
                className="table table-striped table-hover table-bordered"
              />
            ) : (
              <Analytics allTransection={allTransection} />
            )}
          </div>
        </div>
      </div>

      <Modal
        title={editable ? 'Edit Transaction' : 'Add Transaction'}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
