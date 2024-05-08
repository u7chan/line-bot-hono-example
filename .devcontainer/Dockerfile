FROM node:20-slim

WORKDIR /workspace
COPY . /workspace

RUN apt-get update && apt-get install -y \
    bash \
    curl \
    git \
    openssh-client \
    zip \
    locales \
    && localedef -f UTF-8 -i ja_JP ja_JP.UTF-8 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* 

ENV LANG="ja_JP.UTF-8" \
    LANGUAGE="ja_JP:ja" \
    LC_ALL="ja_JP.UTF-8" \
    TZ=Asia/Tokyo
