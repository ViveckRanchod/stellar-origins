---
source: "[[Site flow.canvas]]"
status: draft
---

# Stellar Origins – Site Content Template

> Built from [[Site flow.canvas]] (source of truth). Fill in every `…` / empty cell. Page order below matches the flow arrows.

**Flow at a glance**
	Landing → Account create → **[Character build activity]** Character build → Customise character → Future question → Intermission 1 → **[Culture fit activity]** 20 quiz questions → Results → Intermission 2 → *Hit next* → Assigned disruption (1 of 4) → **[Disruption activity]** Answer a few questions → Chat to your friends → More questions (with group) → *Submit* → Final screen

---

## 1. Landing page

- **Page title:** …
- **"Welcome to" heading:** Welcome to …
- **Quote:** "…"
- **Quote attribution:** …
- **Button label (→ Account create):** …

---

## 2. Account create

- **Page title:** …
- **Intro text:** …

| Field | Label | Placeholder | Help / error text |
|---|---|---|---|
| Email | | | |
| Name | | | |
| Surname | | | |
| Password | | | |

- **Privacy notice text:**
  > …
- **Privacy consent checkbox label:** …
- **Button label (→ Character build):** …

---

# Activity 1 – Character build

> ⚠️ All choices in this activity **require** a justification textbox.

- **Activity name shown to user:** …
- **Activity intro (optional):** …

## 3. Character build – choose your avatar

- **Page title:** …
- **Instruction text:** Choose an avatar from the 5 below…

| # | Avatar name | Description | Image file |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |

- **Justification prompt (required):** Why did you choose this avatar? …
- **Justification placeholder:** …
- **Button label (→ Customise character):** …

## 4. Customise character

- **Page title:** …
- **Instruction text:** Choose none, one or two of the 8 options…

| # | Option name | Description | Image file |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |
| 7 | | | |
| 8 | | | |

- **Selection rule:** min 0, max 2
- **Justification prompt (required):** …
- **Justification placeholder:** …
- **Button label (→ Future question):** …

## 5. Where are you heading for the future?

- **Page title:** …
- **Question text:** …
- **Answer placeholder:** …
- **Optional hint text:** (this question is optional) …
- **Justification prompt:** … *(canvas says all choices in this activity need one — confirm whether an optional question still needs it)*
- **Skip / button label (→ Intermission 1):** …

---

## 6. Intermission page 1

- **Page title:** …
- **Message – the next activity shows where you would fit:** …
- **Message – what you're about to do next:** …
- **Message – it's a 20-question quiz:** …
- **Button label (→ Question 1):** …

---

# Activity 2 – Choose your culture fit

- **Activity name shown to user:** …

## 7. Quiz questions (20 pages)

> One page per question. Each answer is linked to a galaxy (FK to the galaxy table). Answer order is **randomised** on screen, so write them in any order.

- **Progress label format:** e.g. "Question {n} of 20" …
- **Button label (next question):** …
- **Button label (last question → Results):** …

### Q1
**Question:** …

| #   | Answer text | Galaxy | galaxy_id (FK) |
| --- | ----------- | ------ | -------------- |
| 1   |             | A      |                |
| 2   |             | B      |                |
| 3   |             | C      |                |
| 4   |             | D      |                |

### Q2
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q3
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q4
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q5
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q6
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q7
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q8
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q9
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q10
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q11
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q12
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q13
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q14
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q15
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q16
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q17
**Question:** …

| #   | Answer text | Galaxy | galaxy_id (FK) |
| --- | ----------- | ------ | -------------- |
| 1   |             | A      |                |
| 2   |             | B      |                |
| 3   |             | C      |                |
| 4   |             | D      |                |

### Q18
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q19
**Question:** …

| # | Answer text | Galaxy | galaxy_id (FK) |
|---|---|---|---|
| 1 | | A | |
| 2 | | B | |
| 3 | | C | |
| 4 | | D | |

### Q20
**Question:** …

| #   | Answer text | Galaxy | galaxy_id (FK) |
| --- | ----------- | ------ | -------------- |
| 1   |             | A      |                |
| 2   |             | B      |                |
| 3   |             | C      |                |
| 4   |             | D      |                |

## 8. Results

- **Page title:** …
- **Intro text:** …
- **Display rule:** percentage per galaxy; show **all** galaxy profiles, ordered highest % first.
- **Percentage label format:** e.g. "Galaxy A – {x}%" …
- **Button label (→ Intermission 2):** …

### Galaxy profiles

> The canvas shows 4 profiles (labelled A, B, C, C — assumed to be A, B, C, **D**; confirm).

#### Galaxy A
- **galaxy_id (DB):** 1
- **Name:** …
- **Tagline:** …
- **Profile description:** …
- **Image:** …

#### Galaxy B
- **galaxy_id (DB):*2
- **Name:** …
- **Tagline:** …
- **Profile description:** …
- **Image:** …

#### Galaxy C
- **galaxy_id (DB):** …
- **Name:** …
- **Tagline:** …
- **Profile description:** …
- **Image:** …

#### Galaxy D
- **galaxy_id (DB):** …
- **Name:** …
- **Tagline:** …
- **Profile description:** …
- **Image:** …

---

## 9. Intermission page 2

- **Page title:** …
- **Message – you are going to be assigned a disruption:** …
- **Button label ("Hit next" → assigned disruption):** …

---

## 10. Disruption pages (user sees 1 of 4)

> Disruptions are a fixed stack: once assigned to a user they're marked "used", with even distribution across users.

#### Disruption 1
- **Name:** …
- **Description / scenario:** …
- **Image:** …
- **Button label (→ Answer a few questions):** …

#### Disruption 2
- **Name:** …
- **Description / scenario:** …
- **Image:** …
- **Button label:** …

#### Disruption 3
- **Name:** …
- **Description / scenario:** …
- **Image:** …
- **Button label:** …

#### Disruption 4
- **Name:** …
- **Description / scenario:** …
- **Image:** …
- **Button label:** …

---

# Activity 3 – Disruption

- **Activity name shown to user:** …

## 11. Answer a few questions

- **Page title:** …
- **Intro text:** …
- **Same questions for every disruption, or per disruption?** …

| # | Question | Answer type (text / choice / scale) | Options (if choice) |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

- **Button label (→ Chat to your friends):** …

## 12. Chat to your friends

- **Page title:** …
- **Instruction text:** …
- **Discussion prompts:**
  1. …
  2. …
  3. …
- **Suggested time (if any):** …
- **Button label (→ More questions):** …

## 13. More questions (with group)

- **Page title:** …
- **Intro text:** …

| # | Question | Answer type (text / choice / scale) | Options (if choice) |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

- **Button label:** Submit …

---

## 14. Final screen

- **Page title:** …
- **Thank-you message:** Thanks for participating! …
- **Results email notice:** Check your inbox for the results …
- **Closing line / CTA (optional):** …

### Results email (sent after Submit)
- **Subject line:** …
- **Body:** …
