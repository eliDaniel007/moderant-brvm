import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Profile = () => {
  return (
    <div className="flex-grow bg-dark-900 text-white p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-slate-100">Mon Profil</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations personnelles */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-200">Informations Personnelles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Nom complet</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@example.com"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    defaultValue="+225 0123456789"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Ville</label>
                  <input
                    type="text"
                    defaultValue="Abidjan"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button className="bg-primary-600 hover:bg-primary-700">
                  Sauvegarder les modifications
                </Button>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4 text-slate-200">Préférences de Trading</h2>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-slate-300">Recevoir des alertes par email</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-slate-300">Recevoir des alertes par SMS</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-slate-300">Analyses techniques automatiques</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-slate-300">Newsletter hebdomadaire</span>
                  </label>
                </div>
              </div>
            </Card>
          </div>

          {/* Statistiques et actions rapides */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-slate-200">Statistiques</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Actions suivies</span>
                  <span className="text-slate-200 font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Alertes actives</span>
                  <span className="text-slate-200 font-semibold">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Analyses consultées</span>
                  <span className="text-slate-200 font-semibold">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Membre depuis</span>
                  <span className="text-slate-200 font-semibold">3 mois</span>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4 text-slate-200">Actions Rapides</h3>
              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Ajouter une alerte
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Voir mes analyses
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Exporter mes données
                </Button>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Supprimer le compte
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 