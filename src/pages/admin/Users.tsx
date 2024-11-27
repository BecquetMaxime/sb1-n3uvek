import React from 'react';
import { Mail, Phone, Shield, ShieldOff } from 'lucide-react';

export default function AdminUsers() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, role) => {
    try {
      await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ role })
      });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  if (loading) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-serif italic mb-8">Gestion des utilisateurs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h2>
                <div className="flex items-center gap-2 text-gray-500 mt-1">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2 text-gray-500 mt-1">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => updateUserRole(user._id, user.role === 'admin' ? 'user' : 'admin')}
                className={`p-2 rounded-full ${
                  user.role === 'admin' 
                    ? 'bg-rose-100 text-rose-600 hover:bg-rose-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {user.role === 'admin' ? (
                  <Shield className="w-5 h-5" />
                ) : (
                  <ShieldOff className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Consentements RGPD</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Marketing</span>
                  <span className={user.consents?.marketing ? 'text-green-600' : 'text-red-600'}>
                    {user.consents?.marketing ? 'Accepté' : 'Refusé'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Analytics</span>
                  <span className={user.consents?.analytics ? 'text-green-600' : 'text-red-600'}>
                    {user.consents?.analytics ? 'Accepté' : 'Refusé'}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-500 mt-4">
              Inscrit le {new Date(user.createdAt).toLocaleDateString('fr-FR')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}