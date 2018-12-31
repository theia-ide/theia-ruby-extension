FROM alpine

USER root

RUN apk add python
RUN apk add make
RUN apk add g++
RUN apk add yarn

ENV PATH="/usr/bin:${PATH}"

RUN apk add ruby
RUN apk add ruby-dev
RUN apk add zlib-dev
RUN gem install rdoc --no-document
RUN gem install json
RUN gem install solargraph