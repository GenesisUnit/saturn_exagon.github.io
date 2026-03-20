const GOOGLE_CLIENT_ID = "TUO_CLIENT_ID_QUI.apps.googleusercontent.com";

window.onload = function() {
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { 
            theme: 'dark',
            size: 'large',
            width: '100%'
        }
    );

    google.accounts.id.renderButton(
        document.getElementById('googleSignUpButton'),
        { 
            theme: 'dark',
            size: 'large',
            width: '100%'
        }
    );

    loadUserFromLocalStorage();
};

function handleCredentialResponse(response) {
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const userData = JSON.parse(jsonPayload);

    localStorage.setItem('user', JSON.stringify({
        name: userData.name,
        email: userData.email,
        picture: userData.picture,
        token: response.credential
    }));

    document.getElementById('signInModal').style.display = 'none';
    document.getElementById('signUpModal').style.display = 'none';

    updateUIAfterLogin(userData);
}

function updateUIAfterLogin(userData) {
    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('userButtons').style.display = 'flex';
    document.getElementById('userNameHeader').textContent = userData.name.split(' ')[0];

    document.getElementById('userProfile').style.display = 'block';
    document.getElementById('userProfilePic').src = userData.picture;
    document.getElementById('userName').textContent = userData.name;

    console.log('Utente loggato:', userData);
}

function loadUserFromLocalStorage() {
    const userString = localStorage.getItem('user');
    if (userString) {
        const userData = JSON.parse(userString);
        updateUIAfterLogin(userData);
    }
}

function handleSignOut() {
    google.accounts.id.disableAutoSelect();
    localStorage.removeItem('user');
    location.reload();
}

window.onclick = function(event) {
    let signInModal = document.getElementById('signInModal');
    let signUpModal = document.getElementById('signUpModal');
    
    if (event.target == signInModal) {
        signInModal.style.display = 'none';
    }
    if (event.target == signUpModal) {
        signUpModal.style.display = 'none';
    }
}