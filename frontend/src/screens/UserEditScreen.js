import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';

export default function UserEditScreen() {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [userData, setUserData] = useState({ name: '', email: '', isAdmin: false });
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState('');

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setUserData({ name: data.name, email: data.email, isAdmin: data.isAdmin });
        setLoading(false);
      } catch (err) {
        setError(getError(err));
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoadingUpdate(true);
      await axios.put(
        `/api/users/${userId}`,
        { ...userData },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      toast.success('User updated successfully');
      navigate('/admin/users');
    } catch (err) {
      toast.error(getError(err));
      setLoadingUpdate(false);
    }
  };

  return (
    <div className="container small-container">
      <Helmet>
        <title>Edit User {userId}</title>
      </Helmet>
      <h1 className="my-3">Edit User {userId}</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Check
            type="checkbox"
            id="isAdmin"
            label="Is Admin"
            checked={userData.isAdmin}
            onChange={(e) => setUserData({ ...userData, isAdmin: e.target.checked })}
          />

          <div className="mt-3">
            <Button type="submit" disabled={loadingUpdate}>
              {loadingUpdate ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}
