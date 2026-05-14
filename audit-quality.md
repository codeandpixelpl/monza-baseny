# Audyt Jakości — MONZA Baseny v1
**Data audytu:** 2026-05-13
**Zakres:** 8 stron HTML (index, o-nas, showroom, realizacje, realizacja-wroclaw, kontakt, baseny-zewnetrzne, architekci)

## Podsumowanie
- 🔴 Krytyczne: **3** problemy
- 🟡 Ważne: **5** problemów
- ⚪ Drobne: **4** problemy

---

## 🔴 Krytyczne (przed oddaniem)

### 1. Brak OG tags na 7 z 8 stron
Tylko `index.html` ma `og:type/title/description/image`. Pozostałe (`o-nas`, `kontakt`, `realizacje`, `showroom`, `architekci`, `baseny-zewnetrzne`, `realizacja-wroclaw`) — brak.
- **Skutek:** udostępnione linki w FB/LinkedIn/Slack pokażą "naked URL" bez podglądu, miniatury, opisu
- **Jak poprawić:** wstawić blok OG tags w `<head>` każdej podstrony (kopia z indexu + dostosowane title/description/image)

### 2. Font-size 13px na inputach modala — zoom iOS przy focusie
Wszystkie 8 stron — `.cmodal-row input/select/textarea` ma `font-size:13px`. Safari iOS wymusza zoom gdy `<16px`.
- **Skutek:** użytkownik na iPhone wpisując dane traci kontekst (auto-zoom)
- **Jak poprawić:** `font-size:16px` na inputach mobile (`@media max-width:860px`)

### 3. Stopka — `<a href="#">Polityka prywatności</a>` na każdej stronie
Realny link prawny pod jednym z najczęściej klikanych linków w stopce.
- **Skutek:** zgodność z RODO/Omnibus → brak dostępu do polityki = potencjalna kara
- **Jak poprawić:** utworzyć `polityka-prywatnosci.html` z minimalną treścią (administrator danych, cele przetwarzania, podstawy prawne, prawa użytkownika, kontakt do IOD)

---

## 🟡 Ważne (w tej wersji jeśli czas)

### 4. Skip-link tylko na index.html
Pozostałe 7 stron — brak `<a class="skip-link" href="#main">Przejdź do treści</a>`. WCAG 2.4.1 (Bypass Blocks).
- **Skutek:** użytkownicy klawiatury i czytników ekranu muszą tabować przez całą nav za każdym razem
- **Jak poprawić:** dodać skip-link po `<body>` na każdej podstronie + `id="main"` na pierwszej sekcji

### 5. 16 sub-linków usług w nav i stopce → `href="#"`
Dropdown `Usługi` ma 6 pozycji, ale tylko `Baseny zewnętrzne` ma realny link. Pozostałe 5 (Baseny wewnętrzne, Wanny SPA, Sauny, Łaźnie parowe, Strefy SPA) → `#`. Na 8 stronach × 2 miejsca (nav + footer) = 80+ martwych linków.
- **Skutek:** użytkownik klika "Wanny SPA" → strona przeładowuje się do top, frustracja
- **Jak poprawić:** albo utworzyć podstrony (jak `baseny-zewnetrzne.html`), albo prowadzić wszystkie do `realizacje.html#filtr=wanna-spa` (z auto-filter w JS)

### 6. Loading="lazy" brakuje na obrazach poza indexem
- `architekci.html`: 0/2
- `o-nas.html`: 0/1 (founder image)
- `showroom.html`: 0/3 (expo images)
- `baseny-zewnetrzne.html`: 3/4
- `realizacja-wroclaw.html`: 5/6 (hero img bez lazy = OK, ale gallery powinny mieć)
- **Skutek:** wolniejsze LCP, niepotrzebny bandwidth
- **Jak poprawić:** dodać `loading="lazy"` na wszystkich obrazach poniżej folda

