# The OCHF website, page by page

What is on each page, and where the words and pictures come from. Written for
whoever next has to change something — a developer joining, or OCHF deciding what
they can edit themselves.

Live at **ojerinkporofoundation.com**. Staging copy at
**preview.ojerinkporofoundation.com**.

## How content reaches the page

Two sources, and knowing which is which decides who can change a thing.

**The CMS (Sanity).** Edited at `/admin` or in Sanity Studio, and live within
seconds of publishing. Nine types: site details, impact figures, stories,
programmes, photographs, people, partners, questions, milestones.

**The code.** Fixed institutional copy that rarely moves — About, Support,
Governance, and the section headings throughout. Changing these needs a
developer and a deploy.

Where a page draws on both, the table below says so. Every page also falls back to
a copy held in the code if the CMS cannot be reached, so the site never renders
empty — but then nothing OCHF edits will show, which is the failure worth knowing
about.

---

## Navigation

**Header:** About · Our Work · Partners · Contact, with *Partner With Us* as the
single button. About and Our Work open mega-panels listing their sub-pages.

**Footer:** five quick links (About, Our Work, Impact & Stories, Partner With Us,
Contact), the three pillars, contact details and the registration line.

Every page ends with exactly one call to action. That is deliberate: the launch
brief asks for one per page, and page endings had grown into a second navigation
menu.

---

## Home — `/`

| Section | Content | Source |
|---|---|---|
| Hero | "INVESTING IN PEOPLE. BUILDING STRONGER COMMUNITIES." over the 2026 grant photograph, with a one-line summary, *Explore Our Work* and a *Partner With Us* link | code; photograph local |
| Impact bar | Five figures in a teal band across the foot of the hero, counting up on load: ₦250M+ invested, 100+ entrepreneurs, 200+ students, 36+ communities, 70+ jobs | **CMS** |
| Three pillars | "Three pillars. One direction." — Enterprise, Education, Community, each with its focus areas and photograph | **CMS** |
| Flagship programme | "Backing businesses built to grow." with the 2026 Entrepreneurship Grant called out at ₦2M–₦3M per business | code |
| Portfolio story | "From production constraint to growing enterprise." — before, intervention, result | code |
| Partnership | "Impact scales through partnership." on a tinted strip, with partner logos when any exist | **CMS** |
| Recent stories | Three story cards | **CMS** |
| Closing | "Help us expand what works." → Partner With Us | code |

## About — `/about`

Who OCHF is and how it works. Mission and vision (the only place Newsreader still
appears, as an editorial accent), the three-pillar model, and "We publish what we
can verify" on how figures are checked. Closes with *Explore Our Work*.

Source: code, except the pillars.

### Our Story — `/about/story`

"It started in Ebonyi. It did not stop there." — the founding account and a dated
milestone list. Milestones come from the **CMS**.

### Leadership — `/about/leadership`

An index of portraits with name, role and the opening line of each profile.
Clicking a portrait opens that person's own page.

- `/about/leadership/ikechukwu-agwu` — Founder
- `/about/leadership/angela-unna-chukwu` — Director of Programmes

Addresses are built from the name with honorifics removed, so a change of title
does not change a URL. People and portraits come from the **CMS**; add a person
there and a page appears for them.

### Governance — `/about/governance`

Accountability and structure: the reporting standard, the grant award standard,
and how impact is measured. Closes with *Contact Our Team*. Source: code.

## Our Work — `/our-work`

"Three pillars. One direction." Each pillar as a numbered card with its focus
areas, then the flagship programme. Source: **CMS**.

### The three pillars

| Page | Focus areas |
|---|---|
| `/our-work/enterprise` | Entrepreneurship · Agribusiness · Technology |
| `/our-work/education` | Scholarships · Training Programmes · Skills Development |
| `/our-work/community` | Direct Support · Infrastructure |

Enterprise carries more than the other two, because the grants are the strongest
proof the foundation has: the grant model (₦2M–₦3M, 1:1 mentorship, eligibility,
selection criteria) and a portfolio story. Each pillar page links to the other
two. Enterprise closes with *Partner With Us*; the others with *Explore Our
Impact*.

## Impact — `/impact`

"Beyond the Numbers." The figures again in full, how impact is measured, the
three pillars with their focus areas, and the milestone list. Figures and
milestones from the **CMS**.

## Stories — `/stories`

Story cards, each opening its own page at `/stories/<slug>`. A story is published
only when **both** `published` and `consent` are ticked in the CMS — consent
matters because the people in them are named. Three stories exist; one is
published.

A story page shows the photograph, the standfirst and the body in two columns.

## Gallery — `/gallery`

Album covers rather than one long list. Opening an album shows its photographs,
with a keyboard-operable viewer (Escape closes, arrows move).

- **Inauguration** — 33 photographs, 2024, in four sections
- **2026 Outreach** — 16 photographs
- **2026 Beneficiaries** — defined, awaiting photographs

All photographs are in the **CMS**. Nothing is served from postimg.cc any more.

## Partner With Us — `/partners`

"Greater impact through *partnership*." — the photograph runs off the right edge
behind a curved panel. Six partner types: cooperatives, development
organisations, government, educational institutions, technical partners, funders.
Closes with *Contact Our Team*. Partner logos come from the **CMS**; none are
entered yet, so the categories show from code.

## Support — `/support`

Three ways to support, with giving arranged directly — no payment processor is
connected. Source: code.

### Apply — `/support/apply`

What an applicant needs and how to apply for the Entrepreneurship Grant.

## Contact — `/contact`

A form, the direct channels, and the common questions. The form opens the
visitor's mail client; it does not post anywhere. Questions come from the **CMS**
(12 entered). `/faq` redirects here.

## The dashboard — `/admin`

Not a public page and not in the sitemap. OCHF signs in with the password held in
cPanel and edits the nine content types. Saving publishes straight to the live
site.

---

## Things worth knowing before changing anything

**Figures appear in more than one place.** ₦250M is on the homepage, on Impact and
in the founder's biography. The launch brief requires every number to match
everywhere, so changing one means changing all of them — the CMS figure and the
biography are separate edits.

**The grant range is stated in five places.** The homepage flagship says ₦2M–₦3M;
the FAQ, the Enterprise page, About and Support still say ₦1M–₦3M. That is
unresolved — the 2026 cycle was ₦2M–₦3M, but earlier rounds may not have been.

**Nothing claims a figure it cannot support.** A figure with no verified value
renders as a short rule, not a zero and not an estimate. That behaviour is
deliberate and should survive future edits.

**Photographs are resized before they ship.** Originals arrive at 3–12 MB; what
the site serves is 1600px wide. A full-size photograph dropped straight into the
CMS will cost visitors real money in data.

**Old addresses redirect.** `/home/`, `/visionary`, `/donate`, `/events/*` and the
rest 301 to their new equivalents, and the old WordPress machinery returns 410.
Those rules live in `public_html/.htaccess`, not in the site, and a careless
upload can delete them.
