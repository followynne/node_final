# Progetto Finale del Corso di Node.Js - docente Olivieri Dino
## ITS ICT Piemonte - Integrated Backend Services - a.a. 2018-2020
## Ferrero Merlino L., Sacchet G., Gregoricchio M.

### Istruzioni di configurazione

È necessario avere installato Node.Js per usare l'applicativo.
Per prima cosa, installare le dipendenze di progetto tramite shell dalla folder root (install via npm):
```
npm install
```

Secondo, rinominare il file *.env.example* in *.env* (!attenzione su S.O. Windows! Rinominare il file effettivamente come .env, non .env.txt o simili.)
Al suo interno, sostituire i campi **insertyourkeyhere**
```
RAPIDAPI = "insertyourkeyhere"
apiKey = "insertyourkeyhere"
```
con le apikey dei seguenti vendor:
- [API Live Webcam](https://api4.windy.com/webcams#reference)
- [API OpenWeather](https://openweathermap.org/api)

Per far partire il progetto e divertirsi, usare il seguente comando dalla folder root:
```
npm start
```

Have fun!