### 7. Tytuły stron — niespójna struktura
- ✅ `Wrocław Trzebnica — realizacja · MONZA baseny&SPA` (53c)
- ✅ `Dla architektów — MONZA baseny&SPA` (38c)
- ❌ `Kontakt — MONZA baseny&SPA` (30c) — za krótki, brak kontekstu/keyword
- ❌ `O nas — MONZA baseny&SPA` (28c) — to samo
- **Jak poprawić:** dodać kontekst lokalizacji/keyword (`Kontakt · Brzesko · MONZA baseny&SPA`, `O nas · Projektant basenów w Brzesku · MONZA`)

### 8. `realizacja-wroclaw.html` "Zobacz realizację" → `href="#"`
Sekcja "Następna realizacja" → Okocim I, ale link nie prowadzi nigdzie.
- **Jak poprawić:** stworzyć `realizacja-okocim.html` lub usunąć tę sekcję

---

## ⚪ Drobne (następna iteracja)

### 9. `mailto:` na adresach email — sprawdź czy `marcin@monzabaseny.pl` istnieje
Wszędzie podajemy 2 maile: `biuro@monzabaseny.pl` i `marcin@monzabaseny.pl`. Sprawdzić czy oba aktywne.

### 10. Format telefonów w UI vs `tel:` — różne formaty
- W UI: `+48 663 959 514` (ze spacjami)
- W `tel:`: `+48663959514` (bez spacji) ✓ — OK, ale warto wymusić konwencję

### 11. Brakuje `<meta name="robots">` — domyślnie OK, ale warto sprawdzić
Po deploy: jeśli to production, dodać `<meta name="robots" content="index, follow">`. Jeśli staging — `noindex,nofollow`.

### 12. Brak `<link rel="canonical">` na podstronach
Pomocne dla SEO przy ewentualnych parametrach URL (?v=cache-bust, ?utm=...).

---

## ✅ Bez zastrzeżeń

| Kategoria | Status |
|---|---|
| **Lang attribute** | `lang="pl"` na wszystkich 8 stronach ✓ |
| **Alt teksty** | Wszystkie `<img>` mają opisowe `alt` ✓ |
| **CTA copy** | Czasowniki: "Umów konsultację", "Pobierz", "Zobacz realizacje", "Odwiedź showroom" — brak "Kliknij tutaj"/"Więcej" ✓ |
| **Brak placeholderów** | Żadnych Lorem ipsum, TODO, FIXME w treści ✓ |
| **Typografia** | 2 fonty (Fraunces serif + JetBrains Mono) — zgodnie z zasadą max 2 ✓ |
| **Focus states** | `:focus` na inputach modala na wszystkich stronach ✓ |
| **Touch targets** | Hamburger, mn-tel, mn-cta, sticky-bar — min 44×44px ✓ |
| **Active state nav** | Aktualna strona ma `class="active"` ze styled underline ✓ |
| **Logo SVG** | Wszędzie wektor, brak pikseli ✓ |
| **Spójność ikon** | Stroke-width 1.5–2px na SVG (phone, mail, close, arrow) ✓ |
| **Brak capslocku >3 słów** | Jedyny capslock to letter-spaced eyebrows (krótkie) ✓ |
| **Polski lang/diakrytyki** | Wszędzie prawidłowe znaki (ł, ć, ę, ż) ✓ |
| **Twitter cards** | Na index.html (`twitter:card summary_large_image`) ✓ |

---

## Quick wins (do zrobienia w 30 minut)

```bash
# 1. Dodaj lazy loading do brakujących obrazów
# 2. Dodaj font-size:16px na .cmodal-row input w @media mobile
# 3. Utwórz polityka-prywatnosci.html z basic content
# 4. Skopiuj OG tags z index.html do pozostałych 7 stron (dostosować tytuł/desc/image)
```

## Powiązane
- Po naprawie krytycznych → `/git-prep` + push do repo
- Przed deploy → Lighthouse mobile + desktop check
