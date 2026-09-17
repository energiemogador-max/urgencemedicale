import type { TranslationPart } from "../types";

/** English specialty hub pages (/en/{specialty}-a-domicile). */
export const specialties: TranslationPart = {
  specialties: {
    generaliste: {
      name: "General practitioner",
      shortDescription: "Home consultation for any everyday condition, by appointment or urgently.",
      intro:
        "The general practitioner is the doctor most often asked for on a home visit: they handle the great majority of everyday reasons to see a doctor, from a fever in an adult to a small wound that needs cleaning, by way of renewing a prescription. They come to you with the same standard of examination as in a practice, without the wait of a waiting room.",
      body: `Calling a general practitioner to your home is the usual answer for anyone who feels unwell without the situation calling for an emergency department: an adult with a fever who has no strength to travel, a parent who would rather not take a sick child out, someone laid up after a small injury, or simply someone with no time for an appointment at a practice. It is the first reflex behind the great majority of calls this service receives.

A home consultation follows the same steps as one in a practice: the questions, a full clinical examination (blood pressure, listening to the chest, temperature, palpation depending on the reason), then a diagnosis and, if needed, a prescription. The GP can also carry out simple procedures on the spot, such as cleaning and dressing a small wound, and can refer you for further tests or a specialist opinion when the situation calls for it.

The most frequent reasons for a home visit in general medicine are fever, flu and viral infections, abdominal or back pain, small wounds and bruises, renewing a prescription for a long-term treatment, and general health checks or routine medical certificates. The GP is also the natural way into the other specialties in the service: depending on what the examination shows, they may recommend a consultation with a paediatrician, a geriatrician or a cardiologist.

Every GP who makes home visits is registered with the Ordre National des Médecins; their name and registration number are on the Our doctors page. The fee for the consultation is given before the appointment is confirmed, as is the expected time before the doctor arrives, so that you can decide knowing both.

You do not need to be registered with a regular doctor to use this service: whether or not you have a usual GP, every visit is a full consultation, with a written report you can keep or pass on to your regular doctor if you have one.

This service does not replace emergency care for a life-threatening situation. If there is any sign of a serious emergency — sudden intense pain, loss of consciousness, difficulty breathing — call the emergency services directly rather than waiting for a home visit.`,
    },
    pediatre: {
      name: "Paediatrician",
      shortDescription: "Home consultation for infants, children and adolescents.",
      intro:
        "A paediatrician can examine your child at home, without the wait of a waiting room or the stress of a journey when they are feeling unwell. The consultation takes place in the child's familiar surroundings, which often makes the examination easier.",
      body: `Having a paediatrician come to your home means a feverish, tired or fretful child can be examined without a journey or a wait in a crowded room, which matters particularly for toddlers and infants. The doctor sees the child in their usual setting, which often brings out more natural behaviour than a practice does and makes the clinical examination easier.

A home consultation covers the same procedures as a standard paediatric consultation: listening to the chest, taking the temperature, examining the ears, nose and throat, assessing the child's general condition and, if needed, referral for further tests or to an emergency department. The paediatrician can also answer parents' questions about growth monitoring, vaccination or a long-term condition already being followed.

The most frequent reasons for a paediatric home visit are fever, cough, earache, skin rashes and follow-up after coming home from the maternity unit. In each case the doctor's aim is the same: to examine the child, reach a diagnosis and, if necessary, prescribe a treatment or refer to a specialist or a hospital department.

Every paediatrician who makes home visits is registered with the Ordre National des Médecins; their name and registration number are shown on the Our doctors page. After the call, the time before the doctor arrives is given straight away, and the fee is given before the appointment is confirmed — never after the visit.

The service is as much for families who do not yet have a regular paediatrician as for those whose usual paediatrician is not available right away. You do not need to have seen a paediatrician before to use it: every visit is a full consultation, with a written report you can pass on to your child's usual paediatrician if you have one.

This service does not replace emergency care for a life-threatening situation: in the event of breathing difficulty, loss of consciousness or a seizure, contact the emergency services directly.`,
    },
    geriatre: {
      name: "Geriatrician",
      shortDescription: "Home consultation and follow-up suited to the needs of older people.",
      intro:
        "A geriatrician can travel to an older person's home for a consultation or follow-up suited to them, without imposing a journey or a wait that can be hard going when moving around is difficult. The examination takes place in familiar surroundings and at a suitable pace, and is as complete as one in a practice.",
      body: `A home visit makes particular sense for older people, for whom travelling to a practice can be a real difficulty: arthritis, the after-effects of a stroke, breathlessness on exertion, or simply the tiredness that comes with age. It is as much for someone living alone as for someone supported by family or a carer, and it removes the need to arrange transport and wait in a shared room.

The geriatrician carries out a full clinical examination and takes the time for a thorough conversation, which is often harder to fit into a short consultation at a practice. They assess general condition, independence in everyday tasks, balance and the risk of falls, and can review all current treatments with the person and, if they wish, with those around them.

The most frequent reasons for a visit are follow-up of an already diagnosed long-term condition (high blood pressure, diabetes or heart failure, for example), reviewing a prescription that includes several medicines, a recent loss of independence, difficulty moving that has become too great for a journey to a practice, or follow-up after a hospital stay. The geriatrician can also refer for a cardiology opinion or to hospital care when the examination calls for it.

Every geriatrician who makes home visits is registered with the Ordre National des Médecins, and their registration number is shown on the Our doctors page. The fee and the time before the doctor arrives are given before the visit is confirmed.

You do not need to have seen a geriatrician before to use this service, whether for a first assessment or for one-off follow-up while the usual doctor is away. A written report of the consultation can be passed on to the family or to the regular doctor, with the agreement of the person examined.

This service does not replace emergency care for a life-threatening situation: in the event of a sudden collapse, loss of consciousness or any sign that suggests a serious emergency, contact the emergency services directly.`,
    },
    cardiologue: {
      name: "Cardiologist",
      shortDescription: "Cardiology consultation and follow-up at home, including an ECG.",
      intro:
        "A cardiologist can come to your home for a consultation or follow-up, including recording an electrocardiogram on the spot. That spares a journey to a practice or clinic for people with reduced mobility or whose heart condition makes travelling hard.",
      body: `Recording an ECG at home is particularly useful for people who find it hard to travel, or for whom a journey is an effort best avoided: the person stays lying on their own bed or sofa, without the wait of a practice or a laboratory. The test is done with the same kind of equipment and to the same protocol as in a practice.

A cardiology consultation at home includes questions about medical history and current treatment, a clinical examination (listening to the heart and lungs, taking blood pressure) and, if the doctor judges it useful, an electrocardiogram recorded on the spot. The cardiologist reads the trace and, if necessary, adjusts the current treatment or refers for further tests.

The most frequent reasons are follow-up of a known heart condition, checking a treatment after a recent change, an assessment before or after a hospital stay, or a request for an ECG at home made by another doctor as part of ongoing care. The cardiologist can also step in alongside a consultation with the service's GP or geriatrician, when a specialist opinion is needed.

This kind of consultation is particularly for people for whom travelling is a significant constraint: difficulty getting into a vehicle, breathlessness on exertion, or simply tiredness related to age or a recent hospital stay. Seeing the cardiologist at home means having the test done in good conditions, without the sequence of a journey and then a wait that can be an effort in itself for some patients.

Every cardiologist who makes home visits is registered with the Ordre National des Médecins, with a registration number you can look up on the Our doctors page. The fee for the consultation, including the ECG when one is recorded, is given before the appointment is confirmed.

You do not need to be under the care of a cardiologist already to use this service. The written report of the consultation, and the ECG trace if one was recorded, can be passed on to the usual cardiologist or regular doctor, so that care continues.

This service does not replace emergency care for a life-threatening situation: if there is any sign that suggests a cardiac emergency, contact the emergency services directly rather than waiting for a home visit.`,
    },
    urgentiste: {
      name: "Emergency physician",
      shortDescription: "Home visit for situations that need to be dealt with quickly.",
      intro:
        "An emergency physician can come to your home quickly when a situation needs a medical assessment without delay but is not a life-threatening emergency that calls for the emergency services. In a life-threatening emergency — loss of consciousness, difficulty breathing or heavy bleeding, for example — call the emergency services directly rather than this service.",
      body: `This service is in no way a replacement for calling the emergency services when life is at risk. Faced with loss of consciousness, severe breathing difficulty, bleeding that will not stop or any other sign of immediate danger, the priority is to call the emergency services, who can send an ambulance and begin care on the way to a hospital department. An emergency physician at home suits different situations: care that is needed quickly, but without that immediate danger.

An emergency physician is trained in the rapid assessment of a clinical situation and in making decisions under time pressure. At home, they can examine someone whose condition has deteriorated over a few hours, judge how serious a worrying symptom really is, carry out the first necessary treatment, and decide on the spot whether to refer to a hospital department or whether care at home is enough.

The most frequent situations are intense pain that has come on recently, a high fever that will not come down, a fall that makes moving around difficult, an unusual reaction after taking a medicine, or more generally any situation where a family is torn between waiting, going to an emergency department and calling a doctor. When in doubt, calling remains the best option: the person who answers can help point you either to a home visit or to the emergency services, depending on what is described.

Every emergency physician who makes home visits is registered with the Ordre National des Médecins, with a registration number shown on the Our doctors page. The fee and the time before the doctor arrives are given before the visit is confirmed, so that you can decide knowing both — including deciding to go to an emergency department instead if the situation calls for it.

You do not need a regular doctor, or to have used this service before, to ask for an emergency physician at home. After the examination, the doctor decides what happens next: treatment on the spot, referral to a specialist, or transfer to a hospital department if they judge it necessary — the final decision always rests with the doctor who is there, never with the person who takes the call.`,
    },
  },
};
