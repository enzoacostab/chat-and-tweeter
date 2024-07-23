import { signIn } from '@/auth';
import Image from 'next/image';
import React, { useTransition } from 'react'
import LoginProviderForm from './login-provider-form';

export default function LoginProviders() {
  return (
    <div className="flex *:size-[43px] justify-between w-full *:transition-colors *:rounded-full hover:*:bg-secondary">
      <LoginProviderForm 
        provider="google" 
        func={async () => {
          'use server'
          await signIn("google")
        }}
      />
      <LoginProviderForm 
        provider="facebook" 
        func={async () => {
          'use server'
          await signIn("facebook")
        }}
      />
      <LoginProviderForm 
        provider="twitter" 
        func={async () => {
          'use server'
          await signIn("twitter")
        }}
      />
      <LoginProviderForm 
        provider="github" 
        func={async () => {
          'use server'
          await signIn("github")
        }}
      />
    </div>
  )
}
