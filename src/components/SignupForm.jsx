'use client';

import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { BACKEND_LOCAL } from '@/utils/server_url';
import axios from 'axios';
import { useModal } from './ModalContext';

export default function SignupForm() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const { closeModal } = useModal()
  const [success, setSuccess] = useState(null);

  const onSubmit = async (data) => {
    setError(null); 
    setSuccess(null); 
    try {
      const resp = await axios.post(`${BACKEND_LOCAL}/auth/local/register`, data);
  
      const result = resp.data;
  
      setSuccess('Signup successful!'); 
      localStorage.setItem("token", result.jwt)
      localStorage.setItem("uname", result.user.username)
      localStorage.setItem("email", result.user.email)
      closeModal('signup')
    } catch (error) {
      setError(error.response?.data.error.message)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      {success && <p className="text-green-500">{success}</p>} {/* Display success message */}
      
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          {...register('username', { required: true })}
          placeholder="Enter your username"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { required: true })}
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
        Sign Up
      </Button>
    </form>
  );
}