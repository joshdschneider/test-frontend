import React, { useEffect, useState } from 'react';
import { withAuthInfo, WithAuthInfoProps } from '@propelauth/react';
import Navbar from './Navbar';
import './App.css';

function App({ accessToken }: WithAuthInfoProps) {
  return (
    <div className='App'>
      <Navbar />
      <h3>Items (unprotected):</h3>
      <Items />
      <h3>Users (protected):</h3>
      <Users accessToken={accessToken} />
    </div>
  );
}

type Item = {
  id: string
  name: string
  price: string
}

function Items() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch('/items')
      .then((res) => res.json())
      .then((data) => setItems(data.items))
      .catch((e) => console.log(e));
  }, [items]);

  if (!items.length) {
    return <p>No items found.</p>;
  }

  return (
    <div className='table'>
      <div className='th'>
        <span>ID</span>
        <span>Name</span>
        <span>Price</span>
      </div>
      {items.map((item, i) => {
        return (
          <div key={i} className='tr'>
            <span>{item.id}</span>
            <span>{item.name}</span>
            <span>{item.price}</span>
          </div>
        );
      })}
    </div>
  );
}

type User = {
  id: string
  name: string
  location: string
}

type UsersProps = {
  accessToken: string | null
}

function Users({ accessToken }: UsersProps)  {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    fetch('/users', { headers: headers })
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((e) => console.log(e));
  }, [users, accessToken]);

  if (!users.length) {
    return <p>No users found.</p>;
  }

  return (
    <div className='table'>
      <div className='th'>
        <span>ID</span>
        <span>Name</span>
        <span>Location</span>
      </div>
      {users.map((item, i) => {
        return (
          <div key={i} className='tr'>
            <span>{item.id}</span>
            <span>{item.name}</span>
            <span>{item.location}</span>
          </div>
        );
      })}
    </div>
  );
}

export default withAuthInfo(App);
