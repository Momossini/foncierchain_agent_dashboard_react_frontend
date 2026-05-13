import { ShieldCheck, ExternalLink, Link as LinkIcon } from 'lucide-react';

interface BlockchainProofCardProps {
  txHash?: string | null;
}

export const BlockchainProofCard = ({ txHash }: BlockchainProofCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden">
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
        <div className="flex items-center text-blue-800">
          <ShieldCheck className="mr-2" size={20} />
          <h3 className="font-bold uppercase text-xs tracking-widest">Preuve numérique</h3>
        </div>
        <span className="flex items-center text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
          Blockchain Mocked
        </span>
      </div>

      <div className="p-6 space-y-4">
        {txHash ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600 leading-relaxed">
              Cette opération a été enregistrée de manière immuable. Le hash de transaction ci-dessous constitue la preuve cryptographique de l'intégrité de la donnée.
            </p>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
              <div className="flex items-center truncate mr-4">
                <LinkIcon size={16} className="text-blue-500 mr-2 flex-shrink-0" />
                <code className="text-xs text-gray-900 font-mono truncate">{txHash}</code>
              </div>
              <button className="text-blue-600 hover:text-blue-800 transition-colors" title="Voir sur l'explorateur">
                <ExternalLink size={16} />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 italic">
              Status : Confirmé par le réseau
            </p>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-gray-500 italic">Aucune preuve numérique disponible pour cette entrée.</p>
          </div>
        )}
      </div>
    </div>
  );
};
