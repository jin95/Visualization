FROM ubuntu:trusty

ENV DEBIAN_FRONTEND noninteractive
ENV PATH $PATH:/usr/local/nginx/sbin

EXPOSE 1935
EXPOSE 80

# create directories
RUN mkdir /src /config /logs /data /static

# update and upgrade packages
RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get clean && \
  apt-get install -y --no-install-recommends build-essential \
  wget software-properties-common && \
# ffmpeg
  add-apt-repository ppa:mc3man/trusty-media && \
  apt-get update && \
  apt-get install -y --no-install-recommends ffmpeg && \
# unzip
  apt-get install -y --no-install-recommends unzip && \
# nginx dependencies
  apt-get install -y --no-install-recommends libpcre3-dev \
  zlib1g-dev libssl-dev wget && \
  rm -rf /var/lib/apt/lists/*

# get nginx source
WORKDIR /src
RUN wget http://nginx.org/download/nginx-1.13.1.tar.gz && \
  tar zxf nginx-1.13.1.tar.gz && \
  rm nginx-1.13.1.tar.gz && \
# get nginx-rtmp module
  wget https://github.com/arut/nginx-rtmp-module/archive/master.zip && \
  unzip master.zip && \
  rm master.zip

# compile nginx
WORKDIR /src/nginx-1.13.1
RUN ./configure --add-module=/src/nginx-rtmp-module-master \
  --conf-path=/config/nginx.conf \
  --error-log-path=/logs/error.log \
  --http-log-path=/logs/access.log && \
  make && \
  make install

ADD config /config
ADD static /static

WORKDIR /
CMD "nginx"
