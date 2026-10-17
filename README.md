# Tématické kódování 2026 - Recyklační Město

**Autor:** Tomáš Froulík  
**Ročník / Projekt:** 2026  

## Funkcionalita a herní popis programu
Simulační a manažerská hra, ve které hráč přebírá plnou kontrolu nad ekologickým hospodařením města. Program je rozdělen do několika přehledných obrazovek (Startovní menu, Herní plocha, Obchod) a nabízí tyto klíčové funkce:

- **Správa času a herní cyklus:** Čas ve hře běží po dnech (1 den trvá 4 sekundy). Hráč může kdykoliv pomocí ovládacího tlačítka čas **pozastavit** nebo **opět spustit**, což umožňuje strategické plánování rozvoje bez časového stresu.
- **Růst populace a generování odpadu:** S každým novým dnem přirozeně roste počet obyvatel v jednotlivých čtvrtích (přibývá 10 až 40 lidí denně). Obyvatelé produkují čtyři druhy odpadu: *papír, plast, bioodpad a směsný odpad*.
- **Systém levelování a rozšiřování města:** Za úspěšnou recyklaci získává hráč bodové skóre. Po dosažení stanovených bodových hranic postupuje na vyšší levely. Každý nový level automaticky založí a přidá **+2 nové čtvrti**, čímž se rozšiřuje město a zvyšuje objem odpadu.
- **Nákup technologií a zařízení v obchodu:** V herním obchodu může hráč utrácet vydělané peníze za dva typy infrastruktury:
  - **Třídičky (manuální a automatické):** Roztřídí surový odpad ze čtvrtí, aby mohl být dále zpracován.
  - **Závody (na papír, plast a bioodpad):** Zpracovávají roztříděný materiál a generují finanční zisk.
- **Přepínání stavu zařízení (Zapnuto / Vypnuto):** Každé zakoupené zařízení v hře disponuje přepínačem. Hráč může zařízení **libovolně vypnout** (pokud například nestíhá finančně pokrývat jeho provoz) nebo **opět zapnout**. Vypnutá zařízení nečerpají denní provozní náklady, ale také nezpracovávají odpad.
- **Trvalé ukládání hry (LocalStorage):** Program automaticky ukládá aktuální postup, finanční stav, skóre, levely i stav zařízení do paměti prohlížeče. Hráč může také využít tlačítko „Uložit hru“, které uloží pozici a vrátí ho zpět do startovního menu.
- **Vestavěná galerie s licencovaným uměním:** Součástí aplikací je interaktivní galerie ekologického umění a technologií s reálnými fotografiemi z Wikimedia Commons pod licencemi Creative Commons, doplněná o popisky a autorská práva.

## Statistiky projektu
- **Celkový počet řádků:** 497 řádků
- **Celkový počet slov:** Cca 1 650 slov
- **Celkový počet znaků:** Cca 27 400 znaků
