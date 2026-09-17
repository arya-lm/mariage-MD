/* =========================================================
   MARIAGE MARIE & CLÉMENT — PERSONNALISATION
   ========================================================= */
const WEDDING = {
  date: "2026-04-16T14:30:00+02:00",
  //adresse e-mail qui recevra les RSVP.
  rsvpEmail: "acino@free.fr",
  address: "12 chemin des Jardins, 60500 Chantilly, France",
  event: {
    title: "Mariage de Marie & Clément",
    start: "20270416T160000",
    end: "20270417T030000",
    location: "Le Domaine des Étoiles, 12 chemin des Jardins, 60500 Chantilly, France"
  }
};

// ---------- Menu mobile ----------
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

// ---------- Compte à rebours ----------
function updateCountdown() {
  const distance = new Date(WEDDING.date).getTime() - Date.now();
  const ids = ["days","hours","minutes","seconds"];
  if (distance <= 0) {
    ids.forEach(id => document.getElementById(id).textContent = "♥");
    return;
  }
  [Math.floor(distance/86400000), Math.floor(distance/3600000)%24, Math.floor(distance/60000)%60, Math.floor(distance/1000)%60]
    .forEach((v,i) => document.getElementById(ids[i]).textContent = String(v).padStart(2,"0"));
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ---------- Animations au défilement ----------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ---------- Adresse ----------
document.getElementById("copyAddress")?.addEventListener("click", async () => {
  const feedback = document.getElementById("copyFeedback");
  try {
    await navigator.clipboard.writeText(WEDDING.address);
    feedback.textContent = "Adresse copiée ✓";
  } catch {
    feedback.textContent = "Copie automatique indisponible.";
  }
  setTimeout(() => feedback.textContent = "", 3000);
});

// ---------- RSVP ----------
document.getElementById("rsvpForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = data.get("name");
  const attendance = data.get("attendance");
  const guests = data.get("guests");
  const message = data.get("message") || "Aucun message.";
  const subject = encodeURIComponent(`RSVP mariage Marie & Clément — ${name}`);
  const body = encodeURIComponent(`Bonjour Marie et Clément,

Voici ma réponse pour votre mariage du 16 avril 2027 :

Nom : ${name}
Présence : ${attendance}
Nombre de personnes : ${guests}

Message :
${message}

À très bientôt !`);
  window.location.href = `mailto:${WEDDING.rsvpEmail}?subject=${subject}&body=${body}`;
});

// ---------- Calendrier ----------
function downloadCalendar() {
  const ics = [
    "BEGIN:VCALENDAR","VERSION:2.0",
    "PRODID:-//Marie et Clement//Faire-part mariage//FR",
    "BEGIN:VEVENT",
    `DTSTART;TZID=Europe/Paris:${WEDDING.event.start}`,
    `DTEND;TZID=Europe/Paris:${WEDDING.event.end}`,
    `SUMMARY:${WEDDING.event.title}`,
    `LOCATION:${WEDDING.event.location}`,
    "DESCRIPTION:Une journée pour célébrer Marie et Clément.",
    "END:VEVENT","END:VCALENDAR"
  ].join("\r\n");
  const blob = new Blob([ics], {type:"text/calendar;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "mariage-marie-clement-16-avril-2027.ics";
  link.click();
  URL.revokeObjectURL(url);
}
document.getElementById("calendarButton")?.addEventListener("click", downloadCalendar);
document.getElementById("heroCalendar")?.addEventListener("click", downloadCalendar);

// ---------- Galerie / Lightbox ----------
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
let currentGalleryIndex = 0;

function openGallery(index) {
  currentGalleryIndex = index;
  const item = galleryItems[index];
  lightboxImage.src = item.dataset.full;
  lightboxImage.alt = item.querySelector("img")?.alt || `Souvenir ${index + 1}`;
  lightboxCaption.textContent = `Souvenir ${String(index + 1).padStart(2,"0")} · Marie & Clément`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}
function closeGallery() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lightboxImage.src = "";
}
function moveGallery(step) {
  currentGalleryIndex = (currentGalleryIndex + step + galleryItems.length) % galleryItems.length;
  openGallery(currentGalleryIndex);
}
galleryItems.forEach((item,index) => item.addEventListener("click", () => openGallery(index)));
document.getElementById("lightboxClose")?.addEventListener("click", closeGallery);
document.getElementById("galleryPrev")?.addEventListener("click", () => moveGallery(-1));
document.getElementById("galleryNext")?.addEventListener("click", () => moveGallery(1));
lightbox?.addEventListener("click", e => { if (e.target === lightbox) closeGallery(); });
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowLeft") moveGallery(-1);
  if (e.key === "ArrowRight") moveGallery(1);
});

