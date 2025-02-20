
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useModal } from './ModalContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function Modal() {
  const { modalType, closeModal } = useModal();

  return (
    <Dialog open={!!modalType} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {modalType === 'login' ? 'Login' : 'Sign Up'}
          </DialogTitle>
        </DialogHeader>
        {modalType === 'login' && <LoginForm />}
        {modalType === 'signup' && <SignupForm />}
      </DialogContent>
    </Dialog>
  );
}