/**
 * Birthday Party Configuration
 * =============================
 * Update this file to change event details.
 * All components read from this single source of truth.
 */

export const birthdayConfig = {
  // Birthday person
  person: {
    fullName: "WIYANA ANANDA OCTAVIANI",
    nickname: "WIYANA",
    age: 24,
    tagline: "NIGHT PARTY",
  },

  // Event details
  event: {
    name: "24th Birthday Celebration",
    displayTitle: "WIYANA'S 24TH BIRTHDAY",
    date: "2026-10-19T21:00:00+07:00", // ISO 8601 with WIB timezone
    dateDisplay: "SENIN, 19 OKTOBER 2026",
    timeDisplay: "21.00 WIB – Selesai",
    timezone: "Asia/Jakarta",
  },

  // Venue
  venue: {
    name: "TEMBAK LANGIT",
    location: "PASKAL 23",
    address:
      "Komplek Paskal Hypersquare, Jl. Pasir Kaliki No. 25–27, Kebon Jeruk, Kecamatan Andir, Kota Bandung, Jawa Barat 40241",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Komplek+Paskal+Hypersquare%2C+Jl.+Pasir+Kaliki%2C+Bandung%2C+Jawa+Barat",
  },

  // Dress code
  dressCode: {
    color: "WHITE",
    description: "Please wear white attire to match our party theme",
  },

  // Default guest name when no query parameter is provided
  defaultGuestName: "Special Guest",

  // Theme colors
  theme: {
    deepPurple: "#170D2B",
    electricPurple: "#8B5CF6",
    hotPink: "#FF4FA3",
    neonCyan: "#38E8FF",
    softWhite: "#FFF9F5",
    accentYellow: "#FFE66D",
  },

  // Music configuration
  music: {
    src: "/music/birthday-song.mp3",
    title: "Birthday Song",
  },

  // Gallery images (replace placeholder paths with actual images)
  gallery: [
    { src: "/images/gallery-1.jpg", alt: "Birthday celebration 1" },
    { src: "/images/gallery-2.jpg", alt: "Birthday celebration 2" },
    { src: "/images/gallery-3.jpg", alt: "Birthday celebration 3" },
    { src: "/images/gallery-4.jpg", alt: "Birthday celebration 4" },
    { src: "/images/gallery-5.jpg", alt: "Birthday celebration 5" },
    { src: "/images/gallery-6.jpg", alt: "Birthday celebration 6" },
  ],

  // Share configuration
  share: {
    title: "You're Invited! 🎂",
    text: "You're invited to Wiyana's 24th Birthday Celebration! 🎉🥳",
  },
};
