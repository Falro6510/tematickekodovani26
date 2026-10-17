# TÉMATICKÉ KÓDOVÁNÍ 2026 - RECYKLAČNÍ MĚSTO
!!! PRO SPUŠTĚNÍ OTEVŘETE SOUBOR index.html !!!

https://github.com/Falro6510/tematickekodovani26

Tento program je webová simulační a manažerská hra zaměřená na recyklaci a ekologický rozvoj města. Nabízí následující herní funkce a přesnou ekonomickou logiku:

## 1. Správa času a pauza
Čas ve hře běží po dnech (1 den trvá 4 sekundy). Hráč může čas kdykoliv pozastavit nebo znovu spustit tlačítkem pro klidné promyšlení dalekosáhlých tahů.

## 2. Růst populace a generování odpadu
V jednotlivých čtvrtích přirozeně přibývají obyvatelé (+10 až +40 osob denně). Obyvatelé generují 4 druhy odpadu na osobu (s lehkou denní odchylkou):
- Papír: ~0.15 kg/osoba
- Plast: ~0.20 kg/osoba
- Bioodpad: ~0.25 kg/osoba
- Směsný odpad: ~0.30 kg/osoba

## 3. Logika ekonomiky (Majetek a profit)
- **Majetek (Kč):** Celkový dostupný kapitál. Při založení nové hry hráč obdrží počáteční kapitál 500 000 Kč na každou zadanou čtvrť.
- **Profit (Kč/den):** Denní čistý zisk. Vypočítává se jako výnos z prodeje zpracovaného materiálu (Papír: 5 Kč/kg, Plast: 8 Kč/kg, Bio: 3 Kč/kg) po odečtení denních provozních nákladů všech zapnutých zařízení.
- Každý den se vypočítaný profit přičte k celkovému majetku hráče.

## 4. Logika skóre a levelování
- **Skóre:** Hráč získává +1.5 bodu za každý kg úspěšně recyklovaného odpadu a naopak dostává penalizaci -0.5 bodu za každý kg odpadu, který skončí jako nerecyklovaná směs.
- **Levelování:** Úroveň se počítá progresivně ze skóre (hranice se zvyšují v násobcích 10 000 bodů). Při postupu na nový level systém automaticky vytvoří a přidá **+2 nové čtvrti**.

## 5. Obchod a zapínání/vypínání zařízení
- **Třídičky:** Manuální (cena 100 000 Kč, provoz 500 Kč/den, kapacita 600 kg) a Automatická (cena 250 000 Kč, provoz 1 200 Kč/den, kapacita 1 800 kg).
- **Závody:** Malé a velké závody na papír, plast a bioodpad s odlišnou nákupní cenou, denním provozem a kapacitou.
- **Vypínání/Zapínání:** U každého zakoupeného zařízení může hráč přepínat stav (zapnuto/vypnuto). Vypnutá zařízení nespotřebovávají peníze na provoz, ale netřídí ani nezpracovávají odpad.

## 6. Ukládání hry (LocalStorage)
Automatické i manuální ukládání stavu majetku, profitu, skóre, dnů, čtvrtí a stavu zařízení do paměti prohlížeče. Tlačítko pro uložení umožňuje bezpečný návrat do startovního menu.

## 7. 2 CSS módy
Hra obsahuje 2 CSS styly. Pro přepnutí využijte tlačítko v horním levém rohu.

---

### Statistiky projektu
- **Celkový počet řádků:** 862
- **Celkový počet znaků:** 31 356

---

### Galerie ekologického umění (CC)

#### Dílo 1
- **Název díla:** UFF clothing collection bins in Vallila, Helsinki
- **Autor:** User:Avaris / Wikimedia Commons
- **Licence:** [Creative Commons Attribution-Share Alike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/deed.en)
- **O umění:** Tato dokumentární fotografie zachycuje reálné sběrné kontejnery ve finských Helsinkách. Dílo symbolizuje utilitární městskou infrastrukturu, ekologickou zodpovědnost a každodenní logistiku udržitelného hospodaření s materiály ve veřejném prostoru.

#### Dílo 2
- **Název díla:** Bill Cox 88th Civil Engineering Group Recycling Center
- **Zdroj:** [Picryl / DVIDS](https://picryl.com/media/bill-cox-88th-civil-engineering-group-recycling-center-677019)
- **Licence:** Public Domain / U.S. Government work
- **O umění:** Tento snímek dokumentuje provoz v recyklačním centru a představuje průmyslové zázemí zpracování druhotných surovin, technické vybavení a efektivní správu odpadového hospodářství.
