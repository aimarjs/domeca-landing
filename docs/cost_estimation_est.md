# Sõidu hinnakalkulatsiooni ülevaade

Sõidu hinnakalkulatsioon selles bussi broneerimise rakenduses hõlmab kogukulude arvutamist, lähtudes mitmest tegurist, sealhulgas vahemaa, sõiduaeg, ooteaeg, hinnakujunduse struktuur ja maksud. Allpool on toodud arvutamise protsessi ülevaade:

## 1. Arvutamiseks vajalikud sisendid
- **Tegelik vahemaa (km)**: Tegelik sõidetud vahemaa, sealhulgas tagasisõit peakorterisse (HQ).
- **Sõiduaeg (minutid)**: Kogu sõiduaeg, mis on arvutatud planeeritud marsruudi alusel.
- **Ooteaeg (minutid)**: Erinevus kliendi määratud lõpuaaja ja tegeliku arvutatud sõiduaja vahel.
- **Reisijad**: Reisi reisijate arv.
- **Hinnakujunduse andmed**:
  - **Kilomeetri hind**: Kilomeetri hind iga sõidetud kilomeetri kohta.
  - **Ühekordne algustasu**: Fikseeritud tasu, mis lisatakse igale reisile.
  - **Tunnitasu**: Hind iga sõidutunni kohta.
  - **Ootetunni hind**: Hind iga ootetunni kohta.
  - **Soodustus**: Protsentuaalne allahindlus, mis rakendub, kui vahemaa ületab teatud piiri.
  - **Soodustuse alguse km**: Kilomeetrite arv, millest alates hakkab soodustus kehtima.
- **Maksumäär**: Rakendatav maksumäär, mis lisatakse kogu arvutatud kulule.

## 2. Samm-sammult arvutamise protsess

### Samm 1: Vahemaa maksumuse arvutamine
- **Põhitasu**:
  - **Kilomeetri hind** korrutatakse kogu läbitud vahemaaga (sealhulgas tagasisõit).
  - Valem: `distanceCost = realDistance * baseFarePerKm`
- **Soodustuse rakendamine**:
  - Kui koguvahemaa ületab **soodustuse alguse kilomeetreid**, rakendatakse vahemaatasule allahindlust.
  - Valem: `discountedDistanceCost = distanceCost * (1 - discount / 100)` (kui kohaldatav).

### Samm 2: Ajal põhinevate kulude arvutamine
- **Tunnipõhine sõidukulu**:
  - **Tunnitasu** rakendatakse kogu sõiduaja alusel, mis arvutatakse minutitest tundideks.
  - Valem: `timeCost = (travelTime / 60) * hourPrice`
  
- **Ooteaja kulu**:
  - **Ootetunni hind** rakendatakse ooteaja põhjal, mis samuti arvutatakse minutitest tundideks.
  - Valem: `waitingCost = (waitingTime / 60) * waitingHourPrice`
  
### Samm 3: Fikseeritud kulude lisamine
- **Ühekordne algustasu**:
  - Fikseeritud tasu lisatakse igale reisile.
  - Valem: `totalBeforeTax = discountedDistanceCost + timeCost + waitingCost + oneTimeStartingFee`

### Samm 4: Maksude rakendamine
- **Kogukulu maksudega**:
  - Kogukulu arvutatakse, rakendades **maksumäära** kogu summale (vahemaa, aeg, ootamine ja fikseeritud kulud).
  - Valem: `totalCostWithTax = totalBeforeTax * (1 + TAX_RATE)`

## 3. Lõplik kulude valem
Lõplikku kulude valemit saab esitada järgmiselt:


## 4. Näide arvutusest
Oletame järgmisi sisendeid:
- **Tegelik vahemaa**: 150 km
- **Sõiduaeg**: 180 minutit (3 tundi)
- **Ooteaeg**: 60 minutit (1 tund)
- **Reisijad**: 3
- **Kilomeetri hind**: 0,5 €
- **Ühekordne algustasu**: 10 €
- **Tunnitasu**: 20 €
- **Ootetunni hind**: 15 €
- **Soodustus**: 10% (kui vahemaa > 100 km)
- **Maksumäär**: 22%

1. **Vahemaa maksumus**: `150 km * 0,5 € = 75 €`
2. **10% soodustuse rakendamine**: `75 € * 0,9 = 67,5 €`
3. **Aja maksumus**: `(180 minutit / 60) * 20 € = 60 €`
4. **Ooteaja maksumus**: `(60 minutit / 60) * 15 € = 15 €`
5. **Ühekordne algustasu**: 10 €
6. **Kokku enne makse**: `67,5 € + 60 € + 15 € + 10 € = 152,5 €`
7. **Kogukulu maksudega**: `152,5 € * 1,22 = 186,05 €`

## 5. Kokkuvõte
Reisi lõplik hinnanguline maksumus on **186,05 €**, mis sisaldab kõiki asjakohaseid vahemaa-, aja- ja ooteaja arvutusi, samuti ühekordset algustasu ja kohaldatavaid makse.
