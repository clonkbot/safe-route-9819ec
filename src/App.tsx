import { useState } from 'react';

interface Contact {
  id: string;
  name: string;
  number: string;
  description: string;
}

interface PersonalContact {
  id: string;
  name: string;
  phone: string;
}

const emergencyContacts: Contact[] = [
  { id: 'police', name: 'Police', number: '100', description: 'For crime, accidents, or immediate danger' },
  { id: 'ambulance', name: 'Ambulance', number: '101', description: 'Medical emergencies and health crises' },
];

export default function App() {
  const [personalContacts, setPersonalContacts] = useState<PersonalContact[]>([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [safetyTips] = useState([
    'Share your live location with a trusted contact before starting your journey',
    'Keep your phone charged and emergency numbers easily accessible',
    'Inform someone about your route and expected arrival time',
    'Trust your instincts — if something feels wrong, seek help immediately',
  ]);

  const addContact = () => {
    if (newName.trim() && newPhone.trim()) {
      setPersonalContacts([
        ...personalContacts,
        { id: Date.now().toString(), name: newName.trim(), phone: newPhone.trim() }
      ]);
      setNewName('');
      setNewPhone('');
      setShowAddForm(false);
    }
  };

  const removeContact = (id: string) => {
    setPersonalContacts(personalContacts.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-800">
      {/* Header */}
      <header className="border-b border-neutral-100">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <h1 className="font-serif text-2xl md:text-3xl font-normal text-neutral-900 tracking-tight">
            SafeRoute
          </h1>
          <p className="mt-2 text-sm md:text-base text-neutral-500 font-light italic">
            Ride safe & save life
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">

        {/* Emergency Contacts Section */}
        <section className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <div className="w-1 h-4 bg-red-500"></div>
            <h2 className="font-serif text-lg md:text-xl text-neutral-800">Emergency Numbers</h2>
          </div>

          <div className="space-y-3 md:space-y-4">
            {emergencyContacts.map((contact) => (
              <a
                key={contact.id}
                href={`tel:${contact.number}`}
                className="block group"
              >
                <div className="flex items-start justify-between py-4 md:py-5 px-4 md:px-5 border border-neutral-100 hover:border-neutral-200 transition-colors duration-200">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 md:gap-3 flex-wrap">
                      <span className="text-base md:text-lg font-medium text-neutral-900">{contact.name}</span>
                      <span className="text-xs text-neutral-400 uppercase tracking-wider">Emergency</span>
                    </div>
                    <p className="mt-1 text-sm text-neutral-500 font-light">{contact.description}</p>
                  </div>
                  <div className="ml-4 md:ml-6 flex-shrink-0">
                    <span className="font-mono text-xl md:text-2xl font-medium text-red-600 group-hover:text-red-700 transition-colors">
                      {contact.number}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Personal Emergency Contacts */}
        <section className="mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-neutral-300"></div>
              <h2 className="font-serif text-lg md:text-xl text-neutral-800">Personal Contacts</h2>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-sm text-neutral-500 hover:text-neutral-800 transition-colors px-3 py-2 -mr-3"
            >
              {showAddForm ? 'Cancel' : '+ Add'}
            </button>
          </div>

          {/* Add Contact Form */}
          {showAddForm && (
            <div className="mb-6 md:mb-8 p-4 md:p-5 bg-neutral-50 border border-neutral-100">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Contact name"
                    className="w-full px-3 py-3 md:py-2.5 text-base md:text-sm bg-white border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">Phone</label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full px-3 py-3 md:py-2.5 text-base md:text-sm bg-white border border-neutral-200 focus:border-neutral-400 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  onClick={addContact}
                  disabled={!newName.trim() || !newPhone.trim()}
                  className="w-full py-3 md:py-2.5 text-sm bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 transition-colors"
                >
                  Add Contact
                </button>
              </div>
            </div>
          )}

          {/* Personal Contacts List */}
          {personalContacts.length > 0 ? (
            <div className="space-y-2">
              {personalContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between py-3 md:py-4 px-4 border border-neutral-100"
                >
                  <a href={`tel:${contact.phone}`} className="flex-1 min-w-0">
                    <span className="text-base md:text-sm font-medium text-neutral-800 block truncate">{contact.name}</span>
                    <span className="text-sm md:text-xs text-neutral-500 font-mono">{contact.phone}</span>
                  </a>
                  <button
                    onClick={() => removeContact(contact.id)}
                    className="ml-4 text-neutral-400 hover:text-red-500 transition-colors p-2 -mr-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-400 font-light py-4 border-t border-neutral-50">
              Add trusted contacts for quick access during emergencies
            </p>
          )}
        </section>

        {/* Safety Tips */}
        <section className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <div className="w-1 h-4 bg-neutral-200"></div>
            <h2 className="font-serif text-lg md:text-xl text-neutral-800">Safety Guidelines</h2>
          </div>

          <div className="space-y-0">
            {safetyTips.map((tip, index) => (
              <div
                key={index}
                className="py-3 md:py-4 border-b border-neutral-50 last:border-0"
              >
                <div className="flex gap-3 md:gap-4">
                  <span className="text-xs text-neutral-300 font-mono mt-0.5">{String(index + 1).padStart(2, '0')}</span>
                  <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <div className="w-1 h-4 bg-neutral-200"></div>
            <h2 className="font-serif text-lg md:text-xl text-neutral-800">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:100"
              className="flex items-center justify-center gap-2 py-4 px-4 border border-red-100 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-sm font-medium">Call Police (100)</span>
            </a>
            <a
              href="tel:101"
              className="flex items-center justify-center gap-2 py-4 px-4 border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-medium">Call Ambulance (101)</span>
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-50">
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <p className="text-xs text-neutral-400 text-center">
            Requested by <a href="https://twitter.com/Nishant293" className="hover:text-neutral-600 transition-colors">@Nishant293</a> · Built by <a href="https://twitter.com/clonkbot" className="hover:text-neutral-600 transition-colors">@clonkbot</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
