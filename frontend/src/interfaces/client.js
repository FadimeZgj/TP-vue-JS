const clientInterface = {
    id: Date.now() + 1,
    firstName: '',
    lastName: '',
    compnayName: '',
    date: ''
}

const clientDetailInterface = {
    id: Date.now(),
    firstName: '',
    lastName: '',
    date: new Date().toISOString().slice(0, 10),
    job: '',
    phone: '',
    email: '',
    address1: '',
    assress2: '',
    city: '',
    zip: '',
    country: ['France', 'Luxembourg', 'Turquie', 'Allemagne', 'Suisse'],
    selectedCountry: ''
}

export { clientInterface, clientDetailInterface }