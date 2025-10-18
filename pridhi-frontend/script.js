// === FIXED NAV, SMOOTH SCROLL, PROFILE SECTION (hidden until clicked) ===

// Define navigation buttons (no Explore)
const NAV_LINKS = [
  { label: "Home", target: "top" },
  { label: "Schedule", target: "scheduleForm" },
  { label: "Leaderboard", target: "leaderboardList" },
  { label: "Feedback", target: "feedbackForm" },

];

// ====== FIXED NAV BAR ======
const nav = document.querySelector('nav');
nav.style.position = 'fixed';
nav.style.top = '0';
nav.style.width = '100%';
nav.style.zIndex = '1000';
nav.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';

// Prevent page content from hiding under nav
document.body.style.paddingTop = nav.offsetHeight + 'px';

// ====== CREATE NAV BUTTONS ======
const navInner = document.querySelector('.nav-inner');
const navButtons = document.createElement('div');
navButtons.style.display = 'flex';
navButtons.style.gap = '12px';
navButtons.style.alignItems = 'center';
navButtons.style.marginLeft = '20px';

navInner.insertBefore(navButtons, document.querySelector('.nav-search'));

NAV_LINKS.forEach(link => {
  const btn = document.createElement('button');
  btn.textContent = link.label;
  btn.className = 'btn btn-outline nav-btn';
  btn.dataset.target = link.target;

  btn.onclick = () => {
    if (link.target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.target === 'profileSection') {
      toggleProfileSection(); // only show when clicked
    } else {
      const section = document.getElementById(link.target);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  navButtons.appendChild(btn);
});

// ====== ACTIVE BUTTON HIGHLIGHT ======
window.addEventListener('scroll', () => {
  const sectionIds = NAV_LINKS
    .filter(l => l.target !== 'top' && l.target !== 'profileSection')
    .map(l => l.target);
  let current = '';
  sectionIds.forEach(id => {
    const section = document.getElementById(id);
    if (section) {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) current = id;
    }
  });

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active-nav');
    if (btn.dataset.target === current) btn.classList.add('active-nav');
  });
});

const style = document.createElement('style');
style.textContent = `
    .active-nav {
        /* This already looks good (dark background, white text) */
        background-color: #1f2937 !important; 
        color: white !important;
    }
    .nav-btn {
        /* Ensure the base text is visible BEFORE being active */
        color: white !important;
        font-weight: 600 !important;
        width: 100px;
        font-weight: 700 !important; /* Makes the text bold like in the image */
    font-size: 12px; /* Maintains size */
    }
`;
document.head.appendChild(style);

// ====== PROFILE SECTION ======

// Create hidden profile section at bottom
const profileSection = document.createElement('section');
profileSection.id = 'profileSection';
profileSection.style.display = 'none';
profileSection.style.background = 'white';
profileSection.style.margin = '60px auto';
profileSection.style.padding = '40px 20px';
profileSection.style.maxWidth = '600px';
profileSection.style.borderRadius = '12px';
profileSection.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
profileSection.innerHTML = `
  <h2 style="text-align:center;">My Profile</h2>
  <form id="profileForm" style="display:flex; flex-direction:column; gap:12px;">
    <input id="profileName" placeholder="Your Name" style="padding:10px; border:1px solid #d1d5db; border-radius:8px;">
    <input id="profileSkill" placeholder="Your Main Skill" style="padding:10px; border:1px solid #d1d5db; border-radius:8px;">
    <textarea id="profileBio" placeholder="Short Bio..." style="padding:10px; border:1px solid #d1d5db; border-radius:8px; resize:vertical;"></textarea>
    <button type="submit" class="btn" style="align-self:flex-end;">Save Profile</button>
  </form>
  <div id="profileDisplay" style="margin-top:20px; display:none; border-top:1px solid #e5e7eb; padding-top:20px;">
    <h3>Profile Info</h3>
    <p><strong>Name:</strong> <span id="dispName"></span></p>
    <p><strong>Skill:</strong> <span id="dispSkill"></span></p>
    <p><strong>Bio:</strong> <span id="dispBio"></span></p>
  </div>
`;
document.body.appendChild(profileSection);

// Load saved profile
const savedProfile = JSON.parse(localStorage.getItem('user_profile'));
if (savedProfile) {
  document.getElementById('profileName').value = savedProfile.name;
  document.getElementById('profileSkill').value = savedProfile.skill;
  document.getElementById('profileBio').value = savedProfile.bio;
  document.getElementById('dispName').textContent = savedProfile.name;
  document.getElementById('dispSkill').textContent = savedProfile.skill;
  document.getElementById('dispBio').textContent = savedProfile.bio;
  document.getElementById('profileDisplay').style.display = 'block';
}

// Save profile
document.getElementById('profileForm').onsubmit = e => {
  e.preventDefault();
  const profile = {
    name: document.getElementById('profileName').value.trim(),
    skill: document.getElementById('profileSkill').value.trim(),
    bio: document.getElementById('profileBio').value.trim()
  };
  if (!profile.name || !profile.skill) return alert('Please fill in your name and skill.');
  localStorage.setItem('user_profile', JSON.stringify(profile));
  document.getElementById('dispName').textContent = profile.name;
  document.getElementById('dispSkill').textContent = profile.skill;
  document.getElementById('dispBio').textContent = profile.bio;
  document.getElementById('profileDisplay').style.display = 'block';
  alert('Profile saved!');
};

// Toggle show/hide for profile section
function toggleProfileSection() {
  if (profileSection.style.display === 'none') {
    profileSection.style.display = 'block';
    profileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    profileSection.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
// Add this to the very end of your script.js file

document.addEventListener("DOMContentLoaded", function() {
    // This code runs as soon as your HTML page is loaded
    console.log("Website loaded. Trying to fetch data from backend...");

    // This is the API call to your backend (which is running in your other terminal)
    fetch('http://127.0.0.1:5000/api/skills/popular')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("SUCCESS! Data received from backend:", data);
            // You can now use this 'data' to change your HTML!
        })
        .catch(error => {
            console.error("ERROR: Could not fetch data from backend:", error);
        });
});
