# Usa un'immagine Node.js ufficiale
FROM node:18

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente
COPY . .

# Compila TypeScript
RUN npm run build

# Esponi la porta su cui gira l'app
EXPOSE 3000

# Comando per avviare l'app
CMD ["node", "dist/index.js"]
