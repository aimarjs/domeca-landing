# Hinnangulise maksumuse arvutamise ülevaade

Selles bussireisi broneerimise rakenduses arvutatakse hinnanguline reisikulu mitme teguri põhjal, sealhulgas vahemaa, sõiduaeg, ooteaeg, hinnastruktuur ja maksud. Lisaks on kasutajatel võimalus valida Premium-buss, mille puhul rakendatakse kõrgemat tunnihinda. Allpool on toodud arvutamise protsess:

## 1. Sisendid arvutamiseks
- **Tegelik vahemaa (Km)**: Tegelikult läbitud vahemaa, sealhulgas tagasisõit peakorterisse (HQ).
- **Sõiduaeg (Minutid)**: Kogu sõiduaeg, mis arvutatakse vastavalt plaanitud marsruudile.
- **Ooteaeg (Minutid)**: Erinevus kliendi määratud lõpuaja ja tegeliku arvutatud sõiduaja vahel.
- **Reisijad**: Reisijate arv reisi kohta.
- **Hinnakujunduse andmed**:
  - **Põhihind kilomeetri kohta**: Põhihind iga läbitud kilomeetri kohta.
  - **Ühekordne starditasu**: Fikseeritud tasu, mis lisatakse igale reisile.
  - **Tunnihind**: Sõidutunni maksumus.
  - **Premium tunnihind**: Premium-bussi sõidutunni maksumus.
  - **Ootetunni hind**: Ootetunni maksumus.
  - **Soodustus**: Soodustusprotsent, mida rakendatakse, kui vahemaa ületab teatud piiri.
  - **Soodustuse algus kilomeetrites**: Kilomeetrite arv, mille järel hakkab soodustus kehtima.
- **Maksumäär**: Maksumäär, mida rakendatakse kogu arvutatud summale.
- **Premium-buss**: Kui see on valitud, rakendatakse tavalise tunnihinna asemel premium-tunnihinda.

## 2. Samm-sammuline arvutusprotsess

### Samm 1: Vahemaaga seotud kulude arvutamine
- **Põhihind**: 
  - **Põhihind kilomeetri kohta** korrutatakse läbitud vahemaa (sealhulgas tagasisõit) kogupikkusega.
  - Valem: `distanceCost = realDistance * baseFarePerKm`
- **Soodustuse rakendamine**: 
  - Kui kogupikkus ületab **soodustuse alguskilomeetrite** arvu, rakendatakse vahemaaga seotud kuludele soodustus.
  - Valem: `discountedDistanceCost = distanceCost * (1 - discount / 100)` (kui kehtib).

### Samm 2: Ajaga seotud kulude arvutamine
- **Sõidu tunnihind**: 
  - **Tunnihind** rakendatakse kogu sõiduajale, mis teisendatakse minutitest tundideks.
  - Valem:
    - Tavaline buss: `timeCost = (travelTime / 60) * hourPrice`
    - Premium-buss: `timeCost = (travelTime / 60) * premiumHourPrice`
  
- **Ooteaeg**:
  - **Ootetunni hind** rakendatakse ooteajale, mis samuti teisendatakse minutitest tundideks.
  - Valem: `waitingCost = (waitingTime / 60) * waitingHourPrice`
  
### Samm 3: Fikseeritud kulude lisamine
- **Ühekordne starditasu**: 
  - Iga reisi puhul lisatakse fikseeritud tasu.
  - Valem: `totalBeforeTax = discountedDistanceCost + timeCost + waitingCost + oneTimeStartingFee`

### Samm 4: Maksu rakendamine
- **Kogumaksumus koos maksuga**:
  - Kogumaksumus arvutatakse, rakendades **maksumäära** kogusummale (vahemaa, aeg, ooteaeg ja fikseeritud kulud).
  - Valem: `totalCostWithTax = totalBeforeTax * (1 + TAX_RATE)`

## 3. Lõplik maksumuse valem
Lõplik maksumus on esindatud järgmiselt:

## 4. Näide arvutusest 
Oletame, et sisendid on järgmised:
- **Tegelik vahemaa**: 150 km
- **Sõiduaeg**: 180 minutit (3 tundi)
- **Ooteaeg**: 60 minutit (1 tund)
- **Reisijad**: 3
- **Põhihind kilomeetri kohta**: 0,5 €
- **Ühekordne starditasu**: 10 €
- **Tunnihind**: 20 €
- **Premium tunnihind**: 30 €
- **Ootetunni hind**: 15 €
- **Soodustus**: 10% (kui vahemaa > 100 km)
- **Maksumäär**: 22%
- **Premium-buss**: Valitud

1. **Vahemaaga seotud kulud**: `150 km * 0,5 € = 75 €`
2. **10% soodustuse rakendamine**: `75 € * 0.9 = 67,5 €`
3. **Sõiduaeg**: `(180 minutit / 60) * 30 € (premium-tunnihind) = 90 €`
4. **Ooteaeg**: `(60 minutit / 60) * 15 € = 15 €`
5. **Ühekordne starditasu**: 10 €
6. **Kogusumma enne makse**: `67,5 € + 90 € + 15 € + 10 € = 182,5 €`
7. **Kogumaksumus koos maksuga**: `182,5 € * 1.22 = 222,65 €`

## 5. Järeldus
Lõplik hinnanguline maksumus premium-bussi kasutamisel on **222,65 €**, mis sisaldab kõiki vahemaa-, aja- ja ooteajaga seotud arvutusi, samuti ühekordset starditasu ja kohaldatavaid makse.
