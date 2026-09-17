import type { TranslationPart } from "../types";

/** English: business details, languages, price tiers, doctors, about page. */
export const misc: TranslationPart = {
  business: {
    legalName: "Urgence Médicale Casablanca",
    street: "Hay Essalam, GH 2, Building 4",
    city: "Casablanca",
    region: "Casablanca-Settat",
  },
  languages: {
    Arabe: "Arabic",
    Français: "French",
    Anglais: "English",
    Amazigh: "Amazigh",
  },
  pricing: {
    "jour-weekend": { label: "Daytime and weekend consultation", window: "07:00 – 20:00, Saturday and Sunday included" },
    "nuit-ferie": { label: "Night and public holiday consultation", window: "20:00 – 07:00, and public holidays" },
  },
  doctors: {
    "dr-ilyas-hamzaoui": {
      name: "Dr Ilyas Hamzaoui",
      bio: "General practitioner. He handles at home the most common reasons people would normally go to a surgery for — fever, pain, infection, feeling unwell, renewing or adjusting a treatment. On site he carries out a full clinical examination, then decides: treatment given directly, a prescription, a medical certificate, or referral for further tests or to a hospital department when the situation calls for it. He consults in Arabic, French and English.",
    },
    "dr-echcaymaa-ouenza": {
      name: "Dr Echcaymaa Ouenza",
      bio: "Emergency physician. Her specialty is the rapid assessment of an acute situation: working out, with the person in front of her, what can be treated at home and what must be referred to a hospital without delay. That is exactly the judgement that advice over the phone cannot replace. She takes unscheduled calls, day and night, and consults in Arabic, French and English.",
    },
    "dr-majda-boujdi": {
      name: "Dr Majda Boujdi",
      bio: "Emergency physician. She provides unscheduled home consultations when a patient's condition cannot wait for an appointment. Her work is as much about deciding as treating: recognising what can be managed at home and what requires a transfer, without waiting for the situation to get worse. She consults in Arabic, French and English.",
    },
    "dr-naoufal-naim": {
      name: "Dr Naoufal Naim",
      bio: "Emergency physician. He travels for requests that need to be seen without delay, and decides on site what should happen next: immediate treatment, monitoring, or hospital referral. He consults in Arabic, French, English and Amazigh — a language few home-visit services offer, and one that changes the quality of the conversation for patients who are more at ease in their first language, older people in particular.",
    },
    "dr-abdelouahed-el-haiti": {
      name: "Dr Abdelouahed El Haiti",
      bio: "Emergency physician. He comes to the home for calls that need a quick examination in person rather than an opinion from a distance. A direct examination shows what a description over the phone cannot — the person's general condition, their breathing, the real extent of the pain — and that is what the decision on what to do next is based on. He consults in Arabic, French and English.",
    },
    "dr-yassine-ragbaoui": {
      name: "Dr Yassine Ragbaoui",
      bio: "Cardiologist. He provides cardiology consultations and follow-up at home for patients who find it hard to get to a practice: older people, patients who are convalescing, or those on long-term treatment. A home consultation also makes it possible to record an electrocardiogram on the spot. He consults in Arabic, French and English.",
    },
    "dr-marjane-benjelloune": {
      name: "Dr Marjane Benjelloune",
      bio: "Geriatrician. She provides home consultations and follow-up suited to the needs of older people, in the place where they actually live. Seeing a patient at home reveals things a consultation in a practice never shows: how independent they really are day to day, how the home is organised, how treatments are actually taken, and whether a carer is present. She consults in Arabic, French and English.",
    },
  },
  aboutPage: {
    intro:
      "Urgence Médicale Casablanca sends a doctor to your home in Casablanca, Rabat, Mohammedia, Bouskoura and Dar Bouazza, 24 hours a day, 7 days a week.",
    body: `Urgence Médicale Casablanca is a home medical assistance service — what is often called an "SOS doctor". A doctor registered with the Ordre National des Médecins, Morocco's medical council, travels to wherever the patient is, at any hour, including nights, weekends and public holidays.

The idea is simple: for a great many reasons to see a doctor, moving the patient is the real problem. A child's temperature climbing, pain that keeps someone awake, an older person who can no longer get around, a wound that needs looking at — in these situations the consultation itself takes twenty minutes, but dressing someone, getting them downstairs, crossing the city and sitting in a waiting room takes three hours. A doctor who comes to you removes that part.

**A team you can identify by name**

Seven doctors make the visits: one general practitioner, four emergency physicians, one cardiologist and one geriatrician. Each is named on this site, with their registration number at the Ordre National des Médecins — a public number anyone can check. That is deliberate: in this sector, most services advertise a number of doctors without naming a single one, which leaves nobody able to check anything before opening the door to a stranger.

All of them consult in Arabic, French and English; one also consults in Amazigh. For an older person who is more comfortable in their first language, that detail changes the quality of the conversation, and therefore of the examination.

**What happens when you call**

You describe the situation: who is unwell, since when, what you have noticed. You are told the expected delay and the fee that applies before you confirm — not after the visit. The doctor calls you before arriving to confirm how to get into the building or the residence.

The details that save the most time are always the same: the full address, the floor, the door code if there is one, and a number where you can be reached. It sounds minor; in reality it is what separates a doctor who arrives from a doctor who is searching for a building at two in the morning.

On site, the examination is complete. Depending on what the doctor finds, they give a treatment, write a prescription, issue a certificate, or refer the patient for further tests or to a hospital department. The decision is theirs, made with the person in front of them — which is precisely what advice given over the phone cannot replace.

**Fees published in advance**

500 dirhams during the day and at weekends, 700 dirhams at night and on public holidays. These amounts are on the site, available before you call, and confirmed on the phone before you confirm the visit.

Publishing prices is still rare in this sector in Morocco, where the usual answer is "call us". We do the opposite for a simple reason: someone looking for a doctor at two in the morning should not have to negotiate, or discover the amount once the doctor is on the doorstep.

Nursing care, oxygen therapy, hospital-at-home and medical transport do not follow this scale: they depend on the procedures, the equipment or the distance, and are priced on the phone before anything is arranged.

**Beyond the consultation**

The service also covers home nursing care — injections, dressings, infusions, monitoring of vital signs, on prescription — oxygen therapy with the equipment supplied and installed, hospital-at-home for continuous care over several days or weeks, and medical transport and medical evacuation by road within Morocco.

**The area we cover**

Casablanca and its neighbourhoods, Rabat, Mohammedia, Bouskoura and Dar Bouazza. Every city and neighbourhood we cover has its own page, with the local landmarks and access conditions that actually matter on the ground: a floor with no lift, a residence with a guard, a street where a vehicle cannot stop, an area where house numbers are hard to read at night.

This area is deliberately limited to what can be served honestly. Advertising national coverage when the doctors are based in Greater Casablanca would mean promising visits that cannot be delivered.

**What this service is not**

It is not an emergency service for life-threatening situations. Chest pain, difficulty breathing, loss of consciousness, heavy bleeding or the aftermath of an accident are matters for the emergency services, which have resuscitation equipment and priority on the road. In those situations, call them directly rather than waiting for a home visit.

A home visit is for what cannot wait until tomorrow. Not for what cannot wait ten minutes.`,
  },
};
