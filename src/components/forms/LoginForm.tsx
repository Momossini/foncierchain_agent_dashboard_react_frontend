import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, AlertCircle } from 'lucide-react';
import { getErrorMessage } from '@/lib/errors';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Connexion Agent</h2>
        <p className="text-gray-500 mt-2">Accédez au portail FoncierChain</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
          <p>{getErrorMessage((error as any)?.response?.data?.error?.code)}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register('email')}
            type="email"
            className={`w-full px-4 py-2 border rounded-lg outline-none transition-all focus:ring-2 ${
              errors.email
                ? 'border-red-300 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
            }`}
            placeholder="agent@foncierchain.gov"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input
            {...register('password')}
            type="password"
            className={`w-full px-4 py-2 border rounded-lg outline-none transition-all focus:ring-2 ${
              errors.password
                ? 'border-red-300 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Connexion en cours...
            </>
          ) : (
            'Se connecter'
          )}
        </button>
      </form>
    </div>
  );
};
