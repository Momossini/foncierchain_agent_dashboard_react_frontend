import { Link as LinkIcon, Database, CheckCircle, ExternalLink, Activity } from 'lucide-react';

export const BlockchainRegistryPage = () => {
  // Mock data for demo
  const transactions = [
    { hash: '0x3a4b...f12c', action: 'TRANSFER', parcel: 'DEMO-123', block: '458,291', status: 'CONFIRMED', date: 'Il y a 5 min' },
    { hash: '0x7e8d...a9b2', action: 'CREATION', parcel: 'PARIS-09-01', block: '458,285', status: 'CONFIRMED', date: 'Il y a 12 min' },
    { hash: '0x1c2f...e5d4', action: 'TRANSFER', parcel: 'LYON-03-42', block: '458,278', status: 'CONFIRMED', date: 'Il y a 45 min' },
    { hash: '0x9a0b...c8e7', action: 'CREATION', parcel: 'MARS-01-05', block: '458,270', status: 'CONFIRMED', date: 'Il y a 1h' },
    { hash: '0x4d5e...f6a1', action: 'TRANSFER', parcel: 'DEMO-999', block: '458,262', status: 'CONFIRMED', date: 'Il y a 2h' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registre Blockchain</h1>
          <p className="text-gray-500">Historique des transactions immuables sur le réseau FoncierChain.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center bg-green-50 text-green-700 px-3 py-1.5 rounded-lg border border-green-100 text-sm font-medium">
            <CheckCircle size={16} className="mr-2" />
            Réseau Opérationnel
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 border-l-4 border-l-brand-500">
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Activity size={16} className="mr-2" />
            Dernier bloc
          </div>
          <div className="text-2xl font-bold text-gray-900">#458,291</div>
        </div>
        <div className="card p-6 border-l-4 border-l-brand-500">
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <Database size={16} className="mr-2" />
            Taille du registre
          </div>
          <div className="text-2xl font-bold text-gray-900">12,402 Tx</div>
        </div>
        <div className="card p-6 border-l-4 border-l-brand-500">
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <LinkIcon size={16} className="mr-2" />
            Nœuds actifs
          </div>
          <div className="text-2xl font-bold text-gray-900">24</div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tx Hash</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Parcelle</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Bloc</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.map((tx) => (
              <tr key={tx.hash} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center font-mono text-xs text-brand-600">
                    <LinkIcon size={12} className="mr-2" />
                    {tx.hash}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    tx.action === 'TRANSFER' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {tx.action}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 text-sm">{tx.parcel}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">#{tx.block}</td>
                <td className="px-6 py-4 text-gray-400 text-xs">{tx.date}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-400 hover:text-brand-600 transition-colors">
                    <ExternalLink size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-center">
            <button className="text-sm text-brand-600 font-medium hover:underline">
                Charger plus de transactions
            </button>
        </div>
      </div>
    </div>
  );
};
