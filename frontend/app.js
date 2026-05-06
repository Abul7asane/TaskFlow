// Adresse du serveur backend
const API = 'http://localhost:3000/api';

// FONCTION : afficher un message à l'utilisateur
function afficherMessage(texte, type) {
  const div = document.getElementById('message');
  div.textContent = texte;
  div.className = 'message ' + type;  // 'erreur' ou 'succes'
  div.style.display = 'block';
}

// FONCTION INSCRIPTION
async function sInscrire() {
  const nom        = document.getElementById('nom').value;
  const prenom     = document.getElementById('prenom').value;
  const email      = document.getElementById('email').value;
  const motDePasse = document.getElementById('motDePasse').value;

  // Vérification simple : tous les champs sont remplis ?
  if (!nom || !prenom || !email || !motDePasse) {
    afficherMessage('Veuillez remplir tous les champs', 'erreur');
    return;
  }

  try {
    // Envoi des données au serveur avec axios
    const reponse = await axios.post(API + '/auth/register', { nom, prenom, email, motDePasse });
    afficherMessage('Compte créé ! Redirection...', 'succes');
    // Rediriger vers la page de connexion après 1 seconde
    setTimeout(() => { window.location.href = 'index.html'; }, 1000); 
  } catch (erreur) {
    afficherMessage('Impossible de contacter le serveur', 'erreur');
  }
}

// FONCTION CONNEXION
async function seConnecter() {
  const email      = document.getElementById('email').value;
  const motDePasse = document.getElementById('motDePasse').value;

  if (!email || !motDePasse) {
    afficherMessage('Veuillez remplir tous les champs', 'erreur');
    return;
  }

  try {
    // Envoi des identifiants au serveur avec axios
    const reponse = await axios.post(API + '/auth/login', { email, motDePasse });
    localStorage.setItem('token', reponse.data.token);
    localStorage.setItem('user', JSON.stringify(reponse.data.user));
    afficherMessage('Connexion réussie !', 'succes');
    // Rediriger vers le tableau de bord
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000); 
  } catch (erreur) {
    afficherMessage('Impossible de contacter le serveur', 'erreur');
  }
}
// FONCTION DÉCONNEXION
function seDeconnecter() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setTimeout(() => { window.location.href = 'index.html'; }, 1000); 
}
// VÉRIFICATION AU CHARGEMENT DE LA PAGE
// Si un token existe déjà ’ l'utilisateur est déjà connecté
window.onload = function() {
  const token = localStorage.getItem('token');
  console.log('Token au chargement:', token);
  if (token && (window.location.pathname.includes('index.html') || window.location.pathname.includes('register.html'))) {
    window.location.href = 'dashboard.html';
  }
  if (!token && (window.location.pathname.includes('dashboard.html')))   {
    window.location.href = 'index.html';
  }
  if(window.location.pathname.includes('dashboard.html')) {
    const user = JSON.parse(localStorage.getItem('user'));
    document.getElementById('Bienvenue').textContent = `Bienvenue, ${user.prenom} ${user.nom}`;
  }
};