import type { TranslationPart } from "../types";

/** English situation x city pages (/en/{situation}/{city}). */
export const situationCities: TranslationPart = {
  situationCities: {
    "medecin-de-garde/casablanca": {
      intro:
        "In Casablanca, finding an on-call doctor at night often means crossing a huge city to reach a crowded emergency department. A doctor who comes to you removes that journey.",
      body: `Casablanca is the largest city in the country, and that is felt most at night. Between Ain Sebaâ and Sidi Maarouf, between Hay Hassani and Ain Diab, a trip to an emergency department easily takes half an hour — more if the sick person has to be dressed, brought downstairs and settled in a car.

An on-call visit at home answers that: the doctor comes, examines on the spot, and decides what happens next. Depending on what they find, they give a treatment, write a prescription, or refer to a hospital department when the condition calls for it.

Access is the practical point that matters most here. Casablanca is densely built: entry codes, guards, gated residences, older central blocks with no lift. Give the exact address, the floor, the entry code and a number you can be reached on — at two in the morning, that is what separates a doctor who arrives from a doctor searching for a building.

The night and public holiday fee is published in advance, as is the daytime one, and is confirmed before you approve the visit.

This service does not replace the emergency services. Chest pain, difficulty breathing, loss of consciousness, heavy bleeding: call them directly without waiting for a home visit.`,
    },
    "medecin-de-garde/rabat": {
      intro:
        "In Rabat, an on-call doctor can come to your home at night, at weekends and on public holidays, without going through the capital's emergency departments.",
      body: `Rabat is quieter than Casablanca at night, and its roads clear quickly — but that changes nothing for an older person who cannot get down a staircase alone, or for parents whose child starts vomiting at midnight.

The city has a large population of retired people and long-settled families in Agdal, Hassan, Souissi and Yacoub El Mansour. That is exactly the profile for whom an on-call visit at home makes most sense: the journey, not access to a doctor, is the real obstacle.

The on-call doctor carries out a full examination on the spot, then decides: treatment, a prescription, a certificate, or referral to a hospital facility if the situation calls for it. It is a consultation in its own right, not an opinion given over the phone.

Access varies a great deal from one district of Rabat to another — buildings with a guard, gated residences, villas set back from the street. Give the name of the residence and how to get in when you call.

The fee that applies, on-call included, is given before you confirm. If there is a serious sign, contact the emergency services immediately rather than waiting for the doctor.`,
    },
    "medecin-de-garde/mohammedia": {
      intro:
        "In Mohammedia, an on-call doctor comes to you at night and at weekends, without anyone having to drive down to Casablanca.",
      body: `Mohammedia has a particular position: close enough to Casablanca that many residents work there, distinct enough that a night journey to a Casablanca facility is a real decision, especially with a patient in the car.

It is a medium-sized city, residential and coastal, with a stable population and a seasonal influx in summer. On-call requests here often concern settled families, older people, and in summer visiting residents with no usual doctor locally.

The on-call doctor comes to the home, examines the person and decides what happens next: treatment, a prescription, or referral to a hospital department depending on what they find. It is a complete consultation, and a report can be passed on to a regular doctor.

On the phone, give the precise address and how to get in — residential district, gated residence, villa set back — and a number you can be reached on. At night, a landmark visible from the street saves time.

Mohammedia is also an industrial city, with residents whose hours do not follow those of practices: night shifts, rotations, late returns. For those households, "outside opening hours" is not an exception but the norm, and an on-call doctor who travels is simply how they see a doctor.

The fee that applies is given before you confirm. Faced with a serious sign, call the emergency services directly.`,
    },
    "medecin-de-garde/bouskoura": {
      intro: "In Bouskoura, an on-call doctor can come to you at night and at weekends, without driving back up to Casablanca.",
      body: `Bouskoura has changed in a few years: from an outlying small town it has become a residential area of estates and gated residences, lived in largely by families who work in Casablanca. The practical consequence is simple — many households do not yet have a regular doctor locally, and at night the default answer is to take the road back to Casablanca.

An on-call visit at home removes that journey. The doctor comes, examines the person at home, and decides what happens next: treatment, a prescription, or referral to a hospital facility depending on what they find.

Access is the thing to prepare. Bouskoura's gated residences have guards, barriers and internal roads that look very much alike, particularly at night. Give the exact name of the residence, the villa or building number, and tell the guard if you can; always leave a number you can be reached on.

Bouskoura's population is distinctly family-based, with many young children. Night calls here often concern a temperature climbing or a child vomiting — situations where parents want a real medical opinion, not advice over the phone, and where moving the child is the last thing to do.

The on-call fee is given before you confirm. Faced with a serious sign, call the emergency services directly.`,
    },
    "medecin-de-garde/dar-bouazza": {
      intro:
        "In Dar Bouazza, an on-call doctor comes to your home at night and on public holidays, along the coast as well as in the residences set back from it.",
      body: `Dar Bouazza stretches along the coast west of Casablanca, in a succession of residences, villas and estates often separated from one another. It is not a dense city with a centre: it is a residential strip, and that changes how it is reached at night.

Many households live here all year while keeping their medical habits in Casablanca, and the population rises noticeably in summer. In both cases the night-time reflex is to take the coast road back to Casablanca — a journey a home visit makes unnecessary.

The on-call doctor examines the person on the spot and decides: treatment, a prescription, or referral to a hospital department if their condition calls for it.

The address deserves care. Many villas and residences here are not easy to find at night: give the name of the residence, the nearest landmark on the coast road, and a number you can be reached on. If a guard can open up or guide the doctor, tell them.

Street lighting is uneven on some stretches, and several accesses are by side roads with no readable name at night. Staying reachable by phone after the call is more useful here than anywhere: a thirty-second call over the last kilometre saves far more time than a detailed address.

The on-call fee is given before the visit. Faced with a serious sign, contact the emergency services immediately.`,
    },
    "fievre-enfant-nuit/casablanca": {
      intro:
        "Casablanca is Morocco's largest city, and its residential districts cover a considerable area — reaching an emergency department in the middle of the night with a feverish child can be a real journey, depending on where you live. A GP or a paediatrician can instead come and examine them at your home, that same night, in any district of the conurbation.",
      body: `Casablanca covers a considerable area, and many families live far from an emergency department, sometimes on the other side of a conurbation where traffic stays heavy even in the evening. Between Ain Sebaâ, Sidi Maarouf, Hay Hassani and Californie, crossing the city at night with a feverish child takes time, even when the roads are clearer than by day. Having the doctor come to you removes that journey: the child stays in bed while the doctor travels to you, wherever in the conurbation you live.

After your call, you are asked for the address, the child's age and a few general details; the time before the doctor arrives and the night fee are given before you confirm the visit, so the decision stays yours. The doctor who comes, a GP or a paediatrician depending on who is available, is registered with the Ordre National des Médecins; once there, they examine the child and decide themselves what should happen next: treatment on the spot, a prescription, or referral to a hospital department if the examination calls for it. The service runs 24/7 in Casablanca, weekends and public holidays included.

If your child's condition worries you a great deal or seems to be getting worse quickly, contact the emergency services directly rather than waiting for the doctor. When in doubt, call anyway: the person who answers can help you choose between a home visit and going to an emergency department.`,
    },
    "fievre-enfant-nuit/rabat": {
      intro:
        "Rabat is a calmer capital than Casablanca, but a fever climbing in a child in the middle of the night worries parents just as much. A GP or a paediatrician can come to you, in any district of the city, to examine them that same night.",
      body: `Rabat is a steadier city than its neighbour Casablanca, but a temperature climbing in a child in the middle of the night is just as distressing, whether you live in Agdal, Hay Riad, Souissi or a more outlying district. As an administrative capital with fairly spread-out residential districts, Rabat sometimes means a significant journey to an emergency department late at night, with a tired, feverish child. Having the doctor come to you removes that journey: they travel, not you.

When you call, you are asked for the address, the floor if there is one and the child's age, then the time before the doctor arrives and the night fee are given before you confirm the appointment. The doctor, a GP or a paediatrician depending on availability, is registered with the Ordre National des Médecins; on site, they examine the child and decide what happens next: treatment on the spot, a prescription, or referral to a hospital department if necessary. In Rabat the service is available all night, every day of the year, weekends and public holidays included.

If your child's condition worries you a great deal, the safest thing is to contact the emergency services directly rather than waiting for a doctor to arrive. When in doubt, call: the person who answers helps you judge the situation and decide what to do.`,
    },
    "fievre-enfant-nuit/mohammedia": {
      intro:
        "Mohammedia is a coastal city, calmer than Casablanca or Rabat, but a fever climbing in a child in the middle of the night is just as worrying here. A GP or a paediatrician can come and examine them at your home, that same night.",
      body: `Mohammedia, a coastal city between Casablanca and Rabat, is calmer than its large neighbours, but a night-time fever in a child worries parents just as much. Between the residential districts near the beach and those closer to the industrial zone, Mohammedia is still a city where an emergency department is not always close at hand, depending on the hour and the traffic. Having the doctor come to you removes that journey: they come, that same night.

After your call, you are asked for the address, the child's age and a few general details; the time before the doctor arrives and the night fee are given before you confirm the visit, so the decision stays yours. The doctor who comes, a GP or a paediatrician depending on who is available, is registered with the Ordre National des Médecins; once there, they examine the child and decide themselves what should happen next: treatment on the spot, a prescription, or referral to a hospital department if the examination calls for it. The service can be reached 24/7 across the Mohammedia area.

If your child's condition worries you a great deal or seems to be getting worse quickly, the safest thing is to contact the emergency services directly rather than waiting for a doctor to arrive. When in doubt, call anyway: the person who answers helps you judge whether a home visit is suitable or whether going to an emergency department is better.`,
    },
    "fievre-enfant-nuit/bouskoura": {
      intro:
        "Bouskoura, a fast-growing residential commune south of Casablanca, has many housing estates, some of them far from the main roads. A GP or a paediatrician can come straight to you to examine a feverish child, that same night.",
      body: `Bouskoura, a fast-growing residential commune south of Casablanca, has many villa estates, some of them far from the main roads and from the conurbation's emergency departments. Between the new residential districts and the Bouskoura forest, the internal distances are real, and reaching an emergency department in Casablanca in the middle of the night with a sick child can take longer than expected. Having the doctor come to you removes that journey: they travel to your estate.

After your call, you are asked for the precise address and the child's age; the time before the doctor arrives and the night fee are given before you confirm, with no surprise when they get there. The doctor who comes, a GP or a paediatrician depending on availability, is registered with the Ordre National des Médecins; they examine the child on the spot and decide themselves whether to treat at home, write a prescription, or refer to a hospital department. The service can be reached 24/7 across the Bouskoura area.

If your child's condition worries you a great deal, the safest thing is to contact the emergency services directly rather than waiting for a doctor to arrive. When in doubt, call: the person who answers helps you judge the situation and decide what to do.`,
    },
    "fievre-enfant-nuit/dar-bouazza": {
      intro:
        "Dar Bouazza, a residential and seaside area west of Casablanca, is further out than the centre of the conurbation. A GP or a paediatrician can come and examine your feverish child at home, that same night, without that journey.",
      body: `Dar Bouazza, a developing residential and seaside area west of Casablanca, is further out than the centre of the conurbation, which makes a night journey to an emergency department longer. Between the recent villas and the areas still under construction, Dar Bouazza is a commune where the distances to a hospital are real, especially at night with a tired child. Having the doctor come to you removes that journey.

Once you have called, you are asked for the address, the child's age and a few useful details; the time before the doctor arrives and the night fee are given before you confirm, so that you decide knowing both. The doctor, a GP or a paediatrician depending on who is available, is registered with the Ordre National des Médecins; once there, they examine the child and decide themselves what should happen next. The service runs 24/7 in Dar Bouazza, weekends and public holidays included.

If your child's condition worries you a great deal or seems to be getting worse quickly, the safest thing is to contact the emergency services directly rather than waiting for a doctor to arrive. When in doubt, call anyway: the person who answers helps you judge whether a home visit is suitable or whether going to an emergency department is better.`,
    },
    "prise-de-sang-domicile/casablanca": {
      intro:
        "Casablanca stretches over tens of kilometres, and a simple trip to a laboratory can quickly turn into an hour lost in the traffic on Avenue des FAR or Boulevard Zerktouni. For a blood test, a nurse or a laboratory technician can come straight to you, wherever you are in the city.",
      body: `The principle is simple: the professional comes to your home with their equipment, takes the sample in good hygienic conditions, then delivers it to an analysis laboratory. Whether the test is prescribed or requested as a routine check, the blood test happens exactly as it would at a laboratory, only at your home.

In Casablanca this above all avoids the queue at a laboratory at peak times and the time lost in traffic, which counts for busy working people in the morning as much as for parents who would rather not keep a child waiting in a crowded room. It is also valuable for older people or those with reduced mobility, for whom travelling is a significant effort, and for any fasting test: it is simpler to stay at home until the sample is taken than to drive across the city having eaten nothing since the previous evening.

Once the sample has been taken, it follows the laboratory's usual route. The results are sent to the prescribing doctor; the person who takes the blood at home does not interpret them and does not comment on what they mean — that reading is for the doctor alone.`,
    },
    "prise-de-sang-domicile/rabat": {
      intro:
        "Rabat runs on office hours: ministries, government departments and embassies close at fixed times, which leaves little room for a trip to a laboratory between two meetings. Having a nurse or a laboratory technician come to you means a blood test without taking half a day off.",
      body: `The principle is the same as at a laboratory: the professional travels with their equipment, takes the sample at your home in identical hygienic conditions, then carries it to an analysis laboratory for processing. That applies both to a set of tests prescribed by a doctor and to a routine check.

For people in Rabat, the value is above all flexibility of timing: a sample taken early in the morning, before leaving for work, avoids waiting for a laboratory to open or queuing during a lunch break. It is also appreciated for fasting tests, easier to organise at home than after a journey across the city, and for children or older people, for whom an appointment at a laboratory is more of a burden than a sample taken in the calm of home.

A sample taken at home then follows the same route as one taken at a laboratory: it is analysed, then the results are sent to the prescribing doctor. The person who comes to take the blood never interprets the results — that role belongs to the doctor alone.`,
    },
    "prise-de-sang-domicile/mohammedia": {
      intro:
        "At once an industrial city and a seaside resort, between Casablanca and Rabat, Mohammedia has many residents on unusual hours, particularly those working shifts in the city's factories and refinery. For them as for everyone, a nurse or a laboratory technician can come and take a blood sample at home.",
      body: `The principle is the same as at a laboratory: the professional travels with their equipment, takes the sample at your home, then carries it to an analysis laboratory. That covers both tests prescribed on a prescription and routine checks, and the sample is taken with the same single-use equipment as at a laboratory.

In Mohammedia this is particularly practical for people whose working hours do not match a laboratory's, and for families with children who would rather avoid waiting in a room. It also makes fasting tests easier: it is simpler to wait at home for the sample, before leaving for work, than to drive there having eaten nothing. It also suits residents of the districts near the beach, a little out of the way of the city-centre laboratories.

Once the sample has been taken, it follows the laboratory's usual route, and the results are sent to the prescribing doctor. The person who takes the blood at home never interprets the results — that step belongs to the doctor alone.`,
    },
    "prise-de-sang-domicile/bouskoura": {
      intro:
        "South of Casablanca, Bouskoura has changed in a few years: forest, golf courses and residential estates have drawn many families to districts still thin on local shops and laboratories. A nurse or a laboratory technician can come straight to you for a blood test.",
      body: `The sample is taken as it would be at a laboratory: the professional comes with their equipment, takes the blood at your home, then carries the sample to an analysis laboratory. That applies to tests prescribed on a prescription as much as to routine checks, and the equipment used and the hygienic conditions are the same as at a laboratory.

In Bouskoura this avoids a journey to a laboratory in Casablanca or a neighbouring district, a real advantage for families with young children living on the new estates. It also makes fasting blood tests easier, simpler to organise at home early in the morning than after a drive on an empty stomach, and it suits older people who are not very mobile. It also suits residents of the newest estates, where local shops and medical services are still limited.

Once taken, the sample follows the laboratory's usual route, and the results are then sent to the prescribing doctor. The person who takes the sample at home never comments on the results: that interpretation is for the doctor alone.`,
    },
    "prise-de-sang-domicile/dar-bouazza": {
      intro:
        "Along the coast west of Casablanca, Dar Bouazza has grown around villas and residences that are often scattered, far from the laboratories concentrated in the city. A nurse or a laboratory technician can travel there to take a blood sample at home.",
      body: `The principle is identical to that of a laboratory: the professional comes with their equipment, takes the sample at your home, then delivers it to an analysis laboratory. The service covers both tests prescribed by a doctor and routine checks, with the same hygiene rules as a sample taken at a laboratory.

In Dar Bouazza this avoids a journey to a laboratory in Casablanca, a real saving of time given how spread out the area is and how scattered the housing. It is particularly useful for families with children and for residents spending the weekend at their villa without having planned a round trip into the city, as well as for fasting blood tests, simpler to organise at home early in the morning. It avoids in particular a round trip to Casablanca purely for a sample, an awkward journey from villas that are sometimes well away from the main roads.

The sample then follows the laboratory's usual route, and the results are sent to the prescribing doctor. The person who comes to the home to take the blood never interprets those results; that reading remains the doctor's responsibility.`,
    },
    "ecg-domicile/casablanca": {
      intro:
        "Casablanca is the kingdom's economic capital, a sprawling city where getting from a residential district to a clinic in the centre can take an hour at peak times. For something as brief as an electrocardiogram, a doctor with a portable device can come straight to you, from Maarif to Sidi Moumen, without you having to face the traffic. The recording takes a few minutes, at your home.",
      body: `It works simply: the doctor places several electrodes on the chest, the wrists and the ankles, connected to a small device that records the heart's electrical activity for a short time. The test causes no pain, requires neither fasting nor any particular preparation, and is over in a few minutes, the time it takes the device to capture a complete trace.

In a city this size, many requests come from people for whom travelling is a real constraint: an older person living alone in a building with no lift, a patient convalescing after a hospital stay, or simply someone already under care for a heart condition whose cardiologist has asked for a regular check. Having the doctor come to them then avoids the journey and the wait at a clinic.

The trace is not read or discussed in detail on the spot, however: it is interpreted by a doctor, from a complete analysis of the trace, never by a quick explanation at the moment of recording, and never on this page.`,
    },
    "ecg-domicile/rabat": {
      intro:
        "Rabat is the country's administrative capital, a city of wide avenues where traffic generally flows better than in Casablanca, but where a round trip to a clinic is still an ordeal for someone with limited mobility. A doctor can record an electrocardiogram at your home, with a portable device, without you leaving your district. Whether you are in Hay Riad, L'Océan or a building in the centre, the principle is the same: the doctor travels, not you.",
      body: `The test always works the same way: electrodes are placed on the chest, the wrists and the ankles, then connected to a unit that records the heart's electrical activity for a few minutes. There is no needle and no pain, and no preparation is needed before the appointment. The whole thing is done lying down, on the patient's sofa or bed, with no need to settle into an equipped consulting room.

In Rabat the request often comes from retired people or civil servants under care for a heart condition, for whom a cardiologist has prescribed a regular check, or from families whose older relative finds it hard to get to a practice, whether in Agdal, Hassan or Yacoub El Mansour. Avoiding that journey also means avoiding a sometimes long wait in a clinic for a test that takes only a few minutes. For a patient followed closely, it also avoids rescheduling a journey for every check the cardiologist asks for.

The trace is not interpreted on the spot: a doctor analyses it afterwards, from the complete trace, never by an improvised reading at the time nor by this page.`,
    },
    "ecg-domicile/mohammedia": {
      intro:
        "Mohammedia is both an industrial city and a popular seaside resort, wedged between Casablanca and Rabat. For its residents, particularly those who find it hard to travel, a doctor can record an electrocardiogram at home, with a portable device, without anyone having to reach one of the two large neighbouring cities.",
      body: `The test consists of placing several electrodes on the chest, the wrists and the ankles, connected to a device that records the heart's electrical activity in a few minutes, with no pain and nothing invasive.

The request often comes from older people living near the Corniche or in the central residential districts, and from patients already under care for a heart condition for whom a regular check has been prescribed. An ECG at home spares them a journey to a clinic, in Mohammedia or in a neighbouring city.

The portable device runs on a battery and needs nothing installed at your home: the doctor works directly in your living room or bedroom, with all the equipment needed. The appointment is set when you call, for a test that rarely takes more than a few minutes once the doctor has arrived.

Once recorded, the trace is then interpreted by a doctor: neither the person placing the electrodes nor this page says anything about what it shows.`,
    },
    "ecg-domicile/bouskoura": {
      intro:
        "Bouskoura has turned in a few years into a spread-out residential area south of Casablanca, made of villa estates and new blocks often far apart. A doctor can travel there with a portable device to record an electrocardiogram at home, without you having to reach a clinic in Casablanca.",
      body: `The test works like any ECG at a practice: electrodes are placed on the chest, the wrists and the ankles, connected to a device that records the heart's electrical activity in a few minutes, with no pain and no fasting beforehand.

In such a spread-out area, where homes are sometimes far from the main roads, the request often comes from older people or patients under care for a heart condition, for whom travelling to a clinic is a real detour. Having the doctor come to them removes that journey.

The portable device runs on a battery, with nothing particular needing to be installed: the doctor works directly in your living room or bedroom, with all the equipment needed. The appointment is set when you call, which is particularly practical in an area this large where residences are sometimes hard to find first time, far from Casablanca's main roads.

The recorded trace is then interpreted by a doctor, never discussed in detail at the time nor on this page.`,
    },
    "ecg-domicile/dar-bouazza": {
      intro:
        "Dar Bouazza stretches along the coast west of Casablanca, between residential villas and areas still lightly built up, often a good distance from the city-centre clinics. A doctor can nonetheless travel there with a portable device to record an electrocardiogram at your home, without that journey.",
      body: `The principle is simple: electrodes are placed on the chest, the wrists and the ankles, connected to a unit that records the heart's electrical activity for a few minutes, with no pain and no particular preparation.

In Dar Bouazza the request often comes from residents living far from the main roads, from older people with limited mobility, or from patients under care for a heart condition for whom a regular check has been prescribed. An ECG at home spares them a journey to Casablanca or to a more distant clinic.

The device used for the test runs on a battery and needs nothing particular installed in your home: the doctor brings all the equipment needed and records it directly in your living room or bedroom. The appointment is arranged when you call, which avoids any journey at all, including from the newest and most spread-out residences in the area, far from the centre of Casablanca.

The trace is then interpreted by a doctor from a complete analysis, never explained on the spot nor set out on this page.`,
    },
  },
};
