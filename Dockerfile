# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos do projeto
COPY package*.json ./
RUN npm install
COPY . .

# Instale o TypeScript e as dependências de desenvolvimento
RUN npm install -g typescript ts-node

# Gere o cliente Prisma
RUN npm run prisma:generate

# Compile o código TypeScript
RUN npm run build

# Exponha a porta que a aplicação vai rodar
EXPOSE 3000

# Copie o script de inicialização
COPY start.sh /usr/src/app/
RUN chmod +x /usr/src/app/start.sh

# Comando para iniciar o script de inicialização
CMD ["/usr/src/app/start.sh"]
