import type { TranslationPart } from "../types";

/**
 * English situation pages (/en/{situation}).
 *
 * Same hard rule as the French: no medical advice. Symptoms only ever route
 * to "call a doctor" or to the emergency services, never to a threshold, a
 * checklist or anything a reader could use to assess themselves instead of
 * calling.
 */
export const situations: TranslationPart = {
  situations: {
    "medecin-de-garde": {
      title: "On-call doctor at home",
      shortDescription: "An on-call doctor who comes to you at night, at weekends and on public holidays.",
      intro:
        "An on-call doctor comes to your home in Casablanca and Rabat, at night, at weekends and on public holidays, in 10 to 15 minutes. The service runs 24/7, and the fee that applies is given on the phone before you confirm the visit.",
      body: `Looking for an on-call doctor almost always means looking for someone now. The practices are closed, the problem cannot wait until tomorrow morning without the night becoming very long, and the question is simple: who can see this person, and how soon.

**How to find an on-call doctor tonight**

To find an on-call doctor near you in Casablanca, Rabat, Mohammedia, Bouskoura or Dar Bouazza, there are three routes, and they answer different needs.

A hospital or clinic emergency department runs continuously, nights included. That is the right route when the situation is serious, and there should be no hesitation then: those departments have equipment and resuscitation facilities no home visit replaces. The cost is the journey and the wait, which depends on how busy they are.

An on-call pharmacy solves a different problem: getting a medicine outside opening hours. The rota is displayed in pharmacies and published locally. Useful when you already know what is needed, it does not replace an examination: a pharmacist cannot examine the patient, write a prescription or issue a certificate.

An on-call doctor who travels answers the case where travelling is itself the problem. A child's temperature climbing, pain that stops someone sleeping, an older person who can no longer get around, repeated vomiting: the consultation takes twenty minutes, but dressing the patient, getting them downstairs, crossing the city and waiting takes three hours. It is that journey the visit removes.

**GP or emergency physician: what is the difference?**

An on-call GP handles the great majority of reasons people call at night, exactly as they would at a practice: they ask, they examine, they decide.

An emergency physician specialises in the rapid assessment of an acute situation: working out, with the person in front of them, what can be treated on the spot and what must be referred to a hospital without delay. That is precisely the judgement an opinion over the phone cannot provide.

The team includes both, and you do not have to choose: you describe the situation on the phone, and the doctor sent is the one who matches. Every on-call doctor who travels is named on this site, each with their registration number at the Ordre National des Médecins — a public number you can check before opening your door to someone in the middle of the night.

**From what time does "on call" apply?**

The service runs 24 hours a day, 7 days a week: there is no hour at which nobody answers, and no closing day.

What changes with the hour is the fee. Daytime runs from 07:00 to 20:00, Saturday and Sunday included — a weekend is not charged differently from a Tuesday. The night fee applies from 20:00 to 07:00, and on public holidays.

**How much does an on-call doctor at home cost?**

500 dirhams during the day and at weekends, 700 dirhams at night and on public holidays. Those amounts are published here, available before you even call, and the fee that applies is confirmed on the phone before you approve the visit.

Publishing these amounts is still unusual in this sector in Morocco, where the habit is to refer people to a call. We do the opposite for a simple reason: someone looking for a doctor at two in the morning should not have to negotiate, or discover the sum once the doctor is on the doorstep.

**What to have ready before you call**

You describe the situation: who is unwell, since when, what you have noticed. You are told in return the expected delay and the fee that applies, before you confirm anything.

Give the full address, the floor, the door code if there is one, and a number you can be called back on. It sounds minor; it is in fact what separates a doctor who arrives from a doctor searching for a building at two in the morning, in a street whose numbers cannot be read at night. If someone can come down to open the door or wait at the entrance of the residence, say so too. The doctor calls back before arriving to confirm access.

On site, the examination is complete. Depending on what the doctor finds, they give a treatment, write a prescription, issue a certificate, or refer for further tests or to a hospital department. The decision is theirs, with the person in front of them.

**What an on-call home visit does not replace**

This is not a service for life-threatening emergencies. Severe chest pain, difficulty breathing, loss of consciousness, heavy bleeding or the aftermath of an accident are matters for the emergency services, which have resuscitation equipment and priority on the road. In those situations, call them directly rather than waiting for a visit.

An on-call home visit is for what cannot wait until tomorrow. Not for what cannot wait ten minutes.`,
    },
    "fievre-enfant-nuit": {
      title: "A child's fever at night",
      shortDescription: "Have a doctor come to your home to examine a feverish child, at night.",
      intro:
        "A fever climbing in a child in the middle of the night worries any parent, especially far from practice hours. A GP or a paediatrician can come to your home to examine them on the spot, that same night, without waiting for the morning.",
      body: `Fever is one of the most frequent reasons people call at night, and one of the hardest to judge without a medical opinion: the same number on the thermometer can be unremarkable in a child who is playing and worrying in a child who is listless. Rather than searching for an answer online at 3am, a doctor can come and examine them at home and tell you, having seen them, what the situation is.

Having a doctor come at night avoids a trip to an emergency department with a tired child and a busy waiting room. The doctor listens to the child's chest, examines them and can prescribe a treatment immediately if needed; they can also tell you where the nearest on-call pharmacy is.

After your call, the person who answers asks the child's age, the address and a few general details, then tells you how long before the doctor arrives. That time is given before you confirm the visit, as is the night fee, so that you can decide knowing both.

The doctor who comes is a GP or a paediatrician, depending on who is available when you call, and is always registered with the Ordre National des Médecins. Once there, they examine the child, ask the parents their questions and decide themselves what should happen next: treatment on the spot, a prescription, or referral to a hospital department if the examination calls for it.

A home visit is not the right answer in every situation, though. If your child's condition worries you a great deal or seems to be getting worse quickly, the safest thing is to contact the emergency services directly rather than waiting for a doctor to arrive. When in doubt, call: the person who answers can help you judge whether a home visit is suitable or whether going to an emergency department is better.

A child's fever at night is one of the most common reasons people call this service, alongside coughs, earache and vomiting. It affects infants as much as older children, and the worry it causes does not always match how serious it is — which is exactly why an examination in person is worth something.

The service runs 24/7, all year round, weekends and public holidays included, in every city our network of doctors covers — the exact arrival time depends on your city and your neighbourhood.`,
    },
    "certificat-medical": {
      title: "Medical certificate at home",
      shortDescription: "Obtain a medical certificate issued by a doctor during a home visit.",
      intro:
        "A medical certificate is obtained from a doctor after a clinical examination, and that doctor can come to you to carry it out rather than making you wait for an appointment at a practice. The certificate is written on the spot once the examination is over, or sent in the hours that follow depending on the type of document requested.",
      body: `A medical certificate is never issued lightly: it attests to a state of health observed by a doctor at the time of the examination, and it is that examination which makes it a valid document. Having a doctor come to you means obtaining that record without travelling, which matters particularly when the person concerned is precisely the one who finds travelling hard.

It works the same way as at a practice: the doctor arrives, carries out the necessary clinical examination, asks their questions, then writes the certificate corresponding to what they have observed. Depending on the reason, the document may be handed over at the end of the visit or sent a little later in the day. In every case, the doctor alone decides what the certificate says, based on what they observe during the examination — never beforehand, and never on the basis of a description over the phone.

The reasons for wanting a doctor for a medical certificate are varied: a certificate of no contraindication for a sport, a certificate for returning to work or for sick leave, a document requested by a school, an insurance company or an employer as part of an administrative process. Each situation has its own requirements as to the form or content expected, and it is for the doctor, on site, to judge what they can attest to in the light of their examination — this service is not a substitute for legal or administrative advice on whether a document will be accepted for a given process.

After the call, the person who answers takes the general reason for the request, the address and when you are available, then tells you how long before the doctor arrives and the fee that applies, before you confirm the visit. The doctor who comes is a GP registered with the Ordre National des Médecins, as for any home consultation in our network.

The service is for anyone who needs a documented medical opinion without being able to get to a practice easily: people with reduced mobility, older people, those convalescing, or simply schedules that make a conventional appointment hard to fit in. If what you need is a very specific document and you are not sure it can be issued during a home visit, the simplest thing is to say so on the call: the person who answers can point you to the most suitable solution.

As with any visit in our network, the doctor who comes to issue a certificate can be identified: their name and registration number at the Ordre National des Médecins are on the Our doctors page, and the certificate they write carries their signature. Keep a copy of the document for your own records, as well as the copy given to the organisation it is for — that avoids having to ask for another visit if the document is lost.

**Is a medical certificate without a consultation possible?**

No, and it is better to say so plainly. A medical certificate is a document in which a doctor attests to what they have personally observed. Without an examination there is nothing to attest to: the doctor could only copy out a statement, which is not a certificate but a false attestation. That is a serious breach for a doctor on the register, and a worthless document for whoever presents it — an employer, an administration or a sports federation that discovers no examination took place sets the document aside, and the whole process has to be done again.

No doctor in this network issues a certificate remotely, and if that is what you are looking for, better to know before calling than when the doctor arrives.

What the request almost always means, though, is something else: not having the time or the means to go to a practice, or to wait half a day in a waiting room for a document. That is exactly what a home visit answers. The examination does take place, it takes place at your home, and the certificate is handed over at the end of the consultation. The document is proper, signed and valid — it causes nobody any difficulty because there is nothing to hide about how it was issued.

**Hospital certificates and follow-up documents**

A hospital certificate attests to a stay in a health facility: dates, department, sometimes the reason depending on what the patient allows to be mentioned. It is asked for by an employer, a benefits body, an insurance company or an administration.

That document is issued by the facility where the stay took place, and by it alone: it holds the record and can attest to the dates. A doctor coming to your home cannot certify a hospital stay they took no part in. If that is the document you need, the place to go is the admissions or records office of the facility concerned.

What a home visit can produce, on the other hand, is what the doctor observes at your home after that stay: a follow-up certificate, an extension of sick leave if your condition justifies it, a convalescence statement, a fitness-to-return certificate. Those are different documents from a hospital certificate, and they need an examination, not a file.

If you are not sure which document you are being asked for, the most effective thing is to read out, on the phone, the exact sentence on the letter or form you received. The wording used by the organisation is almost always enough to identify the document expected, and avoids a visit for a paper that will not do.

**How much does a medical certificate at home cost?**

The certificate is not billed as a separate document: it is issued at the end of a consultation, since it is the examination that gives it its value. So it is the home consultation fee that applies, and it is published on this site rather than quoted case by case.

500 dirhams during the day and at weekends, between 07:00 and 20:00, Saturday and Sunday included. 700 dirhams at night, between 20:00 and 07:00, and on public holidays. The exact amount that applies to your request is confirmed on the phone before you approve the visit, so that nothing is discovered at the door.

Publishing these amounts is still unusual in this sector in Morocco, where the habit is to refer people to a call. For an administrative document you need the same day, knowing in advance what you will pay is part of the answer to the question.

**Where can a medical certificate be issued?**

There are three possibilities, and the best one depends mostly on your situation.

A GP's practice is the most common route. It means getting an appointment, travelling and waiting — which is fine when the document is not urgent and you are mobile.

A public health centre is the least expensive option, with waiting times and hours that depend on the centre and how busy it is that day.

A home visit is the third, and it answers a specific case: when travelling is precisely the problem. An older person, someone with reduced mobility, a patient convalescing, a lone parent with children, or simply a working day that cannot be interrupted for half a day for a piece of paper. The doctor comes, the examination takes place at your home, and the document is handed over on the spot.

In all three cases the certificate has the same value: what counts is that a doctor registered with the Ordre National des Médecins examined the person and signs what they observed. It is not the place of the examination that makes a certificate acceptable.

One useful caveat: some documents do not come under a general consultation. A certificate required for high-level competitive sport, an assessment requested by an insurer, or a document only a hospital department can issue fall outside this. Again, reading the exact sentence from the form on the phone lets us tell you straight away whether a home visit answers your need, or whether the process lies elsewhere.`,
    },
    "contre-visite-medicale": {
      title: "Employer-requested medical check",
      shortDescription: "A home medical check requested by an employer during sick leave.",
      intro:
        "An employer-requested medical check is a home visit asked for by an employer so that an independent doctor can verify sick leave that is under way. The doctor travels to the employee's home, carries out an examination and passes on their conclusions in the manner provided for, without the visit being experienced as a confrontation. It follows precise rules, explained from the first call, so that the process stays professional on both sides.",
      body: `This kind of check answers a clearly identified need: an employer who is paying all or part of a salary during sick leave may, within the framework the regulations provide, have a doctor verify that the leave is medically justified and being observed. That doctor is independent of the company and of the doctor who issued the original leave; their role is strictly limited to the medical examination, not to any assessment of the employee's work record.

In practice, the doctor presents themselves at the address given on the sick-leave certificate, during the hours when the employee is supposed to be at home under the rules that apply to their leave. They carry out a clinical examination related to the reason for the leave, in the same conditions of confidentiality as an ordinary consultation. The visit is factual and respectful: the doctor is neither judge nor party, they record a state of health at a given moment.

At the end of the examination, the doctor passes their conclusions to the employer in the format the procedure requires, without setting out to the employee what will be communicated beyond what the regulations impose. This service gives no opinion on the contractual or salary consequences of such a check — for any question of employment law, employer and employee alike should refer to a legal professional or to the applicable texts, which is not the role of the doctor who travels.

For the employer, the service offers a way to have that verification carried out by an outside doctor, in an organised framework rather than in a hurry. For the employee, the visit takes place like any other home medical examination: the doctor explains why they are there, carries out the examination and leaves, without that changing the nature of the leave as long as nothing has been recorded to that effect.

After the initial request, the person who answers gathers the necessary information — address, general reason for the request, contact details — then gives the time before the doctor's visit and the fee that applies. The doctor who travels is a GP registered with the Ordre National des Médecins, as for any other visit in our network.

This kind of visit stays a one-off: it is not part of regular medical follow-up of the employee, and the doctor who carries it out is not there to become their regular doctor or to comment on what happens next. Whether or not the examination confirms what the original certificate said, the rest of the procedure is then a matter for the employer and, where relevant, the competent bodies — the doctor's role ends with the clinical record made during the visit.`,
    },
    "suivi-post-hospitalisation": {
      title: "Follow-up after a hospital stay",
      shortDescription: "Medical follow-up at home after discharge from hospital.",
      intro:
        "After a hospital discharge, a doctor can come and take stock at home: check a wound, review the medicines prescribed, assess how recovery is going. This visit is added to the instructions the hospital team gave; it does not replace them.",
      body: `Leaving hospital is often the moment when medical follow-up loosens a little: the patient goes home with a prescription, a few instructions and sometimes a check-up appointment set several weeks later. In between, a doubt can arise — a wound that worries them, a question about a medicine, tiredness that does not ease — without it always being simple to get back in touch quickly with the hospital department. A GP can then come to the home and take stock.

The visit can cover several things depending on the situation: examining the wound or the scar if the stay followed an operation, going back over the discharge prescription to make sure the treatment is understood and being followed, taking basic vital signs, or simply a general assessment of the patient a few days after coming home. The doctor works from the discharge report if the patient can show it, which helps place the visit in the continuity of their care.

This follow-up is a complement, not a substitute: it replaces neither the check-up appointments scheduled by the hospital department or the specialist in charge, nor a return to hospital if that is what the patient was explicitly told to do in the event of a particular sign. The doctor who comes takes that into account and may, depending on what they find, advise getting back in touch with the hospital team or the specialist rather than handling the situation alone at home.

The service is above all for patients who have just left hospital and for whom getting to a practice quickly is difficult: a still-fragile convalescence, reduced mobility, post-operative tiredness, or simply no transport available in the first few days. It applies as much after surgery as after a stay for a medical condition.

After the call, the person who answers takes the reason for the hospital stay, the address and when you are available, then gives the time before the doctor arrives and the fee that applies, given before the visit is confirmed. The doctor who comes is a GP registered with the Ordre National des Médecins.

The visit can be asked for by the patient on returning home, or by a relative who is with them in the first days after discharge and would rather have a medical opinion than rely only on the written instructions. Depending on what the doctor finds at that first visit, they may suggest another a few days later if the situation calls for it, or conclude that a single visit is enough to settle the doubt — the decision is theirs, case by case, once the examination is done.`,
    },
    "prise-de-sang-domicile": {
      title: "Blood test at home",
      shortDescription: "A blood sample taken at home by a health professional.",
      intro:
        "A blood test at home is carried out by a health professional who comes to you with the necessary equipment, then takes the sample to an analysis laboratory. The results then follow the laboratory's usual route, sent by the laboratory itself.",
      body: `Taking a sample at home follows the same principle as at a laboratory: a qualified health professional — a nurse or a laboratory technician, depending on how it is organised — takes the blood with single-use equipment, in the same hygienic conditions as in a collection room. The sample is then labelled and taken to a partner analysis laboratory, where it is handled like any sample received over the counter.

The reasons for choosing a sample at home rather than a trip to a laboratory are practical: an older person or someone with reduced mobility for whom travelling is hard, a child who is very apprehensive about a laboratory, a person confined to bed while convalescing, or simply a schedule that makes it difficult to fit in a visit during opening hours. The professional who travels can also take the sample at the time that suits best, which matters for tests that must be done fasting, early in the morning.

The appointment is prepared like a conventional sample: depending on the tests requested, you may need to be fasting or to follow a particular preparation, which the person who answers your call will tell you about if your prescription mentions it. On the day, the professional checks your identity and the prescription, takes the sample, then leaves with it to deliver it to the laboratory.

One important point: the person who takes the sample at home does not read or interpret the results on the spot. Their role stops at the technical act of taking the sample and delivering it in good conditions. The results are then produced and sent by the laboratory according to its own timescales and its own route — handed over directly, posted to a secure online account, or sent to the prescribing doctor, depending on what was agreed with the laboratory. For any question about what the results mean, it is the prescribing doctor to ask, not the professional who came to take the sample.

After the call, the person who answers takes the tests requested, the address and when you are available, then tells you how long before the professional arrives and the fee that applies, before the appointment is confirmed.

The service covers both a routine set of tests prescribed as part of ordinary follow-up and a one-off check requested after a consultation. In every case a prescription from the prescribing doctor is needed to say which tests are to be done: the professional who travels takes the sample requested, they do not decide themselves what is tested or what it means. For families with young children, taking the sample in familiar surroundings often reduces the apprehension around it, which can make the procedure itself easier.`,
    },
    "ecg-domicile": {
      title: "ECG at home",
      shortDescription: "An electrocardiogram recorded at home.",
      intro:
        "An electrocardiogram (ECG) can be recorded at home by a doctor, with a portable device that records the heart's electrical activity in a few minutes, without a trip to a practice or a clinic. The trace is then interpreted by a doctor, not read out or explained in detail on the spot.",
      body: `An ECG at home works like any standard electrocardiogram: the doctor places several electrodes on the chest, the wrists and the ankles, connected to a portable device that records the heart's electrical activity for a short time, with no pain and no particular preparation. The test takes a few minutes and requires neither fasting nor any invasive procedure.

It is useful in several situations: regular cardiac follow-up for someone already known to have a heart condition, a check requested by a cardiologist as part of ongoing care, or simply a general assessment for someone for whom travelling to a practice or clinic is a real difficulty — reduced mobility, advanced age, a recent hospital discharge. Having the ECG done at home avoids the wait and the journey, while producing the same trace as a device in a practice.

One essential point about this test: the trace is neither read nor commented on in detail on the spot as it is recorded. It is a doctor — the one carrying out the test or, depending on how it is organised, the cardiologist the trace is sent to — who interprets the results from their analysis of the complete trace, set against the patient's history. That interpretation calls for specialist medical reading; it is not done by a quick glance at the device or an improvised explanation at the time.

Depending on the situation, the trace may be given to the patient to pass on to their cardiologist or regular doctor, or analysed and discussed directly by the doctor who carried out the test at home if that is within their competence. In every case the results follow a defined medical route, and any question about what the trace shows should be put to the doctor responsible for interpreting it, never worked out alone from the trace.

After the call, the person who answers takes the reason for the request, the address and when you are available, then tells you how long before the doctor arrives and the fee that applies, before the appointment is confirmed. The doctor who comes for this test is registered with the Ordre National des Médecins, as for any visit in our network.

The device used at home is the same kind of equipment as in a medical practice, not a consumer connected gadget meant for self-monitoring. For a patient already under cardiology care, an ECG at home can also be part of a series of regular checks asked for by the specialist as part of long-term follow-up, without each of those checks requiring a trip to a clinic.`,
    },
  },
};
