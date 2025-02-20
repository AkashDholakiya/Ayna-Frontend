'use client';

import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import axios from 'axios';
import { BACKEND_LOCAL } from '@/utils/server_url';
import { useModal } from './ModalContext';

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const { closeModal } = useModal();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (data) => {
    setError(null); 
    setSuccess(null); 
    try {
      const resp = await axios.post(`${BACKEND_LOCAL}/auth/local`, data);
  
      const result = resp.data;
      
      setSuccess('Login successful!'); 
      localStorage.setItem("token", result.jwt)
      localStorage.setItem("uname", result.user.username)
      localStorage.setItem("email", result.user.email)
      closeModal('login')
      window.location.reload();
    } catch (error) {
      setError(error.response?.data.error.message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      {success && <p className="text-green-500">{success}</p>} {/* Display success message */}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="identifier"
          type="identifier"
          {...register('identifier', { required: true })}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password', { required: true })}
          placeholder="Enter your password"
        />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  );
}