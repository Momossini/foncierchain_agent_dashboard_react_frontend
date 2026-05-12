import { Shield } from 'lucide-react';
import { LoginForm } from '@/components/forms/LoginForm';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="flex items-center mb-8">
        <Shield className="text-blue-600 mr-3" size={40} />
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">FoncierChain</h1>
      </div>

      <LoginForm />

      <p className="mt-8 text-sm text-slate-500">
        Portail sécurisé réservé aux agents habilités.
      </p>
    </div>
  );
};
