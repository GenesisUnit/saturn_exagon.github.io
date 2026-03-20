const socialProfiles = {
    tiktok: {
        username: 'saturn_exagon',
        webUrl: 'https://www.tiktok.com/@saturn_exagon',
        iosAppUrl: 'tiktok://user?uniqueId=saturn_exagon',
        androidAppUrl: 'intent://profile/saturn_exagon#Intent;package=com.zhiliaoapp.musically;scheme=tiktok;end'
    },
    instagram: {
        username: 'saturn_exagon',
        webUrl: 'https://www.instagram.com/saturn_exagon',
        iosAppUrl: 'instagram://user?username=saturn_exagon',
        androidAppUrl: 'intent://user/saturn_exagon#Intent;package=com.instagram.android;scheme=instagram;end'
    }
};
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
function getOS() {
    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
    if (/Android/.test(ua)) return 'android';
    return 'desktop';
}
function openSocial(platform) {
    const profile = socialProfiles[platform];
    const os = getOS();
    
    if (!profile) return;
    if (!isMobile()) {
        window.open(profile.webUrl, '_blank', 'width=600,height=800');
        return;
    }
    if (os === 'ios') {
        const appUrl = profile.iosAppUrl;
        const fallbackUrl = profile.webUrl;
        const startTime = Date.now();
        window.location.href = appUrl;
        setTimeout(() => {
            if (Date.now() - startTime < 2000) {
                window.location.href = fallbackUrl;
            }
        }, 1500);
    } 
    else if (os === 'android') {
        const fallbackUrl = profile.webUrl;
        const startTime = Date.now();
        try {
            window.location.href = profile.androidAppUrl;
        } catch (e) {
            window.location.href = fallbackUrl;
        }
        setTimeout(() => {
            if (Date.now() - startTime < 2000) {
                window.location.href = fallbackUrl;
            }
        }, 1500);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const social = this.getAttribute('data-social');
            openSocial(social);
        });
    });
});