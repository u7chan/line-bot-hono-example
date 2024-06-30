FROM node:22-slim

WORKDIR /workspace
COPY . /workspace

RUN apt-get update && apt-get install -y \
    bash \
    curl \
    git \
    openssh-client \
    zip \
    locales \
    # ngrok
    curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc \
    |  tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null \
    && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" \
    |  tee /etc/apt/sources.list.d/ngrok.list \
    apt-get update \
    apt-get install ngrok \
    # bun
    && npm i -g bun \
    # local
    && localedef -f UTF-8 -i ja_JP ja_JP.UTF-8 \
    # cleanup
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* 

ENV LANG="ja_JP.UTF-8" \
    LANGUAGE="ja_JP:ja" \
    LC_ALL="ja_JP.UTF-8" \
    TZ=Asia/Tokyo
