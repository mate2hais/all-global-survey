# Reducerea schimbărilor bruște de pagină

## Ce voi modifica
- Rezerv spațiu stabil pentru toate imaginile publice, inclusiv galeria de pe Acasă și pagina Galerie.
- Adaug dimensiuni explicite și proporții consecvente imaginilor încărcate din administrare și imaginilor din Noutăți.
- Stabilizez elementele încorporate și secțiunile dinamice care pot împinge conținutul după încărcare.
- Păstrez aspectul vizual actual și animațiile care nu modifică geometria paginii.

## Verificare
- Testez paginile Acasă, Galerie, Noutăți, Despre și Testimoniale pe mobil și desktop.
- Verific raportul de schimbare a poziției elementelor în browser și starea finală a aplicației.

## Detalii tehnice
- Folosesc atribute `width`/`height` împreună cu containere cu raport de aspect stabil.
- Completez metadatele de dimensiune pentru imaginile dinamice fără a face public depozitul privat.
- Verific și încărcarea fontului, header-ul, caruselul și conținutul condițional pentru surse secundare de CLS.
