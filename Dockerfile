FROM node:16.14.2

RUN mkdir -p /usr/scr/voirme-next
WORKDIR /usr/scr/voirme-next

COPY ./ ./

RUN npm install

RUN npm install -g npm@8.8.0

COPY . /usr/scr/voirme-next

CMD ["/bin/bash"]