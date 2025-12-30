import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { useContext } from 'react';
import { Store } from '../Store';

export default function UserEditScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { id: userId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        setIsAdmin(data.isAdmin);
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
        { name, email, isAdmin },
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
    <div>
      <h1>Edit User {userId}</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            id="isAdmin"
            label="Is Admin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <div className="mt-3">
            <Button type="submit" disabled={loadingUpdate}>
              Update
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}
