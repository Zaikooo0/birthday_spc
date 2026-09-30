# 🎂 Birthday Special Website — Complete Customization Guide ❤️

Aapki website **ready aur running** hai! Is guide me bataya gaya hai ki aap apni photos, videos, chats, shayari, and names kaise customize kar sakte hain.

---

## 📁 1. Files Kahan Par Hain?

Saara content **ek hi main configuration file** me store hai:
👉 **[src/config/memoriesData.js](file:///d:/birthday_special/src/config/memoriesData.js)**

Aap is file ko open karke direct koi bhi text, date, naam ya quote edit kar sakte ho.

---

## 📸 2. Apni Real Photos Kaise Add Karein?

1. Apni photos ko `d:\birthday_special\public\images\` folder me copy/paste karein (e.g., `photo1.jpg`, `photo2.jpg`, `candid.jpg`).
2. [src/config/memoriesData.js](file:///d:/birthday_special/src/config/memoriesData.js) me jaakar `polaroids` array me `image: "/images/photo1.jpg"` likh dein.
   
*(Aap direct online image URLs ya Google Drive/Imgur links bhi use kar sakte hain!)*

---

## 🎥 3. Apni Real Videos / Reels Kaise Add Karein?

1. Apni video clips (`.mp4` / `.mov` / `.webm`) ko `d:\birthday_special\public\videos\` folder me copy/paste karein (e.g., `laugh.mp4`, `outing.mp4`).
2. [src/config/memoriesData.js](file:///d:/birthday_special/src/config/memoriesData.js) me jaakar `videos` array me `videoUrl: "/videos/laugh.mp4"` update karein.

---

## 🔐 4. Secret Passcode Kaise Change Karein?

[src/config/memoriesData.js](file:///d:/birthday_special/src/config/memoriesData.js) me:
```javascript
recipient: {
  name: "Uska Naam",
  nickname: "Nickname ❤️",
  birthDate: "2026-10-01",
  friendshipStartDate: "2023-04-15", // Dosti shuru hone ki date (Live counter ke liye)
  passcode: "1001", // Secret unlock code (e.g. 1001 ya koi inside joke)
  passcodeHint: "Hint: Her birthday date (1001)",
}
```

---

## 💬 5. Chats & Iconic Lines Update Karna

[src/config/memoriesData.js](file:///d:/birthday_special/src/config/memoriesData.js) me `herQuotes` array me uski boli hui baatein add karein:
- `quote`: "Uski boli hui line"
- `context`: "Kab bola tha / context"
- `date`: "14 Feb, 2:15 AM"
- `reaction`: "😭❤️"

---

## 💌 6. Secret Letter ("Things I Never Said")

[src/config/memoriesData.js](file:///d:/birthday_special/src/config/memoriesData.js) me `secretLetter` section me aap jo bhi dil ki baat bolna chahte ho, paragraphs me likh sakte ho!

---

## 🚀 7. Website Live Kaise Dekhein?

Browser me open karein:
👉 **http://127.0.0.1:5173/**

---

## 🌐 8. Free me Vercel / Netlify par Deploy Karna

Website ko online live link (e.g., `https://our-story-aarohi.vercel.app`) banane ke liye:
1. Terminal me command chalayein: `npx vercel`
2. Ya apne GitHub repository se Vercel / Netlify par 1-click deploy karein.
